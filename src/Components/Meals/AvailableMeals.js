import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Card from "../UI/Card";
import styles from './AvailableMeals.module.css'
import MealItems from "./MealItem/MealItems";


const AvailableMeals = () => {
  const [meals , setMeals] = useState([]);
  const [mealsLoading, setMealsLoading] = useState(true);
  const [httpError, setHttpError] = useState(false);
   
    useEffect(() => {
      
      const fetchMeals = async () => {
        const response = await fetch('https://react-http-58c7d-default-rtdb.firebaseio.com/Meals.json')
        const data = await response.json();

        let loadedMeals = [];
        for(let key in data){
          loadedMeals.push(
            {
              id : key,
              key : key,
              name : data[key].name,
              description : data[key].description,
              price : data[key].price
            }
          )
        }
        setMeals(loadedMeals);
        setMealsLoading(false);
      }
      fetchMeals().catch((error)=> {
        console.log(error.message);
        setHttpError(true);
        mealsLoading(false); 
      })

    },[mealsLoading])
   
    if(mealsLoading){
      return(
        <section className={styles['loading-p']}>
          <p>Loading....</p>
        </section>
      )
    }
    if(httpError){
      return(
        <section className={styles['loading-p']}>
          <p>Failed to Fetch</p>
        </section>
      )
    }

    const mealList = meals.map((meal) => (
        <MealItems 
            key={meal.key}
            id={meal.key}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    ))
    return (
            <section className={styles.meals}>
                <Card>
                   <ul>{mealList}</ul>
                </Card>
            </section>
    )
}

export default AvailableMeals