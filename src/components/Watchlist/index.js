import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
import { NSE_CONSTANT } from "../../constant";
import { useDispatch } from "react-redux";
import { addStock } from "../../store/SelectedStock";

const userId = localStorage.getItem("loggedUserID");

const Watchlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [addedWatchlist, setAddedWatchlist] = useState("");
  const [allWatchlist, setAllWatchlist] = useState([]);
  const [allSymbollist, setAllSymbollist] = useState([]);
  const [selectedWatchlist, setSelectedWatchlist] = useState({
    label: "",
    value: "",
  });
  const [selectedSymbol, setSelectedSymbol] = useState([]);
  const [allSymbols, setAllSymbols] = useState([]);
  const [checked, setChecked] = useState([]);
  const [note, setNote] = useState("");
  const [initalFetch, setInitialFetch] = useState(false);

  const getAllWatchlist = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/watchlist?userId=${userId}`
    );
    setAllWatchlist(response?.data);
    return response;
  };

  const getAllSymbollist = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_EODHD_BASE_URL}/exchange-symbol-list/NSE?api_token=${process.env.REACT_APP_EODHD_API_KEY}&&fmt=json`
      );
      setAllSymbollist(response?.data);
    } catch (error) {
      console.log("error", error);
    }
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
    setSelectedSymbol(value?.map((e) => e?.split("-")[0].trim()));
  };

  const inputChangeHandler = (e) => {
    setAddedWatchlist(e.target.value);
  };

  const saveWatchlistHandler = async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/watchlist/add-watchlist`,
      {
        name: addedWatchlist,
        userId: userId,
      }
    );
    if (response) {
      setAddedWatchlist("");
      getAllWatchlist();
    }
  };

  const deleteWatchlistHandler = async () => {
    const response = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/watchlist?watchlistId=${selectedWatchlist?.value}`
    );
    if (response) {
      setSelectedWatchlist({ label: "", value: "" });
      getAllWatchlist();
    }
  };

  const addSymbolHandler = async () => {
    if (selectedSymbol?.length && selectedWatchlist?.value?.length) {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/symbols/add-symbols`,
        {
          userId: userId,
          watchlistId: selectedWatchlist?.value,
          symbols: allSymbollist
            ?.filter((e) => {
              return selectedSymbol?.includes(e?.Code) && e;
            })
            ?.map((e) => ({ ...e, notes: "" })),
        }
      );
      if (response) {
        setSelectedSymbol([]);
        const result = await getAllWatchlist();
        setAllSymbols(
          result?.data?.find(
            (watchlist) => watchlist?._id === selectedWatchlist?.value
          )?.symbols
        );
      }
    } else {
    }
  };

  const checkHandler = (symbolId) => {
    if (checked?.includes(symbolId)) {
      const filteredId = checked?.filter((e) => e !== symbolId);
      setChecked(filteredId);
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
        const response = await axios.put(
          `${process.env.REACT_APP_BASE_URL}/symbols`,
          {
            userId: userId,
            watchlistId: selectedWatchlist?.value,
            symbolsIds: checked,
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
      } catch (err) {}
    }
  };

  const displayChartsHandler = () => {
    const selectedStocks = allSymbols?.filter((symbol) =>
      checked?.includes(symbol?._id)
    );
    dispatch(addStock(selectedStocks));
    navigate("/display-charts");
  };

  const updateNotesHandler = async (symbolId) => {
    if (symbolId) {
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_BASE_URL}/symbols/notes`,
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
      } catch (err) {}
    }
  };

  const notesChangeHandler = (event) => {
    setNote(event.target.value);
  };

  useEffect(() => {
    getAllWatchlist();
    getAllSymbollist();
  }, []);

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
              renderInput={(params) => (
                <TextField {...params} label="Watchlist" />
              )}
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
            options={allSymbollist?.map((e) => `${e?.Code} - ${e?.Name}`)}
            value={selectedSymbol}
            sx={{ height: 45 }}
            renderInput={(params) => <TextField {...params} label="Symbols" />}
            multiple
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
              <Checkbox
                onClick={checkAllHandler}
                checked={
                  checked.length && checked?.length === allSymbols?.length
                }
              />
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
                    <Box className="content-2">{symbol?.Code}</Box>
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
