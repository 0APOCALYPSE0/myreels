import React, { useState } from 'react'
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import MovieIcon from '@material-ui/icons/Movie';
import LinearProgress from '@mui/material/LinearProgress';
import { v4 as uuidv4 } from 'uuid';
import { database,storage } from './firebase';

function UploadFile(props) {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  console.log(props.user);

  const handleChange = async (file) => {
    if(file === null){
      setError('Please select a file first');
      setTimeout(() => {
        setError('');
      }, 2000);
      return;
    }
    if(file.size/(1024*1024) > 100){
      setError('File size is large');
      setTimeout(() => {
        setError('');
      }, 2000);
      return;
    }
    let uid = uuidv4();
    setLoading(true);
    const uploadTask = storage.ref(`/posts/${uid}/${file.name}`).put(file);
    uploadTask.on('state_changed',fn1,fn2,fn3);
    function fn1(snapshot){
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
        console.log(`Upload is ${progress} done.`)
    }
    function fn2(error){
        console.log(error)
        setError(error);
        setTimeout(()=>{
            setError('')
        },2000);
        setLoading(false)
        return;
    }
    function fn3(){
        uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
            console.log(url);
            let post = {
              likes: [],
              comments: [],
              pId: uid,
              postUrl: url,
              uName: props.user.fullname,
              profileImg: props.user.profileUrl,
              userId: props.user.userId,
              createdAt: database.getTimeStamp()
            }
            database.posts.add(post).then(async ref => {
              let res = await database.users.doc(props.user.userId).update({
                postIds: props.user.postIds ? [...props.user.postIds, ref.id] : [ref.id]
              });
            }).then(() => {
              setLoading(false);
            }).catch(error => {
              setError(error);
              setTimeout(()=>{
                  setError('')
              },2000);
              setLoading(false);
            });
        })
        setLoading(false);
    }
  }

  return (
    <div style={{marginTop: '5rem', marginBottom: '1rem'}}>
      {
        error!=='' ? <Alert severity="error">{error}</Alert>:
        <>
          <input type='file' accept='video/*' onChange={(e) => handleChange(e.target.files[0])} id="upload-input" style={{display:'none'}} />
          <label htmlFor='upload-input'>
          <Button variant="outlined" color="secondary" disabled={loading} component="span">
            <MovieIcon></MovieIcon>&nbsp;Upload a video
          </Button>
          </label>
          { loading && <LinearProgress color="secondary" style={{marginTop: '3%'}} />}
        </>
      }
    </div>
  )
}

export default UploadFile