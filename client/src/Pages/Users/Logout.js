import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

class Logout extends Component{
    constructor(props){
        super(props);
            this.state = { username: "" };
    }
    componentDidMount() {
        const us = JSON.parse(localStorage.getItem('userLogged'));
        this.setState({username: us.username});
        localStorage.clear();
    }

    render() {
        return(
            <main className = "wrapper">
                <section className = "infoPage">
                    <h2>hope to see you again soon, {this.state.username}!</h2>
                    <NavLink to='/'>
                        <button type="button">
                            Home
                        </button>
                    </NavLink>
                </section>
            </main>
        );
    }
}

export default Logout;