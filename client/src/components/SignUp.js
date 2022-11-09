import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/auth/signup', {email: email, password: password}, 
                {headers: {
                    "Content-Type": "application/json",
                }})
        }
        catch (error) {
            console.log(error);
            setMessage(error.response.data.message);
            setPassword('');
            setEmail('');
        }
    }

    return (
        <div className='auth-container'>
            <h1 className='auth-text'>Create an account</h1>
            <form className='form-login' onSubmit={e => e.preventDefault()}>
                <div className='auth-row'>
                    <input 
                        placeholder='email' 
                        value={email}
                        name='text'
                        onChange={e => setEmail(e.target.value)}
                        className='auth-input'
                        type="email"
                    />
                </div>
                <div className='auth-row'>
                    <input 
                        placeholder='password' 
                        value={password}
                        name='text'
                        onChange={e => setPassword(e.target.value)}
                        className='auth-input'
                        type="password"
                    />
                </div>
                <div className='auth-row'>
                    <p className='auth-error'>{message ? message : " "}</p>
                    <button className='btn-auth' onClick={handleClick}>
                        Sign up
                    </button>
                <Link to='/signin' className='auth-link'>Already have an account?</Link>
                </div>
            </form>
        </div> 
  )
}

export default SignUp