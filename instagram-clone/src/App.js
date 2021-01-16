import './App.css';
import Post from "./post.js";
import React, { useEffect, useState } from "react";
import { db } from "./firebase.js";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);

  useEffect (() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id, 
        post : doc.data()
      })));
    })
  }, [])

const signUp = (event) => {

}

  return (
    <div className="app">
        <Modal 
         open={open}
         onClose={() => setOpen(false)}
        >
          <div style={modalStyle} className={classes.paper}>
            <h2>I am a modal </h2>
          </div>
        </Modal>

      <div className="app__header">
        <img 
          className="app__headerImage"
          src="https://www.freelogodesign.org/file/app/client/thumb/c349777f-fae7-4030-9264-ef0a8c8430ef_200x200.png?1610773651534"
          alt=""
        />
      
      </div>

      <Button onClick={() => setOpen(true)}>Sign Up</Button>

      <h1>Welcome to Snapify</h1>

      {
        posts.map(({id, post}) => (
          <Post username={post.username} caption={post.caption} imageURL={post.imageURL}/>
        ))
      }

      
    </div>
  );
}

export default App;
