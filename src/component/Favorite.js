import {useGlobalContext} from "../context";


const Favorite = () => {

 const {removeFromFavorites , selectMeal , favorites} = useGlobalContext()

    return (
        <section className="favorites">
            <div className="favorites-content" > 
               <h5>Favorites</h5>
                 <div className="favorites-container" >
                    {
                        favorites.map((meal)=> {
                            const {idMeal, strMealThumb:img} = meal

                            return <div  key ={idMeal} className="favorites-item" > 
                                   <img src = {img} className="favorites-img img" />
                                   <button className="remove-btn" onClick={() =>removeFromFavorites(idMeal)} >remove</button>
                                   
                                   </div>
                               
                        })
                    }

                 </div>
                
            </div>

        </section>
         
    )
}

export default Favorite;