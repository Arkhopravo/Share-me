import React,{useState, useEffect} from 'react'
import { gapi } from 'gapi-script';
import GoogleLogin from 'react-google-login';
import {useNavigate} from 'react-router-dom';
import {FcGoogle} from 'react-icons/fc';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import {client} from '../client'


const Login = () => {
  const navigate = useNavigate();
  const responseGoogle = (response) => {
      // console.log(response);
      localStorage.setItem('user', JSON.stringify(response.profileObj));

      const { name, googleId, imageUrl } = response.profileObj;

      const doc = {
        _id: response.profileObj.googleId,
        _type: 'user',
        userName: response.profileObj.name,
        image: response.profileObj.imageUrl,
      }
      
      client.createIfNotExists(doc).then(()=> {
                navigate('/', {replace: true})
              })
  }
   
  // const [ profile, setProfile ] = useState([]);
  // const clientId = '288934021355-6l6crbr9oia7otdlilc66heo5e4fseas.apps.googleusercontent.com';
  // useEffect(() => {
  //     const responseGoogle = (response) => {
  //         gapi.client.init({
  //             clientId: clientId,
  //             scope: ''
  //         });
  //     };
  //     gapi.load('client:auth2', initClient);
  // });




  return (
    <div className='flex justify-start items-center flex-center flex-col h-screen'>
      <div className='relative w-full h-full' >
        <video 
           src={shareVideo}
           type="video/mp4"
           loop
           controls={false}
           muted
           autoPlay
           className='w-full h-full object-cover'
        />

        <div className='absolute flex fle-col justify-center items-center top-0 bottom-0 right-0 left-0 bg-blackOverlay' >
        <div className='p-5'>
          <img src={logo} width="130px" alt='logo' />
        </div>
        
        <div className='shadow-2xl'>
          <GoogleLogin
             clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
             render={(renderProps) =>(
                  <button
                     type="button"
                     className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                     onClick={renderProps.onClick}
                     disabled={renderProps.disabled}
                  >
                       <FcGoogle className="mr-4" /> Sign-In with Google
                  </button>
             )}
             onSuccess={responseGoogle}
             onFailure={responseGoogle}
             cookiePolicy="single_host_origin"
             isSignedIn={true}
          />
        </div>
        </div> 
      </div>
    </div>
  )
}

export default Login