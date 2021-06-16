
const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://vscodetodo_user:D9qKLE2wVBH2R68b@vscodetodo.nsbh7.mongodb.net/wedding-site?retryWrites=true&w=majority', 
	{ 
		useNewUrlParser: true,
		useUnifiedTopology: true
 	})
	.then(console.log())
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db