import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; // יבוא של פונקציה useNavigate מהספרייה 'react-router-dom'
const UpdateTodo = ({ _id, onUpdate, fetchTodos }) => {
    const [values, setValues] = useState({
        _id,
        title: "",
    tags: [],
    completed: false,
    })
    const navigate = useNavigate(); // השמה של פונקצית הניווט useNavigate למשתנה navigate
    // ביצוע פעולות בעת טעינת הקומפוננטה
    useEffect(() => {
        const fetchTodoData = async () => {
          try {
            const { data } = await axios.get(`http://localhost:7003/api/todos/${_id}`);
            const { title,tags,completed} = data;
            setValues({
              ...values,
              title: title || "",
              tags: tags || "",
              completed: completed || ""
            });
          } catch (error) {
            console.error('Error fetching todo:', error);
          }
        };
        fetchTodoData();
      console.log(values)
      }, [_id]);
      
   // ביצוע פעולות בעת שינוי בערך של הניווט
   useEffect(() => {
    navigate("/todos");
  }, [navigate]);

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
        if (!values._id || !values.title ) {
            return;
        }
        try {
            const { data } = await axios.put(`http://localhost:7003/api/todos/`, values);
            console.log(data);
            setValues({   _id,
                title: "",
            tags: [],
            completed: false,})
            onUpdate(_id)
            fetchTodos()
        } catch (error) {
            // Handle errors
            console.error("Error creating todo:", error);
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
        <button
          className="button saveButton"
          type="submit"
          disabled={!values.title}>
          Send
        </button>
      </div>
    </form>
    );
};
export default UpdateTodo