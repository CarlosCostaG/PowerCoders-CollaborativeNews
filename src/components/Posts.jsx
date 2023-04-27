import { Link } from 'react-router-dom'

function Posts({post, deletePost, checkButton}) {

    const deleteButtonHandler = (e) => {

        deletePost(post.id)
    }

    return <li className="">
        <span className="">
            <Link className="" >{post.title}</Link>
            {post.content}
            </span>
        <button className="" type='submit' onClick={deleteButtonHandler}>
            
        </button>
        </li>
}

export default Posts