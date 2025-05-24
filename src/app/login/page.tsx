import React, { useState } from 'react';
import AuthForm from '../../components/AuthForm';

const LoginPage = () => {
    const [error, setError] = useState('');

    const handleLogin = async (email, password) => {
        try {
            // Call the authentication function from the auth library
            // await auth.login(email, password);
            // Redirect to dashboard or handle successful login
        } catch (err) {
            setError('Invalid credentials, please try again.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-pink-500">
            <h1 className="text-4xl font-bold text-white mb-6">Welcome to Palm Reading</h1>
            {error && <p className="text-red-500">{error}</p>}
            <AuthForm onSubmit={handleLogin} />
        </div>
    );
};

export default LoginPage;