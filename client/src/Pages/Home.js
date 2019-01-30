import React, { Component } from 'react';
import Navbar from '../Components/Navbar';

class Homepage extends Component{
    render(){
        return(
            <>
            <Navbar />
            <main className = "wrapper">
                <h1>Hello world!</h1>
            </main>
            </>
        );
    }
}

export default Homepage;