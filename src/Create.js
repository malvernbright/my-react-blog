import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('malvern');
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = {title, body, author};
        setIsPending(true);
        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(blog),
        }
        ).then(res => res.json())
        .then(data => {
            console.log(data);
            setIsPending(false);
            navigate('/');
        })
        .catch(err => console.log(err));
    }

    return (
        <div className="create">
            <h2>Create a new blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
                <label>Blog body:</label>
                <textarea
                required
                value={body}
                onChange={(e) => setBody(e.target.value)}
                />
                <label>Blog author:</label>
                <select
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value="malvern">malvern</option>
                    <option value="bright">bright</option>
                </select>
                {!isPending && <button type="submit">Add Blog</button>}
                {isPending && <button disabled type="submit">Adding Blog...</button>}
            </form>
        </div>
     );
}

export default Create;