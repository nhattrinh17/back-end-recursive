const mongoose = require("mongoose")

async function conect() {
    try {
        const password = process.env.PASSWORD
        const uri = `mongodb+srv://admin:${password}@cluster0.9atdpro.mongodb.net/?retryWrites=true&w=majority`
        await mongoose.connect(uri, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
        }, console.log('Connect successfully!!!'))
    } catch (error) {
        console.log('Connect failure!!!');
    }
}

module.exports = {conect}