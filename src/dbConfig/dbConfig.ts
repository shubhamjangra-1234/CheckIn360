import mongoose from 'mongoose';

export async function connect() {
    try {
        
        await mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;
        connection.once('connected', () => {
            console.log('Database connected successfully');
        });
        connection.on('error', (error) => {
            console.error('Database connection error:', error);
            process.exit();
        });
    } catch (error) {
        console.error('Database connection failed:', error);
    }
}
