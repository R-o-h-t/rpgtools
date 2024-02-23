"use client"

import { GripVertical } from "lucide-react"
import * as ResizablePrimitive from "react-resizable-panels"

import { cn } from "@/lib/utils"
import React from "react";
import { Button } from "./button";

const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn(
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
      className
    )}
    {...props}
  />
)

const ResizablePanel = ResizablePrimitive.Panel

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
      className
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
)

interface ToggleableResizablePanelProps
  extends React.ComponentProps<typeof ResizablePrimitive.Panel> {
  children: React.ReactNode
  toggleButton: React.ReactNode
}

const ToggleableResizablePanel = React.forwardRef<
  ResizablePrimitive.ImperativePanelHandle,
  ToggleableResizablePanelProps
>(({ children, className, ...props }, ref) => {
  const innerRef = React.useRef<ResizablePrimitive.ImperativePanelHandle>(null)

  React.useImperativeHandle(ref, () => innerRef.current as ResizablePrimitive.ImperativePanelHandle)

  function toggle() {
    if (!innerRef.current) return
    innerRef.current.isExpanded() ? innerRef.current.collapse() : innerRef.current.expand()
  }

  return (
    <ResizablePanel ref={innerRef} {...props} className={cn("relative", className)}>
      <div className="absolute top-0 left-0 w-full p-2 z-10 bg-slate-500 rounded-sm">
        <Button variant="outline" onClick={toggle}>{props.toggleButton}</Button>
      </div>
      {children}
    </ResizablePanel>
  )
}
)

ToggleableResizablePanel.displayName = "ToggleableResizablePanel"

export { ResizablePanelGroup, ResizablePanel, ResizableHandle, ToggleableResizablePanel }

