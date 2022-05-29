import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { database } from './firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Navbar from './Navbar';
import Typography from '@mui/material/Typography';
import './Profile.css';
import Like2 from './Like2';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import AddComment from './AddComment';
import Comments from './Comments';

function Profile () {
  const {id} = useParams();
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState(null);
  const [open, setOpen] = useState(null);

  const handleClickOpen = (id) => {
    setOpen(id);
  };

  const handleClose = () => {
    setOpen(null);
  };

  useEffect(() => {
    database.users.doc(id).onSnapshot(snap => {
      setUserData(snap.data());
    })
  }, [id]);

  useEffect(() => {
    (async function fetchPosts() {
      if(userData !== null){
        let posts = [];
        for(let i=0; i<userData.postIds.length; i++){
          let post = await database.posts.doc(userData.postIds[i]).get();
          posts.push({...post.data(), postId: post.id});
        }
        setPosts(posts);
      }
    }())
  });

  return (
    <>
    {
      posts === null || userData === null ? <CircularProgress /> :
      <div>
        <Navbar userData={userData} />
        <div className="spacer"></div>
        <div className="container">
          <div className="profile">
            <div className="profile-img">
              <img src={userData.profileUrl} alt={userData.fullname} />
            </div>
            <div className="user-info">
              <Typography variant="h5">
                Email: {userData.email}
              </Typography>
              <Typography variant="h6">
                Posts: {userData.postIds.length}
              </Typography>
            </div>
          </div>
          <hr style={{marginTop: '3rem', marginBottom: '3rem'}}/>
          <div className='posts'>
          {
            posts.map((post, index) => (
              <React.Fragment key={index}>
                 <div className='videos'>
                    <video muted="muted" onClick={() => handleClickOpen(post.pId)}>
                      <source  src={post.postUrl}></source>
                    </video>
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
        </div>
      </div>
    }
    </>
  )
}

export default Profile;
