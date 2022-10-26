import axios from 'axios';
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'


function SignIn() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const { signin } = useContext(AuthContext);

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5050/auth/signin', {email: email, password: password}, 
                {headers: {
                    "Content-Type": "application/json",
                }})
            .then(res => {
                signin(res.data.token, res.data.id)
            })
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
    <div className='auth-container'>
        {console.log(useContext(AuthContext))}
        <h1 className='auth-text'>Аuthorization</h1>
        <form className='form-login' onSubmit={e => e.preventDefault()}>
            <div className='auth-row'>
                <input 
                    type="text"
                    placeholder='email'
                    value={email}  
                    onChange={(e) => {setEmail(e.target.value); console.log(email)}}
                    className='auth-input'
                />
            </div>
            <div className='auth-row'>
                <input 
                    type="text"
                    placeholder='password' 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className='auth-input'
                />
            </div>
            <div className='auth-row'>
                <button className='btn-auth' onClick={handleClick}>
                    Sign in
                </button>
                <Link to='/signup' className='auth-link'>Don't have an account?</Link>
            </div>
        </form>
    </div>
  )
}

export default SignIn
