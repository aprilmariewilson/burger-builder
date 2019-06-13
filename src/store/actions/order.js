import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';

export const purchaseSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_SUCCESS,
        orderId: id,
        orderData
    };
};
export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};
export const purchaseFail = (error) => {
    return {
        type: actionTypes.PURCHASE_FAIL,
        error
    };
};
export const orderStart = () => {
    return {
        type: actionTypes.ORDER_START
    };
};
export const purchaseAttempt = (orderData) => {
    return dispatch => {
        dispatch(orderStart());
        axios.post('/orders.json', orderData)
            .then(res => {
                dispatch(purchaseSuccess(res.data.name, orderData));

            })
            .catch(error => {
                dispatch(purchaseFail(error));
            });
    };
};
export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders
    };
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,
    }
};
export const getOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch(err => {
                dispatch(fetchOrdersFail(err));
            })

    }
}