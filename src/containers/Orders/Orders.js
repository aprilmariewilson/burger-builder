import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import './Orders';
import Order from '../../components/Order/Order';
import * as actions from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    componentDidMount() {
        this.props.getOrders(this.props.token);
    }

    render() {
        let orders = <Spinner />;
        if (!this.props.loading) {
            orders = this.props.orders.map( order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />
            ))

        }
        return (
            <div>
                {orders}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getOrders: (token) => dispatch(actions.getOrders(token))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));