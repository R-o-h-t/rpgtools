import { Inter as FontSans } from "next/font/google"
import "./globals.css"

import { CommandMenu } from "@/components/menu/command/command-menu"
import { CommonMenubar } from "@/components/menu/menubar/default-menubar"
import CommonProvider from "@/components/provider"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils"
import { Suspense } from "react"
import Loading from "./loading"
import { Metadata } from "next"

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
      <div className="h-full w-full">
        <CommandMenu />
        <ScrollArea>
          {children}
        </ScrollArea>
        <Toaster />
      </div>
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
            <ResizablePanel
              defaultSize={20}
              className="flex-grow border"
              minSize={4}
              maxSize={20}
            >
              <ScrollArea>
                <SideBar />
              </ScrollArea>
            </ResizablePanel>
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
