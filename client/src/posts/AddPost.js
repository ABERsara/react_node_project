import axios from "axios";
import { useState } from "react";

const AddPost = ({ fetchPosts, onAdd }) => {
  const [values, setValues] = useState({
    title: "",
    body:""
  });
  const changeInput = (event) => {
    const { name, value } = event.target;
  // Handle  inputs
  setValues({ ...values, [name]: value });
console.log(values);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.title) {
      return;
    }
    try {
      const { data } = await axios.post(
        "http://localhost:7003/api/posts",
        values
      );
      console.log(data);
      setValues({
        title: "",
        body:""
      });
      fetchPosts();
      onAdd();
    } catch (error) {
      // Handle errors
      console.error("Error creating post:", error);
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

export default AddPost;
