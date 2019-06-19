import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Inputs/Inputs';
import Spinner from '../../components/UI/Spinner/Spinner';
import './Auth.css'
import * as actions from '../../store/actions/index';
import { checkValidity } from '../../shared/utility';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        signedUp: true
    }

    componentDidMount(){
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
            this.props.setAuthPath();
        };
    };
    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { signedUp: !prevState.signedUp };
        })
    };
    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({ controls: updatedControls });
    };

 
    submitHandler = (event) => {
        event.preventDefault();
        this.props.auth(this.state.controls.email.value, this.state.controls.password.value, this.state.signedUp);
    }
    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                touched={formElement.config.touched}
                shouldValidate={formElement.config.validation}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
        ));
        if (this.props.loading) {
            form = <Spinner />
        }
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }
        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }

        return (
            <div className='Auth'>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType='Success'>SUBMIT</Button>
                    <Button
                        clicked={this.switchAuthModeHandler}
                        btnType='Danger'>SWITCH TO {this.state.signedUp ? 'LOG IN' : 'CREATE ACCOUNT'}</Button>
                </form>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burger.building,
        authRedirectPath: state.auth.authRedirect
    }
};
const mapDispatchToProps = dispatch => {
    return {
        auth: (email, password, signedUp) => dispatch(actions.auth(email, password, signedUp)),
        setAuthPath: () => dispatch(actions.authRedirectPath('/'))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth);