import { useEffect, useState } from "react";
import "./ToDoFilter.css";

const ToDoFilter = ({ list, setUpdatedList, setIsFiltered }) => {
  const [selectValue, setSelectValue] = useState("all");
  const [searchText, setSearchText] = useState("");

  const handleSearchInput = (e) => {
    setSearchText(e.target.value);
  };

  const handleChangeSelect = (e) => {
    setSelectValue(e.target.value);
  };

  const completedTasks = () => {
    let newList = list.filter((task) => task.isDone);
    setUpdatedList(newList);
    setIsFiltered(true);
  };

  const notCompletedTasks = () => {
    let newList = list.filter((task) => !task.isDone);
    setUpdatedList(newList);
    setIsFiltered(true);
  };

  const getSearchedTasks = () => {
    let newList = list.filter((task) =>
      task.text.toLowerCase().includes(searchText.toLowerCase())
    );
    setUpdatedList(newList);
    setIsFiltered(true);
  };

  useEffect(() => {
    if (selectValue === "completed") {
      completedTasks();
    } else if (selectValue === "notCompleted") {
      notCompletedTasks();
    } else if (searchText.length !== 0) {
      getSearchedTasks();
    } else {
      setIsFiltered(false);
    }
  }, [selectValue, searchText]);

  return (
    <div className="filterFields">
      <div className="select-container">
        <select onChange={handleChangeSelect}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="notCompleted">Not Completed</option>
        </select>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="search tasks"
          value={searchText}
          onChange={handleSearchInput}
        />
      </div>
    </div>
  );
};

export default ToDoFilter;
