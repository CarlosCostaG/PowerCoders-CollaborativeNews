import { useState } from "react";

function useForceUpdate() {
  const [value, setValue] = useState(0); // Estado y función para forzar la actualización de la página
  return () => setValue(value => value + 1);
}

function updatePage() {
  const forceUpdate = useForceUpdate(); // Obtener la función para forzar la actualización de la página
  const deletePost = (postId) => {
    // Código para eliminar el post
    forceUpdate(); // Forzar la actualización de la página después de eliminar el post
  };
  
  const likePost = (postId) => {
    // Código para dar "Me gusta" al post
    forceUpdate(); // Forzar la actualización de la página después de dar "Me gusta" al post
  };
  
  const dislikePost = (postId) => {
    // Código para dar "No me gusta" al post
    forceUpdate(); // Forzar la actualización de la página después de dar "No me gusta" al post
  };

  const editPost = (postId) => {
    forceUpdate();
  }

  return {
    deletePost,
    likePost,
    dislikePost,
    editPost
  };
}

export default updatePage;