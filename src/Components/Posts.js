import React, { useState, useEffect } from 'react';
import { database } from './firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import Video from './Video';
import './Posts.css';
import Like from './Like';
import Like2 from './Like2';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import AddComment from './AddComment';
import Comments from './Comments';

function Posts({userData}) {
  const [posts, setPosts] = useState(null);
  const [open, setOpen] = useState(null);

  const handleClickOpen = (id) => {
    setOpen(id);
  };

  const handleClose = () => {
    setOpen(null);
  };

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
                    <ChatBubbleIcon className="chat-styling" onClick={() => handleClickOpen(post.pId)} />
                    <Dialog
                      open={open === post.pId}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                      fullWidth={true}
                      maxWidth='md'
                    >
                      <div className="modal-container">
                        <div className="video-modal">
                          <video autoPlay={true} muted="muted" controls>
                            <source  src={post.postUrl}></source>
                          </video>
                        </div>
                        <div className="comment-modal">
                        <Card className="card1" style={{padding: '1rem'}}>
                          <Comments postData={post} />
                        </Card>
                        <Card variant='outlined' className="card2">
                        <Typography style={{padding: '0.4rem'}}>{post.likes.length === 0 ? '': `Liked by ${post.likes.length} users`}</ Typography>
                        <div style={{display: 'flex'}}>
                          <Like2 postData={post} userData={userData} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
                          <AddComment postData={post} userData={userData} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
                        </div>
                        </Card>
                        </div>
                      </div>
                    </Dialog>
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