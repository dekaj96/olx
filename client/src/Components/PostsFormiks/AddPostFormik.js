import React from 'react';
import { Formik, FieldArray, Form, isEmptyChildren } from 'formik';
import { PostData } from '../../Services/PostData';
import { ChangeData } from '../../Services/ChangeData';
const AddPostFormik = (props) => {
        return (
            <Formik
            initialValues = {props.initialValues}

            onSubmit={
                (values) => {
                    values["user"] = props.loggedUser._id;
                    PostData('posts', values)
                    .then(resPost => {
                        values.categories.forEach( id => {
                            const patchCatURL = `post-category/${id}`;
                            ChangeData(patchCatURL, {"idPost": resPost._id})
                            .catch(error => {
                                if(error){
                                    props.history.push({
                                          pathname: '/show-info',
                                          state: { detail: 'Can not insert post to category' }
                                      });
                                }
                            })
                        });

                        props.history.push({
                            pathname: '/show-info',
                            state: { detail: 'Created new post' }
                        });
                    })
                    .catch(error => {
                        if(error){
                            props.history.push({
                                pathname: '/show-info',
                                state: { detail: 'Sorry, can not create' }
                            });
                        }
                    });
                }
            }
            validate={(values) => {
                let errors = {};
                const hasNumber = myString => /\d/.test(myString);

                if(!values.categories)
                    errors.categories = 'can not be empty';

                if(!values.title)
                    errors.title = 'can not be empty';
                else if(hasNumber(values.title))
                    errors.title = 'can contain only text';
                else if (values.title.length < 8)
                    errors.title = 'this field has minimum 8 characters';

                if (values.description.length < 20)
                    errors.description = 'too short! minimum 20';

                if(values.min_price < 0)
                    errors.min_price = 'inser positive number';

                if(values.max_price > 1000000)
                    errors.max_price = 'too big number';
                else if(values.max_price < 50)
                    errors.max_price = 'too small number';

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
                        minimum cost
                        <input type="number" name="min_price" placeholder="minimum cost" value={values.min_price} onChange={handleChange}/>
                        <span>{errors.min_price}</span>
                    </label>

                    <label htmlFor="max_price">
                        maximum cost
                        <input type="number" name="max_price" placeholder="maximum cost" value={values.max_price} onChange={handleChange}/>
                        <span>{errors.max_price}</span>
                    </label>

                    <label htmlFor="city">
                        city
                        <input type="text" name="city" placeholder="city" value={values.city} onChange={handleChange}/>
                        <span>{errors.city}</span>
                    </label>

                    <label htmlFor="photo">
                        photo URL
                        <input type="text" name="photo" placeholder="photo" value={values.photo} onChange={handleChange}/>
                        <span>{errors.photo}</span>
                    </label>

                    <FieldArray
                        name="categories"
                        render={arrayHelpers => (
                            <>
                            {props.categories.map(cat => (
                                <label htmlFor="categories" key={cat._id}>
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
                    <button type="submit">Add</button>
                </form>
            )}
        />
        );
}

export default AddPostFormik;