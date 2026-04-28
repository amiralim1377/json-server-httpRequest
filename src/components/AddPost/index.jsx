import { useRef, useState } from "react";
import { sendHttpRequest } from "../../services/sendHttpRequest";

function AddPost() {
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const [sendSeccess, setSendSeccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      title: titleRef.current.value,
      content: contentRef.current.value,
      id: Math.floor(Math.random() * 9000) + 1000,
      user_id: Math.floor(Math.random() * 9000) + 1000,
      image: "",
      created_at: new Date(),
      likes_count: 0,
      comments_count: 0,
    };

    try {
      const res = await sendHttpRequest(
        "POST",
        "http://localhost:3000/posts",
        formData,
      );
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${res.status}`,
        );
      }
      await res.json();
      setSendSeccess("Post added successfully");
      return false;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border p-6 rounded-sm flex flex-col space-y-4  border-gray-500 "
    >
      <div className="flex flex-col">
        <label htmlFor="title" className="text-gray-950">
          Title
        </label>
        <input
          className="border border-gray-500  min-w-2xl p-2 rounded-sm"
          type="text"
          placeholder="type your title"
          ref={titleRef}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="contnet" className="text-gray-950">
          contnet
        </label>
        <textarea
          className="border border-gray-500  p-2 rounded-sm"
          type="text"
          placeholder="type your contnet"
          ref={contentRef}
        />
      </div>
      <button
        type="submit"
        className="p-2 hover:bg-blue-800  cursor-pointer w-24 bg-blue-950 text-white rounded-sm"
      >
        submit
      </button>
      {sendSeccess && <p>{sendSeccess}</p>}
    </form>
  );
}

export { AddPost };
