// Component for managing and displaying a list of users
import React, { useState, useEffect } from "react";
import Axios from "axios";
import UserItem from "./UserItem";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {  } from '@fortawesome/free-solid-svg-icons'
import { faUserPlus,faRotateLeft,faMagnifyingGlass  } from '@fortawesome/free-solid-svg-icons';
import AddUser from "./AddUser";
import { Outlet, useLocation } from 'react-router-dom';

const UsersList = () => {
  const location = useLocation()
  // Search input state for filtering users by id, name, email, or phone
  const [requestName, setRequestName] = useState("name")
  const [users, setUsers] = useState([]);
  const [requestAdd, setRequestAdd] = useState(false)
  const [searchInput, setSearchInput] = useState("");
  const [err, setErr] = useState("")
  const [showAddUsersForm, setShowAddUsersForm] = useState(false);

  // Function to fetch users from the server
  const fetchUsers = async () => {
    try {
      const { data } = await Axios.get("http://localhost:7003/api/users/");
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([])
    }
  };

  // Function to handle the "Add User" button click
  const onAdd = () => {
    setRequestAdd(false)
    // setUsers([...users])
  }

  // Function to handle the "Get User" button click
  // const onGet = () => {
  //   console.log(id)
  //   setId("");
  //   setRequestName("")
  // };

  // Function to handle the search based on id, name, email, or phone
  // const onSearch = (e) => {
  //   console.log("requestName " + requestName + " searchInput " + searchInput)

  //   e.preventDefault();
  //   setFilteredUsers([]);
  //   if (requestName === "id") {
  //     const validId = users.find((user) => user._id === searchInput);
  //     if (validId) {
  //       console.log(validId)
  //       setId(searchInput);
  //       setSearchInput("")
  //     } else {
  //       setErr("The id doesn't exist, please try again.");
  //       console.log(err)
  //     }
  //   } else {
  //     const filtered = users.filter((user) => user[requestName] === searchInput);
  //     if (filtered.length > 0) {
  //       setFilteredUsers(filtered);
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
    // setFilteredUsers([])
  }

  // Function to handle the change in the search request type (id, name, email, phone, username)
  const changeNameRequest = (event) => {
    setRequestName(event.target.value)
    console.log("requestName " + requestName)
  }
  //Function to sort the users by request
  const handleSort = (e) => {
    console.log(e.target.value)
    const sort = e.target.value
   if(sort==="name"||sort==="email"||sort==="phone"){
    setUsers([...users].sort((a, b) => a[sort].localeCompare(b[sort])))
   }
  else{
       setUsers([...users].sort((a, b) => a.id-b.id))
    }
  }
  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, [location]);
// useEffect השני שמטפל בלחיצה מחוץ לתיק AddTodoForm
useEffect(() => {
  const handleOutsideClick = (e) => {
      if (showAddUsersForm && e.target.closest('.add-user-form') === null) {
          setShowAddUsersForm(false);
      }
  };
  document.addEventListener('click', handleOutsideClick);

  return () => {
      document.removeEventListener('click', handleOutsideClick);
  };
}, [showAddUsersForm]);
  // If no users are available, display loading message and "Add User" button
  if (users.length === 0) {
    return <>
      <h1>Loading...</h1>
      <button className="buttonAdd" onClick={() => setRequestAdd(true)}>
        <FontAwesomeIcon icon={faUserPlus} />
      </button>
      {requestAdd && <AddUser fetchUsers={fetchUsers} onAdd={onAdd} />}
    </>;
  }



  return (
    //Once users are loaded, it displays the list of users or the filtered users based on the search criteria.
    <div className="usersList">
      <Outlet/>
      <button className="buttonAdd" onClick={() => setRequestAdd(true)}>
        <FontAwesomeIcon icon={faUserPlus} />
      </button>
      {requestAdd && <AddUser fetchUsers={fetchUsers} onAdd={onAdd} />}
      <input placeholder="Search for a user by your request" className="buttonGetId" value={searchInput} name={requestName} onChange={(e) => setSearchInput(e.target.value)} />
      {/* If the user performs a search using the search input, it filters and displays users based on the search criteria (id, name, email, phone, username). */}
      {/* {searchInput.length > 0 && !err && <button onClick={onSearch} className="button butSearch" ><FontAwesomeIcon icon={faMagnifyingGlass} id="fa" /></button>} */}
  
      <select className="searchFor" value={requestName} onChange={changeNameRequest}>
        <option value="name">name</option>
        <option value="email">email</option>
        <option value="phone">phone</option>
        <option value="username">username</option>
        <option value="adress">adress</option>
      </select> 
      <select className="sortBy" onChange={handleSort}>
        <option value="id">sort by id</option>
        <option value="name">sort by name</option>
        <option value="email">sort by email</option>
        <option value="phone">sort by phone</option>
      </select> 
      {/* If the search criteria is set to "id" and an ID is provided, it displays details for the user with that ID using the GetUserById component. */}
      {/* {(id && requestName === "id" && <GetUserById id={id} onGetId={onGet} fetchUsers={fetchUsers} />) ||
        (filteredUsers.length > 0
          ? filteredUsers.map((user, index) => (<UserItem key={index} user={user} fetchUsers={fetchUsers} />)) */}
        {users.filter(x=>!requestName||!searchInput|| x[requestName].includes(searchInput)).map((user, index) => (<UserItem key={index} user={user} fetchUsers={fetchUsers} />))}
       
      {/* If there is an error message (err is not empty), it displays the error message and a "Return" button to clear the error and filtered users. */}
      {/* <div className="errors">{err}</div> {err && <button className="button buttonReturn" onClick={onReturn}><FontAwesomeIcon icon={faRotateLeft} id="fa" /></button>} */}
      {searchInput&&<button className="button buttonReturn" onClick={onReturn}><FontAwesomeIcon icon={faRotateLeft} id="fa" /></button>}
    </div>
  );
};

export default UsersList;
