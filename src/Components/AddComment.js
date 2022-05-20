import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { database } from './firebase';

function AddComment({userData, postData}) {
  const [comment, setComment] = useState('');
  const handleClick = () => {
    let obj = {
      comment: comment,
      profileImg: userData.profileUrl,
      userName: userData.fullname
    }
    database.comments.add(obj).then(doc => {
      database.posts.doc(postData.postId).update({
        comments: [...postData.comments, doc.id]
      });
    });
    setComment('');
  }

  return (
    <div>
      <TextField id="outlined-basic" label="comment" variant="outlined" value={comment} size="small" sx={{ width: '75%' }} onChange={(e) => setComment(e.target.value)} />
      <Button variant="contained" onClick={handleClick}>Add</Button>
    </div>
  )
}

export default AddComment