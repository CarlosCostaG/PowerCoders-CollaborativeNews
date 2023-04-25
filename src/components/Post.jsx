import React from 'react';

function Post({ title, author, content }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>By {author}</p>
      <p>{content}</p>
    </div>
  );
}

export default Post;