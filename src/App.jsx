import { useState } from "react"


function App() {
  const [city, setCity] = useState("");
 const [weatherData, setWeatherData] = useState(null);

const fetchWeatherData = async () => {
  const API_KEY = '52cffd9aae7d459ea4683134250707'
  const API_ENDPOINT = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;

  try {
   const response = await fetch(API_ENDPOINT);
   const data = response.json()
   console.log(data)
  }catch(error){
    console.error('Error fetching weather data:', error)
  }
}


  return (
  <div className="bg-blue-600 h-screen flex flex-col items-center justify-center">

    

  </div>
     
  )
}

export default App
