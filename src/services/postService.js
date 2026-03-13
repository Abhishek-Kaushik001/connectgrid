const API_URL = "http://localhost:5000/api/posts";


// ================= GET ALL POSTS =================

export const getAllPosts = async () => {

  const response = await fetch(API_URL);

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return data;
};



// ================= CREATE POST =================

export const createPost = async (content) => {

  const token = localStorage.getItem("token");

  const response = await fetch(API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({ content }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Post creation failed");
  }

  return data;
};


// ================= LIKE POST =================

export const likePost = async (postId) => {

  const token = localStorage.getItem("token");

  const response = await fetch(`http://localhost:5000/api/posts/${postId}/like`, {

    method: "PUT",

    headers: {
      Authorization: `Bearer ${token}`,
    }

  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Like failed");
  }

  return data;
};



// ================= ADD COMMENT =================

export const addComment = async (postId, text) => {

  const token = localStorage.getItem("token");

  const response = await fetch(`http://localhost:5000/api/posts/${postId}/comment`, {

    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({ text }),

  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Comment failed");
  }

  return data;
};



