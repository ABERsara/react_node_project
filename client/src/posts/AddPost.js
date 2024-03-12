import axios from "axios";
import { useState } from "react";
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate} from 'react-router-dom'; 


const AddPost = ({ fetchPosts, onAdd }) => {
   //Create a variable using useNavigate
   const navigate = useNavigate(); 
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
        onClick={handleGoBack}>
         <FontAwesomeIcon icon={faRightFromBracket} />
      </button>
      </div>
      </div>
    </form>
  );
};

export default AddPost;
