import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import './ContactData.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }
    orderHandler = (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'april wilson',
                address: {
                    street: 'main street',
                    zipCode: '12345',
                    country: 'USA'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(res => {
                this.setState({ loading: false});
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false});
            });

    }

    render() {
        let form = (
            <form>
            <input className='Input' type='text' name='name' placeholder='Your Name' />
            <input className='Input' type='email' name='email' placeholder='Your Email' />
            <input className='Input' type='text' name='address' placeholder='Address' />
            <input className='Input' type='text' name='postal' placeholder='your Postal Code' />
            <Button className='Input' btnType='Success' clicked={this.orderHandler}>ORDER</Button>
        </form>
        );
        if (this.state.loading) { 
            form = <Spinner/>
        }
        return (
            <div className='ContactData'>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;