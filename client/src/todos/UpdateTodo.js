import axios from "axios";
import React,{ useState, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom'; // יבוא של פונקציה useNavigate מהספרייה 'react-router-dom'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const UpdateTodo = ({ _id, onUpdate, fetchTodos }) => {
   const {id}=useParams();
  const [values, setValues] = useState({
        _id:"",
        title: "",
    tags: [],
    completed: false,
    })
    const navigate = useNavigate(); // השמה של פונקצית הניווט useNavigate למשתנה navigate
    // ביצוע פעולות בעת טעינת הקומפוננטה
    useEffect(() => {
        const fetchTodoData = async () => {
          try {
            const { data } = await axios.get(`http://localhost:7003/api/todos/${id}`);
            // const { title,tags,completed} = data;
            setValues({
              ...values,
              ...data,
              _id:id
              // title: title || "",
              // tags: tags || [],
              // completed: completed || false
            });
          } catch (error) {
            console.error('Error fetching todo:', error);
          }
        };
        fetchTodoData();
      console.log(values)
      }, []);
      
   // ביצוע פעולות בעת שינוי בערך של הניווט
  //  useEffect(() => {
  //   navigate("/todos");
  // }, [navigate]);

    const changeInput = (event) => {
        const { name, value, type, checked } = event.target;
    // Handle tags as an array
    if (name === "tags") {
      const tagsArray = value.split(",").map((tag) => tag.trim());
      setValues({ ...values, [name]: tagsArray });
    } else if (type === "checkbox") {
      // Handle checkbox value
      setValues({ ...values, [name]: checked });
    } else {
      // Handle other inputs
      setValues({ ...values, [name]: value });
    }

    console.log(values);
      }
    const handleUpdate = async (e) => {
        e.preventDefault();
        // if (!values._id || !values.title ) {
        //     return;
        // }
        try {
            const { data } = await axios.put(`http://localhost:7003/api/todos/`, values);
            console.log(data);
            setValues({   _id,
                title: "",
            tags: [],
            completed: false,})
            // onUpdate(_id)
            // fetchTodos()
             // Navigate to the updated user's details page
             navigate(`/todos`);
        } catch (error) {
            // Handle errors
            console.error("Error updating todo:", error);
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
          value={values.tags.join(", ")}
          name="tags"
          placeholder="Please insert the tags (comma-separated)"
          onChange={changeInput}
        />
        <input
          type="checkbox"
          checked={values.completed}
          name="completed"
          onChange={changeInput}
        />
        <label htmlFor="completed">Completed</label>
        <div className="buttons-form">
        <button className="button saveButton" type="submit"  >Save</button>
          <button className="button goBackButton"><Link to="/todos"><FontAwesomeIcon icon={faRightFromBracket} /></Link></button> 
           </div>
            </div>
    </form>
    );
};
export default UpdateTodo