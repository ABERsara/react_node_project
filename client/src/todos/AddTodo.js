import axios from "axios";
import { useState } from "react";

const AddTodo = ({ fetchTodos, onAdd }) => {
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

export default AddTodo;
