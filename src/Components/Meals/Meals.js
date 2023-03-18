import React from "react";
import MealSummary from "../Layout/MealSummary";
import AvailableMeals from "./AvailableMeals";

const Meals = (props) =>{
    return <React.Fragment>
        <MealSummary />
        <AvailableMeals />
    </React.Fragment>
}

export default Meals;