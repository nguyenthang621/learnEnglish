// PopoverClick.tsx
'use client'

import { FloatingPortal, Placement, arrow, offset, shift, useFloating, flip } from '@floating-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useRef } from 'react'

interface PopoverClickProps {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  placement?: Placement
  offsetInput?: number
  isArrow?: boolean
}

function PopoverClick({
  children,
  renderPopover,
  className,
  isOpen,
  onOpenChange,
  placement = 'bottom-end',
  offsetInput = 8,
  isArrow = false
}: PopoverClickProps) {
  const arrowRef = useRef<HTMLElement>(null)
  const floatingRef = useRef<HTMLDivElement>(null)
  
  const { x, y, refs, strategy, middlewareData } = useFloating({
    open: isOpen,
    onOpenChange: onOpenChange,
    middleware: [
      offset(offsetInput),
      flip(),
      shift({ padding: 8 }),
      ...(isArrow ? [arrow({ element: arrowRef })] : [])
    ],
    placement: placement
  })

  // Đóng popover khi click bên ngoài
  useEffect(() => {
    if (!isOpen) return

    function handleClickOutside(event: MouseEvent) {
      if (
        floatingRef.current &&
        refs.domReference.current &&
        event.target instanceof Node &&
        !floatingRef.current.contains(event.target) &&
        !refs.domReference.current.contains(event.target)
      ) {
        onOpenChange(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onOpenChange, refs])

  return (
    <>
      <div className={className} ref={refs.setReference}>
        {children}
      </div>
      <FloatingPortal>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={(node) => {
                refs.setFloating(node)
                floatingRef.current = node
              }}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: 'max-content'
              }}
              className='z-[9999]'
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
            >
              {isArrow && middlewareData.arrow && (
                <span
                  ref={arrowRef}
                  className='absolute z-50 translate-y-[-95%] border-[11px] border-x-transparent border-b-white border-t-transparent'
                  style={{
                    left: middlewareData.arrow.x ?? 0,
                    top: middlewareData.arrow.y ?? 0
                  }}
                />
              )}
              {renderPopover}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </>
  )
}

export default PopoverClick