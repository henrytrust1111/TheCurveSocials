import React, { useEffect, useRef, useState } from "react";
import "./page.css";
import { VscSend } from "react-icons/vsc";
import { IoCameraOutline } from "react-icons/io5";
import { AiOutlineLike } from "react-icons/ai";
import { BiSolidLike } from "react-icons/bi";
import { useNavigate } from "react-router";

const Page = () => {
  const [inputFile, setInputFile] = useState();
  const fileInputRef = useRef(null);
  const [post, setPost] = useState("");
  const [posts, setPosts] = useState([]);
  const [like, setLike] = useState(null);
  const [activePostIndex, setActivePostIndex] = useState(null);
  // const [likeButton, setLikeButton] = useState(false);
  const users = JSON.parse(localStorage.getItem("userData"));
  console.log(users);
  const email = localStorage.getItem("email");
  console.log(email);
  const password = localStorage.getItem("password");
  console.log(password);
  const authUser = users?.find(
    (e) => e.email === email && e.password === password
  );

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("post")) || [];
    setPosts(savedPosts);
  }, []);

  const nav= useNavigate()

  const sendPost = () => {
    if(!post && !inputFile){
      return null
    }else{
      const newData = {
        post: post,
        name: authUser.name,
        email: authUser.email,
        image:inputFile,
        like:0,
        likers:[]
      };
      const updatedPost = [...posts, newData]
      setPosts(updatedPost);
      localStorage.setItem("post", JSON.stringify(updatedPost));
      setPost("");
      setInputFile(null)
    }
  };

  const myPost = JSON.parse(localStorage.getItem("post"))
  console.log(myPost);
  
  const likeButton = (postIndex) => {
    const updatedPosts = myPost.map((e, index) => {
      if (index === postIndex) {
        const findIndex = e.likers.findIndex((email) => email === authUser.email);
        if (findIndex > -1) {
          // User already liked, so remove their email from likers
          const updatedLikers = [...e.likers];
          updatedLikers.splice(findIndex, 1);
  
          return {
            ...e,
            likers: updatedLikers,
          };
        } else {
          // User hasn't liked, so add their email to likers
          return {
            ...e,
            likers: [...e.likers, authUser.email],
          };
        }
      } else {
        return e;
      }
    });
  
    localStorage.setItem("post", JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
  };
  


console.log(post);
  const logout =()=>{
    nav("/")
  }

  const handleFile = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setInputFile(url);
  };

  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

  const showLikes = (index) => {
    setActivePostIndex(activePostIndex === index ? null : index);
  };

  return (
    <>
      <div className="page">
        <header>
          <div className="headerLayout">
            <h2>The Curve_Socials</h2>
          </div>
          <div className="headerLayout">
            <div className="profile">
              <div className="imageHolder"></div>
              {authUser && email && password ? <h2>{authUser.name}</h2> : null}
            </div>
          </div>
          <div className="headerLayout">
            <div className="h1" onClick={logout}>Logout</div>
          </div>
        </header>
        <section>
          {posts?.map((message, index) => (
            <div className="contentHolder" key={index}>
              <div className="name">
                <p>{message.name}</p>
              </div>
              <div className="textAndImage">
                <div className="textContent">
                  <p>{message.post}</p>
                </div>
                {
                  message.image? <div className="imageContent">
                  <img src={message.image} alt="" />
                </div>:null
                }
              </div>
              <div className="like">
                {
                  message.likers.findIndex((e)=>e===authUser.email) > -1 ? <BiSolidLike onClick={()=>likeButton(index)}/>:<AiOutlineLike onClick={()=>likeButton(index)}/>
                }
                
                <p style={{position:"relative"}} onClick={()=>showLikes(index)}>{`${message.likers.length} Likes`}</p>
                {/* { show? <div style={{position:"absolute"}} className="likeList"></div>:null } */}
                {activePostIndex === index ? (
                <div style={{ position: "static" }} className="likeList">
                  {message.likers.map((liker, likerIndex) => (
                    <div key={likerIndex}>{liker}</div>
                  ))}
                </div>
              ) : null}
              </div>
            </div>
          ))}
        </section>
        <footer>
          <div className="comment">
            <input
              type="text"
              placeholder="Aa"
              className="input"
              onChange={(e) => setPost(e.target.value)}
              value={post}
            />
          </div>
          <div className="icons">
            <input
              type="file"
              id="insertFile"
              onChange={handleFile}
              ref={fileInputRef}
              style={{ display: "none" }}
            />
            <div onClick={handleCameraClick}>
              <IoCameraOutline />
            </div>

            <VscSend onClick={sendPost} />
          </div>
        </footer>
      </div>
    </>
  );
};

export default Page;
