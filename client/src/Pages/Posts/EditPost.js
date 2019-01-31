import React, { Component } from 'react';
import Navbar from '../../Components/Navbar';
import { GetData } from '../../Services/GetData';
import { DeleteData } from '../../Services/DeleteData';
import EditPostFormik from '../../Components/PostsFormiks/EditPostFormik';

class EditPost extends Component{
    constructor(props){
        super(props);
        this.state={
            categories: [],
            post: "",
            isLoading: true,
            error: null
        }
    }

    componentDidMount() {
        const apiURL = `posts/${this.props.match.params.postId}`;
        GetData(apiURL)
            .then(post => this.setState({ post, isLoading: false }))
            .catch(error => this.setState({ error, isLoading: false }));

        GetData('post-category')
            .then(categories => this.setState({ categories, isLoading: false }))
            .catch(error => this.setState({ error, isLoading: false }));
    }

    onClickRemove = projectId => {
        const removeDataURL = `posts/${projectId}`;
        DeleteData(removeDataURL)
        .then(data => {
            this.props.history.push({
                pathname: '/show-info',
                state: { detail: 'You have successfully removed your post' }
            });
        })
        .catch(error => {
            if(error){
                this.props.history.push({
                      pathname: '/show-info',
                      state: { detail: 'Something went wrong' }
                  });
            }
        });
    }

    render(){
        if(this.state.error){
            this.props.history.push({
                pathname: '/show-info',
                state: { detail: this.state.error.message }
            });
        }
        if (this.state.isLoading)
            return  <p>Loading...</p>
        return(
        <>
        <Navbar />
        <main className = "regPage">
            <section className = "form-wrapper edit-post">
            <button
                    className = "btn--delete"
                    onClick={() => { this.onClickRemove(this.state.post._id) }}
                    >
                    Delete post
                    </button>
                <header>
                    <h1>Edit project</h1>
                </header>
                <EditPostFormik
                    history={this.props.history}
                    initialValues={this.state.post}
                    categories={this.state.categories}
                    postId={this.state.post._id}
                />
            </section>
         </main>
         </>
        );
    }
}

export default EditPost;