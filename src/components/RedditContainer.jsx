// import Post from "./Post";
// import React from "react";

// class RedditContainer extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = { 
//         posts: [], 
//         currentUser: { username: '' } 
//       };
//     }
//     addPost(post) {
//         this.setState((prevState) => ({
//           posts: [...prevState.posts, post],
//         }), () => {
//           fetch('https://noticias.backends.hackaboss.com/news', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//               username: this.state.currentUser.username,
//               title: post.title,
//               content: post.content
//             })
//           });
//         });
//       }
//       async componentDidMount() {
//         const response = await fetch(
//           `https://noticias.backends.hackaboss.com/news?username=${this.state.currentUser.username}`
//         );
//         const data = await response.json();
//         const posts = Array.isArray(data) ? data : [];
//         this.setState({ posts });
//       }
      
      
//       render() {
//         return (
//           <div>
            
//             {this.state.posts.map((post) => (
//               <Post
//                 key={post.id}
//                 title={post.title}
//                 author={post.username}
//                 content={post.content}
//               />
//             ))}
//           </div>
//         );
//       }
// }
  
// export default RedditContainer;
