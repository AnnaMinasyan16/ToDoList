import { useState } from "react";
import "./ToDoItem.css";
import editIcon from "../../Images/draw.png"
import deleteIcon from "../../Images/delete.png"
import saveIcon from "../../Images/check.png"
import cancelIcon from "../../Images/close.png"

const ToDoItem = ({
  task,
  deleteToDo,
  editToDo,
  changeIsDone,
  countOfCompletedTasks,
  setCountOfCompletedTasks,
  countOfUncompletedTasks,
  setCountOfUncompletedTasks,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [updateText, setUpdateText] = useState(task.text);
  const [isDone, setIsDone] = useState(task.isDone);

  const saveEdit = () => {
    setIsEdit(false);
    editToDo(task.id, updateText);
  };

  const cancelEdit = () => {
    setIsEdit(false);
  };

  const handleCheckboxChange = () => {
    const newDoneStatus = !isDone;
    setIsDone(newDoneStatus);
    changeIsDone(task.id, newDoneStatus);

    if (newDoneStatus) {
      setCountOfCompletedTasks(countOfCompletedTasks + 1);
      setCountOfUncompletedTasks(countOfUncompletedTasks - 1);
    } else {
      setCountOfCompletedTasks(countOfCompletedTasks - 1);
      setCountOfUncompletedTasks(countOfUncompletedTasks + 1);
    }
  };

  return isEdit && !isDone ? (
    <div key={task.id} className="todoEdit">
      <input
        type="text"
        value={updateText}
        onChange={(e) => setUpdateText(e.target.value)}
      />
      <div className="save-cancel-buttons">
        <button onClick={saveEdit}>
          <img src={saveIcon} alt="" />
        </button>
        <button onClick={cancelEdit}>
          <img src={cancelIcon} alt="" />
        </button>
      </div>
    </div>
  ) : (
    <div key={task.id} className="todo">
      <div className="checkbox-taskText">
        <input
          type="checkbox"
          checked={task.isDone}
          onChange={handleCheckboxChange}
        />
        <p className={isDone ? "isDone" : ""}>{task.text}</p>
      </div>

      <div className="edit-delete-buttons">
        <button onClick={() => setIsEdit(!isEdit)} className="edit-icon">
          <img src={editIcon} alt="" />
        </button>
        <button
          onClick={() =>
            confirm(`Are you sure you want to delete ${task.text} task?`)
              ? deleteToDo(task.id)
              : ""
          }
        >
          <img src={deleteIcon} alt="" />
        </button>
      </div>
    </div>
  );
};

export default ToDoItem;
