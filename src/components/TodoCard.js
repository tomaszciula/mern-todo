import React from "react";
import { ReactComponent as EditIcon } from "../Assets/mode_edit_black_24dp.svg";
import { ReactComponent as DeleteIcon } from "../Assets/delete_forever_black_24dp.svg";
import Modal from "react-responsive-modal";
import axios from "axios";

function TodoCard({ data }) {
  const [todoState, setTodoState] = React.useState(data.todo_completed);
  const [onDelete, setOnDelete] = React.useState(false);
  const showModal = () => {
    setOnDelete(true);
  };
  const closeModal = () => {
    setOnDelete(false);
  };

  const handleDeleteIconClick = (e) => {
    showModal();
  };

  const handleDeleteTodo = () => {
    closeModal();
    axios
      .delete(`http://localhost:4000/todos/${_id}`, data)
      .then((response) => {
        console.log(response.data);
      });
  };

  const handleCheckboxClick = () => {
    axios
      .post(`http://localhost:4000/todos/update/${_id}`, data)
      .then((response) => {
        console.log(response.data);
        setTodoState(!data.todo_completed);
      });
  };

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
        <input
          key={_id}
          type="checkbox"
          className=" "
          checked={todoState}
          onChange={handleCheckboxClick}
        />
      </div>
      <li key={_id} className="border-gray-400 flex flex-row my-2">
        <div className="select-none flex flex-1 items-center transition duration-500 ease-in-out transform hover:-translate-y-2 rounded-2xl border-2 p-6 hover:shadow-2xl border-red-400">
          <h3 className="flex items-center justify-center mx-4 font-medium">
            {todo_description}
          </h3>
          <h3 className="flex items-center justify-center mx-4 ">
            {todo_responsible}
          </h3>
          <h3 className="flex items-center justify-center mx-4 ">
            {todo_priority}
          </h3>
          <EditIcon className="mx-3 hover:stroke-1 " />
          <DeleteIcon className="mx-3" onClick={handleDeleteIconClick} />
        </div>
      </li>
      <Modal open={onDelete} onClose={closeModal} center>
        <p className="flex justify-center">Czy napewno usunąć?</p>
        <div className="flex justify-between items-center m-5">
          <button value="no" onClick={closeModal} className="select-none flex items-center transition duration-500 ease-in-out transform hover:-translate-y-2 rounded-2xl border-2 p-6 hover:shadow-2xl border-red-400">
            Anuluj
          </button>
          <button value="yes" onClick={handleDeleteTodo} className="select-none flex items-center transition duration-500 ease-in-out transform hover:-translate-y-2 rounded-2xl border-2 p-6 hover:shadow-2xl border-red-400">
            Usuń
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default TodoCard;
