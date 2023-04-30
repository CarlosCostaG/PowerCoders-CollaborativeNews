import { Link } from "react-router-dom";
import "../styles/post-style.css";
import { apiURL } from "../config";
import useServer from "../hooks/useServer";
import { useState } from "react";

function Posts({ post, deletePost, likePost, dislikePost }) {
  const { patch } = useServer(); // Importa la función 'patch' del custom hook 'useServer'
  const [editing, setEditing] = useState(false); // Crea el estado 'editing' y la función 'setEditing' para controlar si se está editando el post
  const [editedTitle, setEditedTitle] = useState(post.title); // Crea el estado 'editedTitle' y la función 'setEditedTitle' para controlar el título editado del post
  const [editedContent, setEditedContent] = useState(post.content); // Crea el estado 'editedContent' y la función 'setEditedContent' para controlar el contenido editado del post
  const [editedTheme, setEditedTheme] = useState(post.theme); // Crea el estado 'editedTheme' y la función 'setEditedTheme' para controlar el tema editado del post

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
    const formData = new FormData(e.target); // Crea un nuevo objeto FormData con los datos del formulario
    const response = await patch({
      url: `/news/${post.id}`,
      body: formData,
      hasImage: true,
    }); // Envía los datos del formulario al servidor para actualizar el post
    setEditing(false); // Desactiva el modo edición
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
