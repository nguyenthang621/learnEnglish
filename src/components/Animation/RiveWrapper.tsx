import React, {
  CSSProperties,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  forwardRef,
} from "react";
import {
  useRive,
  Layout,
  Fit,
  Alignment,
  RiveParameters,
} from "@rive-app/react-canvas";

type InputsInit = {
  /** name -> boolean */
  booleans?: Record<string, boolean>;
  /** name -> number */
  numbers?: Record<string, number>;
  /** các trigger muốn .fire() khi mount hoặc khi props đổi */
  triggersToFire?: string[];
};

export type RiveInteractiveProps = {
  /** Đường dẫn .riv */
  src: string;
  /** Dùng animation thường (nếu không có state machine) */
  animation?: string;
  /** Dùng state machine (khi file có logic/inputs) */
  stateMachine?: string;
  /** Tự động play khi load */
  autoplay?: boolean;
  /** Layout render */
  layoutOptions?: { fit?: Fit; alignment?: Alignment };
  /** Style cho khung hiển thị */
  style?: CSSProperties;
  /** Tên trigger để fire khi click container (tuỳ chọn) */
  clickTriggerName?: string;
  /** Khởi tạo & cập nhật inputs qua props */
  inputs?: InputsInit;
  /** Tự động ép play() nếu rive ready mà chưa chạy (mặc định true) */
  ensurePlaying?: boolean;
};

export type RiveInteractiveHandle = {
  /** play tất cả (hoặc animation hiện tại) */
  play: () => void;
  /** tạm dừng */
  pause: () => void;
  /** reset timeline hiện tại */
  reset: () => void;
  /** đặt boolean theo tên */
  setBoolean: (name: string, value: boolean) => void;
  /** đặt number theo tên */
  setNumber: (name: string, value: number) => void;
  /** fire trigger theo tên */
  fire: (name: string) => void;
};

const RiveInteractive = forwardRef<RiveInteractiveHandle, RiveInteractiveProps>(
  (
    {
      src,
      animation,
      stateMachine,
      autoplay = true,
      layoutOptions = { fit: Fit.Contain, alignment: Alignment.Center },
      style = { width: 400, height: 400 },
      clickTriggerName,
      inputs,
      ensurePlaying = true,
    },
    ref
  ) => {
    const riveParams: RiveParameters = {
      src,
      ...(stateMachine
        ? { stateMachines: stateMachine }
        : animation
        ? { animations: animation }
        : {}),
      autoplay,
      layout: new Layout({
        fit: layoutOptions.fit ?? Fit.Contain,
        alignment: layoutOptions.alignment ?? Alignment.Center,
      }),
      // Provide a placeholder canvas to satisfy the RiveParameters type;
      // the actual canvas is managed by the returned RiveComponent.
      canvas: (null as unknown) as HTMLCanvasElement,
    };

    const { rive, RiveComponent } = useRive(riveParams);
    const inputMapRef = useRef<Record<string, any>>({}); // name -> input instance

    // Cập nhật map input mỗi khi rive hoặc stateMachine đổi
    useEffect(() => {
      inputMapRef.current = {};
      if (rive && stateMachine) {
        try {
          const inputsArr = rive.stateMachineInputs(stateMachine) || [];
          for (const input of inputsArr) {
            // input.name, input.value, input.fire()
            inputMapRef.current[input.name] = input;
          }
        } catch {
          // stateMachine không tồn tại -> bỏ qua
        }
      }
    }, [rive, stateMachine]);

    // Áp inputs từ props (booleans/numbers/triggers)
    useEffect(() => {
      if (!rive || !stateMachine || !inputs) return;

      // set booleans
      if (inputs.booleans) {
        for (const [name, val] of Object.entries(inputs.booleans)) {
          const inp = inputMapRef.current[name];
          if (inp && "value" in inp) {
            inp.value = !!val;
          }
        }
      }
      // set numbers
      if (inputs.numbers) {
        for (const [name, val] of Object.entries(inputs.numbers)) {
          const inp = inputMapRef.current[name];
          if (inp && "value" in inp) {
            inp.value = Number(val);
          }
        }
      }
      // fire triggers
      if (inputs.triggersToFire?.length) {
        for (const name of inputs.triggersToFire) {
          const inp = inputMapRef.current[name];
          if (inp && "fire" in inp) {
            inp.fire();
          }
        }
      }
    }, [inputs, rive, stateMachine]);

    // Đảm bảo play khi đã ready
    useEffect(() => {
      if (rive && ensurePlaying && autoplay && !rive.isPlaying) {
        rive.play();
      }
    }, [rive, ensurePlaying, autoplay]);

    // Expose API cho parent
    useImperativeHandle(
      ref,
      () => ({
        play: () => rive?.play(),
        pause: () => rive?.pause(),
        reset: () => rive?.reset(),
        setBoolean: (name, value) => {
          const inp = inputMapRef.current[name];
          if (inp && "value" in inp) inp.value = !!value;
        },
        setNumber: (name, value) => {
          const inp = inputMapRef.current[name];
          if (inp && "value" in inp) inp.value = Number(value);
        },
        fire: (name) => {
          const inp = inputMapRef.current[name];
          if (inp && "fire" in inp) inp.fire();
        },
      }),
      [rive]
    );

    const handleClick = useMemo(
      () => () => {
        if (!clickTriggerName) return;
        const inp = inputMapRef.current[clickTriggerName];
        if (inp && "fire" in inp) inp.fire();
        else if (inp && "value" in inp) inp.value = !inp.value; // nếu là boolean thì toggle
      },
      [clickTriggerName]
    );

    return (
      <div style={style} onClick={handleClick}>
        <RiveComponent />
      </div>
    );
  }
);

RiveInteractive.displayName = "RiveInteractive";
export default RiveInteractive;
