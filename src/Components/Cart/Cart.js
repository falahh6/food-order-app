import React, { useContext } from "react";
import styles from './Cart.module.css'
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
const Cart = (props) =>{
    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

    const cartItems =(
        <ul className={styles["cart-items"]}>
            {cartCtx.items.reduce((acc, item) => {
            const existingIndex = acc.findIndex((i) => i.name === item.name);
            if (existingIndex !== -1) {
                acc[existingIndex].amount += item.amount;
            } else {
                acc.push({ ...item });
            }
            return acc;
            }, []).map((item) => (
            <CartItem
                key={item.name}
                name={item.name}
                price={item.price}
                amount={item.amount}
                onAddItem={props.onClick}
                onRemoveItem={props.onClick}
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
                <button className={styles.button}>Order</button>
            </div>
        </Modal>
    )
}

export default Cart;