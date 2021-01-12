
const Router = require('express').Router()
const db = require('./database/models')

Router.get('/', async (req, res) =>{

	// get all post
	let post = await db.Post.find({})
	// get all comment
	let comment = await db.Comment.find({})
	// for(let i=0; i<post.length; i++){
	// 	let k = await db.Comment.find({post_id: post[i]._id})
	// 	console.log(k)
	// }
	res.render('index', {
		posts: post,
		comments: comment
	})
	// console.log(post)
	//res.render('index')
})
module.exports = Router