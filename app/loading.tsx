'use client'

import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

export default function Loading() {

  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      const progressMade = Math.random() * 10
      setProgress((old) => old + progressMade)
    }, 300)
    return clearInterval(timer)
  }, [])

  return (<Progress value={progress} />)
}
