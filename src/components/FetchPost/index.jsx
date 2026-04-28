import { useState } from "react";
import { LastPosts } from "../LastPosts";
import { useEffect } from "react";
import { sendHttpRequest } from "../../services/sendHttpRequest";

function FetchPost() {
  const [latestPost, setLatestPost] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchTrigger, setFetchTrigger] = useState(false);
  console.log(latestPost);

  const handleClickFetch = () => {
    setFetchTrigger(true);
    setError(null);
    setLoading(true);
  };

  useEffect(() => {
    if (!fetchTrigger) {
      return;
    }
    setTimeout(() => {
      sendHttpRequest("Get", "http://localhost:3000/posts")
        .then((response) => {
          setLoading(true);
          return response.json();
        })
        .then((post) => {
          setLatestPost(post);
        })
        .catch((err) => {
          setError(err?.message ?? "Failed to fetch");
        })
        .finally(() => {
          setLoading(false);
        });
    }, 2000);
  }, [fetchTrigger]);

  return (
    <div className="border p-6 mt-8 rounded-sm flex flex-col space-y-4  border-gray-500 ">
      <button
        onClick={handleClickFetch}
        className="p-4 bg-blue-950 hover:bg-blue-800 text-white rounded-sm"
      >
        {loading ? "Feching post..." : "click to Fetch post"}
      </button>

      {latestPost?.map((post) => {
        return <LastPosts {...post} key={post.id} />;
      })}
      {error && <p>{error}</p>}
    </div>
  );
}

export { FetchPost };
