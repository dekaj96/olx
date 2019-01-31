import React, { Component } from 'react';
import Navbar from '../../Components/Navbar';
import { GetData } from '../../Services/GetData';
import AddPostFormik from '../../Components/PostsFormiks/AddPostFormik'

class CreateProject extends Component{
    constructor(props){
        super(props);
        this.state={
            categories: [],
            loggedUser: "",
            isLoading: true,
            error: null
        }
    }

    componentDidMount(){
        this.setState({ loggedUser: JSON.parse(localStorage.getItem('userLogged')) });
        GetData('post-category')
        .then(result => this.setState({ categories: result, isLoading: false }))
        .catch(error => this.setState({ error, isLoading: false }));
    }

    render(){
        if(this.state.error){
            this.props.history.push({
                pathname: '/show-info',
                state: { detail: "Oops something went wrong!" }
            });
        }
        if (this.state.isLoading)
            return  <p>Loading...</p>
        return(
            <>
            <Navbar/>
            <main className = "regPage">
                <section className = "form-wrapper">
                    <h1>Add new post</h1>
                    <AddPostFormik
                        history={this.props.history}
                        categories={this.state.categories}
                        loggedUser={this.state.loggedUser}
                        initialValues={{ categories: [] }}
                    />
                </section>
            </main>
            </>
        );
    }
}

export default CreateProject;