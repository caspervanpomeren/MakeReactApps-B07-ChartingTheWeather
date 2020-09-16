import React, { useCallback, useEffect, useState } from "react";

const key = process.env.REACT_APP_OPENCAGEDATA_KEY;

export default function GeoForm({ setLatLng }) {
  const [location, setLocation] = useState("Las Vegas");

  const getLatLng = useCallback((locationValue) => {
    const encodedLocation = encodeURIComponent(locationValue);
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodedLocation}&key=${key}&language=en&pretty=1&limit=1&no_annotations=1`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const { lat, lng } = data.results[0].geometry;
        setLatLng({
          lat,
          lng,
        });
      });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getLatLng(location);
    // eslint-disable-next-line
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    getLatLng(location);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
    </form>
  );
}
