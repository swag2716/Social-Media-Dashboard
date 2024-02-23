// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';  // Import your CSS file for styling

function App() {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [editingPostId, setEditingPostId] = useState(null);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/dashboard/posts/');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingPostId) {
        // Update existing post
        await axios.put(`http://localhost:8000/dashboard/posts/${editingPostId}/`, formData);
      } else {
        // Create new post
        await axios.post('http://localhost:8000/dashboard/posts/create/', formData);
      }

      fetchPosts(); // Refresh posts after creating or updating
      setFormData({
        title: '',
        description: '',
      });
      setEditingPostId(null); // Reset editingPostId after submission
    } catch (error) {
      console.error('Error creating/updating post:', error);
    }
  };

  const handleEdit = (post) => {
    setFormData({
      title: post.title,
      description: post.description,
    });
    setEditingPostId(post.id);
  };

  const handleCancelEdit = () => {
    setFormData({
      title: '',
      description: '',
    });
    setEditingPostId(null);
  };

  return (
    <div className="App">
      <h1>Social Media Dashboard</h1>
      <div className="create-update-post">
        <h2>{editingPostId ? 'Update Post' : 'Create Post'}</h2>
        <form onSubmit={handleSubmit}>
          <label>Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required />
          <div className="buttons">
            <button type="submit">{editingPostId ? 'Update Post' : 'Create Post'}</button>
            {editingPostId && (
              <button type="button" onClick={handleCancelEdit}>
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>
      <div className="social-media-posts">
        <h2>Social Media Posts</h2>
        <ul>
          {posts.map((post) => (
            <li key={post.id} className="post-item">
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <div className="post-details">
                <div className="likes">Likes: {post.likes}</div>
                <div className="shares">Shares: {post.shares}</div>
                <div className="comments">Comments: {post.comments}</div>
              </div>
              <button type="button" onClick={() => handleEdit(post)}>
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
