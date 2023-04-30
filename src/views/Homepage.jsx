import { useEffect, useState } from "react";
import useServer from "../hooks/useServer.js";
import Posts from "../components/Posts.jsx";

function Homepage() {
  const { post, get, delete: destroy } = useServer();
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
  const likePostHandler = async (id, likes) => {
    // Lógica para aumentar el contador de likes
    const response = await post({ url: `/news/like/${id}` });
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

  return (
    <>
      {posts && (
        <ul>
          {posts.map((post) => (
            <Posts
              key={post.id}
              post={post}
              deletePost={deletePostHandler}
              likePost={likePostHandler}
              dislikePost={dislikePostHandler}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default Homepage;
