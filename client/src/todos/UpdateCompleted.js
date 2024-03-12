import axios from "axios";
import { useEffect } from "react";
const UpdateCompleted = ({ _id, onCompleted, fetchTodos }) => {
   

    useEffect(() => {
    const handleUpdate = async () => {
        if (!_id ) {
            console.log("no id! doesn't updated completed")
            return;
        }
        try {
            const { data } = await axios.put(`http://localhost:7003/api/todos/${_id}`);
            console.log(data);
            onCompleted(_id)
            fetchTodos()
        } catch (error) {
            // Handle errors
            console.error("Error updating completing todo:", error);
        }
    }
    handleUpdate();
    }, [_id]);
    return (<></>);
};
export default UpdateCompleted



export const handleUpdate = async ({_id,fetchTodos,onCompleted }) => {
    if (!_id ) {
        console.log("no id! doesn't updated completed")
        return;
    }
    try {
        const { data } = await axios.put(`http://localhost:7003/api/todos/${_id}`);
        console.log(data);
        onCompleted(_id)
        fetchTodos()
    } catch (error) {
        // Handle errors
        console.error("Error updating completing todo:", error);
    }
}