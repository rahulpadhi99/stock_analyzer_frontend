import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./displayChart.css";
import { WEEKLY_CONST } from "../../constant";
import { useSelector } from "react-redux";
import CandleStick from "../Charts/CandleStick";
import Volume from "../Charts/Volume";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";

const DisplayCharts = () => {
  const { selectedStocks } = useSelector((state) => state?.selectedStock);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [dailyChartData, setDailyChartData] = useState();
  const [weeklyChartData, setWeeklyChartData] = useState();
  const [monthlyChartData, setMonthlyChartData] = useState();

  const [dayHighs, setDayHighs] = useState([]);
  const [weekHighs, setWeekHighs] = useState([]);
  const [monthHighs, setMonthHighs] = useState([]);
  const [dayLows, setDayLows] = useState([]);
  const [weekLows, setWeekLows] = useState([]);
  const [monthLows, setMonthLows] = useState([]);

  const [dayUpArrow, setDayUpArrow] = useState([]);
  const [dayDownArrow, setDayDownArrow] = useState([]);
  const [weekUpArrow, setWeekUpArrow] = useState([]);
  const [weekDownArrow, setWeekDownArrow] = useState([]);
  const [monthUpArrow, setMonthUpArrow] = useState([]);
  const [monthDownArrow, setMonthDownArrow] = useState([]);

  const navigate = useNavigate();

  const getChartData = async (symbol, period, from, to) => {
    const result = await axios.get(
      `${process.env.REACT_APP_EODHD_BASE_URL}/eod/${symbol}.NSE?api_token=${process.env.REACT_APP_EODHD_API_KEY}&&fmt=json&&period=${period}&&from=${from}&&to=${to}`
    );
    // result?.data?.splice(0, result?.data?.length - 60);

    const candleStickData = result?.data?.map((e) => ({
      x: new Date(e?.date),
      y: [e?.open, e?.high, e?.low, e?.close],
    }));

    const volumeData = result?.data?.map((e) => ({
      x: new Date(e?.date),
      y: e?.volume,
      fillColor: e?.open > e?.close ? "#ff0000" : "#000000",
    }));

    const combinedData = { candleStickData, volumeData };
    return combinedData;
  };

  const previousBtnHandler = () => {
    if (currentIndex !== 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const nextBtnHandler = () => {
    if (currentIndex < selectedStocks?.length) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const getDailyChartData = (symbol, from, to) => {
    getChartData(symbol, "d", from, to).then((result) => {
      const { candleStickData, volumeData } = result;
      setDailyChartData(result);
      let i = 0;
      let j = 0;
      let k = 0;
      let highIndexs = [];
      let lowIndexs = [];
      while (i < candleStickData?.length) {
        if (
          candleStickData[i]?.y[1] > candleStickData[i + 1]?.y[1] &&
          candleStickData[i]?.y[1] > candleStickData[i + 2]?.y[1] &&
          candleStickData[i]?.y[1] > candleStickData[i + 3]?.y[1] &&
          candleStickData[i]?.y[1] > candleStickData[i + 4]?.y[1] &&
          candleStickData[i]?.y[1] > candleStickData[i + 5]?.y[1] &&
          candleStickData[i]?.y[1] > candleStickData[i + 6]?.y[1]
        ) {
          if (!dayHighs?.includes(i)) {
            highIndexs.push(i);
          }
          i = i + 6;
        } else {
          i++;
        }
      }
      while (k < highIndexs?.length) {
        for (let i = highIndexs[k] + 1; i < highIndexs[k + 1]; i++) {
          if (
            candleStickData?.[i]?.y[3] > candleStickData[highIndexs[k]]?.y[1]
          ) {
            if (!dayUpArrow?.includes(i)) {
              setDayUpArrow((prev) => [...prev, i]);
            }
            break;
          }
        }
        if (k === highIndexs?.length - 1) {
          let i = highIndexs[k];
          while (i < candleStickData?.length) {
            if (
              candleStickData?.[i]?.y[3] > candleStickData[highIndexs[k]]?.y[1]
            ) {
              if (!dayUpArrow?.includes(i)) {
                setDayUpArrow((prev) => [...prev, i]);
              }
              break;
            }
            i++;
          }
        }
        k++;
      }

      while (j < candleStickData?.length) {
        if (
          candleStickData[j]?.y[2] < candleStickData[j + 1]?.y[2] &&
          candleStickData[j]?.y[2] < candleStickData[j + 2]?.y[2] &&
          candleStickData[j]?.y[2] < candleStickData[j + 3]?.y[2] &&
          candleStickData[j]?.y[2] < candleStickData[j + 4]?.y[2] &&
          candleStickData[j]?.y[2] < candleStickData[j + 5]?.y[2] &&
          candleStickData[j]?.y[2] < candleStickData[j + 6]?.y[2]
        ) {
          if (!dayLows?.includes(j)) {
            lowIndexs.push(j);
          }
          j = j + 6;
        } else {
          j++;
        }
      }
      setDayHighs(highIndexs);
      setDayLows(lowIndexs);
    });
  };
  const getWeeklyChartData = (symbol, from, to) => {
    getChartData(symbol, "w", from, to).then((result) => {
      const { candleStickData, volumeData } = result;
      setWeeklyChartData(result);
      let i = 0;
      let j = 0;
      let k = 0;
      let highIndexs = [];
      let lowIndexs = [];
      while (i < candleStickData?.length) {
        if (
          candleStickData[i]?.y[1] > candleStickData[i + 1]?.y[1] &&
          candleStickData[i]?.y[1] > candleStickData[i + 2]?.y[1] &&
          candleStickData[i]?.y[1] > candleStickData[i + 3]?.y[1] &&
          candleStickData[i]?.y[1] > candleStickData[i + 4]?.y[1] &&
          candleStickData[i]?.y[1] > candleStickData[i + 5]?.y[1] &&
          candleStickData[i]?.y[1] > candleStickData[i + 6]?.y[1]
        ) {
          if (!weekHighs?.includes(i)) {
            highIndexs.push(i);
          }
          i = i + 6;
        } else {
          i++;
        }
      }
      while (k < highIndexs?.length) {
        for (let i = highIndexs[k] + 1; i < highIndexs[k + 1]; i++) {
          if (
            candleStickData?.[i]?.y[3] > candleStickData[highIndexs[k]]?.y[1]
          ) {
            if (!weekUpArrow?.includes(i)) {
              setWeekUpArrow((prev) => [...prev, i]);
            }
            break;
          }
        }
        if (k === highIndexs?.length - 1) {
          let i = highIndexs[k];
          while (i < candleStickData?.length) {
            if (
              candleStickData?.[i]?.y[3] > candleStickData[highIndexs[k]]?.y[1]
            ) {
              if (!weekUpArrow?.includes(i)) {
                setWeekUpArrow((prev) => [...prev, i]);
              }
              break;
            }
            i++;
          }
        }
        k++;
      }

      while (j < candleStickData?.length) {
        if (
          candleStickData[j]?.y[2] < candleStickData[j + 1]?.y[2] &&
          candleStickData[j]?.y[2] < candleStickData[j + 2]?.y[2] &&
          candleStickData[j]?.y[2] < candleStickData[j + 3]?.y[2] &&
          candleStickData[j]?.y[2] < candleStickData[j + 4]?.y[2] &&
          candleStickData[j]?.y[2] < candleStickData[j + 5]?.y[2] &&
          candleStickData[j]?.y[2] < candleStickData[j + 6]?.y[2]
        ) {
          if (!weekLows?.includes(j)) {
            lowIndexs.push(j);
          }
          j = j + 6;
        } else {
          j++;
        }
      }
      setWeekHighs(highIndexs);
      setWeekLows(lowIndexs);
    });
  };
  const getMonthlyChartData = (symbol, from, to) => {
    getChartData(symbol, "m", from, to)
      .then((result) => {
        const { candleStickData, volumeData } = result;
        setMonthlyChartData(result);
        let i = 0;
        let j = 0;
        let k = 0;
        let highIndexs = [];
        let lowIndexs = [];
        while (i < candleStickData?.length) {
          if (
            candleStickData[i]?.y[1] > candleStickData[i + 1]?.y[1] &&
            candleStickData[i]?.y[1] > candleStickData[i + 2]?.y[1] &&
            candleStickData[i]?.y[1] > candleStickData[i + 3]?.y[1] &&
            candleStickData[i]?.y[1] > candleStickData[i + 4]?.y[1] &&
            candleStickData[i]?.y[1] > candleStickData[i + 5]?.y[1] &&
            candleStickData[i]?.y[1] > candleStickData[i + 6]?.y[1]
          ) {
            if (!monthHighs?.includes(i)) {
              highIndexs.push(i);
            }
            i = i + 6;
          } else {
            i++;
          }
        }
        while (k < highIndexs?.length) {
          for (let i = highIndexs[k] + 1; i < highIndexs[k + 1]; i++) {
            if (
              candleStickData?.[i]?.y[3] > candleStickData[highIndexs[k]]?.y[1]
            ) {
              if (!monthUpArrow?.includes(i)) {
                setMonthUpArrow((prev) => [...prev, i]);
              }
              break;
            }
          }
          if (k === highIndexs?.length - 1) {
            let i = highIndexs[k];
            while (i < candleStickData?.length) {
              if (
                candleStickData?.[i]?.y[3] >
                candleStickData[highIndexs[k]]?.y[1]
              ) {
                if (!monthUpArrow?.includes(i)) {
                  setMonthUpArrow((prev) => [...prev, i]);
                }
                break;
              }
              i++;
            }
          }
          k++;
        }

        while (j < candleStickData?.length) {
          if (
            candleStickData[j]?.y[2] < candleStickData[j + 1]?.y[2] &&
            candleStickData[j]?.y[2] < candleStickData[j + 2]?.y[2] &&
            candleStickData[j]?.y[2] < candleStickData[j + 3]?.y[2] &&
            candleStickData[j]?.y[2] < candleStickData[j + 4]?.y[2] &&
            candleStickData[j]?.y[2] < candleStickData[j + 5]?.y[2] &&
            candleStickData[j]?.y[2] < candleStickData[j + 6]?.y[2]
          ) {
            if (!monthLows?.includes(j)) {
              lowIndexs.push(j);
            }
            j = j + 6;
          } else {
            j++;
          }
        }
        setMonthHighs(highIndexs);
        setMonthLows(lowIndexs);
      })
      .catch((err) => console.log("new err", err));
  };

  useEffect(() => {
    if (selectedStocks?.length) {
      const weeklyPeriod = {
        startDate: moment().subtract(3, "years").format("YYYY-MM-DD"),
        lastDate: moment().subtract(1, "days").format("YYYY-MM-DD"),
      };
      const dailyPeriod = {
        startDate: moment().subtract(3, "years").format("YYYY-MM-DD"),
        lastDate: moment().subtract(1, "days").format("YYYY-MM-DD"),
      };
      const monthlyPeriod = {
        startDate: moment().subtract(5, "years").format("YYYY-MM-DD"),
        lastDate: moment().subtract(1, "days").format("YYYY-MM-DD"),
      };
      getDailyChartData(
        selectedStocks[currentIndex]?.Code,
        dailyPeriod?.startDate,
        dailyPeriod?.lastDate
      );
      getWeeklyChartData(
        selectedStocks[currentIndex]?.Code,
        weeklyPeriod?.startDate,
        weeklyPeriod?.lastDate
      );
      getMonthlyChartData(
        selectedStocks[currentIndex]?.Code,
        monthlyPeriod?.startDate,
        monthlyPeriod?.lastDate
      );
    } else {
      navigate(-1);
    }
  }, [currentIndex]);

  return (
    <Box>
      <Box className="display-container">
        <Box className="chart-container-1">
          <Box className="chart-1">
            {dailyChartData?.candleStickData && (
              <CandleStick
                data={dailyChartData?.candleStickData}
                allHighs={dayHighs}
                allLows={dayLows}
              />
            )}
            {dailyChartData?.volumeData && (
              <Volume data={dailyChartData?.volumeData} />
            )}
          </Box>
          <Box className="chart-2">
            {monthlyChartData?.candleStickData && (
              <CandleStick
                data={monthlyChartData?.candleStickData}
                allHighs={monthHighs}
                allLows={monthLows}
              />
            )}
            {monthlyChartData?.volumeData && (
              <Volume data={monthlyChartData?.volumeData} />
            )}
          </Box>
        </Box>
        <Box className="chart-container-2">
          <Box className="chart-3">
            {weeklyChartData?.candleStickData && (
              <CandleStick
                data={weeklyChartData?.candleStickData}
                allHighs={weekHighs}
                allLows={weekLows}
              />
            )}
            {weeklyChartData?.volumeData && (
              <Volume data={weeklyChartData?.volumeData} />
            )}
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
