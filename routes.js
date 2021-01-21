
const Router = require('express').Router()
const db = require('./database/models')
const { ObjectId } = require('mongodb');

Router.get('/', async (req, res) =>{
	// get all post
	let post = await db.Post.find({})
	console.log(post)
	// get all comment
	let comment = await db.Comment.find({})
	console.log(comment)
	res.render('index', {
		posts: post,
		comments: comment
	})
})

// delete post
Router.delete('/delete-post/:postId', async (req, res) => {
	try{
		let postId = ObjectId(req.params.postId)
		console.log(postId)
		let comments = await db.Comment.find({post_id: postId})
		console.log(comments)
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

Router.post('/update-post/:id', async(req, res) => {
	try{
		let id = req.body.id
		let post_content = req.body.post_content
		await db.Post.findByIdAndUpdate(
		{_id: id},
		{$set: {post_content: post_content}},
		{useFindAndModify : false}
		)
		res.send("Update successfully")

	}catch(err){
		console.log(err)
		throw err
	}
})

// save comment
Router.post('/save-comment/:id', async(req, res) => {
	try{
		let post_id = req.body.post_id
		let comment_details = req.body.comment_details
		let newComment = await new db.Comment({
			post_id: post_id,
			comment_details: comment_details
		})
		await newComment.save()
		res.send("Create Comment successfully")
	}catch(err){
		console.log(err)
		throw err
	}
})

Router.delete('/delete-comment/:id', async(req, res) => {
	try{
		let _id = req.body._id
		await db.Comment.findByIdAndDelete({_id: _id})
		res.send("Delete comment successfully")
	}catch(err){
		console.log(err)
		throw err
	}
})

// edit comments
Router.post('/update-comment/:id', async(req, res) =>{
	try{
		let _id = req.body._id
		let comment_details = req.body.comment_details
		await db.Comment.findByIdAndUpdate(
			{_id: _id},
			{$set: {comment_details: comment_details}},
			{useFindAndModify : false}
		)
		console.log("Update comment successfully")
		res.send("Update comment successfully")
	}catch(err){
		console.log(err)
		throw err
	}
})
module.exports = Router
