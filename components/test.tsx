'use client'

import { Button } from "./ui/button"
import { addDraggable } from "@/lib/draggable/store"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"

export default function TestComponent() {
  function onPress() {
    const name = (Math.random() * 100).toFixed(0).toString()
    addDraggable(name, (close) => (
      <Card className="w-96 h-96">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>
            Card description
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card content</p>
        </CardContent>
        <CardFooter>
          <Button>Click me</Button>
        </CardFooter>
      </Card>
    ), {
      defaultPosition: { x: 100, y: 100 },
    })
  }

  return (
    <Button onClick={() => onPress()}>Add draggable</Button>
  )
}
