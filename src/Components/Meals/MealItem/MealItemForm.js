import React from "react";
import Input from "../../UI/Input";
import styles from './MealItemForm.module.css';
const MealItemForm = (props) =>{
    return <form className={styles.form} action="">
                <Input  
                    label = 'Amount'
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
            </form>
}

export default MealItemForm;