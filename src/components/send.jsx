import React, { useState } from "react";
import useServer from "../hooks/useServer"; // importa el hook useServer desde "../hooks/useServer"
import "./RedditForm.css"; // importa el archivo de estilos de RedditForm
import { useNavigate } from "react-router-dom"; // importa el hook useNavigate desde "react-router-dom"

function RedditForm() {
  const { post } = useServer(); // utiliza el hook useServer para obtener la función post
  const navigate = useNavigate(); // utiliza el hook useNavigate para obtener la función navigate

  const handleSubmit = async (e) => {
    // función asíncrona que maneja el envío del formulario
    e.preventDefault(); // evita que la página se recargue al enviar el formulario

    const formPost = new FormData(e.target); // crea un nuevo objeto FormData a partir del formulario enviado
    console.log(formPost); // muestra en la consola el contenido del objeto FormData
    const response = await post({
      url: "/news",
      body: formPost,
      hasImage: true,
    }); // envía la publicación al servidor utilizando la función post obtenida con el hook useServer
    console.log(response); // muestra en la consola la respuesta del servidor
    if (response) return navigate("/"); // si la respuesta del servidor es exitosa, redirige al usuario a la página principal
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="reddit-form">
        {" "}
        {/* formulario que se envía al llamar a la función handleSubmit al hacer clic en el botón de enviar */}
        <label htmlFor="title">Título:</label>{" "}
        {/* etiqueta para el campo de título */}
        <input type="text" id="title" name="title" />{" "}
        {/* campo de entrada de texto para el título */}
        <label htmlFor="content">Contenido:</label>{" "}
        {/* etiqueta para el campo de contenido */}
        <textarea id="content" name="content" />{" "}
        {/* campo de entrada de texto para el contenido */}
        <div>
          <label htmlFor="photo">Inserta lo que te pegue la gana :v</label>{" "}
          {/* etiqueta para el campo de imagen */}
          <input type="file" name="photo" id="photo" />{" "}
          {/* campo para seleccionar una imagen */}
        </div>
        <label htmlFor="theme">
          {" "}
          {/* etiqueta para el campo de tema */}
          <input type="radio" value="sports" name="theme" />
          Deportes
        </label>
        <label htmlFor="theme">
          <input type="radio" value="politics" name="theme" />
          Política
        </label>
        <label htmlFor="theme">
          <input type="radio" value="economy" name="theme" />
          Economía
        </label>
        <label htmlFor="theme">
          <input type="radio" value="education" name="theme" />
          Educación
        </label>
        <label htmlFor="theme">
          <input type="radio" value="society" name="theme" />
          Sociedad
        </label>
        <label htmlFor="theme">
          <input type="radio" value="technology" name="theme" />
          Tecnología
        </label>
        <label htmlFor="theme">
          <input type="radio" value="culture" name="theme" />
          Cultura
        </label>
        <label htmlFor="theme">
          <input type="radio" value="science" name="theme" />
          Ciencia
        </label>
        <label htmlFor="theme">
          <input type="radio" value="gaming" name="theme" />
          Videojuegos
        </label>
        <label htmlFor="theme">
          <input type="radio" value="medicine" name="theme" />
          Medicina
        </label>
        <button type="submit">Publicar</button>
      </form>
    </>
  );
}

export default RedditForm;
