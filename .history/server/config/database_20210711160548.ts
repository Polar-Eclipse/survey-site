/**
 * server/config/database.ts
 *
 * Connect to the database
 *
 * Polar Survey
 * @author Aun Raza
 * @author Jamee Kim (301058465)
 * @author Jerome Ching
 * @author Sophie Xu
 * @author Tien Sang Nguyen
 * @author Eunju Jo
 */

import mongoose from "mongoose";
import { ensuredEnv } from "./env";

/**
 * Configure and connect to the MongoDB provider using mongoose
 */
export default function connectDB(): void {
    const conn = mongoose.connection;
    conn.on("error", onError);
    conn.once("open", onConnected);

    const options: mongoose.ConnectOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    };
    mongoose.connect(ensuredEnv().DB_URI, options);
}

/**
 * Event handler for when the connection fails
 */
function onError(err: Error): void {
    console.error("Failed to connect to the MongoDB provider");
    console.error(err);
}

/**
 * Event handler for when the connection suceeds
 */
function onConnected(): void {
    console.log("Connected to the MongoDB provider");
}

/** Database LocalURI, RemoteURI HostName, Secret */
export const LocalURI = "mongodb://localhost/contacts";
//export const RemoteURI = " ";
export const HostName = "LocalHost";
export const Secret = "someSecret";