import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopButtons from "./components/TopButton";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureAndDetails from "./components/TemperetureAndDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/weatherServices";
import { useEffect, useState } from "react";

function App() {
  const [query, setQuery] = useState({ q: "bhopal" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : "current location";
      toast.info(`Fetching weather for ${message}`, {
        style: {
          color: "#3498db",
          background: "#1f2033",
          borderRadius: "1rem",
          fontWeight: "bold",
          backgroundImage: "linear-gradient(to right, #961c43, #611c7d)",
        },
      });

      await getFormattedWeatherData({ ...query, units }).then((data) => {
        toast.success(
          `Successfully fetched weather for ${data.name},${data.country} `,
          {
            style: {
              color: "#07bc0c",
              backgroundColor: "#1f2033",
              borderRadius: "1rem",
              fontWeight: "bold",
              backgroundImage: "linear-gradient(to right, #961c43, #611c7d)",
            },
          }
        );

        setWeather(data);
      });
    };
    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) {
      return "from-yellow-900 to-green-900";
    }
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) {
      return "from-green-900 to-orange-900";
    }
    return "from-red-600 to-purple-900";
  };

  return (
    <div
      className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br  h-fit shadow-xl shadow-gray-800 rounded-lg ${formatBackground()}`}>
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />
      {weather && (
        <div>
          <TimeAndLocation weather={weather} />
          <TemperatureAndDetails weather={weather} />
          <Forecast title="Hourly Forecast" items={weather.hourly} />
          <Forecast title="Daily Forecast" items={weather.daily} />
        </div>
      )}

      <ToastContainer
        autoClose={4000}
        theme="dark"
        position="top-right"
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={true}
        pauseOnHover
        style={{
          fontSize: "1rem",
        }}
      />
    </div>
  );
}

export default App;
