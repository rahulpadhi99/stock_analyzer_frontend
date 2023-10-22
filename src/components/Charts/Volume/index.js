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
      borderColor: "#cccccc",
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
