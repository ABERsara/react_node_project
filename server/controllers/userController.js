const User = require("../models/Users")


const getAllUsers=async (req,res)=>{
    //get all users from mongoDB
    //lean object because we don't need to update the data or make changes
    const users=await User.find().lean()
    //if no tasks
    if(!users?.length)
    {
        return res.status(400).json({message:'No users found'})
    }
    res.json(users)
}

//get user by id
const getUserById=async (req,res)=>{
    const {id}=req.params
    //Get a single user from mongoDB by its id
    //We don't need to make changes then we can receives the object lean
    try{
    const user=await User.findById(id).lean()
    res.json(user)
    //if no user
    if(!user){
        return res.status(400).json({message:'No user found'})
    }
}catch(err){
    return res.status(500).json({message:err})
}
    
}

const createNewUser = async (req, res) => {
    const { name, username, email, address, phone } = req.body;
    console.log(req.body);
    //confirm data!
    if (!name || !username ) {
        return res.status(400).json({ message: 'name and username are required' })
    }
    try {
        // Create and store the new user
        const user = await User.create({ name, username, email, address, phone });
        res.status(201).json({ message: 'New user created', user });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}
//update a user
//becuse of the changes, we need a exec object , not lean
const updateUser=async (req,res)=>{
    const {_id,name, username, email, address, phone}=req.body
    //Confirm data
    if(!_id||!name||!username){
        return res.status(400).json({message:"Fields are required"})
    }
    //confirm user existed to update 
    const user=await User.findById(_id).exec()
    if(!user){
        return res.status(400).json({message:"User not found"})
    }
    user.name=name
    user.username=username
    user.email=email
    user.phone=phone
    user.address=address
    //save the changes
    const updatedUser=await user.save()
    res.json(`${updatedUser.name} updated`)
}

//delete a user
const deleteUser=async (req,res)=>{
    const {id}=req.body

    //Confirm user existed to delete it
    try {
        const user = await User.findById(id).exec();

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const result = await user.deleteOne();
        const reply = `User '${user.name}' ID:${user._id} was deleted`;
        res.json(reply);
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
//ייצוא הפונקציות
module.exports={
    getAllUsers,
    getUserById,
    createNewUser,
    updateUser,
    deleteUser
}
