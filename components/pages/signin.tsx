import React from 'react';
import SigninForm from '../components/forms/SigninForm';

const SigninPage: React.FC = () => {
  return (
    <div className="container">
      <h1>Sign In</h1>
      <SigninForm />
    </div>
  );
};

export default SigninPage;
