import CurrentWeather from "@/components/currentWeather";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useForecastQuery, useWeatherQuery } from "@/hooks/useWeather";
import { AlertTriangle } from "lucide-react";
import { useParams, useSearchParams } from "react-router-dom"
import HourlyTemperature from "@/components/hourlyTemperature";
import WeatherDetails from "@/components/weatherDetails";
import WeatherForecast from "@/components/weatherForecast";
import FavoriteButton from "@/components/favoriteButton";


const cityPage = () => {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon = parseFloat(searchParams.get("lon") || "0");

  const coordinates = { lat, lon };

  
    const weatherQuery = useWeatherQuery(coordinates);
    const forecastQuery = useForecastQuery(coordinates);

      if (weatherQuery.error || forecastQuery.error) {
    return (<Alert variant={"destructive"}>
      <AlertTriangle className='h-4 w-4' />
      <AlertTitle>Location Required</AlertTitle>
      <AlertDescription className='flex flex-col gap-4'>
        <p>Failed to fetch weather data. Please try again.</p>
      </AlertDescription>
    </Alert>
    );
  }

    // if(weatherQuery.data || forecastQuery.data || !params.cityName){
  //   return <WeatherSkeleton />;
  // }



   return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold tracking-tight'>
          {params.cityName}
          {weatherQuery.data && weatherQuery.data.sys && `, ${weatherQuery.data.sys.country}`}
        </h1>
        <div>
          <FavoriteButton data={{...weatherQuery.data, name: params.cityName ?? ""}} />
        </div>
      </div>

      <div className='grid gap-6'>
        <div className='flex flex-col gap-4'>
          {weatherQuery.data && (
            <CurrentWeather 
              data={weatherQuery.data}
            />
          )}
          
          <HourlyTemperature data={forecastQuery.data}/>

        </div>
        <div className='grid gap-6 lg:grid-cols-2 items-start '>

          <WeatherDetails data={weatherQuery.data} />
          
          <WeatherForecast data={forecastQuery.data} />
        
        </div>
      </div>
    </div>
  )
}

export default cityPage
