import React, { useEffect, useState } from 'react';
import { account } from '../../../appwrite/sdk';

function Profile() {
  const [status, setStatus] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const getProfile = async () => {
      const data = await account.get();
      setUsername(data.name);
      setEmail(data.email);
    };
    getProfile();
  }, []);

  async function saveProfile(item) {
    setStatus('');
    try {
      switch (item) {
        case 'username':
          await account.updateName(username);
          setStatus('username changed');
          break;
        case 'email':
          if (password === '') {
            setStatus('enter current password to change the email address');
            break;
          }
          await account.updateEmail(email, password);
          setStatus('email changed');
          break;
        default:
          break;
      }
    } catch (error) {
      setStatus(error);
    }
  }

  return (
    <form className="">
      <div className="grid grid-cols-2 text-center items-center gap-2 ">
        <div>UserName</div>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(e) => { setUsername(e.target.value); saveProfile('username'); }}
          className="rounded bg-transparent border border-primary text-center"
        />
        <div>Email</div>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); saveProfile('email'); }}
          className="rounded bg-transparent border border-primary text-center"
        />
        <div>Password</div>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded bg-transparent border border-primary text-center"
        />
      </div>
      <div>{status}</div>
    </form>
  );
}

export default Profile;
