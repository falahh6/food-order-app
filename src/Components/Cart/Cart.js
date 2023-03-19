import React, { useContext } from "react";
import styles from './Cart.module.css'
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
const Cart = (props) =>{
    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasitems = cartCtx.items.length > 0
    const onRemoveItemHandler = (id) => {
        cartCtx.removeItem(id);
    }

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 });
      };    

    const cartItems = (
        <ul className={styles["cart-items"]}>
            {cartCtx.items.map((item) => (
            <CartItem
                key={item.id}
                name={item.name}
                amount={item.amount}
                price={item.price}
                onRemoveItem={onRemoveItemHandler.bind(null, item.id)}
                onAdd={cartItemAddHandler.bind(null, item)}
            />
            ))} 
        </ul>
    );

    return (
       
        <Modal onClose={props.onClose}>
        {cartItems}
            <div className={styles.total}>
                <span>Total Amount </span>
                <span>{totalAmount}</span>
            </div>
            <div className={styles.actions}>
                <button className={styles['button--alt']}  onClick={props.onClose}>Close</button>
               { hasitems &&  <button className={styles.button}>Order</button>}
            </div>
        </Modal>
        
    )
}

export default Cart;