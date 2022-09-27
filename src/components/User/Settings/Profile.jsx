import React, { useEffect } from 'react';
import { account } from '../../../appwrite/sdk';

function Profile() {
  useEffect(() => {
    const getProfile = async () => {
      const data = await account.get();
      console.log(data);
    };
    getProfile();
  }, []);

  return (
    <div>Profile</div>
  );
}

export default Profile;
