import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

class Redirect extends Component{
    render() {
        return(
            <main className = "wrapper">
                <section className = "infoPage">
                    <h2>{this.props.location.state.detail}</h2>
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

export default Redirect;