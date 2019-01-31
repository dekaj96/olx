import React from 'react';
import { ChangeData } from '../../Services/ChangeData';
import { Formik, Form } from 'formik';

const EditUserFormik = (props) => {
    return (
        <Formik
            initialValues = {props.initValues}

            onSubmit={
                (values) => {
                    ChangeData(`user/${props.userId}`, values)
                        .then(() => {
                            props.history.push({
                                pathname: '/logout',
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
                const hasNumber = myString => /\d/.test(myString);

                const validateEmail = email => {
                    const re = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
                    return re.test(email);
                }

                const validatePhoneNumber = number => {
                    const ar = number.toString().split("");
                    return ar.length === 9 ? true : false;
                }

                let errors = {};
                if(!values.username)
                    errors.username = "can not be empty";
                else if (values.username.length < 4)
                    errors.username = 'minimum 4 characters'

                if(!values.name)
                    errors.name = "can not be empty";
                else if(hasNumber(values.name))
                    errors.name = "can not contain numbers!"

                if(!values.surname)
                    errors.surname = "can not be empty";
                else if(hasNumber(values.surname))
                    errors.surname = "can not contain numbers!"

                if(!values.email)
                    errors.email = "can not be empty";
                else if(!validateEmail(values.email))
                    errors.email = "proper email format e.g. jsmith@example.com";

                if(!values.phone_number)
                    errors.phone_number = "can not be empty";
                else if(!validatePhoneNumber(values.phone_number))
                    errors.phone_number = "phone number must have 9 digits";

                return errors;
            }}

            render={({ values, errors, handleChange }) => (
                <Form>
                        <label htmlFor="username">
                            username
                            <input type="text" name="username" placeholder="username" value={values.username} onChange={handleChange}/>
                            <span>{errors.username}</span>
                        </label>

                        <label htmlFor="name">
                            name
                            <input type="text" name="name" placeholder="name" value={values.name} onChange={handleChange}/>
                            <span>{errors.name}</span>
                        </label>

                        <label htmlFor="surname">
                            surname
                            <input type="text" name="surname" placeholder="surname" value={values.surname} onChange={handleChange}/>
                            <span>{errors.surname}</span>
                        </label>

                        <label htmlFor="email">
                            email address
                            <input type="email" name="email" placeholder="email address" value={values.email} onChange={handleChange}/>
                            <span>{errors.email}</span>
                        </label>

                        <label htmlFor="phone_number">
                            phone number
                            <input type="number" name="phone_number" placeholder="phone number" value={values.phone_number} onChange={handleChange}/>
                            <span>{errors.phone_number}</span>
                        </label>

                    <button type="submit">Change details</button>
                </Form>
            )}
        />
    );
}

export default EditUserFormik;