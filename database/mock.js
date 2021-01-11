const Model = require('./models')

async function main(){
	await Model.Post.deleteMany({})
	await Model.Comment.deleteMany({})
	for(let i = 0; i<20; ++i) {

		let post = new Model.Post({
			post_content: `hello ${i}-th post`,
			image_links: ["https://mongoosejs.com/docs/populate.html"]
		})
		await post.save()
		console.log(`Inserted post ${i}-th`)

		for(let j = 0; j<3; j++){
			let comment = new Model.Comment({
				comment_details: `comment ${j}-th comment`,
				post_id : post._id
			})
			await comment.save()
			console.log(`Inserted comment ${j}-th of post ${i}`)
		}

	}
}

main()