import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLogged: false,
            loaded:false,
            currentUser: ""
        };
    }
    componentDidMount = () => {
        if (localStorage.usertoken)
            this.setState( { isLogged: true, currentUser: JSON.parse(localStorage.getItem('userLogged')) } );
        this.setState( {loaded: true });
    }

    render(){
        if (this.state.loaded)
        return(
            <nav className="navbar">
                <NavLink to="/" className="nav-link" >
                    <h1>OLX</h1>
                </NavLink>
                <ul className="navbar--itemsContainer">
                    <NavbarItem isLogged={this.state.isLogged} currentUser={this.state.currentUser}/>
                </ul>
            </nav>
        );
        return "";
    }
}

const NavbarItem = (props) => {
    if (props.isLogged) {
        const myAccountSlug = `/my-account/${props.currentUser._id}`;
        return(
            <>
            <li className = "navbar--itemsContainer--items">
                <NavLink to="/" className="nav-link" exact activeClassName="active-link">
                    show posts
                </NavLink>
            </li>
            <li className = "navbar--itemsContainer--items">
                <NavLink to="/new-post" className="nav-link" activeClassName="active-link">
                        add post
                </NavLink>
            </li>
            <li className = "navbar--itemsContainer--items">
                <NavLink to={myAccountSlug} className="nav-link" activeClassName="active-link">
                    your account
                </NavLink>
            </li>
            <li className = "navbar--itemsContainer--items">
                <NavLink to="/logout" className="nav-link" activeClassName="active-link">
                    sign out
                </NavLink>
            </li>
            </>
        );
    }
    else{
        return(
            <>
            <li className = "navbar--itemsContainer--items">
                <NavLink to="/" className="nav-link" exact activeClassName="active-link">
                    show posts
                </NavLink>
            </li>
            <li className = "navbar--itemsContainer--items">
                <NavLink to="/login" className="nav-link" activeClassName="active-link">
                    sign in
                </NavLink>
            </li>
            <li className = "navbar--itemsContainer--items">
                <NavLink to="/register" className="nav-link" activeClassName="active-link">
                    sign up
                </NavLink>
            </li>
            </>
        );
    }
}


export default Navbar;