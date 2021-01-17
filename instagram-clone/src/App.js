import './App.css';
import Post from "./post.js";
import React, { useEffect, useState } from "react";
import { db, auth } from "./firebase.js";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import ImageUpload from './ImageUpload';

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
  const [openSignIn, setOpenSignIn] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [modalStyle] = useState(getModalStyle);
  const [user, setUser] = useState(null)


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser){
        console.log(authUser);
        setUser(authUser);

      } else {
        setUser(null)
      }
    })
    return () => {
      unsubscribe();
    }
  }, [user, username]);

  useEffect (() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id, 
        post : doc.data()
      })));
    })
  }, [])

  const signUp = (event) => {
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message))
    setOpen(false)
  }

  const signIn = (event) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message))
    setOpenSignIn(false)
  }


  return (
    <div className="app">
      {user?.displayName ? (
        <ImageUpload username={user.displayName}/>
      ) : (
        <h3>Sorry, Login to Upload</h3>
      )}


        <Modal 
         open={open}
         onClose={() => setOpen(false)}
        >
          <div style={modalStyle} className={classes.paper}>
            <form className="app__SignUp">
              <center>
                <img
                  className="app__HeaderImage"
                  src="https://www.freelogodesign.org/file/app/client/thumb/c349777f-fae7-4030-9264-ef0a8c8430ef_200x200.png?1610773651534"
                  alt=""
                />
              </center>
                <Input
                  placeholder="username"
                  type='username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                  placeholder="email"
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="password"
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

              <Button type="submit" onClick={signUp}>Sign Up</Button>
            </form>
          </div>
        </Modal>

        <Modal 
         open={openSignIn}
         onClose={() => setOpenSignIn(false)}
        >
          <div style={modalStyle} className={classes.paper}>
            <form className="app__SignUp">
              <center>
                <img
                  className="app__HeaderImage"
                  src="https://www.freelogodesign.org/file/app/client/thumb/c349777f-fae7-4030-9264-ef0a8c8430ef_200x200.png?1610773651534"
                  alt=""
                />
              </center>
                <Input
                  placeholder="email"
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="password"
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

              <Button type="submit" onClick={signIn}>Sign In</Button>
            </form>
          </div>
        </Modal>
      <div className="app__header">
        <img 
          className="app__headerImage"
          src="https://www.freelogodesign.org/file/app/client/thumb/c349777f-fae7-4030-9264-ef0a8c8430ef_200x200.png?1610773651534"
          alt=""
        />
      
      </div>
      {user ? (
        <Button onClick={() => auth.signOut()}>Sign Out</Button>
      ) : (
        <div className="app__LoginContaier">
           <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>
      )}

      <h1>Welcome to Snapify</h1>

      {
        posts.map(({id, post}) => (
          <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
        ))
      }

      
    </div>
  );
}

export default App;
