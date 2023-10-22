import ReactApexChart from "react-apexcharts";

const CandleStick = ({ data }) => {
  // Sample data for the candlestick chart
  const series = [
    {
      data: data,
    },
  ];

  // Create annotations for "H" and "L" labels
  const annotations = series[0].data.map((dataPoint, index) => ({
    x: dataPoint.x.getTime(),
    y: index % 2 === 0 ? dataPoint.y[2] : dataPoint.y[0],
    label: {
      borderColor: "none",
      style: {
        background: "transparent",
      },
      text: index % 2 === 0 ? "L" : "H",
      offsetY: index % 2 === 0 ? 25 : -25,
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
      points: annotations, // Add the annotations here
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
