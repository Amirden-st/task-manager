import mongoose from "mongoose";

const server = "localhost:27017";
const database = 'task-manager';

class Database {
    constructor() {
        this._connect();
    }

    _connect() {
        mongoose
            .connect(`mongodb://${server}/${database}`)
            .then(() => {
                console.log('Database connection successful');
            })
            .catch((err) => {
                console.error('Database connection failed with error:\n', err);
            });
    }
}

export default new Database();