import React, { useState } from "react";
import useServer from "../hooks/useServer";
import "./RedditForm.css";

function RedditForm() {
  const { post } = useServer();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formPost = Object.fromEntries(new FormData(e.target));
    console.log(formPost);
    const response = await post({ url: "/news", body: formPost });
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="reddit-form">
      <label htmlFor="title">Título:</label>
      <input type="text" id="title" name="title" />

      <label htmlFor="content">Contenido:</label>
      <textarea id="content" name="content" />

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
