
const Router = require('express').Router()
const db = require('./database/models')
const { ObjectId } = require('mongodb');

Router.get('/', async (req, res) =>{

	// get all post
	let post = await db.Post.find({})

	// get all comment
	let comment = await db.Comment.find({})

	res.render('index', {
		posts: post,
		comments: comment
	})
})
// delete post
Router.delete('/:postId', async (req, res) => {
	try{
		let postId = ObjectId(req.params.postId)
		let comments = await db.Comment.find({post_id: postId})
		if(comments != null){
			await db.Post.findByIdAndDelete({_id: postId})
			console.log("Deleted successfully post")
			for(let comment of comments){
				await db.Comment.findByIdAndDelete({_id: comment.post_id})
			}
			console.log("Deleted successfully comment")
			res.send("Deleted successfully")
		}
		else{
			await db.Post.findByIdAndDelete({_id: postId})
			console.log("Deleted successfully post")
			res.send("Deleted successfully")
		}

	}catch(err){
		console.log(err)
		throw err
	}
})

// redirect page add-post
Router.get('/add-post', async(req, res) => {
	res.render('add-post')
})

// redirect page update-post
Router.get('/update-post/:id', async(req, res) => {
	try{
		let post_id = await db.Post.findById(req.params.id)
		console.log(post_id)
		res.render('update-post', {
			post_id : post_id,
		})
	}catch(err){
		console.log(err)
		throw err
	}
})

// add-post
Router.post('/add-post', async(req, res) => {
	try{
		let post_content = req.body.post_content
		let image_links = req.body.image_links
		let newPost = await new db.Post({
			post_content: post_content,
			image_links: image_links
		})
		await newPost.save()
		console.log(newPost)
		res.send("Create Post successfully")
	}catch(err){
		console.log(err)
		throw err
	}
})

// Router.get('/update-post/:id', async(req, res) => {
// 	try{
// 		let id = req.body.id
// 		console.log(id)
//
// 	}catch(err){
// 		console.log(err)
// 		throw err
// 	}
// })

module.exports = Router
