const Post = require("../models/Posts")


const getAllPosts = async (req, res) => {
    //get all posts from mongoDB
    //lean object because we don't need to update the data or make changes
    const posts = await Post.find().lean()
    //if no posts
    if (!posts?.length) {
        return res.status(400).json({ message: 'No posts found' })
    }
    res.json(posts)
}

//get post by id
const getPostById = async (req, res) => {
    const { id } = req.params
    //Get a single post from mongoDB by its id
    //We don't need to make changes then we can receives the object lean
    const post = await Post.findById(id).lean()
    //if no posts
    if (!post) {
        return res.status(400).json({ message: 'No post found' })
    }
    res.json(post)
}

const createNewPost = async (req, res) => {
    const { title, body, category, postDate } = req.body
    //confirm data!
    if (!title) {
        return res.status(400).json({ message: 'title is required' })
    }
    //create and store the new post
    const post = await Post.create({ title, body, category, postDate })
    if (post)//create it!
    {
        return res.status(201).json({ message: 'New post created' })

    }
    else {
        res.status(400).json({ message: "Invalid post" })
    }
}
//update a post
//becuse of the changes, we need a exec object , not lean
const updatePost = async (req, res) => {
    const { _id, title, body, category, postDate } = req.body
    //Confirm data
    if (!_id || !title) {
        return res.status(400).json({ message: "Fields are required" })
    }
    //confirm post existed to update 
    const post = await Post.findById(_id).exec()
    if (!post) {
        return res.status(400).json({ message: "Post not found" })
    }
    post.title = title
    post.body = body
    post.category = category
    post.postDate = postDate

    //save the changes
    const updatedPost = await post.save()
    res.json(`${updatedPost.title} updated`)
}

//delete a post
const deletePost = async (req, res) => {
    const { id } = req.body

    //Confirm post existed to delete it
    const post = await Post.findById(id).exec()

    if (!post) {
        return res.status(400).json({ message: "Post not found" })
    }
    const result = await post.deleteOne()

    const reply = `Post '${post.title}' ID:${post._id} was deleted`
    res.json(`${reply}`)
}
//ייצוא הפונקציות
module.exports = {
    getAllPosts,
    getPostById,
    createNewPost,
    updatePost,
    deletePost
}
