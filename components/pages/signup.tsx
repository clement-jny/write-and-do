import React from 'react';
import SignupForm from '../components/forms/SignupForm';

const SignupPage: React.FC = () => {
  return (
    <div className="container">
      <h1>Sign Up</h1>
      <SignupForm />
    </div>
  );
};

export default SignupPage;
