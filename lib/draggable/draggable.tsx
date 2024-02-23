'use client'

import * as React from "react"

import { cn } from "@/lib/utils"

import RootDraggable, { DraggableBounds, DraggableProps as RootDraggableProps } from "react-draggable"
import { useOnClickOutside } from "../hooks/useOnClickOutside"
import { DraggableBoundaryContext } from "./draggable-boundary"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"
import { Button } from "@/components/ui/button"
import { X, XCircle } from "lucide-react"

interface DraggableProps extends Partial<RootDraggableProps> {
  children: React.ReactNode
  onFocused?: () => void
  close?: () => void
  zIndex?: number
}

const Draggable = React.forwardRef<
  HTMLDivElement,
  DraggableProps
>(({ children, ...props }, ref) => {

  const [focused, setFocused] = React.useState(false)

  const parentBoundary = React.useContext(DraggableBoundaryContext)

  if (!parentBoundary) {
    throw new Error("DraggableCard must be rendered within a DraggableBoundary")
  }

  const [boundary, setBoundary] = React.useState<DraggableBounds>(parentBoundary)

  const innerRef = React.useRef<HTMLDivElement>(null)

  React.useImperativeHandle(ref, () => innerRef.current as HTMLDivElement)

  useOnClickOutside(innerRef, () => unFocus())

  function unFocus() {
    if (!focused) return
    setFocused(false)
    props.onFocused?.()
  }

  function focus() {
    if (focused) return
    setFocused(true)
  }

  React.useLayoutEffect(() => {
    if (innerRef.current) {
      const { width, height } = innerRef.current.getBoundingClientRect()
      setBoundary({
        top: parentBoundary.top ?? 0,
        left: parentBoundary.left ?? 0,
        right: (parentBoundary.right ?? 0) - width,
        bottom: (parentBoundary.bottom ?? 0) - height
      })
    }
  }, [parentBoundary, parentBoundary.right])

  return (
    <RootDraggable {...props} bounds={boundary} onMouseDown={focus}>
      <div
        ref={innerRef}
        className={cn("absolute")}
        style={{
          width: "fit-content",
          height: "fit-content",
          zIndex: focused ? 50 + (props.zIndex ?? 0) : 30 + (props.zIndex ?? 0),
          // when focused add drops shadow, if not focus make it slightly darker
          boxShadow: focused ? "0 0 0 1px rgba(0, 0, 0, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.1)" : "0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.1)",
          filter: focused ? "brightness(1)" : "brightness(0.98)"
        }}
      >
        {/* traffic light menu */}
        <div
          className="flex flex-row gap-2 absolute rounded-md"
          style={{
            top: "-0px",
            right: "-0px",
          }}
        >

          <Button
            onClick={props.close}
            size={"icon"}
          >
            <X size={20} />
          </Button>




        </div>

        <ContextMenu>
          <ContextMenuTrigger id="context-menu">
            {children}
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem
              onClick={props.close}
            >
              Close
            </ContextMenuItem>
          </ContextMenuContent>

        </ContextMenu>
      </div>

    </RootDraggable >
  )
})

Draggable.displayName = "Draggable"


export { Draggable }
export type { DraggableProps }

