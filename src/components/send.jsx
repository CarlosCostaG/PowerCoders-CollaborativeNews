import React, { useState } from "react";
import useServer from "../hooks/useServer";
import "./RedditForm.css";
import { useNavigate } from "react-router-dom";

function RedditForm() {
  const { post } = useServer();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formPost = new FormData(e.target);
    console.log(formPost);
    const response = await post({ url: "/news", body: formPost, hasImage: true });
    console.log(response)
    if (response) return navigate("/");  
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="reddit-form">
      <label htmlFor="title">Título:</label>
      <input type="text" id="title" name="title" />

      <label htmlFor="content">Contenido:</label>
      <textarea id="content" name="content" />

      <div>
          <label htmlFor="photo">Inserta lo que te pegue la gana :v</label>
          <input type="file" name="photo" id="photo" />
      </div>

      <label htmlFor="theme">
          <input
            type="radio"
            value="sports"
            name="theme"
          />
          Deportes
        </label>
        <label htmlFor="theme">
          <input
            type="radio"
            value="politics"
            name="theme"
          />
          Política
        </label>
        <label htmlFor="theme">
          <input
            type="radio"
            value="economy"
            name="theme"
          />
          Economía
        </label>
        <label htmlFor="theme">
          <input
            type="radio"
            value="education"
            name="theme"
          />
          Educación
        </label>
        <label htmlFor="theme">
          <input
            type="radio"
            value="society"
            name="theme"
          />
          Sociedad
        </label>
        <label htmlFor="theme">
          <input
            type="radio"
            value="technology"
            name="theme"
          />
          Tecnología
        </label>
        <label htmlFor="theme">
          <input
            type="radio"
            value="culture"
            name="theme"
          />
          Cultura
        </label>
        <label htmlFor="theme">
          <input
            type="radio"
            value="science"
            name="theme"
          />
          Ciencia
        </label>
        <label htmlFor="theme">
          <input
            type="radio"
            value="gaming"
            name="theme"
          />
          Videojuegos
        </label>
        <label htmlFor="theme">
          <input
            type="radio"
            value="medicine"
            name="theme"
          />
          Medicina
        </label>

      <button type="submit">Publicar</button>
    </form>
    
    </>
  );
}

export default RedditForm;
