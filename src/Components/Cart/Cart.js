import React, { useContext, useState } from "react";
import styles from './Cart.module.css'
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
const Cart = (props) =>{
    const [checkoutActive , setCheckoutActive] = useState(false);

    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasitems = cartCtx.items.length > 0;
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

    // console.log(cartCtx.items.re);

    const checkoutActiveHandler = () => {
        setCheckoutActive(true);
    }

    const cancelCartHandler = () => {
        setCheckoutActive(false);
    }
    return (
        // <React.Fragment>

        <Modal className={styles['cart-modal']} onClose={props.onClose}>
        {cartItems}
            <div className={styles.total}>
                <span>Total Amount </span>
                <span>{totalAmount}</span>
            </div>
            <div className={styles.actions}>
                <button className={styles['button--alt']}  onClick={props.onClose}>Close</button>
               { hasitems &&  <button className={styles.button} onClick={checkoutActiveHandler}>Proceed to Checkout</button>}
            </div>
            { checkoutActive && <Checkout onCancel={cancelCartHandler} /> }
        </Modal>
        
    )
}

export default Cart;