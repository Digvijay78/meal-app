import React,{useContext,useEffect,useState} from 'react'
import axios from 'axios'

const AppContext = React.createContext();

const allMealUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
const randomMeal = 'https://www.themealdb.com/api/json/v1/1/random.php'


const AppProvider = ({children}) =>{
  const [loading, setLoading] = useState(false)
  const [meals,setMeals] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal , setShowModal] = useState(false)
  const [selectedMeal , setSelectedMeal] = useState(null)
  const [favorites, setFavorites] = useState([])

const fetchMeal = async (url) =>{
  setLoading(true)
             try{
               const {data} = await axios(url)

               if(data.meals){

                 setMeals(data.meals)
                 
                } else{
                  setMeals([])
                }
               
             } catch (error){
               console.log(error.response);
              }
              setLoading(false)
            }

     
    const fetchRandomMeal = () => {
       
           fetchMeal(randomMeal)
    }    
    
    const selectMeal = (idMeal , favoriteMeal) => {
          
          let meal;
          meal = meals.find((meal) => meal.idMeal === idMeal )
          setSelectedMeal(meal)
          setShowModal(true)      
    }

    const closeModal = () =>{
     
      setShowModal(false)
    }

    const addToFavorites = (idMeal) =>{
      
      const meal = meals.find((meal) => meal.idMeal === idMeal)
      const alreadyFav = favorites.find((meal) => meal.idMeal === idMeal)

      if(alreadyFav) return
      const updatedFav = [...favorites, meal]

      setFavorites(updatedFav)
      localStorage.setItem('favorites', JSON.stringify(updatedFav))
    }
    
    const removeFromFavorites = (idMeal) => {
      const updateFav = favorites.filter((meal) => meal.idMeal !== idMeal)
      setFavorites(updateFav)
      localStorage.setItem('favorites', JSON.stringify(updateFav))
     } 
           
    useEffect(() => {
      fetchMeal(allMealUrl)
    },[] )

    useEffect(() => {     
      if(!searchTerm) return
        fetchMeal(`${allMealUrl}${searchTerm}`)
    
    },[searchTerm])

     return <AppContext.Provider value = {{loading,meals , setSearchTerm ,fetchRandomMeal , showModal , selectMeal, selectedMeal , closeModal, removeFromFavorites, addToFavorites , favorites}}>
        {children}
     </AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppContext,AppProvider}
