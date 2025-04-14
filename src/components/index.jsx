import { useEffect, useState } from "react";
import ToDoInput from "./ToDoInput/ToDoInput";
import ToDoItem from "./ToDoItem/ToDoItem";
import ToDoFilter from "./ToDoFilter/ToDoFilter";
import "./ToDoList.css";

const ToDoList = () => {
  const [list, setList] = useState([]);
  const [inputText, setInputText] = useState("");
  const [updatedList, setUpdatedList] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [countOfCompletedTasks, setCountOfCompletedTasks] = useState(0);
  const [countOfUncompletedTasks, setCountOfUncompletedTasks] = useState(0);

  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem("todo-list"));
    if (savedList) {
      setList(savedList);
    }
  }, []);

  useEffect(() => {
    const completed = list.filter((task) => task.isDone).length;
    const uncompleted = list.filter((task) => !task.isDone).length;

    setCountOfCompletedTasks(completed);
    setCountOfUncompletedTasks(uncompleted);

    localStorage.setItem("todo-list", JSON.stringify(list));
  }, [list]);

  const addToDo = () => {
    if (inputText) {
      let task = {
        id: Math.random(),
        text: inputText,
        isDone: false,
      };
      setList([...list, task]);
      setInputText("");
    }
  };

  const deleteToDo = (id) => {
    let newList = list.filter((task) => task.id !== id);
    setList(newList);
  };

  const editToDo = (id, text) => {
    let newList = list.map((task) => {
      if (task.id === id) {
        task.text = text;
      }
      return task;
    });

    setList(newList);
  };

  const changeIsDone = (id, status) => {
    let newList = list.map((task) => {
      if (task.id === id) {
        task.isDone = status;
      }
      return task;
    });

    setList(newList);
  };

  return (
    <div className="to-do-list-container">
      <h1>To Do List</h1>
      <ToDoInput
        inputText={inputText}
        setInputText={setInputText}
        addToDo={addToDo}
        countOfUncompletedTasks={countOfUncompletedTasks}
        setCountOfUncompletedTasks={setCountOfUncompletedTasks}
      />

      <ToDoFilter
        list={list}
        setUpdatedList={setUpdatedList}
        setIsFiltered={setIsFiltered}
      />

      <div className="to-do-item-container">
        {isFiltered
          ? updatedList.map((task) => (
              <ToDoItem
                key={task.id}
                task={task}
                deleteToDo={deleteToDo}
                editToDo={editToDo}
                changeIsDone={changeIsDone}
              />
            ))
          : list.map((task) => (
              <ToDoItem
                key={task.id}
                task={task}
                deleteToDo={deleteToDo}
                editToDo={editToDo}
                changeIsDone={changeIsDone}
                countOfCompletedTasks={countOfCompletedTasks}
                setCountOfCompletedTasks={setCountOfCompletedTasks}
                countOfUncompletedTasks={countOfUncompletedTasks}
                setCountOfUncompletedTasks={setCountOfUncompletedTasks}
              />
            ))}
      </div>
      <div className="countOfTasks">
        <p>Completed: {countOfCompletedTasks}</p>
        <p className="line">|</p>
        <p>Uncompleted: {countOfUncompletedTasks}</p>
      </div>
    </div>
  );
};

export default ToDoList;
