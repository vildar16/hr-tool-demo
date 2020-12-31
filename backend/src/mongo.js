const mongoose = require('mongoose');


const mongoConnection = async() => {

    try {

        const URI = process.env.MONGO_URI;

        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })

        
        console.log("Mongo is ready...")
        
        
    } catch (error) {

        console.log(error);
        throw new Error('Mongo failed to initialize') 
        
    }


}
 



module.exports = {mongoConnection}

