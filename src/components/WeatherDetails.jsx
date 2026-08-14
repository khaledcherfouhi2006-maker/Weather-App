

export function WeatherDetails({loading, errorMessage, weather}) {
    return (
        <div className={weather.humidity ? "weather-details" : "weather-details-display"}>
            <p>{!loading && !errorMessage && weather.humidity && `Humidity: ${weather.humidity}`}</p>
            <p>{!loading && !errorMessage && weather.windSpeed && `Wind: ${weather.windSpeed}`}</p>
            <p>{!loading && !errorMessage && weather.pressure && `Pressure: ${weather.pressure}`}</p>
        </div>
    )
}