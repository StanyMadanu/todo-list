import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

const TodoList = () => {
  const [todoItems, setTodoItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [indexValue, setIndexValue] = useState(null);

  const [taskDoneItems, setTaskDoneItems] = useState([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("todoItems"));
    const savedTaskStatus = JSON.parse(localStorage.getItem("taskDoneItems"));

    if (savedTasks) {
      setTodoItems(savedTasks);
    }

    if (savedTaskStatus) {
      setTaskDoneItems(savedTaskStatus);
    }
  }, []);

  // storing the data to localStorage
  useEffect(() => {
    localStorage.setItem("todoItems", JSON.stringify(todoItems));
    localStorage.setItem("taskDoneItems", JSON.stringify(taskDoneItems));
  }, [todoItems, taskDoneItems]);

  const handleInput = (e) => {
    const input = e.target.value;
    setInputValue(input);
  };

  const handleAddTask = (e) => {
    e.preventDefault();

    if (inputValue.trim()) {
      if (indexValue !== null) {
        const updatedTasks = [...todoItems];
        updatedTasks[indexValue] = inputValue;

        setTodoItems(updatedTasks);
        setIndexValue(null);
      } else {
        setTodoItems([...todoItems, inputValue]);
        setTaskDoneItems([...taskDoneItems, false]);
      }
      setInputValue("");
    }
  };

  const handleDelete = (itemIndex) => {
    const updatedTodoItems = todoItems.filter(
      (_, index) => itemIndex !== index
    );

    const updatedTaskDoneItems = taskDoneItems.filter(
      (_, index) => itemIndex !== index
    );

    setTodoItems(updatedTodoItems);
    setTaskDoneItems(updatedTaskDoneItems);
  };

  const handleEdit = (itemIndex) => {
    setInputValue(todoItems[itemIndex]);
    setIndexValue(itemIndex);
  };

  const handleTaskStatus = (index) => {
    const updatedTaskDoneItems = [...taskDoneItems];
    updatedTaskDoneItems[index] = !updatedTaskDoneItems[index];

    setTaskDoneItems(updatedTaskDoneItems);
  };

  const totalTasks = todoItems.length;
  const completedTasks = taskDoneItems.filter((task) => task === true).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="container">
      <div className="row">
        <div className="col-xxl-5 col-xl-6 col-lg-8 col-md-9 col-12 mx-auto">
          <div className="todo-wrapper rounded p-4">
            <div className="todo-heading text-center">
              <h2 className="my-3">To Do List</h2>
              <form className="d-flex gap-2 my-2">
                <input
                  className="form-control"
                  type="text"
                  value={inputValue}
                  onChange={(e) => handleInput(e)}
                />
                <button
                  className="btn btn-primary"
                  onClick={(e) => handleAddTask(e)}
                >
                  {indexValue === null ? "Add" : "Update"}
                </button>
              </form>
            </div>

            <div className="todo-body my-4">
              {todoItems.map((item, index) => (
                <div
                  key={index}
                  className="todo-task d-flex justify-content-between px-3 py-2 rounded mb-3"
                >
                  <div className="d-flex align-items-center gap-3">
                    <input
                      className=""
                      type="checkbox"
                      id={`task${index}`}
                      checked={taskDoneItems[index] || false}
                      onChange={() => handleTaskStatus(index)}
                    />
                    <label
                      className={`${taskDoneItems[index] && "task-done"}`}
                      htmlFor={`task${index}`}
                      style={{ cursor: "pointer" }}
                    >
                      {item}
                    </label>
                  </div>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleDelete(index)}
                    >
                      <MdDelete />
                    </button>
                    <button
                      className="btn btn-outline-info"
                      onClick={() => handleEdit(index)}
                    >
                      <MdEdit />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="tasks-status d-flex flex-wrap justify-content-around my-3">
            <p className="text-capitalize">total : {totalTasks}</p>
            <p className="text-capitalize">pending : {pendingTasks}</p>
            <p className="text-capitalize">completed: {completedTasks}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
