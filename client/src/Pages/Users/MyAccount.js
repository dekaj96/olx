import React, { Component } from 'react';
import Navbar from '../../Components/Navbar';
import { GetData } from '../../Services/GetData';
import { DeleteData } from '../../Services/DeleteData';
import { NavLink } from 'react-router-dom';
import EditUserFormik from '../../Components/UsersFormiks/EditUserFormik'

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
                    {this.state.userAccount.name}, you can now edit your profile.
                </h1>
                <section className = "myAccount-wrapper">
                    <div className = "myAccount-data">
                        <EditUserFormik
                            history={this.props.history}
                            initValues={this.state.userAccount}
                            accType={this.state.userAccount.accountType}
                            userId={this.state.userAccount._id}
                        />
                    </div>
                    <button
                            className = "btn--delete"
                            onClick={() => { this.onClickRemove(this.state.userAccount._id) }}
                        >
                            Delete account
                    </button>
                </section>

                <section className = "myAccount-posts">
                    <header>
                        <h2>Your posts list</h2>
                    </header>
                    <UserPosts posts={this.state.userPosts} />
                </section>
            </main>
            </>
        );
    }
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
    min_price,
    max_price
  }) => {
    const projectURL = `/post-edit/${JSON.parse(localStorage.getItem('userLogged'))._id}/${id}`;
    return (
      <li key={id} className="single-post">
            <header>
                <h2>{title}</h2>
            </header>
            <section>
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