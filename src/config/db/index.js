const mongoose = require('mongoose');

async function conect() {
    try {
        const password = process.env.PASSWORD;
        const uri = `mongodb+srv://admin:${password}@cluster0.akpjquu.mongodb.net/?retryWrites=true&w=majority`;
        await mongoose.connect(
            uri,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
            console.log('Connect successfully!!!'),
        );
    } catch (error) {
        console.log(error.mesage);
        // console.log('Connect failure!!!');
    }
}

module.exports = { conect };
