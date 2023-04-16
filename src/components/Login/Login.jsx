import React, { useState } from 'react';
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth';
import app from '../../Firebase/firebase.init';

const Login = () => {
    const [user, setUser] = useState(null)

    const auth = getAuth(app)
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const handleGoogleSign = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const loggedInUser = result.user
                console.log(loggedInUser);
                setUser(loggedInUser)
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleGithub = () => {
        signInWithPopup(auth, githubProvider)
        .then(result =>{
            const loggedInUser = result.user;
            console.log(loggedInUser);
            setUser(loggedInUser)
        })
        .catch(error =>{
            console.log(error)
        })
    }

    const handleSignOut = () => {
        signOut(auth)
            .then(result => {
                console.log(result)
                setUser(null)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div>
            {/**user ? logout : sign in */}
            {
                user ?
                    <button onClick={handleSignOut}>SignOut</button> :
                    <div>
                        <button onClick={handleGoogleSign}>google log in</button>
                        <button onClick={handleGithub}>Github Login</button>
                    </div>
            }
            {user && <div>
                <h3>User: {user.displayName}</h3>
                <p>Email: {user.email}</p>
                <img src={user.photoURL} alt="" />
            </div>}
        </div>
    );
};

export default Login;
