import {  fetchFavorites } from "@/actions/actions"
import EmptyList from "@/components/home/EmptyList"
import LandmarkList from "@/components/home/LandmarkList"

const FavoritesPage = async() => {
  const favorites = await fetchFavorites()
  if(favorites.length===0){
    return <EmptyList heading="No Favorites" />
  }
  
  
  return (
    <div>
      <LandmarkList landmarks={favorites} />
    </div>
  )
}
export default FavoritesPage