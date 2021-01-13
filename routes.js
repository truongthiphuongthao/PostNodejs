
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
		}
		else{
			await db.Post.findByIdAndDelete({_id: postId})
			console.log("Deleted successfully post")
		}

	}catch(err){
		console.log(err)
		throw err
	}
})
module.exports = Router