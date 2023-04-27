import { useEffect, useState } from "react";
import useServer from "../hooks/useServer.js";
import Posts from "../components/Posts.jsx";

function Homepage() {
  const { get, delete: destroy } = useServer();
  const [posts, setPosts] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const getPosts = async () => {
    const { data } = await get({ url: "/news" });
    setPosts(data.data);
  };

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    console.log(posts)
  }, [posts])


  const deletePostHandler = async (id) => {
    console.log(id);
    const { data } = await destroy({ url: `/news/${id}` });
    if (data.deleted) {
      const newList = todos.filter((todo) => todo.id !== id);
      setPosts(newList);
    }
  };


  const inputChangeHandler = ({ target }) => {
    setInputValue(target.value);
  };


  return (
    <>
      {posts && <ul>
          {posts.map((post) => (
            <Posts
              key={post.id}
              post={post}
              deletePost={deletePostHandler}
            />
          ))}
        </ul>}
    </>
  );
}

export default Homepage;
