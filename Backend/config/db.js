import mongoose from 'mongoose';

const connectDB = async (url) => {

    try {
        await mongoose.connect(url);
        console.log('Base de datos conectada');
    } catch (error) {
        throw new Error('Error initiating BBDD:' + error);
    }
}

export default connectDB;