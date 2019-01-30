import React, { Component } from 'react';
import Navbar from '../Components/Navbar';
import { PostData } from '../Services/PostData';
import { Formik } from 'formik';

class Signin extends Component{
    constructor(props) {
        super(props);
        this.state = {
            error: null
        };
    }

    render(){
        return(
            <>
            <Navbar />
            <main className = "regPage">
                <section className = "form-wrapper">
                    <h1>
                        Welcome back
                    </h1>
                    <CustomForm
                        history={this.props.history}
                    />
                </section>
            </main>
            </>
        );
    }
}


const CustomForm = (props) => {
    return (
        <Formik
            onSubmit={
                (values) => {
                PostData('auth/login', values)
                    .then(data => {
                        localStorage.setItem('usertoken', data.token);
                        localStorage.setItem('userLogged', JSON.stringify(data.user));
                        props.history.push({
                            pathname: '/show-info',
                            state: { detail: 'Logged in' }
                        });
                    })
                    .catch(error => {
                        if(error){
                            props.history.push({
                                  pathname: '/show-info',
                                  state: { detail: 'Invalid username or password' }
                              });
                        }
                    });
                }
            }
            validate={(values) => {
                let errors = {};
                if(!values.username){
                    errors.username = "username can not be empty";
                }
                else if (values.username.length < 4){
                    errors.username = 'this field has minimum 4 characters'
                }
                if(!values.password){
                    errors.password = "password can not be empty"
                }
                else if (values.password.length < 5){
                    errors.password = 'this field has minimum 5 characters'
                }

                return errors;
            }}
            render={({ values, errors, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">
                        username
                        <input type="text" name="username" placeholder="username" value={values.username} onChange={handleChange}/>
                        <span>{errors.username}</span>
                    </label>
                    <label htmlFor="password">
                        password
                        <input type="password" name="password" placeholder="password" value={values.password} onChange={handleChange}/>
                        <span>{errors.password}</span>
                    </label>
                    <button type="submit">Log in</button>
                </form>
            )}
        />
    );
}
export default Signin;