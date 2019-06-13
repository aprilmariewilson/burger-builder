import React from 'react';
import './CheckoutSummery.css';
import Burger from '../../Burger/Burger';
import Button from "../../UI/Button/Button";

const CheckoutSummery = (props) => {
    return(
        <div className="CheckoutSummery">
        <h1>Enjoy your Burger!</h1>
        <div className='burgerDiv'>
        <Burger ingredients={props.ingredients}/>
        </div>
        <Button 
        btnType="Danger"
       clicked={props.checkoutCancelled}>CANCEL</Button>
        <Button btnType="Success"
        clicked={props.checkoutContinued}>CONTINUE</Button>
        </div>
    );
}
export default CheckoutSummery;