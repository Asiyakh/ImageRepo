import './App.css';
import Post from "./post.js";
import React, { useEffect, useState } from "react";

function App() {
  const [posts, setPosts] = useState([
    {
      username: "Asiya Khan",
      caption: "Welcome",
      imageURL: "https://restauranttech.co/wp-content/uploads/2019/08/successful-shopify-stores.png"
    },
    {
      username: "Bashir Khan",
      caption: "Aadab",
      imageURL: "https://airmatrix.ca/wp-content/uploads/2020/04/Skyscrapers@3x.png"
    }
  ]);

  return (
    <div className="App">

      <div className="app__header">
        <img 
          className="app__headerImage"
          src="https://www.freelogodesign.org/file/app/client/thumb/c349777f-fae7-4030-9264-ef0a8c8430ef_200x200.png?1610773651534"
          alt=""
        />
      
      </div>

      <h1>Welcome to Snapify</h1>

      {
        posts.map(post => (
          <Post username={post.username} caption={post.caption} imageURL={post.imageURL}/>
        ))
      }

      
    </div>
  );
}

export default App;
