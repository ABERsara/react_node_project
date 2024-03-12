// Component for managing and displaying a list of posts
import React, { useState, useEffect } from "react";
import Axios from "axios";
import PostItem from "./PostItem";
import { Outlet, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPenToSquare, faRotateLeft, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import AddPost from "./AddPost";
// import GetPostById from "./GetPostById";
const PostsList = () => {
  const location = useLocation()

  // Search input state for filtering users by id, name, email, or phone
  const [requestName, setRequestName] = useState("title")
  const [posts, setPosts] = useState([]);
  // const [id, setId] = useState("");
  const [requestAdd, setRequestAdd] = useState(false)
  const [searchInput, setSearchInput] = useState("");
  const [err, setErr] = useState("")

  // Function to fetch posts from the server
  const fetchPosts = async () => {
    try {
      const { data } = await Axios.get("http://localhost:7003/api/posts/");
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([])
    }
  };

  // Function to handle the "Add Post" button click
  const onAdd = () => {
    setRequestAdd(false)
  }

  // Function to handle the "Get Post" button click
  // const onGet = () => {
  //   console.log(id)
  //   setId("");
  //   // setRequestName("")
  // };

  // Function to handle the search based on id or title
  // const onSearch = (e) => {
  //   console.log(requestName)
  //   e.preventDefault();
  //   setFilteredPosts([]);
  //   if (requestName === "id") {
  //     const validId = posts.find((post) => post._id === searchInput);
  //     if (validId) {
  //       console.log(validId)
  //       setId(searchInput);
  //       setSearchInput("")
  //     } else {
  //       setErr("The id doesn't exist, please try again.");
  //       console.log(err)
  //     }
  //   } else {
  //     const filtered = posts.filter((post) => post[requestName].toLowerCase().includes(searchInput.toLowerCase()));
  //     if (filtered.length > 0) {
  //       setFilteredPosts(filtered);
  //       setErr(" ")
  //     } else {
  //       setErr(`The ${requestName} doesn't exist, please try again.`)
  //     }
  //     setId("");
  //     setSearchInput("")
  //   }
  // };

  // Function to handle the "Return" button click
  const onReturn = () => {
    setErr("")
    setSearchInput("")
    // setFilteredPosts([])
  }

  // Function to handle the change in the search request type (id, title)
  const changeNameRequest = (event) => {
    setRequestName(event.target.value)
    console.log(requestName)
  }
  //Function to sort the users by request
  //the function "localeCompare" compares two strings
  const handleSort = (e) => {
    console.log(e.target.value)
    const sort = e.target.value
    if (sort === "title" || sort === "body") {
      setPosts([...posts].sort((a, b) => a[sort].localeCompare(b[sort])))
    }else if (sort === "date") {
      setPosts([...posts].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)))
    }else {
      setPosts([...posts].sort((a, b) => a.id - b.id))
    }
  }
  // Fetch users on component mount
  useEffect(() => {
    fetchPosts();
  }, [location]);

  // If no posts are available, display loading message and "Add Post" button
  if (posts.length === 0) {
    return <>
      <h1>Loading...</h1>
      <button className="buttonAdd" onClick={() => setRequestAdd(true)}>
        <FontAwesomeIcon icon={faPenToSquare} /><FontAwesomeIcon icon={faPlus} />
      </button>
      {requestAdd && <AddPost fetchPosts={fetchPosts} onAdd={onAdd} />}
    </>;
  }
  return (
    //Once posts are loaded, it displays the list of posts or the filtered posts based on the search criteria.
    <div className="usersList">
      <Outlet/>
      <button className="buttonAdd" onClick={() => setRequestAdd(true)}>
        <FontAwesomeIcon icon={faPenToSquare} />
        <FontAwesomeIcon icon={faPlus} />
      </button>
      {requestAdd && <AddPost fetchPosts={fetchPosts} onAdd={onAdd} />}
      <input placeholder="Search for a Post by your request" className="buttonGetId" value={searchInput} name={requestName} onChange={(e) => setSearchInput(e.target.value)} />
      {/* If the post performs a search using the search input, it filters and displays posts based on the search criteria (id, title). */}
      {/* {searchInput.length > 0 && !err && <button onClick={onSearch} className="button butSearch" ><FontAwesomeIcon icon={faMagnifyingGlass} id="fa" /></button>} */}
      <select className="searchFor" value={requestName} onChange={changeNameRequest}>
        <option value="title">title</option>
        <option value="body">body</option>
      </select>
      <select className="sortBy" onChange={handleSort}>
        <option value="id">sort by id</option>
        <option value="title">sort by title</option>
        <option value="date">sort by date</option>
        <option value="body">sort by body</option>
      </select>
      {/* If the search criteria is set to "id" and an ID is provided, it displays details for the post with that ID using the GetUserById component. */}
      {/* {(id && requestName === "id" && <GetPostById id={id} onGetId={onGet} fetchPosts={fetchPosts} />) ||
        (filteredPosts.length > 0
          ? filteredPosts.map((post, index) => (<PostItem key={index} post={post} fetchPosts={fetchPosts} />)) */}
          {posts.filter(x=>!requestName||!searchInput||x[requestName].includes(searchInput)).map((post, index) => (<PostItem key={index} post={post} fetchPosts={fetchPosts} />))}
      
      {/* If there is an error message (err is not empty), it displays the error message and a "Return" button to clear the error and filtered posts. */}
      {/* <div className="errors">{err}</div> {err && <button className="button buttonReturn" onClick={onReturn}><FontAwesomeIcon icon={faRotateLeft} id="fa" /></button>} */}
      {searchInput&&<button className="button buttonReturn" onClick={onReturn}><FontAwesomeIcon icon={faRotateLeft} id="fa" /></button>}
    </div>
  );


}
export default PostsList