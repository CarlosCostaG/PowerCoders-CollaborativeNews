import useServer from "../hooks/useServer.js";

function PostHandler() {
  const { post, delete: destroy } = useServer();

  // Codigo de like y dislike
  const likePost = async (id) => {
    // Lógica para aumentar el contador de likes
    return await post({ url: `/news/like/${id}` });
  };

  const dislikePost = async (id) => {
    // Lógica para aumentar el contador de dislikes
    return await post({ url: `/news/dislike/${id}` });
  };

  const deletePost = async (id) => {
    return await destroy({ url: `/news/${id}` });
  };

  return {
    likePost,
    dislikePost,
    deletePost
  };
}

export default PostHandler;
