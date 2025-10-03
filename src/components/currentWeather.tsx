import type { GeocodingResponse, WeatherData } from "@/api/types";
import { Card, CardContent } from "./ui/card";
import { Droplet, Wind } from "lucide-react";

interface CurrentWeatherProps {
    data: WeatherData;
    locationName?: GeocodingResponse;
}

const CurrentWeather =({data, locationName}:CurrentWeatherProps)=>{

   const temp = data.main?.temp ?? 0;
  const feels_like = data.main?.feels_like ?? 0;
  const humidity = data.main?.humidity ?? 0;
  const speed = data.wind?.speed ?? 0;
  const weather = data.weather?.[0];
    

    const formatTemp = ((temp: number)=> `${Math.round(temp)}°C`);



    return (
    <Card className="overflow-hidden">
  <CardContent className="p-6">
    <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
            <div className="space-y-2">
                <div className="flex items-end gap-1">
                    <h2 className="text-2xl font-bold tracking-tighter">{locationName?.name}</h2>
                    {locationName?.state &&(
                        <span className="text-muted-foreground">
                           , {locationName?.state}
                        </span>
                    )}
                </div>
                <p className="text-sm text-muted-foreground">
                    {locationName?.country}
                </p>
            </div>
            <div className="flex items-center gap-2">
                <p className="text-7xl font-bold tracking-tighter">{formatTemp(temp)}</p>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Feels like {formatTemp(feels_like)}</p>
                 
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center fap-2">
                    <Droplet className="h-4 w-4 text-blue-500" />
                    <div className="space-y-0.5">
                        <p className="text-sm font-medium">Humidity</p>
                        <p className="text-sm text-muted-foreground">{humidity}%</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Wind className="h-4 w-4 text-blue-500"/>
                    <div className="space-y-0.5">
                        <p className="text-sm font-medium">Wind Speed</p>
                        <p className="text-sm -font-muted-foreground">{speed} m/s</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex flex-col items-center justify-center">
            <div className="relative flex aspect-square w-full max-w-[200px] items-center justify-center">
                <img src={`https://openweathermap.org/img/wn/${weather?.icon}@4x.png`} alt={weather?.description} 
                className="h-full w-full object-contain"
                />
                <div className="absolute bottom-0 text-center">
                    {data.weather?.[0] &&(
                        <p className="text-sm font-medium capitalize">
                        {weather?.description}
                    </p>
                    )}
                </div>
            </div>
        </div>
    </div>
  </CardContent>
</Card>)
};

export default CurrentWeather;