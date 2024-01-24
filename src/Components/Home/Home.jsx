// import React, { useEffect, useState } from "react";
// // import like from "./blackLike.svg";
// // import redlike from "./like (2).svg";
// const Home = () => {
//   const [post, setPost] = useState("");
//   const [posts, setPosts] = useState([]);
//   const [like, setLike] = useState(null);
//   const [likeButton, setLikeButton] = useState(false);
//   const users = JSON.parse(localStorage.getItem("userData"));
//   console.log(users);
//   const email = localStorage.getItem("email");
//   console.log(email);
//   const password = localStorage.getItem("password");
//   console.log(password);
//   const authUser = users?.find((e) =>
//     e.email === email && e.password === password 
//   );


//   useEffect(() => {
//     const savedPosts = JSON.parse(localStorage.getItem("post")) || [];
//     setPosts(savedPosts);
//   }, []);
  
//   const sendPost = () => {
//     const newData={
//         post:post,
//         name:authUser.name
//     }
//     setPosts(prevData => [...prevData,newData])
//     localStorage.setItem("post",JSON.stringify([...posts, newData]))
//     setPost("")
//   };

//   const handleLike=(index)=>{
//     setLike(index)
//   }

//   return (
//     <>
//     {authUser && email && password? <h2>{authUser.name}</h2>:null}
//       <div>
//         <input
//           type="text"
//           placeholder="post"
//           onChange={(e) => setPost(e.target.value)}
//           value={post}
//         />
//         <button onClick={sendPost}>Send</button>
//       </div>

//       {posts?.map((message, index) => (
//         <div className="post" key={index}>
//             <div>{message.name}</div>
//           <div >{message.post}</div>
//           <div>
//             {like===index ? (
//               <div onClick={() => handleLike(index)}>
//                 <img src="./src/Components/Home/redlike.svg" alt="" />
//               </div>
//             ) : (
//               <div onClick={() => handleLike(index)}>
//                 <img src="./src/Components/Home/blackLike.svg" alt="" />
//               </div>
//             )}
//           </div>
//         </div>
//       ))}
//     </>
//   );
// };

// export default Home;
