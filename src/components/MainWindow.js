import React, { useState, useEffect } from "react";
import axios from "axios";

const MainWindow = () => {
  const [stateTodos, setStateTodos] = useState([]);
  const [inputState, setInputState] = useState("");

  let todos = [];

  useEffect(() => {
    loadTodos();
  }, []);

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
      <li key={data._id}>
        <div className="flex items-center justify-center m-5 ">
          <h3 className="flex items-center justify-center mx-4 ">
            {data.todo_description}
          </h3>
          <h3 className="flex items-center justify-center mx-4 ">
            {data.todo_responsible}
          </h3>
          <h3 className="flex items-center justify-center mx-4 ">
            {data.todo_priority}
          </h3>
        </div>
      </li>
    );
  }

  const handleButtonOnClick = (value) => {
    setStateTodos([...stateTodos, value]);
    axios
      .post("http://localhost:4000/todos", { text: value })
      .then((response) => {
        console.log(response.data);
      });
  };

  return (
    <>
      <ul>
        {stateTodos.map((item) => (
          <TodoCard data={item} />
        ))}
      </ul>
      <h1>{inputState}</h1>
      <button className="" onClick={() => handleButtonOnClick(inputState)}>
        Dodaj nowe zadanie do listy
      </button>
    </>
  );
};

export default MainWindow;
