import { Link } from "react-router-dom";
import "../styles/post-style.css";

function Posts({ post, deletePost, checkButton }) {
  const deleteButtonHandler = (e) => {
    deletePost(post.id);
  };

  const handleLikeClick = () => {
    // Aquí puedes implementar la lógica para aumentar el contador de likes
  };

  const handleDislikeClick = () => {
    // Aquí puedes implementar la lógica para aumentar el contador de dislikes
  };

  const handleEditClick = () => {
    // Aquí puedes implementar la lógica para editar el post
  };

  return (
    <li className="post-container">
      <div className="post-content">
        <Link className="post-title">{post.title}</Link>
        <p>{post.content}</p>
        <p>{post.theme}</p>
        <div className="post-buttons">
          <button className="like-button" onClick={handleLikeClick}>
            <i className="fas fa-arrow-up"></i>
            <span>{post.likes}</span>
          </button>
          <button className="dislike-button" onClick={handleDislikeClick}>
            <i className="fas fa-arrow-down"></i>
            <span>{post.dislikes}</span>
          </button>
          <button className="edit-button" onClick={handleEditClick}>
            Editar
          </button>
          <button className="delete-button" onClick={deleteButtonHandler}>
            Eliminar post
          </button>
        </div>
      </div>
    </li>
  );
}

export default Posts;