import React, {useContext, useEffect, useState} from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import styles from './CartButton.module.css';
const CartButton = (props) =>{
    const [isButtonHighlighted, setIsButtonHighlighted] = useState(false);

    const cartCtx = useContext(CartContext);

    const { items } = cartCtx;

    const numberOfCartItems = items.length;
    // const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    //     return curNumber + item.amount
    // }, 0);
    // console.log(numberOfCartItems);

   useEffect(()=>{
    if(items.length === 0){
        return;
    }
    setIsButtonHighlighted(true);

    const timer = setTimeout(() => {
        setIsButtonHighlighted(false)
    }, 300);

    return (() =>{
        clearTimeout(timer)
    })
   },[items])

//    console.log(isButtonHighlighted);
    const btnClasses = `${styles.button} ${isButtonHighlighted ? styles.bump  : ''}`;

    // console.log(isButtonHighlighted);
    return <button className={btnClasses} onClick={props.onClick}>
                <span className={styles.icon}> 
                    <CartIcon /> 
                </span>
                <span>Your cart</span>
                <span className={styles.badge}>{numberOfCartItems}</span>
            </button>
}

export default CartButton;