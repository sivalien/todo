import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import TodoList from './components/TodoList';
import { AuthContext } from './context/AuthContext'
import { useAuth } from './hook/auth.hooks'
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const { signin, signout, token, id, isReady } = useAuth();
  const isLogin = !!token;

  return (
    <>
      <AuthContext.Provider value={{signin, signout, token, id, isReady, isLogin}}>
            <Navbar />
            <video src='../video-2.mp4' autoPlay loop muted />
            <BrowserRouter>
            {console.log(isLogin)}
            {
                (isLogin) ? 
                <Routes>
                    <Route path='/' exact element={<TodoList />} />
                    <Route path='/signin' element={<Navigate replace to="/" />} />
                    <Route path='/signout' element={<Navigate replace to="/" />} />
                </Routes> :
                <Routes>
                    <Route path='/signin' exact element={<SignIn />} />
                    <Route path='/signup' exact element={<SignUp />} />
                    <Route path='/' element={<Navigate replace to="/signin" />} />
                </Routes>
            }
            </BrowserRouter>
        </AuthContext.Provider>
    </>
  );
}

export default App;
