import { useState } from "react"


const getBackgroundsClass = (condition) => {
  const lower = condition.toLowerCase();

  if (lower.includes('sunny')) return "bg-yellow-400"
  if (lower.includes('cloud') || lower.includes('overcast')) return "bg-gray-500";
  if (lower.includes('light rain') || lower.includes('drizzle')) return "bg-blue-800";
  
  if (lower.includes('snow')) return "bg-blue-300"
  if (lower.includes('clear')) return "bg-blue-600"
  if (lower.includes('mist') || lower.includes('fog')) return "bg-gray-400";
  
  return "bg-green-500";
}


function App() {
  const [city, setCity] = useState('');
 const [weatherData, setWeatherData] = useState(null);
 const [isLoading, setIsLoading] = useState(false);

 const backgroundClass = weatherData ? getBackgroundsClass(weatherData.current.condition.text) : "bg-blue-600"

const fetchWeatherData = async () => {
  const API_KEY = '52cffd9aae7d459ea4683134250707'
  const API_ENDPOINT = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;

  try {
    setIsLoading(true)

    await new Promise(resolve=> setTimeout(resolve, 2000))

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
  }finally{
    setIsLoading(false)
  }
}


  return (
  <div className={`${backgroundClass} h-screen flex flex-col items-center justify-center transition-all duration-500`}>
    <div className="bg-white mx-10 p-9 rounded shadow-md mb-6">
      <h1 className="font-bold mb-4 text-2xl">Weather App</h1>
      <input type="text" placeholder="Enter city name" value={city} className="border rounded p-2 w-full mb-4" onChange={(e) => setCity(e.target.value)}/>
      <button className={`${backgroundClass} cursor-pointer p-2 hover:bg-blue-400 transition text-white rounded`} onClick={fetchWeatherData}>Get Weather</button>
    </div>
    {isLoading && (
       <div className="flex flex-col items-center justify-center text-white mt-4">
    <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-white border-t-transparent"></div>
    <p className="mt-4 font-semibold">Fetching weather...</p>
  </div>
    )}
    {weatherData && !isLoading && (
      <div className="bg-black mx-10 rounded w-sm p-8 shadow-md text-white">
          <div className="mt-4">
             <h3 className="font-semibold text-xl">
              Weather in {weatherData.location.name}, {weatherData.location.country}
             </h3>
             <div className="flex items-center gap-4 mb-4">
              <img src={weatherData.current.condition.icon} alt="Weather Icon" className="border m-1 rounded"/>

             <p>Condition: {weatherData.current.condition.text}</p>
             </div>

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
