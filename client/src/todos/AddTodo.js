import axios from "axios";
import { useState } from "react";
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate} from 'react-router-dom'; 

const AddTodo = ({ fetchTodos, onAdd }) => {
  //Create a variable using useNavigate
  const navigate = useNavigate(); 
  const [values, setValues] = useState({
    title: "",
    tags: [],
    completed: false,
  });
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
  };
  const handleGoBack = () => {
    // This will go back one step in the navigation history
    navigate(-1);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.title) {
      return;
    }
    try {
      const { data } = await axios.post(
        "http://localhost:7003/api/todos",
        values
      );
      console.log(data);
      setValues({
        title: "",
        tags: [],
        completed: false,
      });
      fetchTodos();
      onAdd();
    } catch (error) {
      // Handle errors
      console.error("Error creating todo:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="formAdd">
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
        <button
          className="button saveButton"
          type="submit"
          disabled={!values.title}
        >
          Send
        </button>
        <button
        type="button"  // Set the type to button to prevent form submission
        className="button goBackButton"
        onClick={handleGoBack}
      >
         <FontAwesomeIcon icon={faRightFromBracket} />
      </button>
      </div>
      </div>
    </form>
  );
};

export default AddTodo;
