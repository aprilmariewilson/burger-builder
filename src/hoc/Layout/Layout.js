import React, { Component } from 'react';
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
                <Toolbar open={this.sideBarOpenHandler}/>
                <SideBar 
                open={this.state.showSideBar}
                closed ={this.sideBarCloseHandler}/>
                <main className='Content'>
                    {this.props.children}
                </main>
            </Aux>
        )
    };
};
export default Layout;