import React, { useState } from "react";
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Inputs({ setQuery, units, setUnits }) {
  const [city, setCity] = useState("");

  const handleUnitsChange = (e) => {
    const selectedUnits = e.currentTarget.name;
    if (units !== selectedUnits) {
      setUnits(selectedUnits);
    }
  };

  const handleSearchClick = () => {
    if (city !== "") {
      setQuery({ q: city });
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      toast.info("Fetching current location", {
        style: {
          color: "#3498db",
          background: "#1f2033",
          borderRadius: "1rem",
          fontWeight: "bold",
          backgroundImage: "linear-gradient(to right, #961c43, #611c7d)",
        },
      });
      navigator.geolocation.getCurrentPosition((position) => {
        setQuery({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        toast.success("Successfully fetched current location", {
          style: {
            color: "#07bc0c",
            background: "#1f2033",
            borderRadius: "1rem",
            fontWeight: "bold",
            backgroundImage: "linear-gradient(to right, #961c43, #611c7d)",
          },
        });
      });
    }
  };

  return (
    <>
      <div className="flex flex-row justify-center my-6">
        <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            type="text"
            placeholder="Search for a city"
            className="text-xl p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase"
            onKeyDown={(e) => {
              setCity(e.target.value);
              if (e.key === "Enter") handleSearchClick();
            }}
          />
          <UilSearch
            size={25}
            className="text-white cursor-pointer transition ease-out hover:scale-125"
            onClick={handleSearchClick}
          />
          <UilLocationPoint
            size={25}
            className="text-white cursor-pointer transition ease-out hover:scale-125"
            onClick={handleLocationClick}
          />
        </div>
        <div className="flex flex-row w-1/4 items-center justify-center  font-light">
          <button
            name="metric"
            className="text-xl text-white transition ease-out hover:scale-125"
            onClick={handleUnitsChange}>
            {/* Alt + 0176 == ° */}
            °C
          </button>
          <p className="text-xl text-white mx-1">|</p>
          <button
            name="imperial"
            onClick={handleUnitsChange}
            className="text-xl text-white transition ease-out hover:scale-125">
            {/* Alt + 0176 == ° */}
            °F
          </button>
        </div>
      </div>
    </>
  );
}

export default Inputs;
