import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; // יבוא של פונקציה useNavigate מהספרייה 'react-router-dom'
const UpdatePhoto = ({ _id, onUpdate, fetchPhotos }) => {
    const [values, setValues] = useState({
        _id,
        title:"",
        imageUrl:"",
        category:""
    })
    const navigate = useNavigate(); // השמה של פונקצית הניווט useNavigate למשתנה navigate
    // ביצוע פעולות בעת טעינת הקומפוננטה
    useEffect(() => {
        const fetchPhotoData = async () => {
          try {
            const { data } = await axios.get(`http://localhost:7003/api/photos/${_id}`);
            const { title,imageUrl,category} = data;
            setValues({
              ...values,
              title: title || "",
              imageUrl:imageUrl||"",
              category:category||""
            });
          } catch (error) {
            console.error('Error fetching photo:', error);
          }
        };
        fetchPhotoData();
      console.log(values)
      }, [_id]);
      
   // ביצוע פעולות בעת שינוי בערך של הניווט
   useEffect(() => {
    navigate("/photos");
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
            const { data } = await axios.put(`http://localhost:7003/api/photos/`, values);
            console.log(data);
            setValues({   _id,
                title:"",
        imageUrl:"",
        category:""})
            onUpdate(_id)
            fetchPhotos()
        } catch (error) {
            // Handle errors
            console.error("Error creating photo:", error);
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
          value={values.imageUrl}
          name="imageUrl"
          placeholder="Please insert the image url"
          onChange={changeInput}
        />
        <input
          value={values.category}
          name="category"
          placeholder="Please insert the category"
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
export default UpdatePhoto