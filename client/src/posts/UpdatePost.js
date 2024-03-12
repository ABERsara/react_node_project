import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom'; // יבוא של פונקציה useNavigate מהספרייה 'react-router-dom'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const UpdatePost = () => {
  const {id}=useParams();
    const [values, setValues] = useState({
        _id:"",
        title: "",
   body:""
    })
    const navigate = useNavigate(); // השמה של פונקצית הניווט useNavigate למשתנה navigate
    // ביצוע פעולות בעת טעינת הקומפוננטה
    useEffect(() => {
        const fetchPostData = async () => {
          try {
            const { data } = await axios.get(`http://localhost:7003/api/posts/${id}`);
            // const { title,body} = data;
            setValues({
              ...values,
              ...data,
              _id:id
            //   title: title || "",
            //  body: body||""
            });
          } catch (error) {
            console.error('Error fetching post:', error);
          }
        };
        fetchPostData();
      console.log(values)
      }, []);
      
   // ביצוע פעולות בעת שינוי בערך של הניווט
  //  useEffect(() => {
  //   navigate("/posts");
  // }, [navigate]);

    const changeInput = (event) => {
        const { name, value } = event.target;
      // Handle  inputs
      setValues({ ...values, [name]: value });
    console.log(values);
      }
    const handleUpdate = async (e) => {
        e.preventDefault();
        // if (!values._id || !values.title ) {
        //     return;
        // }
        try {
            const { data } = await axios.put(`http://localhost:7003/api/posts/`, values);
            console.log(data);
            setValues({   _id:"",
                title: "",
            body:""})
          // Navigate to the updated user's details page
          navigate(`/posts`);
        } catch (error) {
            // Handle errors
            console.error("Error updating post:", error);
        }
    };
    return (
        <form onSubmit={handleUpdate} className="form">
            <div className="form-input">
        <input
          value={values.title}
          name="title"
          placeholder="Please insert the title"
          required={true}
          onChange={changeInput}
        />
        <input
          value={values.body}
          name="body"
          placeholder="Please insert the body"
          onChange={changeInput}
        />
         <div className="buttons-form">
        <button
          className="button saveButton"
          type="submit"
          disabled={!values.title}
        >
          Send
        </button>
        <button className="button goBackButton"><Link to="/posts"><FontAwesomeIcon icon={faRightFromBracket} /></Link></button>
      </div>
      </div>
    </form>
    );
};
export default UpdatePost