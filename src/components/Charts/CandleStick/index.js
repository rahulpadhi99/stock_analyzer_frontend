import { useEffect, useState } from "react";
import "./candleStick.css";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";

// const countTrailingZeroes = (number) => {
//   const string = number.toString();
//   let count = 0;
//   let i = string.length - 1;
//   while (string[i] == 0) {
//     count++;
//     i--;
//   }
//   return count;
// };

const CandleStick = ({ data, allHighs, allLows }) => {
  const series = [{ data: data?.slice(Math.max(data.length - 60, 0)) }];

  // Create annotations for "H" and "L" labels
  const annotations = series[0]?.data?.map((dataPoint, index) => ({
    x: dataPoint.x.getTime(),
    y: allHighs?.includes(index)
      ? dataPoint.y[0]
      : allLows?.includes(index)
      ? dataPoint.y[2]
      : "",
    label: {
      borderColor: "none",
      style: {
        background: "transparent",
        fontWeight: "bold",
        fontSize: "12px",
      },
      cssClass: "annotation-label",
      text: allHighs?.includes(index)
        ? "H"
        : allLows?.includes(index)
        ? "L"
        : "",
      offsetY: allHighs?.includes(index)
        ? -6
        : allLows?.includes(index)
        ? 28
        : 0,
    },
  }));

  const options = {
    chart: {
      type: "candlestick",
      toolbar: {
        show: false, // Hide the download option and auto-select zoom
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        show: false, // Hide the x-axis labels
      },
    },
    // yaxis: {
    //   opposite: true,
    // },
    annotations: {
      points: annotations,
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: "#00ff00",
          downward: "#ff0000",
        },
      },
    },
    grid: {
      position: "front",
      yaxis: {
        lines: {
          show: true,
        },
      },
      xaxis: {
        lines: {
          show: true,
        },
      },
      borderColor: "#cccccc",
    },
  };

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="candlestick"
      height={300}
    />
  );
};

export default CandleStick;
