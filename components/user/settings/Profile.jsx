import React, { useEffect, useState } from 'react';
import { account } from '../../../utils/sdk';

function Profile() {
  const [status, setStatus] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const getProfile = async () => {
      const data = await account.get();
      setUsername(data.name);
      setEmail(data.email);
      setStatus('Profile loaded');
    };
    getProfile();
  }, []);

  // useEffect(() => {
  //   async function saveProfile() {
  //     setStatus('');
  //     if (username !== '') {
  //       await account.updateName(username);
  //       setStatus('username changed');
  //     }
  //   }
  //   saveProfile();
  // }, [username]);

  // useEffect(() => {
  //   async function saveProfile() {
  //     setStatus('');
  //     if (password === '' || password === undefined) {
  //       setStatus('enter current password to change the email address');
  //     }
  //     await account.updateEmail(email, password);
  //     setStatus('email changed');
  //   }
  //   saveProfile();
  // }, [email, password]);

  function onChangeUser(evt) {
    setUsername(evt.target.value);
  }

  function onChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function onChangePassword(evt) {
    setPassword(evt.target.value);
  }

  return (
    <div className="flex flex-col justify-center items-center text-center prose">
      <h1 className="p-2 first-letter:text-primary-focus shadow rounded-full">Profile</h1>
      <div className="grid grid-cols-2 text-center items-center gap-2 ">
        <div>UserName</div>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={onChangeUser}
          className="rounded bg-transparent border border-primary text-center"
        />
        <div>Email</div>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={onChangeEmail}
          className="rounded bg-transparent border border-primary text-center"
        />
        <div>Password</div>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={onChangePassword}
          className="rounded bg-transparent border border-primary text-center"
        />
      </div>
      <div>{status}</div>
    </div>
  );
}

export default Profile;
