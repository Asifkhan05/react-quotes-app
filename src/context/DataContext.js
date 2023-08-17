import { createContext, useState, useEffect } from "react";
import { format } from "date-fns";
import api from "../api/posts";
import useWindowSize from "../hooks/useWindowSize";
import useAxiosFetch from "../hooks/useAxiosFetch";
import { useNavigate } from "react-router";

let DataContext = createContext({});

export let DataProvider = ({ children }) => {
  let [editBody, reEditBody] = useState("");
  let [editTitle, reEditTitle] = useState("");
  let [posts, rePost] = useState([]);
  let [search, reSearch] = useState("");
  let [searchRes, reSearchRes] = useState([]);
  let [postTitle, rePostTitle] = useState("");
  let [postBody, rePostBody] = useState("");
  let nev = useNavigate();
  let { width } = useWindowSize();

  let { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:3500/posts"
  );
  useEffect(() => {
    rePost(data);
  }, [data]);

  useEffect(() => {
    let filterRe = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    reSearchRes(filterRe.reverse());
  }, [posts, search]);

  let add = async (e) => {
    e.preventDefault();
    let id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    let datetime = format(new Date(), "MMMM dd,yyyy pp");
    // date time package install (Npm i date-fns -s)
    let newItem = { id, title: postTitle, datetime, body: postBody };
    try {
      const responce = await api.post("/posts", newItem);
      let postd = [...posts, responce.data];
      rePost(postd);
      rePostBody("");
      rePostTitle("");
      nev("/");
    } catch (err) {
      console.log(`Error:${err.message}`);
    }
  };
  const Hdelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      let de = posts.filter((post) => post.id !== id);
      rePost(de);
      nev("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  let handDd = async (id) => {
    const datetime = format(new Date(), "MMMM dd,yyyy pp");
    let newItems = { id, title: editTitle, datetime, body: editBody };
    try {
      let responce = await api.put(`/posts/${id}`, newItems);
      rePost(
        posts.map((post) => (post.id === id ? { ...responce.data } : posts))
      );
      reEditTitle("");
      reEditBody("");
      nev("/");
    } catch (err) {
      console.log(`Error:${err.message}`);
    }
  };
  return (
    <DataContext.Provider
      value={{
        width,
        search,
        reSearch,
        searchRes,
        fetchError,
        isLoading,
        add,
        postBody,
        postTitle,
        rePostBody,
        rePostTitle,
        posts,
        Hdelete,
        editTitle,
        editBody,
        reEditBody,
        reEditTitle,
        handDd,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
export default DataContext;
