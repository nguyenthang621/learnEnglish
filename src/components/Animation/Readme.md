Cách dùng nhanh

1) File có animation “Idle”, không state machine

<RiveInteractive src="/streak-normal.riv" animation="Idle" autoplay />


2) File có state machine “Motion”, click để fire trigger onClick

<RiveInteractive
  src="/button.riv"
  autoplay
  clickTriggerName="onClick"
/>


3) Truyền inputs qua props (Boolean/Number/Trigger)

<RiveInteractive
  src="/hero.riv"
  inputs={{
    booleans: { hovered: true, active: false },
    numbers: { progress: 0.75 },
    triggersToFire: ["start"], // fire ngay khi mount
  }}
/>


4) Dùng API điều khiển qua ref

import { useRef } from "react";
import RiveInteractive, { RiveInteractiveHandle } from "./RiveInteractive";

function Demo() {
  const ref = useRef<RiveInteractiveHandle>(null);

  return (
    <>
      <RiveInteractive
        ref={ref}
        src="/meter.riv"
        stateMachine="Meter"
        inputs={{ numbers: { value: 50 } }}
        style={{ width: 320, height: 320 }}
      />
      <div className="mt-2 flex gap-8">
        <button onClick={() => ref.current?.play()}>Play</button>
        <button onClick={() => ref.current?.pause()}>Pause</button>
        <button onClick={() => ref.current?.reset()}>Reset</button>
        <button onClick={() => ref.current?.setBoolean("enabled", true)}>Enable</button>
        <button onClick={() => ref.current?.setNumber("value", Math.random() * 100)}>
          Random Value
        </button>
        <button onClick={() => ref.current?.fire("onClick")}>Fire Trigger</button>
      </div>
    </>
  );
}
