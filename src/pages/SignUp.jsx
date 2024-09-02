import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import AnimatedBackground from '../components/AnimatedBackground';

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    // Here you would typically send the sign-up data to your backend
    console.log('Sign up with:', email, password);
    // For this example, we'll just navigate back to the main page
    navigate('/');
  };

  return (
    <AnimatedBackground>
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <Input 
            type="email" 
            placeholder="Email" 
            className="mb-2" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <Input 
            type="password" 
            placeholder="Password" 
            className="mb-2" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <Button type="submit" className="w-full">Sign Up</Button>
        </form>
        <p className="mt-2">Already have an account? <Button variant="link" onClick={() => navigate('/')}>Log In</Button></p>
      </div>
    </AnimatedBackground>
  );
};

export default SignUp;