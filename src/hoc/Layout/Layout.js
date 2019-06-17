import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../Auxilary/Auxilary';
import './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideBar from '../../components/Navigation/SideBar/SideBar.js';

class Layout extends Component {
    state = {
        showSideBar: false
    }
    sideBarCloseHandler = () => {
        this.setState({showSideBar: false});
    };
    sideBarOpenHandler = () => {
        this.setState((prevState)=>{
            return {showSideBar: !prevState.showSideBar};
        });
    };

    render() {
        return (
            <Aux>
                <Toolbar isAuth={this.props.isAuthenticated} open={this.sideBarOpenHandler}/>
                <SideBar 
                isAuth={this.props.isAuthenticated}
                open={this.state.showSideBar}
                closed ={this.sideBarCloseHandler}/>
                <main className='Content'>
                    {this.props.children}
                </main>
            </Aux>
        )
    };
};
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}
export default connect(mapStateToProps)(Layout);