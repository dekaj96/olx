import React from 'react';
import { Formik, Form } from 'formik';
import { PostData } from '../../Services/PostData';

const RegisterUserFormik = (props) => {
    return (
        <Formik
        onSubmit={
            (values) => {
                PostData('auth/register', values)
                .then(newUser => {
                    props.history.push({
                        pathname: '/show-info',
                        state: { detail: 'You have been registered!' }
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
            const hasNumber = myString => /\d/.test(myString);

            const validateEmail = email => {
                const re = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
                return re.test(email);
            }

            const validBirthDate = date => {
                const birthDate  = new Date(date);
                const tooBigDate = new Date();
                tooBigDate.setFullYear(tooBigDate.getFullYear() - 18);
                const tooSmallDate  = new Date("1920-01-01");
                if(birthDate < tooSmallDate)
                    return false;
                else if(birthDate > tooBigDate)
                    return false;
                return true
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

            if(!values.password)
                errors.password = "can not be empty"
            else if (values.password.length < 5)
                errors.password = 'minimum 5 characters'

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

            if(!validBirthDate(values.birth))
                errors.birth = "enter your real birth date"

            return errors;
        }}
        render={({ values, errors, handleChange }) => (
            <Form>

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

                <label htmlFor="birth">
                    birth date
                    <input type="date" name="birth" placeholder="birth date" value={values.birth} onChange={handleChange}/>
                    <span>{errors.birth}</span>
                </label>

                <button type="submit">Submit</button>
            </Form>
        )}
    />
    );
}

export default RegisterUserFormik;