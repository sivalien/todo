import axios from 'axios';
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'


function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);
    const { signin } = useContext(AuthContext)
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post('auth/signup', {email: email, password: password}, 
                {headers: {
                    "Content-Type": "application/json",
                }})
            .then(res => signin(res.token, res.id))
        }
        catch (error) {
            console.log(error);
        }
        navigate('/signin')
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
                    />
                </div>
                <div className='auth-row'>
                    <input 
                        placeholder='password' 
                        value={password}
                        name='text'
                        onChange={e => setPassword(e.target.value)}
                        className='auth-input'
                    />
                </div>
                <div className='auth-row'>
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
