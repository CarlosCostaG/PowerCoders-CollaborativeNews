import { Link } from "react-router-dom";
import "../styles/post-style.css";
import { apiURL } from "../config";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

function Posts({ post, deletePost, likePost, dislikePost, editHandleSubmit }) {
  const [editing, setEditing] = useState(false); // Crea el estado 'editing' y la función 'setEditing' para controlar si se está editando el post
  const [editedTitle, setEditedTitle] = useState(post.title); // Crea el estado 'editedTitle' y la función 'setEditedTitle' para controlar el título editado del post
  const [editedContent, setEditedContent] = useState(post.content); // Crea el estado 'editedContent' y la función 'setEditedContent' para controlar el contenido editado del post
  const [editedTheme, setEditedTheme] = useState(post.theme); // Crea el estado 'editedTheme' y la función 'setEditedTheme' para controlar el tema editado del post
  const { user } = useAuth();

  // Función para manejar el click del botón "Eliminar post"
  const deleteButtonHandler = (e) => {
    deletePost(post.id);
  };

  // Función para manejar el click del botón "Me gusta"
  const handleLikeClick = () => {
    likePost(post.id);
  };

  // Función para manejar el click del botón "No me gusta"
  const handleDislikeClick = () => {
    dislikePost(post.id);
  };

  // Función para manejar el click del botón "Editar"
  const handleEditClick = () => {
    setEditing(true);
    setEditedTitle(post.title); // Restaura el título original del post en el formulario de edición
    setEditedContent(post.content); // Restaura el contenido original del post en el formulario de edición
    setEditedTheme(post.theme); // Restaura el tema original del post en el formulario de edición
  };

  // Función para manejar el submit del formulario de edición
  const handleEditSubmit = async (e) => {
    e.preventDefault(); // Previenen la acción por defecto del formulario

    const { id } = await editHandleSubmit(e, post.id);
    if (id) setEditing(false); // Desactiva el modo edición
  };

  // Función para manejar el click del botón "Cancelar"
  const handleEditCancel = () => {
    setEditing(false); // Desactiva el modo edición
  };

  // Función para manejar el cambio del título editado en el formulario
  const handleEditedTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  // Función para manejar el cambio del contenido editado en el formulario
  const handleEditedContentChange = (e) => {
    setEditedContent(e.target.value);
  };

  // Función para manejar el cambio del tema editado en el formulario
  const handleEditedThemeChange = (e) => {
    setEditedTheme(e.target.value);
  };

  // Si está en modo edición, muestra el formulario de edición

  if (editing) {
    return (
      <li className="post-container">
        <div className="post-content">
          <form onSubmit={handleEditSubmit}>
            <input
              type="text"
              name="title"
              value={editedTitle}
              onChange={handleEditedTitleChange}
            />
            <textarea
              name="content"
              value={editedContent}
              onChange={handleEditedContentChange}
            ></textarea>
            <input
              type="text"
              name="theme"
              value={editedTheme}
              onChange={handleEditedThemeChange}
            />
            <input type="file" name="photo" id="" />
            <button type="submit">Guardar cambios</button>
            <button type="button" onClick={handleEditCancel}>
              Cancelar
            </button>
          </form>
        </div>
      </li>
    );
  }

  return (
    <li className="post-container">
      <div className="post-content">
        <Link className="post-title">{post.title}</Link>
        <img src={`${apiURL}/photos/${post.photo}`} alt="" />
        <p>{post.content}</p>
        <p>{post.theme}</p>
        <div className="post-buttons">
          <button className="like-button" onClick={handleLikeClick}>
          <i class="bi bi-hand-thumbs-up"></i>
            <span>{post.likes}</span>
          </button>
          <button className="dislike-button" onClick={handleDislikeClick}>
          <i class="bi bi-hand-thumbs-down"></i>
            <span>{post.dislikes}</span>
          </button>
          {user && user.id === post.ownerId && (
            <button className="edit-button" onClick={handleEditClick}>
              <i class="bi bi-pencil-square"></i>
            </button>
          )}
          {user && user.id === post.ownerId && (
            <button className="delete-button" onClick={deleteButtonHandler}>
              <i class="bi bi-trash3"></i>
            </button>
          )}
        </div>
      </div>
    </li>
  );
}

export default Posts;
