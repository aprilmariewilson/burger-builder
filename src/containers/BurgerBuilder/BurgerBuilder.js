import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import Aux from '../../hoc/Auxilary/Auxilary';
import * as actionCreators from '../../store/actions/index';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


export class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    }
    componentDidMount() {
        this.props.initIngredients();
    }
    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true });
        } else {
            this.props.pathRedirect('/checkout');
            this.props.history.push('/auth');
        }
    };
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    };
    purchaseContinueHandler = () => {
        this.props.initPurchase();
        this.props.history.push('/checkout')
    };
    render() {
        const disable = {
            ...this.props.ing
        };
        for (let key in disable) {
            disable[key] = disable[key] <= 0
        }
        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />
        if (this.props.ing) {
            burger = (<Aux>
                <Burger ingredients={this.props.ing} />
                <BuildControls
                    ingredientsAdded={this.props.ingredientAdded}
                    ingredientsRemoved={this.props.ingredientRemoved}
                    disabled={disable}
                    isAuth={this.props.isAuthenticated}
                    price={this.props.price}
                    purchasable={this.updatePurchaseState(this.props.ing)}
                    ordered={this.purchaseHandler}
                />
            </Aux>
            );
            orderSummary = <OrderSummery
                purchaseContinued={this.purchaseContinueHandler}
                purchaseCancelled={this.purchaseCancelHandler}
                ingredients={this.props.ing}
                price={this.props.price} />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    };
}
const mapStateToProps = state => {
    return {
        ing: state.burger.ingredients,
        price: state.burger.totalPrice,
        error: state.burger.error,
        isAuthenticated: state.auth.token !== null
    };
}
const mapDispatchToProps = dispatch => {
    return {
        initIngredients: () => dispatch(actionCreators.initIngredients()),
        ingredientAdded: (ingName) => dispatch(actionCreators.addIngredient(ingName)),
        ingredientRemoved: (ingName) => dispatch(actionCreators.removeIngredient(ingName)),
        initPurchase: () => dispatch(actionCreators.purchaseInit()),
        pathRedirect: (path) => dispatch(actionCreators.authRedirectPath(path))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));