import React,{useState} from 'react';
import { useDispatch } from 'react-redux';
import {authActions} from '../ReduxStore/AuthSlice';

const LoginSignUpPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const dispatch = useDispatch();

    const toggleLoginSignUp = () => {
        setIsLogin(!isLogin);
    }

    const handleLoginSignUpSubmit = async (e) => {
        e.preventDefault();

        if(!email || !password || (!isLogin && !confirmPassword)) {
            alert('Please fill in all fields');
            return;
        }
        
        if(!isLogin && password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        let url;
        if (isLogin) {
           url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDWQrdbUSE0IIOy68rPcOXwN6jRbHCG9R0";
        } else {
          url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDWQrdbUSE0IIOy68rPcOXwN6jRbHCG9R0";
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    "email" : email,
                    "password" : password,
                    "returnSecureToken" : true
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error.message || 'Authentication failed');
            }
            let filteredEmail = "";
            for (let i = 0; i < data.email.length; i++) {
                if(data.email[i] !== '@' && data.email[i] !== '.') {
                    filteredEmail += data.email[i];
                }
            }

            if (isLogin) {
                dispatch(authActions.setCredentials({ token: data.idToken, email:filteredEmail }));
            }
            else {
                alert('Sign Up successful! Please login to continue.');
                setIsLogin(true);
            }

            setEmail('');
            setPassword('');
            setConfirmPassword('');

        } catch (error) {
            alert('Error:', error.message);
        }

    }

    return (
        <div className='login-form-container'>
            <h1 className='login-page-heading'>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form className='login-page-form' onSubmit={handleLoginSignUpSubmit}>
            <input
                type="email"
                id='email'
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                id='password'
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {!isLogin && (
                <input
                    type="password"
                    id='confirmPassword'
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            )}
            <button className='login-form-button' type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
            </form>
            <p className='login-signup-toggle' onClick={toggleLoginSignUp} style={{ cursor: 'pointer', color: 'blue' }}>
                {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
            </p>
        </div>
    )
}

export default LoginSignUpPage;