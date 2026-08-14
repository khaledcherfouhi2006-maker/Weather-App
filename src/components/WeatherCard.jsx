

export function WeatherCard({weather, loading, errorMessage }) {

    return (

        <div className="main-weather">
            <p className={loading ?  "loading-message" : errorMessage ? "error-message" : "temperateur"}>
                {loading ? "Loading..." : errorMessage || weather.temperature}
            </p>
            <p>{!loading && !errorMessage && weather.feelsLike && `feels Like: ${weather.feelsLike}`}</p>
            <p>{!loading && !errorMessage && weather.description}</p>

            {
                !loading && !errorMessage && weather.iconUrl && <img src={weather.iconUrl} alt="weather icon" />
            }
        </div>
    )
}