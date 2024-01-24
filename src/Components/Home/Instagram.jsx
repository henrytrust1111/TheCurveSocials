import React, { useState } from "react";
import "./instagram.css";
import { IoPlay } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { VscSend } from "react-icons/vsc";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { BiSolidLike } from "react-icons/bi";
import { TfiTag } from "react-icons/tfi";
import { IoMdShare } from "react-icons/io";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { MdOutlineAttachFile } from "react-icons/md";
import { BsEmojiFrown } from "react-icons/bs";
import { IoCameraOutline } from "react-icons/io5";
import { GrGallery } from "react-icons/gr";
import { useEffect } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router";

const Instagram = () => {
  const [showIcon, setshowIcon] = useState(false)
  const [inputFile, setInputFile] = useState(""); 
  
  const fileInputRef = useRef(null);
  const [post, setPost] = useState("");
  const [posts, setPosts] = useState([]);
  const [like, setLike] = useState(null);
  const [activePostIndex, setActivePostIndex] = useState(null);
  // const [showIcon, setshowIcon] = useState(false);
  const users = JSON.parse(localStorage.getItem("userData"));
  const loggedInUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log(users);
  const email = localStorage.getItem("email");
  console.log(email);
  const password = localStorage.getItem("password");
  console.log(password);
  const authUser = users?.find(
    (e) => e.email === email && e.password === password
  );

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("allPosts")) || [];
    setPosts(savedPosts);
  }, []);
  useEffect(() => {
    console.log("Show state changed:", showIcon);
  }, [showIcon]);

  const sendPost = () => {
    if (!post && !inputFile) {
      return null;
    } else {
      const newData = {
        post: post,
        name: loggedInUser.name,
        email: loggedInUser.email,
        posterImage: loggedInUser.image,
        image: inputFile,
        like: 0,
        likers: [],
      };
      const updatedPost = [...posts, newData];
      setPosts(updatedPost);
      localStorage.setItem("allPosts", JSON.stringify(updatedPost));
      setPost("");
      setInputFile(null);
    }
  };

  const nav = useNavigate()

  

  const myPost = JSON.parse(localStorage.getItem("allPosts"));
  console.log(myPost);

  const likeButton = (post, i) => {
    const updatedPosts = myPost.map((e, index) => {
      if (index === i) {
        const findIndex = e.likers.findIndex(
          (email) => email === loggedInUser.email
        );
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
            likers: [...e.likers, loggedInUser.email],
          };
        }
      } else {
        return e;
      }
    });

    localStorage.setItem("allPosts", JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
  };

  console.log(post);
  
  const logout = () => {
    nav("/");
  };

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

  const toggle = () => {
    // setShow((prevshowIcon) => !prevshowIcon);
    setshowIcon(false)
    console.log("this is the state of show " + showIcon);
  };



  return (
    <div className="instagramPage">
      <div className="account">
        <div className="accountTop">
          <div className="accountLogo">
            <div className="accountLogoHolder">
              <img
                src="./Instagram-logo-black-white-horizontal-png.png"
                alt=""
              />
            </div>
          </div>
          <div className="accountProfile">
            <div className="accountProfileHolder">
              <div className="profileDetailsWrapper">
                <div className="profileDetails">
                  <div className="accountImage">
                    <div className="accountImageHolder">
                      <img src={loggedInUser.image} alt="" />
                    </div>
                  </div>
                  <div className="accountInfo">
                    {loggedInUser ? (
                      <p className="accountName">{loggedInUser.name}</p>
                    ) : null}
                    <p className="accountLocation">Lagos,Festac</p>
                  </div>
                </div>
              </div>
              <div className="accountDetails">
                <div className="post">
                  <p className="number">578</p>
                  <p className="text">POSTS</p>
                </div>
                <div className="post">
                  <p className="number">37.2k</p>
                  <p className="text">FOLLOWERS</p>
                </div>
                <div className="post">
                  <p className="number">989</p>
                  <p className="text">FOLLOWING</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="accountDown">
          <div className="features feeds">
            <div className="featuresWrapper">
              <div className="featuresIcon">
                <img src="./house.svg" alt="" />
              </div>
              <div className="featuresIconTitle" style={{ color: "#fe446d" }}>
                Feeds
              </div>
            </div>
          </div>
          <div className="features">
            <div className="featuresWrapper">
              <div className="featuresIcon">
                <img src="./box-fill.svg" alt="" />
              </div>
              <div className="featuresIconTitle">Explore</div>
            </div>
          </div>
          <div className="features">
            <div className="featuresWrapper">
              <div className="featuresIcon">
                <img src="./favourites.svg" alt="" />
              </div>
              <div className="featuresIconTitle">My Favorite</div>
            </div>
          </div>
          <div className="features">
            <div className="featuresWrapper">
              <div className="featuresIcon">
                <img src="./tv-line.svg" alt="" />
              </div>
              <div className="featuresIconTitle">IG TV</div>
            </div>
          </div>
          <div className="features">
            <div className="featuresWrapper">
              <div className="featuresIcon">
                <img src="./stats-alt.svg" alt="" />
              </div>
              <div className="featuresIconTitle">Stats</div>
            </div>
          </div>
          <div className="features">
            <div className="featuresWrapper">
              <div className="featuresIcon">
                <img src="./setting-outlined.svg" alt="" />
              </div>
              <div className="featuresIconTitle">Settings</div>
            </div>
          </div>
        </div>
        <div className="logout">
          <div className="features">
            <div className="featuresWrapper">
              <div className="featuresIcon">
                <img src="./twotone-logout.svg" alt="" />
              </div>
              <div className="featuresIconTitle" onClick={logout}>Logout</div>
            </div>
          </div>
        </div>
      </div>
      <div className="main">
        <header>
          <main className="headerLeft">
            <div className="searchWrapper">
              <div className="searchIconWrapper">
                <img src="./search-line.svg" alt="" />
              </div>
              <input
                type="search"
                placeholder="Search"
                className="searchInput"
              />
              <div className="micIconWrapper">
                <img src="./mic-28-regular.svg" alt="" />
              </div>
            </div>
            <div className="createPostWrapper" onClick={() => setshowIcon(!showIcon)}>
              <p>+</p>
               <p>Create new Post</p>
            </div>
          </main>
          {showIcon ? 
                <main className="makePostContainer">
                  <div className="addPicture">
                    <input
                      type="file"
                      id="insertFile"
                      onChange={handleFile}
                      ref={fileInputRef}
                      style={{ display: "none" }}
                    />
                    {
                      inputFile === "" ? <IoCameraOutline
                      style={{ color: "#000" }}
                      onClick={handleCameraClick}
                    />:
                    <div className="upload">
                      <img src={inputFile}/>
                    </div>
                    }
                  </div>
                  <div className="addCommentWrapper">
                    <input
                      type="text"
                      placeholder="Input Comment"
                      className="makePostComment"
                      onChange={(e) => setPost(e.target.value)}
                      value={post}
                    />
                    <div className="sendIcon" onClick={()=>{sendPost(); toggle(); console.log("The send icon was clicked");}}>
                    <div><VscSend   /></div>
                    </div>
                  </div>
                </main> : null}
          <div className="headerRight">
            <div className="notifications">
              <img src="./send-outline (1).svg" alt="" />
            </div>
            <div className="notifications">
              <img src="./notification-fill.svg" alt="" />
            </div>
            <div className="burgerMenu">
              <img
                src="./menu-burger-horizontal.svg"
                alt=""
              />
            </div>
          </div>
        </header>
        <section>
          <div className="sectionLeft">
            <div className="sectionLeftWrapper">
              <div className="storiesWrapper">
                <div className="storiesText">
                  <h3>Stories</h3>
                  <div className="watch">
                    <p>Watch all</p> <IoPlay />
                  </div>
                </div>
                <div className="storiesImagesHolder">
                  <div className="storiesImageHolder">
                    <div className="storiesImageWrapper">
                      <div className="addStory">
                        <IoMdAdd />
                      </div>
                    </div>
                    <p>Add Story</p>
                  </div>
                  <div className="storiesImageHolder">
                    <div className="storiesImageWrapper">
                      <img src="./my pics.jpg" alt="" />
                    </div>
                    <p>Henry</p>
                  </div>
                  <div className="storiesImageHolder">
                    <div className="storiesImageWrapper">
                      <img src="./Maro.jpg" alt="" />
                    </div>
                    <p>Maro</p>
                  </div>
                  <div className="storiesImageHolder">
                    <div className="storiesImageWrapper">
                      <img src="./Godwin.jpg" alt="" />
                    </div>
                    <p>Godwin</p>
                  </div>
                  <div className="storiesImageHolder">
                    <div className="storiesImageWrapper">
                      <img src="./favour.jpg" alt="" />
                    </div>
                    <p>Faour</p>
                  </div>
                  <div className="storiesImageHolder">
                    <div className="storiesImageWrapper">
                      <img src="./Chidera.jpg" alt="" />
                    </div>
                    <p>Chidera</p>
                  </div>
                </div>
              </div>
              <div className="feedsAndOthers">
                <h5>Feeds</h5>
                <div className="latestAndPopular">
                  <div className="latestWrapper">Latest</div>
                  <p>Popular</p>
                </div>
              </div>
              {posts?.map((message, index) => (
                <div className="postContainer">
                  <div className="postWrapper">
                    <div className="PostNameAndPhotoWrapper">
                      <div className="postName-postImage">
                        <div className="myPostImage">
                          <img src={message.posterImage} alt="" />
                        </div>
                        <div className="myPostDetails">
                          <p>{message.name}</p>
                          <span>Lagos,Nigeria</span>
                        </div>
                      </div>
                      <MdOutlineMoreHoriz />
                    </div>
                    <div className="postImage">
                      <img src={message.image} alt="" />
                    </div>
                    <div className="postIconsContainer">
                      <div className="postIconWrapper">
                        {message.likers.findIndex((e) => e === authUser.email) >
                        -1 ? (
                          <BiSolidLike onClick={() => likeButton(message, index)} className="likeIcon" />
                        ) : (
                          <AiOutlineLike onClick={() => likeButton(message, index)} className="likeIcon" />
                        )}
                        {/* <BiSolidLike /> */}
                        {/* <p style={{position:"relative"}}>200 Likes</p> */}
                        <p
                          style={{ position: "relative" }}
                          onClick={() => showLikes(index)}
                          className="likeIcon"
                        >{`${message.likers.length} Likes`}</p>
                        {activePostIndex === index ? (
                          <div
                            style={{ position: "static" }}
                            className="likeList likeIcon"
                          >
                            {message.likers.map((liker, likerIndex) => (
                              <div key={likerIndex}>{liker}</div>
                            ))}
                          </div>
                        ) : null}
                      </div>
                      <div className="postIconWrapper">
                        <FaRegComment />
                        <p>Comments</p>
                      </div>
                      <div className="postIconWrapper">
                        <IoMdShare />
                        <p>200</p>
                      </div>
                      <div className="postIconWrapper">
                        <TfiTag />
                        <p>17 Saved</p>
                      </div>
                    </div>
                    <div className="postComment">
                      <p>{message.post}</p>
                    </div>
                    <div className="peoplesComments">
                      <div className="myPostImage">
                        <img src={loggedInUser.image} alt="" />
                      </div>
                      <div className="commentBoxWrapper">
                        <input
                          type="text"
                          placeholder="Write your comments..."
                        />
                        <div className="commentIcons">
                          <MdOutlineAttachFile />
                          <BsEmojiFrown />
                          <GrGallery />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="sectionRight">
            <div className="sectionRightWrapper">
              <div className="trendingPost">
                <div className="trendingName">Trending Feeds</div>
                <div className="trendingPostImagesWrapper">
                  <div className="trendingPostImagesHolder">
                    <div className="tendingPostImagesContainer">
                      <img src="./favour.jpg" alt="" />
                    </div>
                    <div className="tendingPostImagesContainer">
                      <img src="./Ella.jpg" alt="" />
                    </div>
                  </div>
                  <div className="trendingPostImagesHolder">
                    <div className="tendingPostImagesContainer">
                      <img src="./Godwin.jpg" alt="" />
                    </div>
                    <div className="tendingPostImagesContainer">
                      <img src="./Chidera.jpg" alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="suggestions">
                <div className="suggestionsIntro">
                  <h5>Suggestions for you</h5>
                </div>
                <div className="suggestionsContentWrapper">
                  <div className="suggestionsContentHolder">
                    <div className="suggestionsImage">
                      <img src="./favour.jpg" alt="" />
                    </div>
                    <div className="suggestionsText">
                      <p className="">Favor Nduka</p>
                      <p className="suggestionsTextGreyText">Lagos,Nigeria</p>
                    </div>
                  </div>
                  <div className="suggestionsContentHolder">
                    <div className="suggestionsImage">
                      <img src="./Godwin.jpg" alt="" />
                    </div>
                    <div className="suggestionsText">
                      <p className="">Nwasa Godwin</p>
                      <p className="suggestionsTextGreyText">Lagos,Nigeria</p>
                    </div>
                  </div>
                  <div className="suggestionsContentHolder">
                    <div className="suggestionsImage">
                      <img src="./Chidera.jpg" alt="" />
                    </div>
                    <div className="suggestionsText">
                      <p className="">Akude Chidera</p>
                      <p className="suggestionsTextGreyText">Lagos,Nigeria</p>
                    </div>
                  </div>
                  <div className="suggestionsContentHolder">
                    <div className="suggestionsImage">
                      <img src="./Ella.jpg" alt="" />
                    </div>
                    <div className="suggestionsText">
                      <p className="">Obodo Ella</p>
                      <p className="suggestionsTextGreyText">Lagos,Nigeria</p>
                    </div>
                  </div>
                  <div className="suggestionsContentHolder">
                    <div className="suggestionsImage">
                      <img src="./Maro.jpg" alt="" />
                    </div>
                    <div className="suggestionsText">
                      <p className="">Ake Maro</p>
                      <p className="suggestionsTextGreyText">Lagos,Nigeria</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="profileActivity">
                <div className="activityTitle">
                  <h5>Profile Activity</h5>
                </div>
                <div className="activityContent">
                  <div className="activityContentWrapper">
                    <div className="activityImages">
                      <div className="activityImagesWrapper">
                        {" "}
                        <img src="./favour.jpg" alt="" />
                      </div>
                      <div className="activityImagesWrapper">
                        <img src="./Godwin.jpg" alt="" />
                      </div>
                      <div className="activityImagesWrapper">
                        {" "}
                        <img src="./Chidera.jpg" alt="" />
                      </div>
                      <div className="activityImagesWrapper">
                        {" "}
                        <img src="./Ella.jpg" alt="" />
                      </div>
                      <div className="activityImagesWrapper">
                        <img src="./Maro.jpg" alt="" />
                      </div>
                      <div className="activityImagesWrapper">
                        <img src="./mercy.jpg" alt="" />
                      </div>
                    </div>
                    <div className="activityDetails">
                      <div>
                        <p>
                          <span className="span">24.3K</span> &nbsp; follower
                        </p>
                        <p className="weight">Active now on your profile</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="activityText">
                  <p>
                    The perfect time for uploading your new post{" "}
                    <span className="activitySpan">create new post</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Instagram;
