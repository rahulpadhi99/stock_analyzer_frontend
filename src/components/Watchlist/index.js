import { useState } from "react";
import "./watchlist.css";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
];

const columns = [
  { field: "symbol", headerName: "Symbol", width: 200 },
  { field: "notes", headerName: "Notes", width: 800 },
];

const rows = [
  { id: 1, symbol: "Snow", notes: "Jon" },
  { id: 2, symbol: "Lannister", notes: "Cersei" },
  { id: 3, symbol: "Lannister", notes: "Jaime" },
];

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

  return (
    <Box className="watchlist-container">
      <Box className="action-container">
        <Box className="container">
          <FormControl fullWidth className="select-container">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={top100Films}
              renderInput={(params) => <TextField {...params} label="Movie" />}
            />
          </FormControl>
          <Box className="add-watchlist-container">
            <Box className="watchlist-input-container">
              <Typography variant="h7">Add new Watchlist</Typography>
              <TextField
                type="text"
                placeholder="Add Watchlist"
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
