
const mongoose = require('mongoose');

const DBConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_URL, {})
            .then(() => console.log('Database connected'))
            .catch((error) => console.log(error))
    } catch (error) {
        console.log(error)
    }
}


module.exports = DBConnection;