import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import "./Signup.css";
import botImg from '../assets/bot.jpg';
import {useSignupUserMutation} from '../services/appApi'


function Signup() {
  const [email,setEmail] = useState('');
  const [name,setName] = useState('');
  const navigate=useNavigate();
  const [password,setPassword] = useState('');
  const [signupUser,{isLoading,error}]= useSignupUserMutation();
  //image upload state
  const [image,setImage] = useState(null);
  const [uploadingImg,setUploadingImg] = useState(false);
  const [imagePreview,setImagePreview] = useState(null);

  function validateImg(e){
    const file = e.target.files[0];
    if(file.size>=1048576){
      return alert('Max file size is 1MB');
    }else{
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  async function uploadImage(){
    const data = new FormData();
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    data.append('file',image);
    data.append('upload_preset',apiKey);
    try{
      setUploadingImg(true)
      let res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'post',
        body: data
      }
      );
      const urlData = await res.json();
      setUploadingImg(false);
      return urlData.url;
    }catch(err){
      setUploadingImg(false);
      console.log(err);
    }

  }

  async function handleSignup(e){
    e.preventDefault();
    if(!image)return alert('please upload your profile picture');
    const url = await uploadImage(image);
    

    //signup users
    signupUser({name,email,password,picture: url}).then(({data})=>{
      if(data){
        navigate('/chat');
      }
    })
  }
  return (
    <div>
      <Container>
        <Row>
          <Col
            md={7}
            className="d-flex align-items-center justify-content-center flex-direction-column"
          >
            <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={handleSignup}>
              <h1 className="text-center">Create Account</h1>
              <div className="signup-profile-pic-container">
                <img src={imagePreview||botImg} alt="" className="signup-profile-pic"/>
                <label htmlFor="image-upload" className="image-upload-label">
                  <i className="fas fa-plus-circle add-picture-icon"></i>
                </label>
                <input type="file" id="image-upload" hidden accept="image.png, image.jpeg" onChange={validateImg} />
              </div>
              {error && <p className="alert alert-danger">{error.data}</p>}
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Your Name" onChange={(e)=>setName(e.target.value)} value={name}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
              </Form.Group>
              <Button variant="primary" type="submit">
                {uploadingImg || isLoading ? "Signing you up...":'Signup'}
              </Button>
              <div className="py-4">
                <p className="text-center">
                  Already have an account ? <Link to="/login">Login</Link>
                </p>
              </div>
            </Form>
          </Col>
          <Col md={5} className="signup__bg"></Col>
        </Row>
      </Container>
    </div>
  );
}

export default Signup;
