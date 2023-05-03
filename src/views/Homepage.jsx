import { useEffect, useState } from "react";

import useServer from "../hooks/useServer.js";
import Posts from "../components/Posts.jsx";
import PostHandler from '../helpers/PostHandlers.js';

function Homepage() {
  const { likePost, dislikePost, deletePost } = PostHandler()
  const { post, patch, get, delete: destroy } = useServer();
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const { data } = await get({ url: "/news" });
    setPosts(data.data);
  };

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  // Codigo de like y dislike
  const likePostHandler = async (id) => {
    // Lógica para aumentar el contador de likes
    const { data: {data} } = await likePost(id);
    const postIndex = posts.findIndex(post => post.id === id);
    posts[postIndex] = data;
  };

  const dislikePostHandler = async (id) => {
    // Lógica para aumentar el contador de dislikes
    const { data: {data} } = await dislikePost(id);
    const postIndex = posts.findIndex(post => post.id === id);
    posts[postIndex] = data;
  };
  // Codigo de like y dislike

  const deletePostHandler = async (id) => {
    const { data } = await deletePost(id);
    if (data.status === "ok") {
      const newList = posts.filter((post) => post.id !== id);
      setPosts(newList);
    }
  };

  const editHandleSubmit = async (e, id) => {
    const formData = new FormData(e.target); // Crea un nuevo objeto FormData con los datos del formulario
    const {data: {data}} = await patch({
      url: `/news/${id}`,
      body: formData,
      hasImage: true,
    }); // Envía los datos del formulario al servidor para actualizar el post
    const postIndex = posts.findIndex(p => p.id === id);
    posts[postIndex] = data;
    return data
  };

  return (
    <>
          <h1 className="tittle">Últimas Noticias</h1>

      {posts && (
        <ul>
          {posts.map((post) => (
            <Posts
              key={post.id}
              post={post}
              deletePost={deletePostHandler}
              likePost={likePostHandler}
              dislikePost={dislikePostHandler}
              editHandleSubmit={editHandleSubmit}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default Homepage;
