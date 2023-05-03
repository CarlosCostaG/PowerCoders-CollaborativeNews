import { useEffect, useState } from "react";

import { apiURL } from "../config.js";
import useServer from "../hooks/useServer.js";
import UserPost from "../components/SpecificPostUser.jsx";
import PostHandler from "../helpers/PostHandlers.js";

function ProfileView() {
  const { get, post } = useServer();
  const [profile, setProfile] = useState(null);
  const [userPosts, setUserPosts] = useState(null);
  const { likePost } = PostHandler()

    // Codigo de like y dislike
    const likePostHandler = async (id) => {
      // Lógica para aumentar el contador de likes
      const { data: {data} } = await likePost(id);
      const postIndex = userPosts.findIndex(post => post.id === id);
      userPosts[postIndex] = data;
    };

    const dislikePostHandler = async (id, dislikes) => {
      // Lógica para aumentar el contador de dislikes
      const response = await post({ url: `/news/dislike/${id}` });
    };
    // Codigo de like y dislike
  
    const deletePostHandler = async (id) => {
      const { data } = await destroy({ url: `/news/${id}` });
      if (data.status === "ok") {
        const newList = posts.filter((post) => post.id !== id);
        setPosts(newList);
      }
    };

  const getProfile = async () => {
    const response = await get({ url: "/profile" });
    setProfile(response.data.data);
    console.log(response.data);
  };

  const getUserPosts = async () => {
    const response = await get({ url: "/news" });
    const posts = response.data.data.filter(post => post.ownerId === profile.id);
    setUserPosts(posts);
  }

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (profile) {
      getUserPosts();
    }
  }, [profile]);

  if (!profile || !userPosts) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Perfil de usuario</h1>
      <img className="avatar" src={`${apiURL}/avatars/${profile.avatar}`}/>
      <p>Nombre de usuario: {profile.username}</p>
      <p>Email: {profile.email}</p>

      <div>
      <h2>Tus posts</h2>
      {userPosts.map((post) => (
      <UserPost key={post.id} post={post} likePost={likePostHandler} dislikePost={dislikePostHandler} deletePost={deletePostHandler}/>
      ))}
      </div>
    </div>
  );
}

export default ProfileView;
