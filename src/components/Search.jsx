import { useState } from "react";
import { WeatherCard } from "./WeatherCard";
import { WeatherDetails } from "./WeatherDetails";

export function Search({ city, setCity }) {

    /*Error State */
    const [errorMessage, setErrorMessage] = useState("");

    /*Loading State */
    const [loading, setLoading] = useState(false);

    /*Location State */
    const [location, setLocation] = useState({
        cityName: "",
        countryName: ""
    });

    /*Weather State */
    const [weather, setWeather] = useState({
        temperature: "",
        description: "",
        feelsLike: "",
        humidity: "",
        windSpeed: "",
        pressure: "",
        iconUrl: ""
    })

    /*Function fetCoordinates*/
    async function getCoordinates(city) {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
        const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
        const Response = await fetch(`${geoUrl}`);
        if (!Response.ok) {
            throw new Error(`Request failed: ${Response.status}`)
        }

        const data = await Response.json();
        return data;
    }

    /*Function getWeather */
    async function getWeather(latitude, longitude) {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
        const secondResponse = await fetch(`${weatherUrl}`);

        if (!secondResponse.ok) {
            throw new Error(`Request failed: ${secondResponse.status}`)
        }
        const secondData = await secondResponse.json();
        return secondData;
    }

    /*Function formatData */
    function formatData(secondData) {
        return{
            temperature: `${(secondData.main.temp - 273.15).toFixed(1)} °C`,
            description: secondData.weather[0].description,
            feelsLike: `${(secondData.main.feels_like - 273.15).toFixed(1)} °C`,
            humidity: `${secondData.main.humidity} %`,
            pressure: `${secondData.main.pressure} hPa`,
            windSpeed: `${secondData.wind.speed} m/s`,
            iconUrl: `https://openweathermap.org/img/wn/${secondData.weather[0].icon}@2x.png`
        }
    }

    /*Function handleSearch */
    async function handleSearch() {
        if(loading === true){
            return;
        }

        setErrorMessage("");
        setWeather({
            temperature: "",
            description: "",
            feelsLike: "",
            humidity: "",
            windSpeed: "",
            pressure: "",
            iconUrl: ""
        })
        setLocation({
            cityName: "",
            countryName: ""
        })
        if (city.trim() === "") {
            setErrorMessage("write a place");
            return;
        }

        setLoading(true);
        try {
            const data = await getCoordinates(city);

            if (data.length === 0) {
                setErrorMessage(`${city} isn't exist`);
                return;
            }
            const latitude = data[0].lat;
            const longitude = data[0].lon;

            const secondData = await getWeather(latitude, longitude);

            setLocation({
                cityName: data[0].name,
                countryName: data[0].country
            });

            const weatherData = formatData(secondData);
            setWeather(weatherData);



        }
        catch (error) {
            console.log(error);
            setErrorMessage(error.message);
        }
        finally {
            setLoading(false);
        }

    }
    return (
        <>
            <div className="weather-app">
                <div className="search-bar">
                    <input type="text"
                        value={city}
                        placeholder="Enter city..."
                        onChange={(e) => {
                            setCity(e.target.value);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter'){
                                    handleSearch()
                            }
                        }}
                    />
                    <button onClick={() => { handleSearch() }}
                        disabled={loading} >
                            Search
                    </button>
                </div>
                <div className="location">
                    <p>{!loading && !errorMessage && location.cityName && ` ${location.cityName}, ${location.countryName}`}</p>
                </div>

                <WeatherCard
                    loading={loading}
                    errorMessage={errorMessage}
                    weather={weather}
                />

                <WeatherDetails
                    loading={loading}
                    errorMessage={errorMessage}
                    weather={weather}
                />
            </div>
        </>
    )
}
