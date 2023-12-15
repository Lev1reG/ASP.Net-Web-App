"use client";

import Todolist from "@/components/Todolist";
import { useState } from "react";

export default function Home() {
  const [todoPage, setTodoPage] = useState(false);
  return (
    <>
      <main
        style={{ backgroundImage: `url(./bg.png)` }}
        className={`w-screen h-screen flex justify-center items-center flex-col bg-cover bg-repeat`}
      >
        {todoPage ? (
          <Todolist openTodolist={() => setTodoPage((prev) => !prev)} />
        ) : (
          <h1
            onClick={() => setTodoPage((prev) => !prev)}
            className=" font-extrabold text-4xl text-black cursor "
          >
            Open ToDo List
          </h1>
        )}
      </main>
    </>
  );
}
