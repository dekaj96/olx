import React, { Component } from 'react';
import Navbar from '../../Components/Navbar';
import RegisterUserFormik from '../../Components/UsersFormiks/RegisterUserFormik'
class Register extends Component{
    constructor(props) {
        super(props);
        this.state={
            error: null
        };
    }

    render(){
        if(this.state.error){
            this.props.history.push({
                pathname: '/show-info',
                state: { detail: "Oops something went wrong!" }
            });
        }
        return(
            <>
            <Navbar />
            <main className = "regPage">
                <section className = "form-wrapper">
                    <h1>
                        Create account
                    </h1>
                    <RegisterUserFormik
                        history={this.props.history}
                    />
                </section>
            </main>
            </>
        );
    }
}
export default Register;