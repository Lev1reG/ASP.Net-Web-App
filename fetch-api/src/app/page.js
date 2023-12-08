"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [quest, setQuest] = useState(null);
  const [openForm, setForm] = useState(true);

  // Ambil data seluruhnya
  useEffect(() => {
    const getAllData = async () => {
      const response = await fetch("https://localhost:7098/api/Quest");
      const data = await response.json();
      setQuest(data);
    };
    getAllData();
  }, []);

  if (!quest) {
    return <div>Loading...</div>;
  }

  // Post
  const postData = async () => {
    axios
      .post("https://localhost:7098/api/Quest", {
        tugas: "Makan cirambay",
        isDone: false,
        deadline: "2021-10-10",
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <main
        style={{ backgroundImage: `url(./bg.png)` }}
        className={`w-screen h-screen flex justify-center items-center flex-col bg-cover bg-repeat`}
      >
        {openForm ? (
          <section className="flex justify-center items-center flex-col bg-blue-300 p-9 rounded-2xl">
            <h1 className="text-white text-4xl font-bold mb-8">Quest</h1>
            <table className="">
              <thead className="">
                <tr className="">
                  <th className="px-6 py-2">Tugas</th>
                  <th className="px-6 py-2">Status</th>
                  <th className="px-6 py-2">Deadline</th>
                </tr>
              </thead>
              <tbody>
                {quest.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-2">{item.tugas}</td>
                    <td className="px-6 py-2">
                      {item.isDone === "True"
                        ? "Dah kelar king"
                        : "Belum kelar king :("}
                    </td>
                    <td className="px-6 py-2">{item.deadline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={() => {
                setForm((prev) => !prev);
              }}
              className="bg-red-500 px-4 py-2 rounded-full w-fit hover:translate-y-[5px] ease-in-out"
            >
              <p className="text-white font-bold">Add Quest</p>
            </button>
          </section>
        ) : (
          <section className="bg-blue-300 p-10 rounded-lg">
            <h1 className="text-white font-extrabold text-3xl">Add Quest</h1>
            <form className="flex flex-col gap-y-[20px]">
              <div className="flex flex-col">
                <label className="text-xl font-bold" htmlFor="quest">
                  What is your quest?
                </label>
                <input
                  className="text-black font-semibold"
                  type="text"
                  placeholder="Enter Quest"
                  id="quest"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xl font-bold" htmlFor="deadline">
                  Dare to set deadline?
                </label>
                <input
                  className="text-black font-semibold"
                  type="datetime-local"
                  id="deadline"
                />
              </div>
              <div className="flex flex-row">
                <button
                  type="submit"
                  onClick={postData}
                  className="bg-red-500 px-4 py-2 rounded-full w-fit hover:translate-y-[5px] ease-in-out"
                >
                  <p className="text-white font-bold">Submit</p>
                </button>
                <button
                  onClick={() => {
                    setForm((prev) => !prev);
                  }}
                  className="bg-red-500 px-4 py-2 rounded-full w-fit hover:translate-y-[5px] ease-in-out"
                >
                  <p className="text-white font-bold">View All</p>
                </button>
              </div>
            </form>
          </section>
        )}
      </main>
    </>
  );
}
