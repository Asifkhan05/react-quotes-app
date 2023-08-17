import React from "react";
import Feed from "./Feed";
import { useContext } from "react";
import DataContext from "./context/DataContext";
function Home() {
  let { searchRes, fetchError, isLoading } = useContext(DataContext);
  return (
    <main className="Home">
      {isLoading && <p>Loading posts...</p>}
      {!isLoading && fetchError && <p>{fetchError}</p>}
      {!fetchError &&
        !isLoading &&
        (searchRes.length ? (
          <Feed posts={searchRes} />
        ) : (
          <p style={{ marginTop: "2rem" }}>No Post to displays</p>
        ))}
    </main>
  );
}

export default Home;
