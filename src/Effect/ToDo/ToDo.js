import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ToDo.scss";
import noTask from "./Images/no-task.svg";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uniqueId } from "uuid";
import clsx from "clsx";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";

export default function ToDo() {
  const [todos, setTodos] = useState([]);

  const [doName, setDoName] = useState("");

  const [doNameUpdate, setDoNameUpdate] = useState("");

  const [updateId, setUpdateId] = useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddToDo = (e) => {
    e.preventDefault();
    if (doName.trim() === "") {
      toast.error("Please fill do name");
    } else {
      const doItem = {
        id: uniqueId(),
        name: doName,
        isCompleted: false,
      };
      setTodos(todos.concat(doItem));
      setDoName("");
      toast.success("Added do");
    }
  };

  const handleChangeValue = (e) => {
    setDoName(e.target.value);
  };

  const handleChangeValueUpdate = (e) => {
    setDoNameUpdate(e.target.value);
  };

  const handleDelete = (type = "single", id = null) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        if (type == "single") {
          deleteToDo(id);
        } else {
          deleteAll();
        }
      }
    });
  };

  const getIndex = (field = "id", value) => {
    const index = todos.findIndex((item) => value == item[field]);
    return index;
  };

  const deleteAll = () => {
    setTodos([]);
    toast.success("Delete all success");
  };

  const deleteToDo = (id) => {
    const index = getIndex("id", id);

    if (index !== undefined) {
      const dataTodos = [...todos];
      dataTodos.splice(index, 1);
      setTodos(dataTodos);
      toast.success("Delete success");
    }
  };

  const handleEditTodo = (id) => {
    const index = getIndex("id", id);
    if (index !== undefined) {
      const doItem = todos[index];
      setDoNameUpdate(doItem.name);
      setUpdateId(id);
      handleShow();
    }
  };

  const handleUpdateToDo = (e) => {
    e.preventDefault();

    if (updateId !== null) {
      const id = updateId;
      const index = getIndex("id", id);
      if (index !== undefined) {
        if (doNameUpdate.trim() !== "") {
          const doItem = todos[index];
          doItem.name = doNameUpdate;
          const dataTodos = [...todos];
          dataTodos[index] = doItem;
          setTodos(dataTodos);
          handleClose(); //Tắt modal
          toast.success("Update To Do Success");
        }
      }
    }
  };

  const handleCompleted = (id) => {
    const index = getIndex("id", id);
    if (index !== undefined) {
      const doItem = todos[index];
      doItem.isCompleted = doItem.isCompleted ? false : true;
      const dataTodos = [...todos];
      dataTodos[index] = doItem;

      dataTodos.splice(index, 1);
      if (doItem.isCompleted) {
        dataTodos.push(doItem);
        toast.success("Mark completed success");
      } else {
        dataTodos.unshift(doItem);
        toast.success("Mark uncomplete success");
      }

      setTodos(dataTodos);
    }
  };

  return (
    <div className="todo-app">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-6">
            <div className="todo-app__inner py-5">
              <h2 className="text-center">Todo list</h2>
              <div className="todo-app__inner--input py-4">
                <form onSubmit={handleAddToDo}>
                  <div className="input-group">
                    <input
                      type="text"
                      onChange={handleChangeValue}
                      className="form-control"
                      placeholder="Enter your task"
                      value={doName}
                    />
                    <button type="submit" className="btn btn-primary">
                      Add
                    </button>
                  </div>
                </form>
              </div>
              <div className="todo-app__inner--lists py-4">
                {todos.length ? (
                  <>
                    <div className="inner__dolists p-3">
                      {todos.map(({ id, name, isCompleted }) => {
                        return (
                          <div
                            className={clsx(
                              "inner__dolists--item d-flex",
                              isCompleted && "completed"
                            )}
                            key={id}
                          >
                            <span onClick={() => handleCompleted(id)}>
                              {name}
                            </span>
                            <span>
                              <a
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleDelete("single", id);
                                }}
                              >
                                <i className="fa-solid fa-trash"></i>
                              </a>
                              <a
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleEditTodo(id);
                                }}
                              >
                                <i className="fa-solid fa-pen-to-square"></i>
                              </a>
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <p className="text-center mt-5">
                      <button
                        type="button"
                        className="btn btn-delete"
                        onClick={() => {
                          handleDelete("all");
                        }}
                      >
                        Delete All
                      </button>
                    </p>
                  </>
                ) : (
                  <p className="inner__no-task">
                    <img src={noTask} />
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update your task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdateToDo}>
            <div className="input-group">
              <input
                type="text"
                onChange={handleChangeValueUpdate}
                className="form-control"
                placeholder="Enter your task"
                value={doNameUpdate}
              />
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </div>
  );
}
