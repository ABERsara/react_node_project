import axios from "axios";
import { useState } from "react";

const AddPhoto = ({ fetchPhotos, onAdd }) => {
  const [values, setValues] = useState({
    title:"",
    imageUrl:"",
    category:""
  });
  const changeInput = (event) => {
    const { name, value } = event.target;
      // Handle  inputs
      setValues({ ...values, [name]: value });
    console.log(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.title) {
      return;
    }
    try {
      const { data } = await axios.post(
        "http://localhost:7003/api/photos",
        values
      );
      console.log(data);
      setValues({
        title:"",
        imageUrl:"",
        category:""
      });
      fetchPhotos();
      onAdd();
    } catch (error) {
      // Handle errors
      console.error("Error creating photo:", error);
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

export default AddPhoto;
