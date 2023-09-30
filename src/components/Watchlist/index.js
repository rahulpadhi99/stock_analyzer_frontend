import { useEffect, useState } from "react";
import "./watchlist.css";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";

const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
];

const userId = localStorage.getItem("loggedUserID");

const Watchlist = () => {
  const [addedWatchlist, setAddedWatchlist] = useState("");
  const [allWatchlist, setAllWatchlist] = useState([]);

  const getAllWatchlist = async () => {
    const response = await axios.get(
      `http://localhost:8000/watchlist?userId=${userId}`
    );
    const allWatchlist = response?.data;
    setAllWatchlist(
      allWatchlist?.map((list) => ({ label: list?.name, value: list?._id }))
    );
  };

  const handleSelectChange = (e) => {};

  const inputChangeHandler = (e) => {
    setAddedWatchlist(e.target.value);
  };
  const saveWatchlistHandler = async () => {
    const response = await axios.post(
      "http://localhost:8000/watchlist/add-watchlist",
      {
        name: addedWatchlist,
        userId: userId,
      }
    );
    if (response) {
      getAllWatchlist();
    }
  };
  const addSymbolHandler = () => {
    console.log("added symbol");
  };
  const deletelistHandler = () => {
    console.log("deleted watchlist");
  };
  const checkHandler = () => {
    console.log("checked");
  };
  const checkAllHandler = () => {
    console.log("checked all");
  };
  const removeSymbolHandler = () => {
    console.log("removed Symbol");
  };
  const displayChartsHandler = () => {
    console.log("chart displayed");
  };
  const updateNotesHandler = () => {
    console.log("notes updated");
  };

  useEffect(() => {
    getAllWatchlist();
  }, []);

  console.log("watchlist", allWatchlist);
  return (
    <Box className="watchlist-container">
      <Box className="action-container">
        <Box className="container">
          <FormControl fullWidth className="select-container">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={allWatchlist}
              renderInput={(params) => <TextField {...params} label="Movie" />}
            />
          </FormControl>
          <Box className="add-watchlist-container">
            <Box className="watchlist-input-container">
              <Typography variant="h7">Add new Watchlist</Typography>
              <TextField
                type="text"
                placeholder="Add Watchlist"
                value={addedWatchlist}
                className="add-watchlist-input"
                onChange={inputChangeHandler}
              />
            </Box>
            <Button onClick={saveWatchlistHandler} className="save-button">
              Save
            </Button>
          </Box>
        </Box>
        <Box className="container">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={top100Films}
            sx={{ height: 45 }}
            renderInput={(params) => <TextField {...params} label="Movie" />}
          />
          <Box className="button-container">
            <Button className="add-symbol-button" onClick={addSymbolHandler}>
              Add Symbol
            </Button>
            <Button
              className="delete-watchlist-button"
              onClick={deletelistHandler}
            >
              Delete Watchlist
            </Button>
          </Box>
        </Box>
      </Box>
      <Box className="watchlist-table">
        <Box className="action-buttons">
          <Button
            className="remove-watchlist-button"
            onClick={removeSymbolHandler}
          >
            Remove Watchlist
          </Button>
          <Button
            className="display-charts-button"
            onClick={displayChartsHandler}
          >
            Display Charts
          </Button>
          <Button className="update-notes-button" onClick={updateNotesHandler}>
            Update Notes
          </Button>
        </Box>
        <Box className="table-container">
          <Box className="head">
            <Box className="head-1">
              <Checkbox onClick={checkAllHandler} />
            </Box>
            <Box className="head-2">Symbol</Box>
            <Box className="head-3">Notes</Box>
          </Box>
          <Divider />
          <Box className="content">
            {[1, 2, 3, 4, 5]?.map((e) => {
              return (
                <>
                  <Box className="content-data">
                    <Box className="content-1">
                      <Checkbox onClick={() => checkHandler()} />
                    </Box>
                    <Box className="content-2">RIL</Box>
                    <Box className="content-3">A good stock to add</Box>
                  </Box>
                  <Divider />
                </>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default Watchlist;
