import React, {useContext} from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import styles from './CartButton.module.css';
const CartButton = (props) =>{

    const cartCtx = useContext(CartContext);

    const numberOfCartItems = cartCtx.items.length;
    // const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    //     return curNumber + item.amount
    // }, 0);
    // console.log(numberOfCartItems);
    
    return <button className={styles.button} onClick={props.onClick}>
                <span className={styles.icon}> 
                    <CartIcon /> 
                </span>
                <span>Your cart</span>
                <span className={styles.badge}>{numberOfCartItems}</span>
            </button>
}

export default CartButton;