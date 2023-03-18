import React from "react";
import styles from './CartItem.module.css'
const CartItem = (props) =>{

    const price = `$${props.price.toFixed(2)}`
    const itemQ = `${props.amount}`

    const onAddItemHandler = (id) => {}

    const onRemoveItemHandler = (item) => {}

    return (
        <li className={styles['cart-item']}>
            <div>
            <h2>{props.name}</h2>
            <div className={styles.summary}>
                <span className={styles.price}>{price}</span>
                <span className={styles.amount}>x{itemQ}</span>
            </div>
            </div>
            <div className={styles.actions}>
                <button onClick={onRemoveItemHandler}> - </button>
                <button onClick={onAddItemHandler}> + </button>
            </div>
        </li>
    )
}

export default CartItem;