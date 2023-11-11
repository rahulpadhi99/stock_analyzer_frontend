import ReactApexChart from "react-apexcharts";

const Volume = ({ data }) => {
  const series = [
    {
      data: data,
    },
  ];

  const options = {
    chart: {
      type: "bar",
      toolbar: {
        show: false, // Hide the download option and auto-select zoom
      },
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          const decimal =
            value.toString()?.length >= 6
              ? 1000000
              : value.toString()?.length >= 3
              ? 1000
              : 1;
          const newValue = value / decimal;
          return `${newValue?.toFixed(1)}${
            decimal === 1000 ? "K" : decimal === 1000000 ? "M" : ""
          }`;
        },
      },
    },
    dataLabels: {
      enabled: false, // Hide data labels for the volume chart
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
    },
  };

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="bar"
      height={150}
      className="apex-volume"
    />
  );
};

export default Volume;
