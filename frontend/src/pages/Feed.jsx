import "./Feed.css";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getAllPosts, createPost, likePost, addComment, deletePost } from "../services/postService";

function Feed() {

  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [commentText, setCommentText] = useState("");

  // ================= FETCH POSTS =================

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const data = await getAllPosts();
      setPosts(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  // ================= CREATE POST =================

  const handlePost = async () => {
    if (!content.trim()) return;

    try {
      await createPost(content);
      setContent("");
      fetchPosts();
    } catch (error) {
      alert(error.message);
    }
  };

  // ================= LIKE POST =================

  const handleLike = async (postId) => {
    try {
      await likePost(postId);
      fetchPosts();
    } catch (error) {
      alert(error.message);
    }
  };

  // ================= ADD COMMENT =================

  const handleComment = async (postId) => {
    if (!commentText.trim()) return;

    try {
      await addComment(postId, commentText);
      setCommentText("");
      fetchPosts();
    } catch (error) {
      alert(error.message);
    }
  };

  // ================= DELETE POST =================

  const handleDelete = async (postId) => {
    try {
      await deletePost(postId);
      fetchPosts(); // refresh
    } catch (error) {
      alert(error.message);
    }
  };

  return (

 <div className="feed-container">

      <Navbar />

      <h2>Feed Page</h2>



      {/* CREATE POST */}
      
      <div className="create-post">
        <textarea
         className="post-input"
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <br />

        <button className="post-btn" onClick={handlePost}>
          Post
        </button>

      </div>

      <hr />



      {/* POSTS LIST */}
      {posts.map((post) => (

      <div key={post._id} className="post-card">

          <h4>{post.user?.name}</h4>

          <p>{post.content}</p>

          <p>Likes: {post.likes.length}</p>

          {/* LIKE BUTTON */}
           <button
           className="btn-like"
           onClick={() => handleLike(post._id)}
           >
            🤍 Like
          </button>

          {/*  DELETE BUTTON ADD */}
           <button
            className="btn-delete"
             onClick={() => handleDelete(post._id)}
>
           🗑️ Delete
        </button>

          {/* COMMENT INPUT */}
          <div className="comment-box">

            <input
             className="input-box"
              type="text"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />

            <button 
            className="btn-like"
            onClick={() => handleComment(post._id)}>
              Comment
            </button>

          </div>

          {/* COMMENT LIST */}
          <div>
            {post.comments?.map((comment, index) => (
              <p key={index}>
                <b>{comment.user?.name || "User"}:</b> {comment.text}
              </p>
            ))}
          </div>

        </div>

      ))}

    </div>
  );
}

export default Feed;