import { useState, useEffect, useCallback } from "react";


export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [id, setId] = useState(null)
    const [isReady, setIsReady] = useState(false)

    const signin = useCallback((jwToken, userId) => {
        setToken(jwToken);
        setId(userId);
        localStorage.setItem('userData', JSON.stringify({
            id: userId, 
            token: jwToken
        }))
    }, [])

    const signout = () => {
        setToken(null);
        setId(null);
        localStorage.removeItem('userData')
    }

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('userData'))
        if (data && data.token) {
            signin(data.token, data.id)
        }
        setIsReady(true)
    }, [signin])

    return {signin, signout, token, id, isReady}
}