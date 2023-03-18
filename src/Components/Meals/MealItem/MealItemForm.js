import React, { useRef, useState } from "react";
import Input from "../../UI/Input";
import styles from './MealItemForm.module.css';
const MealItemForm =  (props) =>{

    const [amountIsValid, setAmountIsValid] = useState(true);

    const inputAmountRef = useRef();
    
    const submitHandler = (event) =>{
        event.preventDefault();

        const enteredAmount = inputAmountRef.current.value;
        const enteredAmountNumber = +enteredAmount;
        
        console.log(inputAmountRef);
        if(enteredAmount.trim().length === 0 || enteredAmountNumber < 1){
            setAmountIsValid(false)
            return;
        }

        props.onAddItem(enteredAmount);
    }

    return <form className={styles.form} onSubmit={submitHandler}>
                <Input  
                    label = 'Amount'
                    ref={inputAmountRef}
                    input = {{
                        id : 'amount_' + props.id,
                        type : 'number',
                        step : '1',
                        min : '1',
                        max : '5',
                        defaultValue : '1'
                    }}
                />
                <button>+ Add</button>
                { !amountIsValid && <p>Please enter Valid Amount 1-5</p> }
            </form>
}

export default MealItemForm;