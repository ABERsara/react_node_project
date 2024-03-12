import axios from "axios"; // Use lowercase 'axios' for import
import { useState } from "react";
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate} from 'react-router-dom'; 


const AddUser = ({ fetchUsers, onAdd }) => {
    //Create a variable using useNavigate
  const navigate = useNavigate(); 
    const [values, setValues] = useState({
        name: "",
        username: "",
        email: "",
        address: "",
        phone: ""
    })
    const changeInput = (event) => {
        const { name, value } = event.target;
          setValues({ ...values, [name]: value });
      }
      const handleGoBack = () => {
        // This will go back one step in the navigation history
        navigate(-1);
      };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!values.name || !values.username) {
            return;
        }
        try {
            const { data } = await axios.post("http://localhost:7003/api/users", values);
            console.log(data);
            setValues({
                name: "",
                username: "",
                email: "",
                address: "",
                phone: ""
            })
            fetchUsers()
            onAdd()
        } catch (error) {
            // Handle errors
            console.error("Error creating user:", error);
        }

    };
    
    return (
        <form onSubmit={handleSubmit} className="formAdd">
            <div className="form-input">
            <input
                value={values.name}
                name="name"
                placeholder="Please insert your surname"
                required={true}
                onChange={changeInput}
            />
            <input
                value={values.username}
                name="username"
                placeholder="Please insert your lastname"
                required={true}
                onChange={changeInput} />
            <input
                value={values.email}
                name="email"
                placeholder="Please insert your email"
                onChange={changeInput} />
            <input
                value={values.phone}
                name="phone"
                placeholder="Please insert your phone number"
                onChange={changeInput} />
            <input
                value={values.address}
                name="address"
                placeholder="Please insert your address"
                onChange={changeInput} />
                <div className="buttons-form">
            <button className="button saveButton"type="submit" disabled={!values.name || !values.username} >Send</button>
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

export default AddUser;
