import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { database } from './firebase';
import UploadFile from './UploadFile';
import Posts from './Posts';
import Navbar from './Navbar';

function Feed() {
  const {user} = useContext(AuthContext);
  const [userData, setUserData] = useState('');

  useEffect(() => {
    const unsub = database.users.doc(user.user.uid).onSnapshot(snapshot => {
      setUserData(snapshot.data());
    })
    return () => unsub();
  }, [user]);

  return (
    <>
      <Navbar userData={userData} />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
        <UploadFile user={userData} />
        <Posts userData={userData} />
      </div>
    </>
  )
}

export default Feed;