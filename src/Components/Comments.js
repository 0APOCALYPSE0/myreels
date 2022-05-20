import React, {useState, useEffect} from 'react'
import { database } from './firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';

function Comments({postData}) {
  const [comments, setComments] = useState(null);

  useEffect(async () => {
    let arr = [];
    for(let i=0; i<postData.comments.length; i++){
      let data = await database.comments.doc(postData.comments[i]).get();
      arr.push(data.data());
    }
    setComments(arr);
  }, [postData]);

  return (
    <div>
      {
        comments === null ? <CircularProgress /> :
        <>
          {
            comments.map((comment, index) => (
              <div style={{ display: 'flex'}} key={comment.userName+"-"+index}>
                <Avatar src={comment.profileImg} />
                <p>&nbsp;&nbsp;<span style={{ fontWeight: 'bold'}}>{comment.userName}</span>&nbsp;&nbsp;{comment.comment}</p>
              </div>
            ))
          }
        </>
      }
    </div>
  )
}

export default Comments