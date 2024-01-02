const Photo = require("../models/Photos")


const getAllPhotos=async (req,res)=>{
    //get all photos from mongoDB
    //lean object because we don't need to update the data or make changes
   const photos=await Photo.find().lean()
    //if no posts
    if(!photos?.length){
      return res.status(400).json({message:"No photos found"})
    }
    res.json(photos)
}
//get post by id
const getPhotoById=async (req,res)=>{
    const {id}=req.params
    //Get a single photo from mongoDB by its id
    //We don't need to make changes then we can receives the object lean
   const photo=await Photo.findById(id).lean()
    //if no tasks
    if(!photo){
        return res.status(400).jsom({message:"No such a photo"})
    }
    res.json(photo)
}

const createNewPhoto = async (req, res) => {
    const { title,imageUrl,category } = req.body
    //confirm data!
    if(!title){
        return res.status(400).json({message:"Title is required!"})
    }
    //create and store the new post
    const photo=await Photo.create({title,imageUrl,category})
    //create it!
    if(photo){
        return res.status(201).json({message:"New photo created"})
    }
    else{
return res.status(400).json({message:"Invalid photo"})
    }
    
}
//update a photo
//becuse of the changes, we need a exec object , not lean
const updatePhoto=async (req,res)=>{
    const {_id,title,imageUrl,category }=req.body
    //Confirm data
    if(!_id||!title){
        return res.status(400).json({message:"Fields are required"})
    }
    try{
    //confirm photo existed to update 
    const photo=await Photo.findById(_id).exec()
    if(!photo){
        return res.status(400).json({message:"Photo doesn't found"})
    }
        //update
     photo.title=title
    photo.imageUrl=imageUrl
    photo.category=category
    //save the changes
    const updatePhoto=await photo.save()
    res.json(`${updatePhoto.title} updated`)
    
}catch(err){
    console.log(err)
}
    
    
}

//delete a photo
const deletePhoto=async (req,res)=>{
  const {id}=req.body
//confirm id was sent
if(!id){
    return res.status(400).json({message:"Id is required"})
}
    //Confirm photo existed to delete it
const photo=await Photo.findById(id).exec()
if(!photo){
    return res.status(400).json({message:"Photo wasn't found"})
}
   //delete it
   const result=await photo.deleteOne()
//send a messege that the photo was deleted
const reply=`Photo ${photo.title} with Id:${photo._id} was deleted`
res.json(`Result: ${result}\n ${reply}`)
}
//ייצוא הפונקציות
module.exports={
    getAllPhotos,
    getPhotoById,
    createNewPhoto,
    updatePhoto,
    deletePhoto
}
