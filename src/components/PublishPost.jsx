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
    const response = await post({
      url: "/news",
      body: formPost,
      hasImage: true,
    }); // envía la publicación al servidor utilizando la función post obtenida con el hook useServer
    if (response) return navigate("/"); // si la respuesta del servidor es exitosa, redirige al usuario a la página principal
  };

  return (
    <>
      <form className="reddit-form" onSubmit={handleSubmit}>
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
          <label htmlFor="photo">Puedes insertar una foto! (😊):</label>{" "}
          {/* etiqueta para el campo de imagen */}
          <input type="file" name="photo" id="photo" />{" "}
          {/* campo para seleccionar una imagen */}
        </div>

        <label className="themes" htmlFor="theme">
          <div className="container1">
            <div>
              <input type="radio" value="sports" name="theme" id="theme-sports" />
              <label htmlFor="theme-sports">Deportes</label>
            </div>
            <div>
              <input type="radio" value="politics" name="theme" id="theme-politics" />
              <label htmlFor="theme-politics">Política</label>
            </div>
            <div>
              <input type="radio" value="economy" name="theme" id="theme-economy" />
              <label htmlFor="theme-economy">Economía</label>
            </div>
            <div>
              <input type="radio" value="education" name="theme" id="theme-education" />
              <label htmlFor="theme-education">Educación</label>
            </div>
            <div>
              <input type="radio" value="society" name="theme" id="theme-society" />
              <label htmlFor="theme-society">Sociedad</label>
            </div>
            <div>
              <input type="radio" value="technology" name="theme" id="theme-technology" />
              <label htmlFor="theme-technology">Tecnología</label>
            </div>
            <div>
              <input type="radio" value="culture" name="theme" id="theme-culture" />
              <label htmlFor="theme-culture">Cultura</label>
            </div>
            <div>
              <input type="radio" value="science" name="theme" id="theme-science" />
              <label htmlFor="theme-science">Ciencia</label>
            </div>
            <div>
              <input type="radio" value="gaming" name="theme" id="theme-gaming" />
              <label htmlFor="theme-gaming">Videojuegos</label>
            </div>
            <div>
              <input type="radio" value="medicine" name="theme" id="theme-medicine" />
              <label htmlFor="theme-medicine">Medicina</label>
            </div>
          </div>
        </label>
        <button type="submit">Publicar</button>
      </form>
    </>
  );
}

export default RedditForm;
