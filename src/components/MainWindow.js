import React, { useState, useEffect } from "react";
import TodoCard from "./TodoCard";
import axios from "axios";
import "react-responsive-modal/styles.css";
import Modal from "react-responsive-modal";
import { useForm } from "react-hook-form";

const MainWindow = () => {
  const [stateTodos, setStateTodos] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [checkboxState, setCheckboxState] = useState();
  const changeCheckbox = (val) => setCheckboxState(val);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setStateTodos([...stateTodos, (data.todo_completed = false)]);
    setStateTodos([...stateTodos, data]);
    axios.post("http://localhost:4000/todos/add", data).then((response) => {
      console.log(response.data);
      closeModal()
    });
  };

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
      console.log(response.data);
      setStateTodos(response.data);
      console.log(stateTodos);
    });
  }

  const handleButtonOnClick = () => {
    console.log("Kliknięto");
    showModal();
  };

  return (
    <>
      <div className="container mb-2 flex mx-auto items-center justify-center">
        <ul className="flex flex-col p-4">
          {stateTodos.map((item) => (
            <TodoCard key={item.id} data={item} />
          ))}
        </ul>
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
              className="flex flex-1 m-2 h-3 w-11/12 items-center transition duration-500 ease-in-out transform hover:-translate-y-2 rounded-2xl border-2 p-6 hover:shadow-2xl border-red-400"
              {...register("todo_description")}
            />{" "}
            {/* register an input */}
            <input
              placeholder="Osoba odpowiedzialna ..."
              className="mx-auto m-2 h-3 flex w-auto items-center justify-center transition duration-500 ease-in-out transform hover:-translate-y-2 rounded-2xl border-2 p-6 hover:shadow-2xl border-red-400"
              {...register("todo_responsible", { required: true })}
            />
            {errors.lastName && <p>Last name is required.</p>}
            <input
              placeholder="priorytet zadania ..."
              className="mx-auto m-2 h-3 flex w-auto items-center justify-center transition duration-500 ease-in-out transform hover:-translate-y-2 rounded-2xl border-2 p-6 hover:shadow-2xl border-red-400"
              {...register("todo_priority")}
            />
            {errors.age && <p>Please enter number for age.</p>}
            <input
              className="mx-auto m-2 h-3 flex items-center justify-center transition duration-500 ease-in-out transform hover:-translate-y-2 rounded-2xl border-2 p-6 hover:shadow-2xl border-red-400"
              type="submit"
              value="Save"
            />
          </form>
        </div>
      </Modal>
    </>
  );
};

export default MainWindow;
