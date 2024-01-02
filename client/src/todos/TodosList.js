// Component for managing and displaying a list of todos
import React, { useState, useEffect } from "react";
import Axios from "axios";
import TodoItem from "./Todoitem";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faListCheck, faRotateLeft, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import AddTodo from "./AddTodo";
import GetTodoById from "./GetTodoById";
const TodosList = () => {

  // Search input state for filtering users by id, name, email, or phone
  const [requestName, setRequestName] = useState("id")
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([])
  const [id, setId] = useState("");
  const [requestAdd, setRequestAdd] = useState(false)
  const [searchInput, setSearchInput] = useState("");
  const [err, setErr] = useState("")

  // Function to fetch todos from the server
  const fetchTodos = async () => {
    try {
      const { data } = await Axios.get("http://localhost:7003/api/todos/");
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
      setTodos([])
    }
  };

  // Function to handle the "Add Todo" button click
  const onAdd = () => {
    setRequestAdd(false)
  }

  // Function to handle the "Get Todo" button click
  const onGet = () => {
    console.log(id)
    setId("");
    setRequestName("")
  };

  // Function to handle the search based on id or title
  const onSearch = (e) => {
    console.log(requestName)
    e.preventDefault();
    setFilteredTodos([]);
    if (requestName === "id") {
      const validId = todos.find((todo) => todo._id === searchInput);
      if (validId) {
        console.log(validId)
        setId(searchInput);
        setSearchInput("")
      } else {
        setErr("The id doesn't exist, please try again.");
        console.log(err)
      }
    } else {
      const filtered = todos.filter((todo) => todo[requestName].toLowerCase().includes(searchInput.toLowerCase()));
      if (filtered.length > 0) {
        setFilteredTodos(filtered);
        setErr(" ")
      } else {
        setErr(`The ${requestName} doesn't exist, please try again.`)
      }
      setId("");
      setSearchInput("")
    }
  };

  // Function to handle the "Return" button click
  const onReturn = () => {
    setErr("")
    setFilteredTodos([])
  }

  // Function to handle the change in the search request type (id, title)
  const changeNameRequest = (event) => {
    setRequestName(event.target.value)
    console.log(requestName)
  }
  //Function to sort the users by request
  const handleSort = (e) => {
    console.log(e.target.value)
    const sort = e.target.value
    switch (sort) {
      case "title": setFilteredTodos([...todos].sort((a, b) => a.title.localeCompare(b.title)))
        break;
      case "id": setFilteredTodos([...todos].sort((a, b) => a.id - b.id))
        break;
      case "date": setFilteredTodos([...todos].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)))
        break;
    }
  }
  // Fetch users on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  // If no todos are available, display loading message and "Add Todo" button
  if (todos.length === 0) {
    return <>
      <h1>Loading...</h1>
      <button className="buttonAdd" onClick={() => setRequestAdd(true)}>
        <FontAwesomeIcon icon={faListCheck} />
        <FontAwesomeIcon icon={faPlus} />
      </button>
      {requestAdd && <AddTodo fetchTodos={fetchTodos} onAdd={onAdd} />}
    </>;
  }
  return (
    //Once todos are loaded, it displays the list of todos or the filtered todos based on the search criteria.
    <div className="usersList">
      <button className="buttonAdd" onClick={() => setRequestAdd(true)}>
        <FontAwesomeIcon icon={faListCheck} />
        <FontAwesomeIcon icon={faPlus} />
      </button>
      {requestAdd && <AddTodo fetchTodos={fetchTodos} onAdd={onAdd} />}
      <input placeholder="Search for a Todo by your request" className="buttonGetId" value={searchInput} name={requestName} onChange={(e) => setSearchInput(e.target.value)} />
      {/* If the todo performs a search using the search input, it filters and displays todos based on the search criteria (id, title). */}
      {searchInput.length > 0 && !err && <button onClick={onSearch} className="button butSearch" ><FontAwesomeIcon icon={faMagnifyingGlass} id="fa" /></button>}
      <select className="searchFor" value={requestName} onChange={changeNameRequest}>
        <option value="id">id</option>
        <option value="title">title</option>
      </select>
      <select className="sortBy" onChange={handleSort}>
        <option value="id">id</option>
        <option value="title">title</option>
        <option value="date">date</option>
      </select>
      {/* If the search criteria is set to "id" and an ID is provided, it displays details for the todo with that ID using the GetUserById component. */}
      {(id && requestName === "id" && <GetTodoById id={id} onGetId={onGet} fetchTodos={fetchTodos} />) ||
        (filteredTodos.length > 0
          ? filteredTodos.map((todo, index) => (<TodoItem key={index} todo={todo} fetchTodos={fetchTodos} />))
          : todos.map((todo, index) => (<TodoItem key={index} todo={todo} fetchTodos={fetchTodos} />))
        )}
      {/* If there is an error message (err is not empty), it displays the error message and a "Return" button to clear the error and filtered todos. */}
      <div className="errors">{err}</div> {err && <button className="button buttonReturn" onClick={onReturn}><FontAwesomeIcon icon={faRotateLeft} id="fa" /></button>}
    </div>
  );


}
export default TodosList