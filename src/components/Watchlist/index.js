import { useState } from "react";
import "./watchlist.css";

const Watchlist = () => {
  const [selectedOption, setSelectedOption] = useState("option1"); // Initial selected option

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const inputChangeHandler = (e) => {
    console.log(e.target.value);
  };
  const saveWatchlistHandler = () => {
    console.log("watchlist saved");
  };
  return (
    <div className="watchlist-container">
      <div className="container ">
        <div className="select-container">
          <select
            value={selectedOption}
            className="select"
            onChange={handleSelectChange}
          >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
        <div className="add-watchlist-container">
          <div className="watchlist-input-container">
            <h5>Add new Watchlist</h5>
            <input
              type="text"
              placeholder="Add Watchlist"
              className="watchlist-input"
              onChange={inputChangeHandler}
            />
            <button onClick={saveWatchlistHandler} className="save-button">
              Save
            </button>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="add-symbol-container">
          <input
            type="text"
            placeholder="Add Watchlist"
            className="watchlist-input"
            onChange={inputChangeHandler}
          />
          <button className="add-symbol-button">Add Symbol</button>
        </div>
        <button className="delete-wathclist-button">Delete Watchlist</button>
      </div>
    </div>
  );
};
export default Watchlist;
