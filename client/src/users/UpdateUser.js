import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; // יבוא של פונקציה useNavigate מהספרייה 'react-router-dom'
const UpdateUser = ({ _id, onUpdate, fetchUsers }) => {
    const [values, setValues] = useState({
        _id,
        name: "",
        username: "",
        email: "",
        address: "",
        phone: ""
    })
    const navigate = useNavigate(); // השמה של פונקצית הניווט useNavigate למשתנה navigate
    // ביצוע פעולות בעת טעינת הקומפוננטה
    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const { data } = await axios.get(`http://localhost:7003/api/users/${_id}`);
            const { name, username, email, address, phone } = data;
            setValues({
              ...values,
              name: name || "",
              username: username || "",
              email: email || "",
              address: address || "",
              phone: phone || ""
            });
          } catch (error) {
            console.error('Error fetching user:', error);
          }
        };
        fetchUserData();
      console.log(values)
      }, [_id]);
      
   // ביצוע פעולות בעת שינוי בערך של הניווט
   useEffect(() => {
    navigate("/users");
  }, [navigate]);

    const changeInput = (event) => {
        const { name, value } = event.target;
          setValues({ ...values, [name]: value });
      }
    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!values._id || !values.name || !values.username) {
            return;
        }
        try {
            const { data } = await axios.put(`http://localhost:7003/api/users/`, values);
            console.log(data);
            setValues({ _id,
                name: "",
                username: "",
                email: "",
                address: "",
                phone: ""})
            onUpdate(_id)
            fetchUsers()
        } catch (error) {
            // Handle errors
            console.error("Error creating user:", error);
        }
    };
    return (
        <form onSubmit={handleUpdate} className="form">
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
            <button className="button saveButton"type="submit" disabled={!values.name || !values.username} >Save</button>
            </div>
        </form>
    );
};
export default UpdateUser