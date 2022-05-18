import React, { useState, useEffect } from 'react';
import { database } from './firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import Video from './Video';
import './Posts.css';
import Like from './Like';

function Posts({userData}) {
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    let postArray = [];
    const unsub = database.posts.orderBy('createdAt', 'desc').onSnapshot(querySnapshot => {
      postArray = [];
      querySnapshot.forEach(doc => {
        let data = { ...doc.data(), postId: doc.id };
        postArray.push(data);
      });
      setPosts(postArray);
    });
    return unsub;
  }, []);
  return (
    <div>
      {
        posts === null || userData === null ? <CircularProgress /> :
        <div className='video-container'>
          {
            posts.map((post, index) => (
              <React.Fragment key={index}>
                 <div className='videos'>
                    <Video src={post.postUrl} />
                    <div className="fa" style={{ display: 'flex'}}>
                      <Avatar src={userData.profileUrl} />
                      <h4>{userData.fullname}</h4>
                    </div>
                    <Like userData={userData} postData={post} />
                 </div>
              </React.Fragment>
            ))
          }
        </div>
      }
    </div>
  )
}

export default Posts