import axios from "axios";
import React,{ useState, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom'; // יבוא של פונקציה useNavigate מהספרייה 'react-router-dom'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const UpdateUser = () => {
  const {id}=useParams();
    const [values, setValues] = useState({
      _id:"",
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
            const { data } = await axios.get(`http://localhost:7003/api/users/${id}`);
            //  const { name } = data;
            // console.log(`receives user:${name }, ${id}`)
            setValues({
              ...values,
              ...data,
              _id:id
              // name: data.name || "",
              // username: username || "",
              // email: email || "",
              // address: address || "",
              // phone: phone || ""
            });
            console.log(`receives set values user:${values.name },${values._id} `)

          } catch (error) {
            console.error('Error fetching user:', error);
          }
        };
        fetchUserData();
      console.log(values)
      }, []);
      
   // ביצוע פעולות בעת שינוי בערך של הניווט
//    useEffect(() => {
//     navigate("/users");
//   }, [navigate]);

    const changeInput = (event) => {
        const { name, value } = event.target;
          setValues({ ...values, [name]: value });
      }
    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!values._id|| !values.name || !values.username) {
            return;
        }
        try {
          
            const { data } = await axios.put(`http://localhost:7003/api/users`,  values);
            console.log(`put user ${data}`);
            setValues({
              _id: "",
              name: "",
              username: "",
              email: "",
              address: "",
              phone: ""
            });
        
            // Navigate to the updated user's details page
            navigate(`/users`);
          } catch (error) {
            console.error("Error updating user:", error);
          }
        };
    //הצגת הקומפוננטה
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
                <div className="buttons-form">
            <button className="button saveButton" type="submit"  >Save</button>
           <button className="button goBackButton"><Link to="/users"><FontAwesomeIcon icon={faRightFromBracket} /></Link></button>
           </div>
            </div>
        </form>
    );
};
export default UpdateUser