const Mongoose = require('mongoose')
const Mongoose_url = "mongodb://localhost:27017/post"
const Schema = Mongoose.Schema

Mongoose.connect(Mongoose_url, {useNewUrlParser: true, useUnifiedTopology: true})

const Post = Mongoose.model('Post', new Mongoose.Schema({
	post_content : String,
	image_links: [String]
}))

const Comment = Mongoose.model('Comment', new Mongoose.Schema({
	comment_details: String,
	post_id : Schema.Types.ObjectId
}))

module.exports = {
	Post: Post,
	Comment: Comment,
}