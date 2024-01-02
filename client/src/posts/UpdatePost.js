import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; // יבוא של פונקציה useNavigate מהספרייה 'react-router-dom'
const UpdatePost = ({ _id, onUpdate, fetchPosts }) => {
    const [values, setValues] = useState({
        _id,
        title: "",
   body:""
    })
    const navigate = useNavigate(); // השמה של פונקצית הניווט useNavigate למשתנה navigate
    // ביצוע פעולות בעת טעינת הקומפוננטה
    useEffect(() => {
        const fetchPostData = async () => {
          try {
            const { data } = await axios.get(`http://localhost:7003/api/posts/${_id}`);
            const { title,body} = data;
            setValues({
              ...values,
              title: title || "",
             body: body||""
            });
          } catch (error) {
            console.error('Error fetching post:', error);
          }
        };
        fetchPostData();
      console.log(values)
      }, [_id]);
      
   // ביצוע פעולות בעת שינוי בערך של הניווט
   useEffect(() => {
    navigate("/posts");
  }, [navigate]);

    const changeInput = (event) => {
        const { name, value } = event.target;
      // Handle  inputs
      setValues({ ...values, [name]: value });
    console.log(values);
      }
    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!values._id || !values.title ) {
            return;
        }
        try {
            const { data } = await axios.put(`http://localhost:7003/api/posts/`, values);
            console.log(data);
            setValues({   _id,
                title: "",
            body:""})
            onUpdate(_id)
            fetchPosts()
        } catch (error) {
            // Handle errors
            console.error("Error creating post:", error);
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
        <button
          className="button saveButton"
          type="submit"
          disabled={!values.title}
        >
          Send
        </button>
      </div>
    </form>
    );
};
export default UpdatePost