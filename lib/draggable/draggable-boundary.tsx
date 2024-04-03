'use client'

import React from "react"
import type { DraggableBounds } from "react-draggable"
import { cn } from "../utils"
import { useDraggableStore } from "./store"
import { Draggable } from "./draggable"
import { AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

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
  const { draggables, removeDraggable, order } = useDraggableStore()

  // listen for window resize and update the boundary
  React.useEffect(() => {
    window.addEventListener("resize", () => {
      if (ref?.current) {
        const { width, height } = ref.current.getBoundingClientRect()
        setBoundary({
          top: padding ?? 0,
          left: padding ?? 0,
          right: width - (padding ?? 0),
          bottom: height - (padding ?? 0)
        })
      }
    })
  }, [padding])


  return (
    <div ref={ref} className={cn("relative z-50", className)} {...props}>
      <DraggableBoundaryContext.Provider value={boundary}>
        {/* <div className="absolute bottom-0 left-0 w-full h-12 flex items-center justify-center z-50" id="taskbar">
          {Object.entries(draggables).map(([id, draggable]) =>
            <Button key={id} onClick={() => removeDraggable(id)} className="" variant={order[order.length - 1] === id ? "default" : "secondary"}>
              {id}
            </Button>
          )}
        </div> */}
        <div className="absolute top-0 left-0 w-full h-full z-10">
          {children}
        </div>
        <div className="absolute top-0 left-0 w-full h-full" id="draggable-container">
          <AnimatePresence>
            {Object.entries(draggables).map(([id, draggable]) =>
              <Draggable
                id={id}
                key={id}
                close={() => removeDraggable(id)}
                {...draggable.draggableProps}
                zIndex={
                  (order.indexOf(id) + 1)
                }
                onFocused={() => {
                  order.push(order.splice(order.indexOf(id), 1)[0])
                  setBoundary({ ...boundary })
                }}
              >
                {draggable.showDraggable(() => removeDraggable(id))}
              </Draggable>
            )}
          </AnimatePresence>
        </div>


      </DraggableBoundaryContext.Provider >
    </div >

  )
}

DraggableBoundary.displayName = "DraggableBoundary"

export { DraggableBoundary, DraggableBoundaryContext }
