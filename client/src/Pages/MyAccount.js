import React, { Component } from 'react';
import Navbar from '../Components/Navbar';
import { ChangeData } from '../Services/ChangeData';
import { GetData } from '../Services/GetData';
import { DeleteData } from '../Services/DeleteData';
import { Formik } from 'formik';
import { NavLink } from 'react-router-dom';

class MyAccount extends Component{
    constructor(props){
        super(props);
        this.state={
            userAccount: JSON.parse(localStorage.getItem('userLogged')),
            userPosts: [],
            isLoading: true,
            error: null
        }
    }

    componentDidMount = () => {
        GetData(`posts/${this.state.userAccount._id}`)
        .then(userPosts => this.setState({ userPosts, isLoading: false }))
        .catch(error => this.setState({ error, isLoading: false }))
    }

    onClickRemove = userId => {
        const removeDataURL = `user/${userId}`;
        DeleteData(removeDataURL)
        .then(() => {
            this.props.history.push({
                pathname: '/logout',
                state: { detail: 'Your account had been deleted' }
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
            <main className = "wrapper">
                <h1 className="myAccount-welcome">
                    Hello {this.state.userAccount.name}! You're logged as {this.state.userAccount.accountType}.
                </h1>
                <section className = "myAccount-wrapper">
                    <div>
                        <figure>
                            <img
                                className="userAvatar"
                                src={this.state.userAccount.avatar}
                                alt={this.state.userAccount.username}
                            />
                            <figcaption>
                                <h2>
                                    {this.state.userAccount.username}
                                </h2>
                            </figcaption>
                        </figure>

                        <button
                            className = "btn--delete"
                            onClick={() => { this.onClickRemove(this.state.userAccount._id) }}
                        >
                            Delete account
                        </button>
                    </div>
                    <div className = "myAccount-data">
                        <CustomForm
                            history={this.props.history}
                            initValues={this.state.userAccount}
                            accType={this.state.userAccount.accountType}
                            userId={this.state.userAccount._id}
                        />
                    </div>
                </section>

                <section className = "myAccount-yourProjects">
                    <header>
                        <h2>Your projects</h2>
                    </header>
                    <UserPosts posts={this.state.userPosts} />
                </section>
            </main>
            </>
        );
    }
}

const CustomForm = (props) => {
    return (
        <Formik
            initialValues = {props.initValues}

            onSubmit={
                (values) => {
                    ChangeData(`user/${props.userId}`, values)
                        .then(() => {
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

            render={({ values, errors, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
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
                </form>
            )}
        />
    );
}

class UserPosts extends Component {
    projectToProjectItem = pro => {
        const id = pro._id;
        const title = pro.title;
        const description = pro.description;
        const min_price = pro.min_price;
        const max_price = pro.max_price;
        return (
            <ProjectItem
            key={id}
            id={id}
            title={title}
            description={description}
            min_price={min_price}
            max_price={max_price}
            />
        );
    };
    render() {
      if (this.props.posts.length > 0)
        return (
          <ul className="exploreItems-container">
            {this.props.posts.map(this.projectToProjectItem)}
          </ul>
        );
      return <p>No results found...</p>;
    }
  }

const ProjectItem = ({
    id,
    title,
    description,
    min_price,
    max_price
  }) => {
    const projectURL = `/post-edit/${JSON.parse(localStorage.getItem('userLogged'))._id}/${id}`;
    return (
      <li key={id} className="single-post">
            <header>
                <h5>{title}</h5>
            </header>
            <section>
                <p>{description}</p>
                <p>cost range: <span>${min_price}</span> - ${max_price}</p>
            </section>
            <NavLink to={projectURL}>
                <button type="button">
                    Edit
                </button>
            </NavLink>
      </li>
    );
  };

export default MyAccount;