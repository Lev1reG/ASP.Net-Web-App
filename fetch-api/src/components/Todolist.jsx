"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaPencil } from "react-icons/fa6";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaWindowClose } from "react-icons/fa";
import { GrCheckboxSelected } from "react-icons/gr";
import { GrCheckbox } from "react-icons/gr";
import Loading from "@/components/Loading";

const Todolist = ({ openTodolist }) => {
  const [allQuest, setAllQuest] = useState(null);
  const [openForm, setForm] = useState(true);
  // const questRef = useRef(null);
  // const deadlineRef = useRef(null);
  const [quest, setQuest] = useState([null]);
  const [isDone, setIsDone] = useState([null]);
  const [deadline, setDeadline] = useState([null]);
  const [id, setId] = useState([null]);
  const [edit, setEdit] = useState(false);
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  const getAllData = async () => {
    const response = await fetch("https://localhost:7098/api/Quest");
    const data = await response.json();
    setAllQuest(data);
  };
  // Ambil data seluruhnya
  useEffect(() => {
    getAllData();
  }, []);

  if (!allQuest) {
    return <Loading />;
  }

  // Post
  const postData = async (e) => {
    if (quest === "") {
      e.preventDefault();
      alert("Please fill the form");
    } else {
      try {
        const response = await axios.post("https://localhost:7098/api/Quest", {
          tugas: quest,
          isDone: false,
          deadline: deadline,
        });
        getAllData();
        console.log(response.data);
        alert("Data has been succesfully submitted");
      } catch (err) {
        console.error("Error posting data : ", err);
      }
    }
  };

  const deleteTask = async (id) => {
    const result = window.confirm("Are you sure want to delete this task?");
    if (result) {
      try {
        const response = await axios.delete(
          `https://localhost:7098/api/Quest/${id}`
        );
        getAllData();
        console.log(response.data);
      } catch (err) {
        console.error("Error deleting data : ", err);
      }
    }
  };

  const handleButton = () => {
    setForm((prev) => !prev);
    setEdit(false);
    setQuest("");
    setDeadline("");
  };

  const handleEditButton = (task, deadline, id) => {
    setForm((prev) => !prev);
    setEdit(true);

    setQuest(task);
    setDeadline(deadline);
    setId(id);
  };

  const doneKing = async (task, deadline, id) => {
    const result = window.confirm(
      "Are you sure want to finish this task king?"
    );
    if (result) {
      try {
        const response = await axios.put(
          `https://localhost:7098/api/Quest/${id}`,
          {
            id: id,
            tugas: task,
            isDone: true,
            deadline: deadline,
          }
        );
        getAllData();
        console.log(response.data);
      } catch (err) {
        console.error("Error deleting data : ", err);
      }
    }

    router.refresh();
    getAllData();
  };

  const updateData = async (id) => {
    axios
      .put(`https://localhost:7098/api/Quest/${id}`, {
        id: id,
        tugas: quest,
        isDone: false,
        deadline: deadline,
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
    setQuest("");
    setDeadline("");
  };
  return (
    <>
      {openForm ? (
        <section className="flex justify-center items-center flex-col bg-blue-300 p-9 rounded-2xl">
          <div className="w-full flex flex-row justify-between relative">
            <h1 className="text-white text-4xl font-bold mb-8 mx-auto">
              Quest
            </h1>
            <FaWindowClose
              className="text-red-400 w-[35px] h-[35px] absolute right-0 cursor-pointer"
              onClick={openTodolist}
            />
          </div>

          <table className="">
            <thead className="">
              <tr className="">
                <th className="px-6 py-2">Tugas</th>
                <th className="px-6 py-2">Status</th>
                <th className="px-6 py-2">Deadline</th>
              </tr>
            </thead>
            <tbody>
              {allQuest.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-2">{item.tugas}</td>
                  <td className="text-center">
                    {item.isDone ? (
                      <button>
                        <GrCheckboxSelected />
                      </button>
                    ) : (
                      <button type="submit">
                        <GrCheckbox
                          onClick={() =>
                            doneKing(item.tugas, item.deadline, item.id)
                          }
                          className="cursor-pointer"
                        />
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-2">{item.deadline}</td>
                  <td>
                    <FaPencil
                      className="text-green-300 w-[100%] h-[100%] px-2 py-2 cursor-pointer"
                      onClick={() =>
                        handleEditButton(item.tugas, item.deadline, item.id)
                      }
                    />
                  </td>
                  <td>
                    <RiDeleteBinLine
                      className="text-red-400 w-[105%] h-[105%] px-2 py-2 cursor-pointer"
                      onClick={() => deleteTask(item.id)}
                    />
                  </td>
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
          <h1 className="text-white font-extrabold text-3xl">
            {edit ? "UPDATE TASK" : "ADD TASK"}
          </h1>
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
                // ref={questRef}
                value={quest}
                onChange={(e) => setQuest(e.target.value)}
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
                // ref={deadlineRef}
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>
            <div className="flex flex-row">
              <button
                type="submit"
                onClick={edit ? () => updateData(id) : (e) => postData(e)}
                className="bg-red-500 px-4 py-2 rounded-full w-fit hover:translate-y-[5px] ease-in-out"
              >
                <p className="text-white font-bold">Submit</p>
              </button>
              <button
                onClick={handleButton}
                className="bg-red-500 px-4 py-2 rounded-full w-fit hover:translate-y-[5px] ease-in-out"
              >
                <p className="text-white font-bold">View All</p>
              </button>
            </div>
          </form>
        </section>
      )}
    </>
  );
};

export default Todolist;
