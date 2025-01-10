'use client'
import React from 'react';
import axios from "axios";
import { IoMdSunny, IoMdCloudy, IoMdRainy, IoMdSnow, IoMdThunderstorm, IoMdSearch } from "react-icons/io";
import { BsCloudHaze2Fill, BsCloudDrizzleFill, BsEye, BsWater, BsThermometer, BsWind } from "react-icons/bs";
import { TbTemperatureCelsius } from "react-icons/tb";

import { ImSpinner8 } from "react-icons/im";
import { useEffect, useState } from "react";

const API_KEY = "35098c00edce2fbfe4cd0fd5f62a88c6"; // API key for OpenWeather

function WeatherCard() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Tegal");
  const [inputValue, setInputValue] = useState("");
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInput = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (inputValue.trim() !== "") {
      setLocation(inputValue.trim());
      setInputValue(""); // Clear the input field
    }

    setAnimate(true);

    // After 500ms change animate to false
    setTimeout(() => {
      setAnimate(false);
    }, 200);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;
        const response = await axios.get(URL);
        setData(response.data);
      } catch (error) {
        setError("Invalid city or country. Please try again.");
      }
      setTimeout(() => {
        setLoading(false);
      }, 1500); // Adjusted to 1500ms to show the loading animation for 1500ms
    };

    fetchData();
  }, [location]);

  let icon;

  switch (data?.weather[0].main) {
    case "Clouds":
      icon = <IoMdCloudy />;
      break;
    case "Haze":
      icon = <BsCloudHaze2Fill />;
      break;
    case "Rain":
      icon = <IoMdRainy className="text-blue-500" />;
      break;
    case "Clear":
      icon = <IoMdSunny className="text-yellow-300" />;
      break;
    case "Drizzle":
      icon = <BsCloudDrizzleFill className="text-blue-500" />;
      break;
    case "Snow":
      icon = <IoMdSnow className="text-blue-200" />;
      break;
    case "Thunderstorm":
      icon = <IoMdThunderstorm />;
      break;
    case "Mist":
      icon = <BsCloudHaze2Fill className="text-blue-200" />;
      break;
    default:
      icon = null;
  }

  const date = new Date();
  const options = {
    weekday: 'long', // Nama hari
    day: '2-digit',  // Tanggal
    month: 'short',  // Bulan singkat (Jan, Feb, dst.)
    year: 'numeric'  // Tahun
  };

  const formattedParts = new Intl.DateTimeFormat('en-US', options)
    .formatToParts(date)
    .reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
  const formattedDate = `${formattedParts.weekday}, ${formattedParts.day} ${formattedParts.month} ${formattedParts.year}`;
  return (
    <div className="w-full py-10 h-screen bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0">
      {error && (
        <div className="bg-red-600 text-white p-4 rounded-full mb-4">
          {error}
        </div>
      )}
      {/* Form Input */}
      <form onSubmit={handleSubmit} className={`${animate ? "animate-bounce" : ""} h-16 bg-black/30 w-full max-w-[450px] rounded-full backdrop-blur-[32px] mb-8`}>
        <div className="h-full relative flex items-center justify-center p-2">
          <input
            onChange={handleInput}
            className="flex-1 bg-transparent outline-none placeholder:text-white text-white text-[15px] font-light pl-6 h-full"
            type="text"
            value={inputValue}
            placeholder="Search by City or Country"
          />
          <button
            type="submit"
            className="bg-pink-400 hover:bg-pink-400 w-20 h-12 rounded-full flex justify-center items-center transition"
          >
            <IoMdSearch className="text-2xl text-white" />
          </button>
        </div>
      </form>
      <div className="w-full max-w-[450px] bg-black/20 min-h-[584px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6">
        {loading ? (
          <div className="flex justify-center items-center min-h-[584px]">
            <ImSpinner8 className="text-5xl animate-spin" />
          </div>
        ) : (
          data && (
            <>
              {/* Card Top */}
              <div className="flex flex-col lg:flex-row justify-center items-center lg:gap-x-5">
                {/* Icon */}
                <div className="text-[93px]">{icon}</div>
                {/* Container for country name and date */}
                <div className="flex flex-col items-center lg:items-start">
                  {/* Country Name */}
                  <div className="text-4xl font-semibold text-center lg:text-left">
                    {data.name}, {data.sys.country}
                  </div>
                  {/* Date */}
                  <div className="text-base text-l ml-1">
                    {formattedDate}
                  </div>
                </div>
              </div>
              {/* Card Body */}
              <div className="my-10">
                <div className="flex justify-center">
                  {/* Temperature */}
                  <div className="text-[144px] leading-none ">
                    {parseInt(data.main.temp)}
                  </div>
                  {/* Celsius */}
                  <div className="text-4xl">
                    <TbTemperatureCelsius />
                  </div>
                </div>
                {/* Weather Description */}
                <div className="capitalize text-center text-xl">
                  {data.weather[0].description}
                </div>
              </div>
              {/* Card Bottom */}
              <div className="justify-around flex gap-x-4">
                <div className="flex justify-between gap-4 flex-col">
                  {/* Visibility Element */}
                  <div className="flex text-md items-center gap-x-2">
                    {/* Icon */}
                    <div className="text-4xl">
                      <BsEye />
                    </div>
                    <div className="flex flex-col text-sm">
                      Visibility
                      <span className="text-2xl">
                        {data.visibility / 1000} KM
                      </span>
                    </div>
                  </div>
                  {/* Temperature Element */}
                  <div className="flex  items-center gap-x-2 mt-4 lg:mt-0">
                    {/* Icon */}
                    <div className="text-4xl">
                      <BsThermometer />
                    </div>
                    <div className="text-center text-sm">
                      Feels Like
                      <div className="flex text-2xl">
                        {parseInt(data.main.feels_like)}
                        <TbTemperatureCelsius />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between flex-col">
                  {/* Humidity Element */}
                  <div className="flex items-center gap-x-2">
                    {/* Icon */}
                    <div className="text-4xl">
                      <BsWater />
                    </div>
                    <div className="text-sm flex flex-col">
                      Humidity
                      <span className="text-2xl">
                        {data.main.humidity} %
                      </span>
                    </div>
                  </div>
                  {/* Wind Element */}
                  <div className="flex items-center gap-x-2 mt-4 lg:mt-0">
                    {/* Icon */}
                    <div className="text-4xl">
                      <BsWind />
                    </div>
                    <div className="flex flex-col text-sm">
                      Wind
                      <div className="text-2xl flex">
                        {data.wind.speed} <p className='text-sm ml-2'>m/s</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
}

export default WeatherCard;
