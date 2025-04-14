import "./ToDoInput.css";
import addPhoto from "../../Images/add.png";

const ToDoInput = ({
  inputText,
  setInputText,
  addToDo,
  countOfUncompletedTasks,
  setCountOfUncompletedTasks,
}) => {
  const handleInput = (e) => {
    setInputText(e.target.value);
  };

  const uncompletedTasks = () => {
    setCountOfUncompletedTasks(countOfUncompletedTasks + 1);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault(), addToDo(), uncompletedTasks();
      }}
      className="to-do-input-form"
    >
      <input
        type="text"
        value={inputText}
        onChange={handleInput}
        placeholder="Add a task"
        className="task-input"
      />
      <button type="submit" className="add-btn">
        <img src={addPhoto} alt="" />
      </button>
    </form>
  );
};

export default ToDoInput;
