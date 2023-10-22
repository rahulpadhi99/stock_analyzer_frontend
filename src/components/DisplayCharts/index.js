import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./displayChart.css";
import { WEEKLY_CONST } from "../../constant";
import { useSelector } from "react-redux";
import CandleStick from "../Charts/CandleStick";
import Volume from "../Charts/Volume";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const candlestickData = WEEKLY_CONST?.map((e) => ({
  x: new Date(e?.date),
  y: [e?.open, e?.high, e?.low, e?.close],
}));

const volumeChartData = WEEKLY_CONST?.map((e) => ({
  x: new Date(e?.date),
  y: e?.volume,
}));

const DisplayCharts = () => {
  const { selectedStocks } = useSelector((state) => state?.selectedStock);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const getChartData = async (symbol, period) => {
    const result = await axios.get(
      `${process.env.REACT_APP_EODHD_BASE_URL}/eod/${symbol}.NSE?api_token=${process.env.REACT_APP_EODHD_API_KEY}&&fmt=json&&period=${period}`
    );
  };

  const previousBtnHandler = () => {
    if (currentIndex) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const nextBtnHandler = () => {
    if (currentIndex) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (selectedStocks?.length) {
      getChartData(selectedStocks[currentIndex]?.Code, "w");
    } else {
      navigate(-1);
    }
  }, [currentIndex]);

  return (
    <Box>
      <Box className="display-container">
        <Box className="chart-container-1">
          <Box className="chart-1">
            <CandleStick data={candlestickData} />
            <Volume data={volumeChartData} />
          </Box>
          <Box className="chart-2">
            <CandleStick data={candlestickData} />
            <Volume data={volumeChartData} />
          </Box>
        </Box>
        <Box className="chart-container-2">
          <Box className="chart-3">
            <CandleStick data={candlestickData} />
            <Volume data={volumeChartData} />
          </Box>
          <Box className="chart-4">
            <Box className="cube-container"></Box>
            <Box className="watchlist-control">
              <Typography textAlign="center" mt="10px">
                WATCHLIST CONTROL
              </Typography>
              <Box className="control-container">
                <Box className="previous-symbol" onClick={previousBtnHandler}>
                  <Typography className="status-text">Previous</Typography>
                  <Typography className="symbol-text">
                    {selectedStocks[currentIndex - 1]?.Code}
                  </Typography>
                </Box>
                <Box className="current-symbol">
                  <Typography className="status-text">Current</Typography>
                  <Typography className="symbol-text">
                    {selectedStocks[currentIndex]?.Code}
                  </Typography>
                </Box>
                <Box className="next-symbol" onClick={nextBtnHandler}>
                  <Typography className="status-text">Next</Typography>
                  <Typography className="symbol-text">
                    {" "}
                    {selectedStocks[currentIndex + 1]?.Code}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default DisplayCharts;
