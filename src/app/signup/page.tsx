import React, { useState } from 'react';
import AuthForm from '../../components/AuthForm';

const SignupPage = () => {
    const [error, setError] = useState(null);

    const handleSignup = async (data) => {
        try {
            // Call the signup function from the auth library
            // await signup(data);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-pink-500">
            <h1 className="text-4xl font-bold text-white mb-6">Join the Palm Reading Community</h1>
            {error && <p className="text-red-500">{error}</p>}
            <AuthForm onSubmit={handleSignup} isSignup />
        </div>
    );
};

export default SignupPage;