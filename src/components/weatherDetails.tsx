import type { WeatherData } from "@/api/types"
import { format } from "date-fns";
import { Compass, Gauge, Sunrise, Sunset } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface weatherDetailsProps {
    data?: WeatherData | null
}
const weatherDetails = ({data}:weatherDetailsProps) => {
  
    if (!data) {
    return <p>Fetching weather details...</p>;
  }

    const {wind, main, sys} = data;
    
    const formatTime = (timestamp: number)=>{
        return format(new Date(timestamp * 1000), "hh:mm a");
    }
    
    const getWindDirection = (degree: number)=>{
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        const index = Math.round(((degree %= 360) <0 ? degree + 360 : degree) / 45) % 8;
        return directions[index];
        
    }

    const details = [
    {
        title: "Sunrise",
        value: formatTime(sys?.sunrise ?? 0),
        icon: Sunrise,
        color: "text-yellow-500"
    },
    {
        title: "Sunset",
        value: formatTime(sys?.sunset ?? 0),
        icon: Sunset,
        color: "text-orange-500"
    },
    {
        title: "Wind Direction",
        value: wind?.deg !== undefined ? `${getWindDirection(wind.deg)} (${wind.deg}°)` : "--",
        icon: Compass,
        color: "text-green-500"
    },
    {
        title: "Pressure",
        value: main?.pressure ? `${main.pressure} hPa` : "--",
        icon: Gauge,
        color: "text-purple-500"
    },
]

  return (
    <Card>
        <CardHeader>
        <CardTitle>Weather Details</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="grid gap-6 sm:grid-cols-2">
                {details.map((details)=>{
                    return(
                        <div key={details.title} className="flex items-center gap-3 rounded-lg border p-4">
                            <details.icon className={`h-5 w-5 ${details.color}`} />
                            <div>
                                <p className="text-sm font-medium loading-none">{details.title}</p>
                                <p className="text-sm text-muted-foreground">{details.value}</p>
                            </div>
                        </div>

                    )

                })}
            </div>

        </CardContent>
    </Card>
  )
}

export default weatherDetails
