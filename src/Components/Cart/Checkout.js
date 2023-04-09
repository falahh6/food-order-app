import React from "react";
import { useState } from "react";
import { useRef } from "react";
import styles from './Checkout.module.css'

const isEmpty = value => value.trim() === '';
const isSixChars = value => value.trim().length === 6;

const Checkout = (props) => {
    const [formValidity, setFormValidity] = useState({
        name : true,
        email : true,
        pincode : true,
        address : true,
        phonenumber : true
    })
    
    const nameInputRef = useRef();
    const emailInputRef = useRef();
    const pincodeInputRef = useRef();
    const addressInputRef = useRef();
    const phonenumberInputRef = useRef();


    const submitHandler = (event) => {
        event.preventDefault();
       
        const enteredName = nameInputRef.current.value;
        const enteredEmail = emailInputRef.current.value;
        const enteredPincode = pincodeInputRef.current.value;
        const enteredAddress = addressInputRef.current.value;
        const enteredPhonenumber = phonenumberInputRef.current.value;

        const nameIsValid = !isEmpty(enteredName);
        const emailIsValid = !isEmpty(enteredEmail);
        const pincodeIsValid = isSixChars(enteredPincode);
        const addressIsValid = !isEmpty(enteredAddress);
        const phonenumberIsValid = !isEmpty(enteredPhonenumber);

        setFormValidity({
            name : nameIsValid,
            email : emailIsValid,
            pincode : pincodeIsValid,
            address : addressIsValid,
            phonenumber : phonenumberIsValid
        })

        if(!nameIsValid){
            nameInputRef.current.focus();
        } else if(!emailIsValid){
            emailInputRef.current.focus();
        }else if(!pincodeIsValid){
            pincodeInputRef.current.focus();
        }else if(!addressIsValid){
            addressInputRef.current.focus();
        }else if(!phonenumberIsValid){
            phonenumberInputRef.current.focus();
        }

        const formIsValid = nameIsValid && emailIsValid && pincodeIsValid && addressIsValid && phonenumberIsValid;

        if(!formIsValid){
            return;
        }

        const userData = {
            name : enteredName,
            email : enteredEmail,
            address : enteredAddress,
            pincode : enteredPincode,
            phonenumber : enteredPhonenumber
         }

        nameInputRef.current.value = '';
        emailInputRef.current.value = '';
        addressInputRef.current.value = '';
        pincodeInputRef.current.value = '';
        phonenumberInputRef.current.value = '';

        props.onConfirm(userData);
    }

    const nameControlStyles = `${styles.control} ${
        formValidity.name ? '' : styles.invalid
      }`;
      const emailControlStyles = `${styles.control} ${
        formValidity.email ? '' : styles.invalid
      }`;
      const pincodeControlStyles = `${styles.control} ${
        formValidity.pincode ? '' : styles.invalid
      }`;
      const addressControlStyles = `${styles.control} ${
        formValidity.address ? '' : styles.invalid
      }`;
      const phonenumberControlStyles = `${styles.control} ${
        formValidity.address ? '' : styles.invalid
      }`;

    return (
       <div>
        <hr className={styles.br} />
         <h3 className={styles.h3}>Check out your Order</h3>
            <form action="" className={styles.form} onSubmit={submitHandler}>
                <div className={nameControlStyles}>
                    <label htmlFor="name">Name : </label>
                    <input ref={nameInputRef} type="text" id="name"/>
                    { !formValidity.name && <p>Please enter Valid Name</p> }
                </div>
                <div className={emailControlStyles}>
                    <label htmlFor="e-mail">E-Mail</label>
                    <input ref={emailInputRef} type="email" id="e-mail"/>
                    { !formValidity.email && <p>Please enter Valid Email</p> }
                </div>
               <div className={pincodeControlStyles}>
                    <label htmlFor="pin-code">Pin-code :</label>
                    <input ref={pincodeInputRef} type="text" id="pin-code" />
                    { !formValidity.pincode && <p>Please enter Valid Pin code</p> }
               </div>
                <div className={addressControlStyles}>
                    <label htmlFor="address">Address : </label>
                    <input ref={addressInputRef} type="text" id="address"/>
                    { !formValidity.address && <p>Please enter Valid Address</p> }
                </div>
                <div className={phonenumberControlStyles}>
                    <label htmlFor="phone-number ">Phone Number : </label>
                    <input ref={phonenumberInputRef} type="number" id="phone-number"/>
                    { !formValidity.phonenumber && <p>Please enter Valid Phone number</p> }
                </div>
                <div className={styles.actions}>
                    <button onClick={props.onCancel}>Cancel</button>
                    <button className={styles.submit}>Confirm</button>
                </div>
            </form>
       </div>
    )
}

export default Checkout;