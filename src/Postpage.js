import React from "react";
import { useContext } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import DataContext from "./context/DataContext";

function Postpage() {
  let { posts, Hdelete } = useContext(DataContext);
  let { id } = useParams();
  let post = posts.find((post) => post.id.toString() === id);

  return (
    <main className="PostPage">
      <article className="post">
        {post && (
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postBody">{post.body}</p>
            <Link to={`/editpost/${post.id}`}>
              <button>Edit Post</button>
            </Link>
            <button onClick={() => Hdelete(post.id)}>Delete Post</button>
          </>
        )}
        {!post && (
          <>
            <h2>Post Not Found</h2>
            <p>Well, That's Disappointing</p>
            <p>
              <Link to="/">Visit our Homepage </Link>
            </p>
          </>
        )}
      </article>
    </main>
  );
}

export default Postpage;
