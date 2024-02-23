'use client'

import React from "react"
import { DraggableBounds } from "react-draggable"
import { cn } from "../utils"
import { useDraggableStore } from "./store"
import { Draggable } from "./draggable"

const DraggableBoundaryContext = React.createContext<DraggableBounds>({ top: 0, left: 0, right: 0, bottom: 0 })

interface DraggableBoundaryProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: number
}

const DraggableBoundary = ({ className, children, padding, ...props }: DraggableBoundaryProps) => {
  const [boundary, setBoundary] = React.useState<DraggableBounds>({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  })
  const ref = React.useRef<HTMLDivElement>(null)

  React.useLayoutEffect(() => {
    if (ref?.current) {
      const { width, height } = ref.current.getBoundingClientRect()
      setBoundary({
        top: padding ?? 0,
        left: padding ?? 0,
        right: width - (padding ?? 0),
        bottom: height - (padding ?? 0)
      })
    }
  }, [padding])

  // get the draggables inside the store and render them inside the DraggableBoundary component
  const { draggables, removeDraggable } = useDraggableStore()

  const [order, setOrder] = React.useState<string[]>([])

  React.useEffect(() => {
    // add the draggable not already in the order, on top of the order
    setOrder((order) => {
      return Object.keys(draggables).filter((id) => !order.includes(id)).concat(order)
    })
  }, [draggables])

  return (
    <div ref={ref} className={cn("relative z-50", className)} {...props}>
      <DraggableBoundaryContext.Provider value={boundary}>
        <div className="absolute top-0 left-0 w-full h-full z-10">
          {children}
        </div>
        <div className="absolute top-0 left-0 w-full h-full">
          {Object.entries(draggables).map(([id, draggable]) =>
            <Draggable key={id} close={() => removeDraggable(id)}
              {...draggable.draggableProps}
              zIndex={order.length - order.indexOf(id)}
              onFocused={() => {
                setOrder((prev) => {
                  const index = prev.indexOf(id)
                  return [id, ...prev.slice(0, index), ...prev.slice(index + 1)]
                })
              }}
            >
              {draggable.showDraggable(() => removeDraggable(id))}
            </Draggable>
          )}
        </div>
      </DraggableBoundaryContext.Provider >
    </div >

  )
}

DraggableBoundary.displayName = "DraggableBoundary"

export { DraggableBoundary, DraggableBoundaryContext }
