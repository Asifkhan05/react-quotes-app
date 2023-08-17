import React from "react";
import { useContext } from "react";
import DataContext from "./context/DataContext";

function Newpost() {
  let { add, postBody, postTitle, rePostBody, rePostTitle } =
    useContext(DataContext);
  return (
    <main className="NewPost">
      <h2>NewPost</h2>
      <form className="newPostForm" onSubmit={add}>
        <label htmlFor="postTitle">Title:</label>
        <input
          type="text"
          id="postTitle"
          required
          value={postTitle}
          onChange={(e) => rePostTitle(e.target.value)}
        />
        <label htmlFor="postBody">Post:</label>
        <textarea
          id="postBody"
          value={postBody}
          onChange={(e) => rePostBody(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}

export default Newpost;
