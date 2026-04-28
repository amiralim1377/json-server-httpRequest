import { sendHttpRequest } from "../../services/sendHttpRequest";

const LastPosts = ({ ...post }) => {
  const handleDeletePost = async (postId) => {
    try {
      const res = await sendHttpRequest(
        "DELETE",
        `http://localhost:3000/posts/${postId}`,
      );
      if (!res.ok) {
        throw new Error(res.statusText);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="max-w-sm rounded-lg border border-gray-800 overflow-hidden shadow-lg p-6 m-4 bg-white">
      <h2 className="font-bold text-xl mb-2 text-gray-800">{post.title}</h2>
      <p className="text-gray-700 text-base mb-4">{post.content}</p>
      <button
        onClick={() => handleDeletePost(post.id)}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Delete
      </button>
    </div>
  );
};

export { LastPosts };
