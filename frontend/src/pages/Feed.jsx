import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getAllPosts, createPost, likePost, addComment } from "../services/postService";

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


  return (

    <div>

      <Navbar />

      <h2>Feed Page</h2>


      {/* CREATE POST */}

      <div style={{marginBottom:"20px"}}>

        <textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <br />

        <button onClick={handlePost}>
          Post
        </button>

      </div>


      <hr />


      {/* POSTS LIST */}

      {posts.map((post) => (

        <div
          key={post._id}
          style={{
            border: "1px solid black",
            margin: "10px",
            padding: "10px"
          }}
        >

          <h4>{post.user?.name}</h4>

          <p>{post.content}</p>

          <p>Likes: {post.likes.length}</p>


          {/* LIKE BUTTON */}

          <button
            onClick={() => handleLike(post._id)}
          >
            ❤️ Like
          </button>


          {/* COMMENT INPUT */}

          <div style={{marginTop:"10px"}}>

            <input
              type="text"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />

            <button
              onClick={() => handleComment(post._id)}
            >
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