import React, { useEffect } from 'react'
import axiosClient from '../api/axiosClient';
import { Eye, EyeOff } from 'lucide-react';

const Auth = () => {
    const [responseMessage, setResponseMessage] = React.useState('');
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    useEffect(() => {
        const checkAdminToken = async () => {
            try {
                // validate token on server (adjust endpoint if your API differs)
                const response = await axiosClient.get('/admin-4fa2c9b2c1e5/verify-token', {
                    withCredentials: true,
                });

                setResponseMessage(response.data.message);
                if (response.data.valid) {
                    // if verification succeeds, redirect to admin
                    window.location.replace('/admin');
                }
            } catch (err) {

            }
        }

        checkAdminToken()
    }, [responseMessage]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosClient.post('/admin-4fa2c9b2c1e5', {
                username,
                password
            });
            setResponseMessage(response.data.message);
        } catch (error) {
            setResponseMessage('Login failed');
        } finally {
            setUsername('');
            setPassword('');
        }
    }
    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-(--accent-light)'>
            <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col items-center gap-4 w-full max-w-sm p-6'>
                <input type="text" placeholder="Username" className='w-full border border-(--accent-dark) py-2 px-4 outline-none' value={username} onChange={(e) => setUsername(e.target.value)} />
                <div className='w-full border border-(--accent-dark) flex items-center py-2 px-4'>
                    <input type={isPasswordVisible ? "text" : "password"} placeholder="Password" className='flex-1 outline-none' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                        {isPasswordVisible ? <Eye /> : <EyeOff />}
                    </button>
                </div>
                <button type="submit" className='animated-button'>
                    <span className="label">Login</span>
                </button>
            </form>
            <p className='text-center text-(--accent-dark)'>{responseMessage}</p>
        </div>
    )
}

export default Auth