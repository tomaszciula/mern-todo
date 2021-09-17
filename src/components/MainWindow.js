import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-responsive-modal/styles.css";
import Modal from "react-responsive-modal";
import { useForm } from "react-hook-form";
import { ReactComponent as CheckBox } from "../Assets/check_circle_black_24dp.svg";
import { ReactComponent as EditIcon } from "../Assets/mode_edit_black_24dp.svg";
import { ReactComponent as DeleteIcon } from "../Assets/delete_forever_black_24dp.svg";

const MainWindow = () => {
  const [stateTodos, setStateTodos] = useState([]);
  const [inputState, setInputState] = useState("");
  const [modalState, setModalState] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setStateTodos([...stateTodos, data]);
    axios
      .post("http://localhost:4000/todos/add", data)
      .then((response) => {
        console.log(response.data);
      });
  };

  let todos = [];

  useEffect(() => {
    loadTodos();
  }, []);

  const showModal = () => {
    setModalState(true);
  };
  const closeModal = () => {
    setModalState(false);
  };

  function loadTodos() {
    axios.get("http://localhost:4000/todos").then((response) => {
      setStateTodos(response.data);
    });
  }

  function TodoCard({ data }) {
    const {
      _id,
      todo_description,
      todo_responsible,
      todo_priority,
      todo_completed,
      __v,
    } = data;
    return (
      
      <div className="flex flex-1 items-center">
        <div className="select-none flex items-center transition duration-500 ease-in-out transform hover:-translate-y-2 rounded-2xl border-2 p-6 hover:shadow-2xl border-red-400">
      <CheckBox className="mx-3 w-9" />
      </div>
      <li key={data._id} className="border-gray-400 flex flex-row my-2">
        <div className="select-none flex flex-1 items-center transition duration-500 ease-in-out transform hover:-translate-y-2 rounded-2xl border-2 p-6 hover:shadow-2xl border-red-400">

          <h3 className="flex items-center justify-center mx-4 font-medium">
            {data.todo_description}
          </h3>
          <h3 className="flex items-center justify-center mx-4 ">
            {data.todo_responsible}
          </h3>
          <h3 className="flex items-center justify-center mx-4 ">
            {data.todo_priority}
          </h3>
          <EditIcon className="mx-3 hover:stroke-1 " />
          <DeleteIcon className="mx-3" />
        </div>
      </li>
      </div>
    );
  }

  const handleButtonOnClick = () => {
    console.log("Kliknięto");
    showModal();
  };

  /*
    setStateTodos([...stateTodos, value]);
    axios.post("http://localhost:4000/todos", stateTodos).then((response) => {
      console.log(response.data);
    }); */

  return (
    <>
      <div className="container mb-2 flex mx-auto items-center justify-center">
        <ul className="flex flex-col p-4">
          {stateTodos.map((item) => (
            <TodoCard data={item} />
          ))}
        </ul>
        <h1>{inputState}</h1>
      </div>
      <button
        //    onSubmit={onSubmit}
        className="select-none mx-auto flex items-center justify-center transition duration-500 ease-in-out transform hover:-translate-y-2 rounded-2xl border-2 p-6 hover:shadow-2xl border-red-400"
        onClick={() => handleButtonOnClick()}
      >
        Dodaj nowe zadanie do listy
      </button>
      <Modal open={modalState} onClose={closeModal} center>
        <div className="w-auto m-5 flex items-center justify-center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              placeholder="Opis zadania ..."
              className="select-none flex flex-1 m-2 h-3 w-11/12 items-center transition duration-500 ease-in-out transform hover:-translate-y-2 rounded-2xl border-2 p-6 hover:shadow-2xl border-red-400"
              {...register("todo_description")}
            />{" "}
            {/* register an input */}
            <input
              placeholder="Osoba odpowiedzialna ..."
              className="select-none mx-auto m-2 h-3 flex w-auto items-center justify-center transition duration-500 ease-in-out transform hover:-translate-y-2 rounded-2xl border-2 p-6 hover:shadow-2xl border-red-400"
              {...register("todo_responsible", { required: true })}
            />
            {errors.lastName && <p>Last name is required.</p>}
            <input
              placeholder="priorytet zadania ..."
              className="select-none mx-auto m-2 h-3 flex w-auto items-center justify-center transition duration-500 ease-in-out transform hover:-translate-y-2 rounded-2xl border-2 p-6 hover:shadow-2xl border-red-400"
              {...register("todo_priority")}
            />
            {errors.age && <p>Please enter number for age.</p>}
            <input
              className="select-none mx-auto m-2 h-3 flex items-center justify-center transition duration-500 ease-in-out transform hover:-translate-y-2 rounded-2xl border-2 p-6 hover:shadow-2xl border-red-400"
              type="submit"
            />
          </form>
        </div>
      </Modal>
    </>
  );
};

export default MainWindow;
