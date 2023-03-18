import React from "react";
import MealImage from '../../resources/meals.jpeg';
import CartButton from "./CartButton";
import styles from './Header.module.css'
const Header = (props) =>{
    return (
        <React.Fragment>
            <header className={styles.header}>
                <h1>React Meals</h1>
                <CartButton onClick={props.onOpen} >Your Cart</CartButton>
            </header>
            <div className={styles['main-image']}>
                <img src={MealImage} alt="" />
            </div>
        </React.Fragment>
    )
}

export default Header; 