import React from 'react';
import { useParams, useNavigate } from "react-router-dom";
import useFetch from './useFetch';

const BlogDetails = () => {
    const { id } = useParams();
    const {data: blog, isPending, error} = useFetch(`http://localhost:8000/blogs/${id}`);
    const navigate = useNavigate();
    const handleDelete = (id) => {
        fetch(`http://localhost:8000/blogs/${id}`, {
            method: 'DELETE',
        }
        ).then(res => res.json())
        .then(data => {
            console.log(data);
            navigate('/');
        }
        ).catch(err => console.log(err));
    }
    return ( 
        <div className="blog-details">
            {isPending && <div>Loading...</div>}
            {error && <div>{ error }</div>}
            {blog && 
            <article>
                <h2>{ blog.title }</h2>
                <p>Author: { blog.author }</p>
                <div>{ blog.body }</div>
                <button onClick={()=>handleDelete(blog.id)}>Delete</button>
            </article>
            }
        </div>
     );
}
 
export default BlogDetails;