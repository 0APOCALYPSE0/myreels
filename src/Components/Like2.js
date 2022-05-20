import React, { useState, useEffect } from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { database } from './firebase';

function Like2({ userData, postData }) {
  const [like, setLike] = useState(null);

  const handleLike = (e) => {
    if(like){
      let arr = postData.likes.filter(el => el !== userData.userId);
      database.posts.doc(postData.postId).update({
        likes: arr
      });
    }else{
      let arr = [...postData.likes, userData.userId];
      database.posts.doc(postData.postId).update({
        likes: arr
      });
    }
  }

  useEffect(() => {
    let check = postData.likes.includes(userData.userId) ? true : false;
    setLike(check);
  }, [postData]);

  return (
    <div>
      {
        like !== null ?
        <>
        {
          like === true ? <FavoriteIcon style={{ padding: '1rem', paddingTop: '0.5rem'}} className={`like`} onClick={handleLike} /> : <FavoriteIcon style={{ padding: '1rem', paddingTop: '0.5rem'}} className={`unlike2`} onClick={handleLike} />
        }
        </>:
        <></>
      }
    </div>
  )
}

export default Like2
