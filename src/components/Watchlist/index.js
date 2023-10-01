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

const SYMBOL_OPTIONS = [
  { label: "RIL", value: "RIL" },
  { label: "ADI", value: "ADI" },
];

const userId = localStorage.getItem("loggedUserID");

const Watchlist = () => {
  const [addedWatchlist, setAddedWatchlist] = useState("");
  const [allWatchlist, setAllWatchlist] = useState([]);
  const [selectedWatchlist, setSelectedWatchlist] = useState({
    label: "",
    value: "",
  });
  const [selectedSymbol, setSelectedSymbol] = useState({
    label: "",
    value: "",
  });
  const [allSymbols, setAllSymbols] = useState([]);
  const [checked, setChecked] = useState([]);
  const [note, setNote] = useState("");

  const getAllWatchlist = async () => {
    const response = await axios.get(
      `http://localhost:8000/watchlist?userId=${userId}`
    );
    setAllWatchlist(response?.data);
    return response;
  };

  const deleteWatchlist = async (watchlistId) => {};

  const handleWatchlistSelectChange = (event, value) => {
    setSelectedWatchlist(value);
    setAllSymbols(
      allWatchlist?.find((watchlist) => watchlist?._id === value?.value)
        ?.symbols
    );
  };

  const handleSymbolSelectHandler = (event, value) => {
    setSelectedSymbol(value);
  };

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
      setAddedWatchlist({
        label: "",
        value: "",
      });
      getAllWatchlist();
    }
  };

  const deleteWatchlistHandler = async () => {
    const response = await axios.delete(
      `http://localhost:8000/watchlist?watchlistId=${selectedWatchlist?.value}`
    );
    console.log(response);
    if (response) {
      setSelectedWatchlist({ label: "", value: "" });
      getAllWatchlist();
    }
  };

  const addSymbolHandler = async () => {
    if (selectedSymbol?.value?.length && selectedWatchlist?.value?.length) {
      const response = await axios.post(
        `http://localhost:8000/symbols/add-symbols`,
        {
          userId: userId,
          watchlistId: selectedWatchlist?.value,
          symbols: {
            name: selectedSymbol?.value,
            note: "",
          },
        }
      );
      if (response) {
        setSelectedSymbol({
          label: "",
          value: "",
        });
        const result = await getAllWatchlist();
        setAllSymbols(
          result?.data?.find(
            (watchlist) => watchlist?._id === selectedWatchlist?.value
          )?.symbols
        );
      }
    } else {
      console.log("Missing watchlist or symbol");
    }
  };

  const checkHandler = (symbolId) => {
    if (checked?.includes(symbolId)) {
      const filteredData = checked?.filter((e) => e !== symbolId);
      setChecked(filteredData);
    } else {
      setChecked((prev) => [...prev, symbolId]);
    }
  };
  const checkAllHandler = () => {
    if (checked?.length) {
      setChecked([]);
    } else {
      setChecked(allSymbols?.map((e) => e?._id));
    }
  };
  const removeSymbolHandler = async () => {
    if (checked?.length) {
      try {
        const response = await axios.put(`http://localhost:8000/symbols`, {
          userId: userId,
          watchlistId: selectedWatchlist?.value,
          symbolsIds: checked,
        });
        if (response) {
          const result = await getAllWatchlist();
          setAllSymbols(
            result?.data?.find(
              (watchlist) => watchlist?._id === selectedWatchlist?.value
            )?.symbols
          );
          setChecked([]);
        }
      } catch (err) {
        console.log(err);
      }
    }
    console.log("removed Symbol");
  };
  const displayChartsHandler = () => {
    console.log("chart displayed");
  };

  const updateNotesHandler = async (symbolId) => {
    if (symbolId) {
      try {
        const response = await axios.put(
          `http://localhost:8000/symbols/notes`,
          {
            userId: userId,
            watchlistId: selectedWatchlist?.value,
            symbolId: symbolId,
            note: note,
          }
        );
        if (response) {
          const result = await getAllWatchlist();
          setAllSymbols(
            result?.data?.find(
              (watchlist) => watchlist?._id === selectedWatchlist?.value
            )?.symbols
          );
          setChecked([]);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const notesChangeHandler = (event) => {
    setNote(event.target.value);
  };

  useEffect(() => {
    getAllWatchlist();
  }, []);

  console.log("checked", checked);

  return (
    <Box className="watchlist-container">
      <Box className="action-container">
        <Box className="container">
          <FormControl fullWidth className="select-container">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={allWatchlist?.map((list) => ({
                label: list?.name,
                value: list?._id,
              }))}
              value={selectedWatchlist?.label}
              renderInput={(params) => <TextField {...params} label="Movie" />}
              onChange={handleWatchlistSelectChange}
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
            options={SYMBOL_OPTIONS}
            value={selectedSymbol?.label}
            sx={{ height: 45 }}
            renderInput={(params) => <TextField {...params} label="Movie" />}
            onChange={handleSymbolSelectHandler}
          />
          <Box className="button-container">
            <Button className="add-symbol-button" onClick={addSymbolHandler}>
              Add Symbol
            </Button>
            <Button
              className="delete-watchlist-button"
              onClick={deleteWatchlistHandler}
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
            Remove Symbols
          </Button>
          <Button
            className="display-charts-button"
            onClick={displayChartsHandler}
          >
            Display Charts
          </Button>
        </Box>
        <Box className="table-container">
          <Box className="head">
            <Box className="head-1">
              <Checkbox onClick={checkAllHandler} />
            </Box>
            <Box className="head-2">Symbol</Box>
            <Box className="head-3">Notes</Box>
            <Box className="head-4"></Box>
          </Box>
          <Divider />
          <Box className="content">
            {allSymbols?.map((symbol) => {
              return (
                <Box key={symbol?._id}>
                  <Box className="content-data">
                    <Box className="content-1">
                      <Checkbox
                        onClick={() => checkHandler(symbol?._id)}
                        checked={checked?.includes(symbol?._id)}
                      />
                    </Box>
                    <Box className="content-2">{symbol?.name}</Box>
                    <Box className="content-3">
                      <TextField
                        fullWidth
                        type="text"
                        placeholder="Notes"
                        defaultValue={symbol?.note}
                        className="add-notes-input"
                        onChange={notesChangeHandler}
                        variant="standard"
                      />
                    </Box>
                    <Box className="content-4">
                      <Button
                        className="update-notes-button"
                        onClick={() => updateNotesHandler(symbol?._id)}
                      >
                        Update Notes
                      </Button>
                    </Box>
                  </Box>
                  <Divider />
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default Watchlist;
