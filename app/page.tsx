import TestComponent from "@/components/test";
import { Metadata } from "next";


export default function Home() {

  return (
    <main className=" h-full w-full">
      <TestComponent />
    </main>
  );
}


export const metadata: Metadata = {
  title: "Home",
  description: "Home page",
}
