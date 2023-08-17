import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import DataContext from "./context/DataContext";

function EditPost() {
  let { posts, editTitle, editBody, reEditBody, reEditTitle, handDd } =
    useContext(DataContext);
  let { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);
  useEffect(() => {
    if (post) {
      reEditBody(post.body);
      reEditTitle(post.title);
    }
  }, [post, reEditBody, reEditTitle]);
  return (
    <main className="NewPost">
      {editTitle && (
        <>
          <h2>Edit Page</h2>

          <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="Postti">Title</label>
            <input
              type="text"
              required
              id="Postti"
              value={editTitle}
              onChange={(e) => reEditTitle(e.target.value)}
            />
            <label htmlFor="postB">Body</label>
            <textarea
              type="text"
              required
              id="postB"
              value={editBody}
              onChange={(e) => reEditBody(e.target.value)}
            />
            <button type="submit" onClick={() => handDd(post.id)}>
              Submit
            </button>
          </form>
        </>
      )}
      {!editTitle && (
        <>
          <h2>Post Not Found</h2>
          <p>Well, That's Disappointing</p>
          <p>
            <Link to="/">Visit our Homepage </Link>
          </p>
        </>
      )}
    </main>
  );
}

export default EditPost;
