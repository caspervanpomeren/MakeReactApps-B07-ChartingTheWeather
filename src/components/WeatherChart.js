import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const labels = [...Array(8)].map((_, i) => {
  const date = new Date();
  date.setDate(date.getDate() + (i > 6 ? i - 7 : i));
  return days[date.getDay()];
});

const options = {
  tooltips: { mode: "index", intersect: false },
  scales: {
    xAxes: [
      {
        gridLines: false,
        ticks: { fontColor: "white", fontSize: 10, padding: 20 },
      },
    ],
    yAxes: [
      {
        gridLines: false,
        ticks: { fontColor: "white", fontSize: 10, padding: 20 },
      },
    ],
  },
  legend: {
    display: false,
  },
};

const appId = process.env.REACT_APP_OPENWEATHERAPP_APP_ID;
const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?&exclude=hourly,minutely&units=metric&appid=${appId}`;

export default function WeatherChart({ latLng }) {
  const [datasets, setDatasets] = useState([]);

  useEffect(() => {
    getWeatherData();

    function getWeatherData() {
      const { lat, lng } = latLng;
      const url = `${apiUrl}&lat=${lat}&lon=${lng}`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const formattedData = formatWeatherData(data);
          setDatasets(formattedData);
        });
    }

    function formatWeatherData(data) {
      return [
        {
          label: "Highs",
          backgroundColor: "#EC9CAC",
          borderColor: "#EC9CAC",
          data: data.daily.map((day) => day.temp.max),
        },
        {
          label: "Lows",
          backgroundColor: "#9CCAF6",
          borderColor: "#9CCAF6",
          data: data.daily.map((day) => day.temp.min),
        },
      ];
    }
  }, [latLng]);

  // async function alternative to curent getWeatherData()
  // async function getWeatherData() {
  //   const { lat, lng } = latLng;
  //   const url = `${apiUrl}&lat=${lat}&lon=${lng}`;

  //   const res = await fetch(url);
  //   const data = await res.json();
  //   console.log(data)
  // }

  return (
    <div className="chart">
      <Bar data={{ labels, datasets }} options={options} />
    </div>
  );
}
