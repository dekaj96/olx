import React, { Component } from 'react';
import Navbar from '../Components/Navbar';
import { GetData } from '../Services/GetData';
import { ChangeData } from '../Services/ChangeData';
import { DeleteData } from '../Services/DeleteData';
import { Formik, FieldArray } from 'formik';

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
            <section className = "form-wrapper edit-project">
            <button
                    className = "btn--delete"
                    onClick={() => { this.onClickRemove(this.state.project._id) }}
                    >
                    Delete post
                    </button>
                <header>
                    <h1>Edit project</h1>
                </header>
                <CustomForm
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


const CustomForm = (props) => {
    return (
        <Formik
            initialValues = {props.initialValues}

            onSubmit={
                (values) => {
                    ChangeData(`posts/${props.postId}`, values)
                        .then(data => {
                            props.history.push({
                                pathname: '/show-info',
                                state: { detail: 'Data has been changed' }
                            });
                        })
                        .catch(error => {
                            if(error){
                                props.history.push({
                                      pathname: '/show-info',
                                      state: { detail: 'Something went wrong' }
                                  });
                            }
                        });
                    }
            }

            validate={(values) => {
                let errors = {};

                const validBirthDate = date => {
                    const esDate  = new Date(date);
                    const now = new Date();
                    if(esDate < now)
                        return false;
                    return true
                }

                const hasNumber = myString => /\d/.test(myString);

                if(!values.title)
                    errors.title = 'can not be empty';
                else if(hasNumber(values.title))
                    errors.title = 'can contain only text';
                else if (values.title.length < 8)
                    errors.title = 'this field has minimum 8 characters';

                if (values.description.length < 20)
                    errors.description = 'this field has minimum 20 characters';

                if(values.min_price < 0)
                    errors.min_price = 'really?';

                if(values.max_price > 1000000)
                    errors.max_price = 'really?';

                return errors;
            }}

            render={({ values, errors, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit}>

                <label htmlFor="title">
                    title
                    <input type="text" name="title" placeholder="title" value={values.title} onChange={handleChange}/>
                    <span>{errors.title}</span>
                </label>

                <label htmlFor="description">
                    description
                    <textarea name="description" value={values.description} onChange={handleChange} rows="10" />
                    <span>{errors.description}</span>
                </label>

                <label htmlFor="min_price">
                    minimum price
                    <input type="number" name="min_price" placeholder="minimum price" value={values.min_price} onChange={handleChange}/>
                    <span>{errors.min_price}</span>
                </label>

                <label htmlFor="max_price">
                    maximum price
                    <input type="number" name="max_price" placeholder="maximum price" value={values.max_price} onChange={handleChange}/>
                    <span>{errors.max_price}</span>
                </label>

                <FieldArray
                    name="categories"
                    render={arrayHelpers => (
                        <>
                        {props.categories.map(cat => (
                            <label htmlFor="categories">
                            {cat.name}
                                <input
                                    name="categories"
                                    type="checkbox"
                                    value={cat._id}
                                    checked={values.categories.includes(cat._id)}
                                    onChange={e => {
                                        if (e.target.checked)
                                            arrayHelpers.push(cat._id);
                                        else{
                                            const idx = values.categories.indexOf(cat._id);
                                            arrayHelpers.remove(idx);
                                        }
                                    }}
                                />
                            </label>
                        ))}
                        </>
                    )}
                />

                <button type="submit">Change</button>
                </form>
            )}
        />
    );
}


export default EditPost;