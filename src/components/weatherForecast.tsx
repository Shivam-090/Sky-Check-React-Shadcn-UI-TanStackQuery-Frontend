import type { ForecastData } from "@/api/types"
import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowDown, ArrowUp, Droplet, Wind } from "lucide-react";

interface weatherForecastProps {
    data?: ForecastData | null
}

interface dailyForecasts {
    date: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    wind: number;
    weather?: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }
}

const weatherForecast = ({data}: weatherForecastProps) => {
      if (!data) {
    return <p>Loading...</p>;
      }

    const dailyForecasts = data.list.reduce((acc, forecast)=>{
        const date = format(new Date(forecast.dt *1000), "yyyy-MM-dd");
        if(!acc[date]){
            acc[date] = {
                temp_min: forecast.main?.temp_min ?? 0,
                temp_max: forecast.main?.temp_max ?? 0,
                humidity: forecast.main?.humidity ?? 0,
                wind: forecast.wind?.speed ?? 0,
                weather: forecast.weather?.[0],
                date: forecast.dt,
            };
        }else{
            acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main?.temp_min ?? 0)
            acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main?.temp_max ?? 0)

        }
        return acc;
    }, {} as Record<string, dailyForecasts>);

    const nextDays = Object.values(dailyForecasts).slice(1,6);
    const forematTemp = (temp: number) => `${Math.round(temp)}°C`;

    
  return (
    <Card>
        <CardHeader>
            <CardTitle>5-Days Forecast</CardTitle>
        </CardHeader>
        <CardContent>
            {nextDays.map((day)=>{
                return(

                    <div key={day.date} className="grid grid-cols-3 items-center gap-4 rounded-lg border p-4">
                        <div>
                            <p className="font-medium">{format(new Date(day.date * 1000), "EEE, MMM d")}</p>
                            
                            <p className="text-sm text-muted-foreground capitalize">{day.weather?.description ?? "--"}</p>
                        </div>

                        <div className="md:flex justify-center gap-4">
                            <span className="flex items-center text-blue-500">
                                <ArrowDown className="mr-1 h-4 w-4" />
                                {forematTemp(day.temp_min)}
                            </span>
                            <span className=" flex items-center text-red-500">
                                <ArrowUp className="mr-1 h-4 w-4" />
                                {forematTemp(day.temp_max)}
                            </span>

                        </div>

                        <div className="md:flex justify-end gap-4">
                            <span className="flex items-center gap-1">
                                <Droplet className="h-4 w-4 text-blue-500" />
                                <span className="text-sm">{day.humidity}%</span>
                            </span>
                            <span className="flex items-center gap-1">
                                <Wind className="h-4 w-4 text-blue-500" />
                                <span className="text-sm">{day.wind}m/s</span>
                            </span>

                        </div>

                    </div>
                )
            })}

        </CardContent>
    </Card>
  )
}

export default weatherForecast
