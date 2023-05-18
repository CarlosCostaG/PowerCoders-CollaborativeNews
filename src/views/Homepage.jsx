// Importamos los hooks y componentes necesarios
import { useEffect, useState } from "react";
import useServer from "../hooks/useServer.js";
import Posts from "../components/Posts.jsx";
import PostHandler from "../helpers/PostHandlers.js";
import useAuth from "../hooks/useAuth.js";
import { toast } from 'react-toastify';

// Creamos el componente Homepage
function Homepage() {
  const { isAuthenticated } = useAuth();

  // Creamos las constantes y estados necesarios
  const { likePost, dislikePost, deletePost } = PostHandler();
  const { patch, get } = useServer();
  const [posts, setPosts] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState("");
  const [sortByLikes, setSortByLikes] = useState(false);
  const [sortByNewestFirst, setSortByNewestFirst] = useState(true);

  // Realizamos una llamada GET para obtener los posts al cargar la página
  useEffect(() => {
    async function getPosts() {
      const { data } = await get({ url: "/news" });
      setPosts(data.data);
    }
    getPosts();
  }, []);

  // Función para filtrar los posts por tema
  const filterPostsByTheme = (post) =>
    !selectedTheme || post.theme === selectedTheme;

  // Función para ordenar los posts por likes
  const sortPostsByLikes = (a, b) =>
    sortByLikes ? b.likes - a.likes : a.likes - b.likes;

  // Función para ordenar los posts por fecha
  const sortPostsByDate = (a, b) => {
    const dateSort = sortByNewestFirst ? 1 : -1;
    return dateSort * a.createdAt.localeCompare(b.createdAt);
  };

  // Funciones para manejar el click en los botones de ordenar
  const handleSortByLikesClick = () => setSortByLikes(!sortByLikes);

  const handleSortByDateClick = () => setSortByNewestFirst(!sortByNewestFirst);

  // Funciones para manejar los clicks en los botones de like/dislike/delete y editar post
  const likePostHandler = async (id) => {
    if (isAuthenticated) {
      try {
        const {
          data: { data },
        } = await likePost(id);
        setPosts((prevPosts) =>
          prevPosts.map((post) => (post.id === id ? data : post))
        );
      } catch (error) {
        toast.error('Error al dar like al post');
      } 
    } else {
    toast.error('Debes iniciar sesión para dar like');
  }};

  const dislikePostHandler = async (id) => {
    if (isAuthenticated) {
      try {
        const {
          data: { data },
        } = await dislikePost(id);
        setPosts((prevPosts) =>
          prevPosts.map((post) => (post.id === id ? data : post))
        );
      } catch (error) {
        toast.error('Error al dar dislike al post');
      }
  } else {
    toast.error('Debes iniciar sesión para dar dislike');
  }
};

  const deletePostHandler = async (id) => {
    const { data } = await deletePost(id);
    if (data.status === "ok") {
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    }
  };

  const editHandleSubmit = async (e, id) => {
    const formData = new FormData(e.target);
    const {
      data: { data },
    } = await patch({ url: `/news/${id}`, body: formData, hasImage: true });
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === id ? data : post))
    );
  };

  // Ordenamos los posts filtrados según la preferencia de ordenamiento
  const orderedPosts = posts
    .filter(filterPostsByTheme)
    .sort(sortByLikes ? sortPostsByLikes : sortPostsByDate);

  // Renderizamos el componente con los posts
  return (
    <>
      {/* Mostramos los botones de ordenamiento */}
      <div className="filters">
        {/* Botón para ordenar por likes */}
        <button onClick={handleSortByLikesClick}>
        <i class="bi bi-arrow-down-up"></i> ({sortByLikes ? "menos a más likes" : "más a menos likes"})
        </button>

        {/* Botón para ordenar por fecha */}
        <button onClick={handleSortByDateClick}>
        <i class="bi bi-arrow-down-up"></i> (
          {sortByNewestFirst
            ? "más reciente a más antigua"
            : "más antigua a más reciente"}
          )
        </button>

        {/* Selección para filtrar por tema */}
        <select
          value={selectedTheme}
          onChange={(e) => setSelectedTheme(e.target.value)}
        >
          <option value="">Todos los temas</option>
          <option value="sports">Deportes</option>
          <option value="politics">Política</option>
          <option value="economy">Economía</option>
          <option value="education">Educación</option>
          <option value="society">Sociedad</option>
          <option value="technology">Tecnología</option>
          <option value="culture">Cultura</option>
          <option value="science">Ciencia</option>
          <option value="gaming">Videojuegos</option>
          <option value="medicine">Medicina</option>
        </select>
      </div>

      {/* Título de la página */}
      <h1 className="tittle">Últimas Noticias</h1>

      {/* Renderizado de los posts */}
      {orderedPosts && (
        <ul>
          {orderedPosts.map((post) => (
            <Posts
              key={post.id}
              post={post}
              deletePost={deletePostHandler}
              likePost={likePostHandler}
              dislikePost={dislikePostHandler}
              editHandleSubmit={editHandleSubmit}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default Homepage;
