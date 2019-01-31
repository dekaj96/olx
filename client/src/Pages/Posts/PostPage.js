import React, { Component } from 'react';
import Navbar from '../../Components/Navbar';
import {GetData} from '../../Services/GetData';

class PostPage extends Component{
    constructor(props){
        super(props);
        this.state={
            categories:[],
            posts: [],
            isLoading: false,
            error: null,
            count: null
        }
    }

    componentDidMount = () => {
        this.setState({ isLoading: true });
        GetData('posts')
          .then (result => this.setState({ posts: result.resPost, count: result.count, isLoading: false }))
          .catch(error => this.setState({ error, isLoading: false }));
        GetData('post-category')
          .then (result => this.setState({ categories: result, isLoading: false }))
          .catch(error => this.setState({ error, isLoading: false }));
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
            <section className = "exploreItems">
              <h1>
                    {this.state.count} posts.
              </h1>
              <PostListContainer categories={this.state.categories} posts={this.state.posts}/>
            </section>
        </main>
      </>
      );
    }
}

class PostListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { selectedCat: "" };
    }

    handleChange = e => {
        e.preventDefault();
        if (e.target.value !== "All")
            this.setState({ selectedCat: e.target.value });
        else
            this.setState({ selectedCat: "" });
    }
    render() {
        const { posts } = this.props;
        const { categories } = this.props;
        const { selectedCat } = this.state;

        const postsToPass =
        selectedCat.length === 0
            ? posts
            : posts.filter(posts =>  posts.categories.includes(selectedCat));

        return (
        <>
            Select category
            <select name="categorySelect" onChange={this.handleChange} value={this.state.selectedCat}>
                <option default={true} value="All">All</option>
                {categories.map((cat) => <option value={cat._id} key={cat._id}> {cat.name} </option>)}
            </select>
            <PostList posts={postsToPass} />
        </>
        );
    }
}

class PostList extends Component {
    postsToPostItem = pro => {
        const id = pro._id;
        const title = pro.title;
        const description = pro.description;
        const photo = pro.photo;
        const min_price = pro.min_price;
        const max_price = pro.max_price;
        const city = pro.city;
        return (
            <PostItem
            key={id}
            id={id}
            title={title}
            description={description}
            photo={photo}
            min_price={min_price}
            max_price={max_price}
            city={city}
            />
        );

    };
    render() {
      if (this.props.posts.length > 0)
        return (
          <ul className="exploreItems-container">
            {this.props.posts.map(this.postsToPostItem)}
          </ul>
        );
      return <p>Empty</p>;
    }
  }

  const PostItem = ({
    id, title, description,photo,min_price,max_price,city
  }) => {
    return (
      <li key={id} className="single-post">
            <header>
                <img src={photo} alt={title} />
                <h2>{title}</h2>
                <h3>{city}</h3>
            </header>
            <section>
                <div>
                    <p>
                        {description}
                    </p>
                </div>
                <div>
                    <p>
                        Cost: ${min_price} - ${max_price}
                    </p>
                </div>

            </section>
      </li>
    );
  };

export default PostPage;