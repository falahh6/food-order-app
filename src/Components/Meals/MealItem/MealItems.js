import React, { useContext } from "react"
import CartContext from "../../../store/cart-context"
import MealItemForm from "./MealItemForm"
import styles from './MealItems.module.css'
const MealItems = (props) => {

    const cartCtx = useContext(CartContext);

    const price = `$${props.price.toFixed(2)}`

    const addToCartHandler = (amount) =>{
        cartCtx.addItem({
            id : props.id,
            name : props.name,
            amount : Number(amount),
            price : props.price
        })
    }

    return (
        <li className={styles.meal}>
        <div>
            <h3 className={styles.h3}>{props.name}</h3>
            <div className={styles.description}>{props.description}</div>
            <div className={styles.price}>{price}</div>
        </div>
        <div>
            <MealItemForm id={props.id} onAddItem={addToCartHandler} />
        </div>
        </li>
    )

}

export default MealItems;