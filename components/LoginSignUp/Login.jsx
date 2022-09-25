import React, { useRef } from 'react';
import axios from 'axios';
import useUserStore from '../../lib/store/userStore';

function Login() {
  const email = useRef('');
  const password = useRef('');
  const { setUser } = useUserStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/auth/login', { email: email.current.value, password: password.current.value });
      setUser(data);
    } catch (error) {
      // console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleLogin}>
        <div>
          <div>Email</div>
          <input type="email" name="email" id="email" ref={email} defaultValue="" required />
        </div>
        <div>
          <div>Password</div>
          <input type="password" name="password" id="password" ref={password} defaultValue="" />
        </div>
        <div className="mt-1 flex justify-center items-center">
          <button type="submit" className="btn btn-sm">login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
