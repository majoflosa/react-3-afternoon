import React, { Component } from 'react';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post';

import axios from 'axios';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get( 'https://practiceapi.devmountain.com/api/posts' )
      .then( response => {
        // console.log( response.data );
        this.setState({ posts: response.data });
      })
      .catch( () => console.log('Error: Something went wrong with the get request.') );
  }

  updatePost( id, text ) {
    axios.put( `https://practiceapi.devmountain.com/api/posts?id=${id}`, {text} )
      .then( response => {
        console.log( 'Post was updated successfully.' );
        this.setState({ posts: response.data });
      })
      .catch( () => console.log(`Could not update post - id: ${id}, text: ${text}`) );
    // console.log( '{text}: ', {text} );
    // console.log( 'text: ', text );
  }

  deletePost( id ) {
    axios.delete( `https://practiceapi.devmountain.com/api/posts?id=${id}`)
      .then( response => {
        console.log( 'Post was deleted successfully.' );
        this.setState({ posts: response.data });
      })
      .catch( () => console.log(`Could not delete post - id: ${id}`) );
  }

  createPost( text ) {
    axios.post( 'https://practiceapi.devmountain.com/api/posts', {text} )
      .then( response => {
        console.log( 'Post was created successfully' );
        this.setState({ posts: response.data });
      })
      .catch( () => console.log('Post could not be created.') );
  }

  render() {
    const { posts } = this.state;

    let displayPosts = posts.map( post => {
      return (
        <Post 
          key={ post.id }
          text={ post.text } 
          date={ post.date }
          updatePostFn={ this.updatePost }
          id={ post.id }
          deletePostFn={ this.deletePost }
        />
      );
    });

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={ this.createPost } />

          { displayPosts }
          
        </section>
      </div>
    );
  }
}

export default App;
