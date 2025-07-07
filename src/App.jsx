import { useState } from "react"


function App() {
  const [city, setCity] = useState('');
 const [weatherData, setWeatherData] = useState(null);
 const [isLoading, setIsLoading] = useState(false);

const fetchWeatherData = async () => {
  const API_KEY = '52cffd9aae7d459ea4683134250707'
  const API_ENDPOINT = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;

  try {
    setIsLoading(true)
   const response = await fetch(API_ENDPOINT);
   const data = await response.json()

   if (data.error) {
  alert(data.error.message);
  setWeatherData(null);
  
}else{

  setWeatherData(data)
}
   
   
  }catch(error){
    console.error('Error fetching weather data:', error)
  }
}


  return (
  <div className="bg-blue-600 h-screen flex flex-col items-center justify-center">
    <div className="bg-white mx-10 p-9 rounded shadow-md mb-6">
      <h1 className="font-bold mb-4 text-2xl">Weather Application</h1>
      <input type="text" placeholder="Enter city name" value={city} className="border rounded p-2 w-full mb-4" onChange={(e) => setCity(e.target.value)}/>
      <button className="bg-blue-600 cursor-pointer p-2 hover:bg-blue-400 transition text-white rounded" onClick={fetchWeatherData}>Get Weather</button>
    </div>
    {weatherData && (
      <div className="bg-black mx-10 rounded p-8 shadow-md text-white">
          <div className="mt-4">
             <h3 className="font-semibold text-xl">
              Weather in {weatherData.location.name}, {weatherData.location.country}
             </h3>
             <p>Condition: {weatherData.current.condition.text}</p>
             <p>Temperature: {weatherData.current.temp_c}°C</p>
             <p>Feels like: {weatherData.current.feelslike_c}°C</p>
             <p>Wind: {weatherData.current.wind_kph} KMH in {weatherData.current.wind_dir} Direction</p>
          </div>
      </div>
    )}

  </div>
     
  );
};

export default App
