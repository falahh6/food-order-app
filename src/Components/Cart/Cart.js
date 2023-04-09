import React, { useContext, useState } from "react";
import styles from './Cart.module.css'
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
const Cart = (props) =>{
    const [checkoutActive , setCheckoutActive] = useState(false);
    const [orderSubmitting, setOrderSubmitting] = useState(false);
    const [orderSubmitted, setOrderSubmitted] = useState(false);

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

    const checkoutActiveHandler = () => {
        setCheckoutActive(true);
    }

    const cancelCartHandler = () => {
        setCheckoutActive(false);
    }
    const cartMeals = cartCtx.items.map((item)=>{
        return (
         {
            name : item.name,
            price : item.price
         }
        )
     })


    const cartData = {
        cartItems : cartMeals,
        totalAmount : totalAmount
     }

    const confirmHandler = async (userData) => {
        setOrderSubmitting(true);
        try{
            const orderedData = {
                userData,
                cartData
            }
            const response = await fetch('https://react-http-58c7d-default-rtdb.firebaseio.com/ReactMeals-orders.json', {
                method : 'POST',
                body : JSON.stringify(orderedData),
                headers : {
                    'content-type' : 'application/json'
                }
            })
            const data = await response.json();
            console.log('Order Placed', data.name);
        } catch(error){
            console.log('! Error Placing order', error)
        }
        cartCtx.clearCart();
        
        setOrderSubmitting(false);
        setOrderSubmitted(true);
    }

    if(orderSubmitting){
        return (
            <Modal className={styles['cart-modal']} onClose={props.onClose}>
                <h3 className={styles['order-process']}>Order is Submiiting......</h3>
            </Modal>
           )
    }

    if(orderSubmitted){
       return (
        <Modal className={styles['cart-modal']} onClose={props.onClose}>
            <h3 className={styles['order-process']}>Order Placed Successfully</h3>
            <div className={styles.actionsAdd}>
                <button className={styles['button--alt-add']}  onClick={props.onClose}>Close</button>
            </div>
        </Modal>
       )
    }

    if(!hasitems){
        return (
            <Modal className={styles['cart-modal']} onClose={props.onClose}>
                <h3 className={styles['order-process']}>No Items in you cart, add one?</h3>
                <div className={styles.actionsAdd}>
                    <button className={styles['button--alt']}  onClick={props.onClose}>Close</button>
                </div>
            </Modal>
        )
    }


    return (
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
            { checkoutActive && <Checkout onConfirm={confirmHandler} onCancel={cancelCartHandler} /> }
        </Modal>
        
    )
}

export default Cart;