'use client'

import { addDraggable, removeDraggable } from "@/lib/draggable/store"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import React from "react"


export default function TestComponent() {


  function onPress() {
    for (let i = 1; i <= 10; i++)
      addDraggable({
        id: i.toString(),
        showDraggable: (close) => (
          <>
            <CardHeader>
              <CardTitle>{i.toString()}</CardTitle>
              <CardDescription>Card description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card content</p>
            </CardContent>
            <CardFooter>
              <Button onClick={close}>Click me</Button>
            </CardFooter>
          </>
        ),
        draggableProps: {
          className: "bg-slate-200 border border-slate-300 h-64",
          defaultPosition: {
            x: i * 25,
            y: i * 25,
          },
          // grid: [25, 25],
        },
      });
  }


  // add a draggable displaying a youtube video
  function video() {
    addDraggable({
      id: "video",
      showDraggable: (close) => (
        // div that capture all action on the iFrame
        // autoplay and disable controls/ pausing the video
        <div
          className="relative"
          style={{
            width: "560px",
            height: "315px",
          }}
        >
          <iframe
            className="absolute"
            style={{
              width: "560px",
              height: "315px",
              zIndex: 25,
            }}
            src="https://www.youtube.com/embed/7e90gBu4pas?autoplay=1&controls=0"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
          <div className="absolute top-0 right-0 left-0 bottom-0 bg-black bg-opacity-0 z-50" />
        </div>

      ),
      draggableProps: {
        defaultPosition: {
          x: 100,
          y: 100,
        },
        className: "bg-black",
      },
    });
  }



  return (
    <>
      <Button onClick={() => onPress()}>Add draggable</Button>
      <Button onClick={() => video()}>Add video</Button>
    </>
  )
}


