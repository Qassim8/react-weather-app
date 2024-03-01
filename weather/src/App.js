import axios from "axios";
import { useState } from "react";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=252bc002b7da486d49d1a13d9a985adc`;

  const searchLocation = (e) => {
    if (e.key === "Enter") {
      axios
        .get(url)
        .then((data) => {
          setData(data.data);
          console.log(data.data);
        })
        .catch((e) => console.log(e));

    }
  };

  return (
    <div className="App text-white h-screen relative">
      <div className="container">
        <div className="text-center">
          <input
            type="text"
            placeholder="Enter Location"
            className="text-white bg-[rgba(255,255,255,0.3)] py-2 ps-2 w-64 rounded-[3px] placeholder:text-gray-300 placeholder:focus:opacity-0 placeholder:transition-opacity border-[1px] border-solid border-slate-100 mb-16 outline-none"
            onChange={(event) => setLocation(event.target.value)}
            onKeyDown={searchLocation}
          />
        </div>
        <div className="text-center relative">
          <p className=" text-lg">{data.name}</p>
          {data.main ? (
            <p className="text-8xl my-3">{data.main.temp.toFixed()}&deg;</p>
          ) : null}
          <div className="flex items-center justify-center">
            {data.weather && (
              <div>
                {data.weather[0].main === "Clear" ? (
                  <i className="ph ph-sun-dim text-amber-400 text-3xl me-2"></i>
                ) : data.weather[0].main === "Clouds" ? (
                  <i className="ph ph-cloud text-slate-100 text-3xl me-2"></i>
                ) : data.weather[0].main === "Rain" ? (
                  <i className="ph ph-cloud-rain text-slate-300 text-3xl me-2"></i>
                ) : data.weather[0].main === "Snow" ? (
                  <i className="ph ph-cloud-snow text-blue-300 text-3xl me-2"></i>
                ) : (
                  ""
                )}
              </div>
            )}
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        {data.name !== undefined && (
          <div className="flex justify-evenly p-5 mx-5 text-center rounded-sm bg-[rgba(255,255,255,0.3)] mt-16">
            <div className="mx-3 flex flex-col justify-center items-center">
              <div className="flex items-center justify-center">
                <i className="ph ph-thermometer-simple text-red-600 text-3xl me-1"></i>
                {data.main ? (
                  <p className=" font-bold text-2xl">
                    {data.main.feels_like.toFixed()}&deg;
                  </p>
                ) : null}
              </div>
              <p>Feels Like</p>
            </div>
            <div className="mx-3 flex flex-col justify-center items-center">
              <div className="flex items-center justify-center">
                <i className="ph ph-drop text-blue-600 text-3xl me-1"></i>
                {data.main ? (
                  <p className=" font-bold text-2xl">
                    {data.main.humidity.toFixed()}%
                  </p>
                ) : null}
              </div>
              <p>Humidity</p>
            </div>
            <div className="mx-3 flex flex-col justify-center items-center">
              <div className="flex items-center justify-center">
                <i className="ph ph-wind text-slate-400 text-3xl me-1"></i>
                {data.main ? (
                  <p className=" font-bold text-2xl">
                    {data.wind.speed.toFixed()} PMH
                  </p>
                ) : null}
              </div>
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
                }

export default App;
