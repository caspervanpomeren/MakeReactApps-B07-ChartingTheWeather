import React, { useState } from "react";
import GeoForm from "./components/GeoForm";
import WeatherChart from "./components/WeatherChart";
import "./App.css";

export default function App() {
  const [latLng, setLatLng] = useState(null);
  // 1. Have a form, type in a city
  // 2. Hit the google maps geocoding api, convert city to lat + long
  // 3. pass lat + long to the weather api, get weather data
  // 4. Format it for our chart
  // 5. Display chart

  return (
    <div className="app">
      {/* form goes here */}
      {/* All thing with address +  lat + long go into a component */}
      <GeoForm setLatLng={setLatLng} />

      {/* chart goes here */}
      {/* All things that deal with weather api and formatting/displaying weather data go into a  component */}
      {latLng && <WeatherChart latLng={latLng} />}
    </div>
  );
}
