import { Inter as FontSans } from "next/font/google"
import "./globals.css"

import { CommandMenu } from "@/components/menu/command/command-menu"
import { CommonMenubar } from "@/components/menu/menubar/default-menubar"
import CommonProvider from "@/components/provider"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup, ToggleableResizablePanel } from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Toaster } from "@/components/ui/sonner"
import { DraggableBoundary } from "@/lib/draggable/draggable-boundary"
import { cn } from "@/lib/utils"
import { Home } from "lucide-react"
import { Metadata } from "next"
import React, { Suspense } from "react"
import Loading from "./loading"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})


function Menu() {

  return (
    <CommonMenubar />
  )

}

function SideBar() {

  return (
    <></>
  )

}


function Content({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Loading />}>
      <DraggableBoundary className="h-full w-full flex flex-col justify-center" padding={20}>
        <CommandMenu />
        {children}
        <Toaster />
      </DraggableBoundary>
    </Suspense>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>

      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col",
          fontSans.variable
        )}
      >
        <CommonProvider>
          <Menu />
          <ResizablePanelGroup
            className="flex-grow rounded-lg"
            direction="horizontal"
          >
            <ToggleableResizablePanel
              defaultSize={20}
              className="flex-grow border"
              minSize={20}
              maxSize={20}
              collapsible
              collapsedSize={4}
              toggleButton={<Home />}
            >
              <ScrollArea>
                <SideBar />
              </ScrollArea>
            </ToggleableResizablePanel>
            <ResizableHandle />
            <ResizablePanel
              defaultSize={80}
              className="flex-grow border"
            >
              <Content>{children}</Content>
            </ResizablePanel>
          </ResizablePanelGroup>
        </CommonProvider>
      </body >
    </html >
  );
}

export const metadata: Metadata = {
  title: "Root",
  description: "Root layout",
}
