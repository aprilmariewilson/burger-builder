import React from 'react';
import Ingredient from './Ingredients/Ingredient';
import './Burger.css';

const Burger = (props) => {
    let newIngredients = Object.keys( props.ingredients )
    .map( igKey => {
        return [...Array( props.ingredients[igKey] )].map( ( _, i) => {
            return <Ingredient key={igKey +i} type={igKey} />;
        });
    })
    .reduce((arr, el) => {
        return arr.concat(el)
    }, []);
    if(newIngredients.length === 0){
     newIngredients = <p>Please start creating your burger!</p> 
    }
    return(
        <div className='Burger'>
        <Ingredient type='bread-top'/>
        {newIngredients}
        <Ingredient type='bread-bottom'/>
        </div>
    );
}
export default Burger;