import type { WeatherData } from "@/api/types"
import { useFavorite } from "@/hooks/useFavorite"
import { Star } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface favoriteButtonprops{
    data?:WeatherData | null
}

const favoriteButton = ({data}:favoriteButtonprops) => {
     if (!data || !data.coord) {
    return null; // or a disabled button
  }
    const {addToFavorite , isFavorite, removeFavorite } = useFavorite();
    if(!data?.coord) return null;
    const isCurrentlyFavorite = isFavorite(data.coord.lat, data.coord.lon);

    const handleToggleFavorite = () =>{
        if(isCurrentlyFavorite){
            removeFavorite.mutate(`${data.coord?.lat}-${data.coord?.lon}`);
            toast.error(`Removed ${data.name} from Favorites`)
        }else{
            addToFavorite.mutate({
                name: data.name,
                lat: data.coord?.lat ?? 0,
                lon: data.coord?.lon ?? 0,
                country: data.sys?.country ?? "--",

            })
            toast.success(`Added ${data.name} to Favorites`)
        }

    }

  return (
    <Button variant={isCurrentlyFavorite? "default": "outline"} size={"icon"} className={isCurrentlyFavorite? "bg-yellow-500 hover:bg-yellow-600" : ""} onClick={handleToggleFavorite}>
        <Star className={`h-4 w-4 ${isCurrentlyFavorite ? "fill-current" : ""}`} strokeWidth={isCurrentlyFavorite ? 0 : 2}
 />
    </Button>
  )
}

export default favoriteButton
