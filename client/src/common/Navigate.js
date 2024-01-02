import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faListCheck,faImages,faUser,faPenToSquare} from '@fortawesome/free-solid-svg-icons'
const Navigates = () => {
    return <div className="nav">
        <NavLink to="/">Home page</NavLink>
        <NavLink to="/users"><FontAwesomeIcon icon={faUser} />Users</NavLink>
        <NavLink to="/posts"><FontAwesomeIcon icon={faPenToSquare} />posts</NavLink>
        <NavLink to="/todos"><FontAwesomeIcon icon={faListCheck} />todos</NavLink>
        <NavLink to="/photos"><FontAwesomeIcon icon={faImages} />photos</NavLink>
    </div>
}
export default Navigates