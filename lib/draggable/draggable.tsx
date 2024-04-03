'use client'

import * as React from "react"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"
import { X } from "lucide-react"
import RootDraggable, { ControlPosition, type DraggableBounds, type DraggableProps as RootDraggableProps } from "react-draggable"
import { useOnClickOutside } from "../hooks/useOnClickOutside"
import { DraggableBoundaryContext } from "./draggable-boundary"
import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card"
import { Separator } from "@radix-ui/react-context-menu"

interface DraggableProps extends Partial<RootDraggableProps> {
  children: React.ReactNode
  onFocused?: () => void
  close?: () => void
  zIndex?: number
  title?: string
  className?: string
  id?: string
}

const Draggable = React.forwardRef<
  HTMLDivElement,
  DraggableProps
>(({ children, ...props }, ref) => {

  const [focused, setFocused] = React.useState(false)

  // load the default position from the id (localStorage)
  const defaultPosition: ControlPosition | undefined = React.useMemo(() => {
    const storage = localStorage.getItem(props.id ?? "")
    if (storage) {
      const position: { x: number, y: number } = JSON.parse(storage)
      return position
    }
    return undefined;
  }, [props.id])

  // save the position to the id (localStorage)
  const onDrag = React.useCallback((_: unknown, { x, y }: { x: number, y: number }) => {
    localStorage.setItem(props.id ?? "", JSON.stringify({ x, y }))
  }, [props.id])

  const resetPosition = React.useCallback(() => {
    localStorage.removeItem(props.id ?? "")
  }, [props.id])

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

  }

  function focus() {
    if (focused) return
    setFocused(true)
    props.onFocused?.()
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
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
    >
      <RootDraggable {...props}
        defaultPosition={defaultPosition ?? props.defaultPosition}
        bounds={boundary}
        onMouseDown={focus}
        // onDrag={onDrag}
        onStop={onDrag}
      >
        <Card
          ref={innerRef}
          className={cn(
            focused ? "shadow-md" : "shadow-sm",
            "absolute rounded-lg border border-gray-200 overflow-hidden border-opacity-50",
            props.className
          )}
          style={{
            zIndex: focused ? 50 + (props.zIndex ?? 0) : 30 + (props.zIndex ?? 0),
            filter: focused ? "brightness(1)" : "brightness(0.98)",
          }}
        >
          <div className="flex justify-between items-center space-x-1 px-2 pt-1 bg-gray-100">
            <Button
              onClick={props.close}
              variant={focused ? "default" : "secondary"}
              className="w-full h-1"
            />
          </div>
          <ContextMenu>
            {/* use the width and height extracted */}
            <ContextMenuTrigger id="context-menu" className={props.className}>
              {children}
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem
                onClick={props.close}
              >
                Close
              </ContextMenuItem>
              <Separator />
              <ContextMenuItem
                onClick={resetPosition}
              >
                Reset position
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </Card>
      </RootDraggable >
    </motion.div >
  )
})

Draggable.displayName = "Draggable"


export { Draggable }
export type { DraggableProps }
