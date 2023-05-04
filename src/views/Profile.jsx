import { useEffect, useState } from "react";

import { apiURL } from "../config.js";
import useServer from "../hooks/useServer.js";
import UserPost from "../components/SpecificPostUser.jsx";
import PostHandler from "../helpers/PostHandlers.js";

function ProfileView() {
  const { likePost, dislikePost, deletePost } = PostHandler();
  const { get } = useServer();
  const [profile, setProfile] = useState(null);
  const [userPosts, setUserPosts] = useState(null);

  // Funciones para manejar los clicks en los botones de like/dislike/delete y editar post
  const likePostHandler = async (id) => {
    const {
      data: { data },
    } = await likePost(id);
    setUserPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === id ? data : post))
    );
  };

  const dislikePostHandler = async (id) => {
    const {
      data: { data },
    } = await dislikePost(id);
    setUserPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === id ? data : post))
    );
  };

  const deletePostHandler = async (id) => {
    const { data } = await deletePost(id);
    if (data.status === "ok") {
      setUserPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    }
  };

  const getProfile = async () => {
    const response = await get({ url: "/profile" });
    setProfile(response.data.data);
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
      <h1 className="tituloP">Perfil de usuario</h1>
      <img className="avatar" src={`${apiURL}/avatars/${profile.avatar}`}/>
      <p className="info">Nombre de usuario: {profile.username}</p>
      <p className="info">Email: {profile.email}</p>

      <div>
      <h2 className="info">Tus posts</h2>
      {userPosts.map((post) => (
      <UserPost key={post.id} post={post} likePost={likePostHandler} dislikePost={dislikePostHandler} deletePost={deletePostHandler}/>
      ))}
      </div>
    </div>
  );
}

export default ProfileView;
