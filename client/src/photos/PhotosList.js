// Component for managing and displaying a list of photos
import React, { useState, useEffect } from "react";
import Axios from "axios";
import PhotoItem from "./PhotoItem";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faListCheck} from '@fortawesome/free-solid-svg-icons'
import AddPhoto from "./AddPhoto";
import { Outlet, useLocation } from 'react-router-dom';
// import GetPhotoById from "./GetPhotoById";
const PhotosList = () => {
  const location = useLocation()

  // Search input state for filtering users by id, name, email, or phone
  //   const [requestName, setRequestName] = useState("id")
  const [photos, setPhotos] = useState([])
  // const [filteredPhotos, setFilteredPhotos] = useState([])
  //   const [id, setId] = useState("")
  const [requestAdd, setRequestAdd] = useState(false)
  // const [searchInput, setSearchInput] = useState("")
  const [err, setErr] = useState("")

  // Function to fetch photos from the server
  const fetchPhotos = async () => {
    try {
      const { data } = await Axios.get("http://localhost:7003/api/photos/");
      setPhotos(data);
    } catch (error) {
      console.error("Error fetching photos:", error);
      setPhotos([])
    }
  };

  // Function to handle the "Add Photo" button click
  const onAdd = () => {
    setRequestAdd(false)
  }

  // Function to handle the "Get Photo" button click
  //   const onGet = () => {
  //     console.log(id)
  //     setId("");
  //     setRequestName("")
  //   };

  // Function to handle the search based on id or title
  //   const onSearch = (e) => {
  //     console.log(requestName)
  //     e.preventDefault();
  //     setFilteredPhotos([]);
  //     if (requestName === "id") {
  //       const validId = photos.find((photo) => photo._id === searchInput);
  //       if (validId) {
  //         console.log(validId)
  //         setId(searchInput);
  //         setSearchInput("")
  //       } else {
  //         setErr("The id doesn't exist, please try again.");
  //         console.log(err)
  //       }
  //     } else {
  //       const filtered = photos.filter((photo) => photo[requestName].toLowerCase().includes(searchInput.toLowerCase()));
  //       if (filtered.length > 0) {
  //         setFilteredPhotos(filtered);
  //         setErr(" ")
  //       } else {
  //         setErr(`The ${requestName} doesn't exist, please try again.`)
  //       }
  //       setId("");
  //       setSearchInput("")
  //     }
  //   };

  // Function to handle the "Return" button click
  const onReturn = () => {
    setErr("")
    // setFilteredPhotos([])
  }

  // Function to handle the change in the search request type (id, title)
  //   const changeNameRequest = (event) => {
  //     setRequestName(event.target.value)
  //     console.log(requestName)
  //   }
  //Function to sort the users by request
  const handleSort = (e) => {
    console.log(e.target.value)
    const sort = e.target.value
    if (sort === "title" || sort === "category") {
      setPhotos([...photos].sort((a, b) => a[sort].localeCompare(b[sort])))
    } else if (sort === "date") {
      setPhotos([...photos].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)))
    } else {
      setPhotos([...photos].sort((a, b) => a.id - b.id))
    }
  }
  // Fetch users on component mount
  useEffect(() => {
    fetchPhotos();
  }, [location]);

  // If no photos are available, display loading message and "Add Photo" button
  if (photos.length === 0) {
    return <>
      <h1>Loading...</h1>
      <button className="buttonAdd" onClick={() => setRequestAdd(true)}>
        <FontAwesomeIcon icon={faListCheck} />
        <FontAwesomeIcon icon={faPlus} />
      </button>
      {requestAdd && <AddPhoto fetchPhotos={fetchPhotos} onAdd={onAdd} />}
    </>;
  }
  return (
    //Once photos are loaded, it displays the list of photos or the filtered photos based on the search criteria.
    <div className="usersList">
      <Outlet/>
      <button className="buttonAdd" onClick={() => setRequestAdd(true)}>
        <FontAwesomeIcon icon={faListCheck} />
        <FontAwesomeIcon icon={faPlus} />
      </button>
      {requestAdd && <AddPhoto fetchPhotos={fetchPhotos} onAdd={onAdd} />}
      {/* <input placeholder="Search for a Photo by your request" className="buttonGetId" value={searchInput} name={requestName} onChange={(e) => setSearchInput(e.target.value)} /> */}
      {/* If the photo performs a search using the search input, it filters and displays photos based on the search criteria (id, title). */}
      {/* {searchInput.length>0&& !err && <button onClick={onSearch} className="button butSearch" ><FontAwesomeIcon icon={faMagnifyingGlass} id="fa" /></button>}
      <select className="searchFor" value={requestName} onChange={changeNameRequest}>
        <option value="id">id</option>
        <option value="title">title</option>
      </select> */}
      {/* If the search criteria is set to "id" and an ID is provided, it displays details for the photo with that ID using the GetUserById component. */}
      {/* {*/}
      <select className="sortBy" onChange={handleSort}>
        <option value="title">sort by title</option>
        <option value="date">sort by date</option>
        <option value="category">sort by category</option>
      </select>
      {/* {(filteredPhotos.length > 0
        ? filteredPhotos.map((photo, index) => (<PhotoItem key={index} photo={photo} fetchPhotos={fetchPhotos} />)) */}
       {photos.map((photo, index) => (<PhotoItem key={index} photo={photo} fetchPhotos={fetchPhotos} />))}

      {/* If there is an error message (err is not empty), it displays the error message and a "Return" button to clear the error and filtered photos. */}
      {/* <div className="errors">{err}</div> {err && <button className="button buttonReturn" onClick={onReturn}><FontAwesomeIcon icon={faRotateLeft} id="fa" /></button>} */}
    </div>
  );



}
export default PhotosList