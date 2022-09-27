import React, { useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { account } from '../../appwrite/sdk';

function Login() {
  // const navigate = useNavigate();
  const email = useRef();
  const [mailStatus, setMailStatus] = useState();

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      await account.createMagicURLSession(
        'unique()',
        email.current.value,
        'http://localhost:3000/auth/magic-url',
      );
      setMailStatus('Mail send.');
    } catch (error) {
      setMailStatus('Error sending mail.');
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <form onSubmit={loginUser}>
        <div className="space-y-2">
          <div className="space-y-1">
            <div className="flex justify-center">Email</div>
            <input type="email" name="email" id="email" ref={email} defaultValue="" required />
          </div>
          <div className="text-center"><button type="submit" className="btn btn-sm">Login</button></div>
        </div>
      </form>
      <div>{mailStatus}</div>
    </div>
  );
}

export default Login;
