import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import firebase from "firebase/app";

import { logo } from "./assets";
import { Home, CreatePost } from "./page";
import "./index.css";
import fireapp from "./firebase";

const App = () => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    // Check if user is already signed in
    firebase.auth(fireapp).onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  function handleSignInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleSignOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
        <Link to="/">
          <img src={logo} alt="logo" className="w-28 object-contain" />
        </Link>

        {user && (
          <Link
            to="/create-post"
            className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
          >
            Create
          </Link>
        )}
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        {user ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-post" element={<CreatePost />} />
          </Routes>
        ) : (
          <button onClick={handleSignInWithGoogle}>Sign in with Google</button>
        )}
      </main>
    </>
  );
};

export default App;
