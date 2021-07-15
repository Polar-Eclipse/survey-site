/**
 * server/config/index.ts
 *
 * Configure and run the application
 *
 * Polar Survey
 * @author Aun Raza (301074590)
 * @author Jamee Kim (301058465)
 * @author Jerome Ching (300817930)
 * @author Sophie Xu (301098127)
 * @author Tien Sang Nguyen (301028223)
 * @author Eunju Jo (301170731)
 */

import http from "http";
import { HttpError } from "http-errors";
import createApp from "./app";
import connectDB from "./database";

/**
 * Run the server application
 *
 * This is the main function that wraps the setup processes.
 */
export default function runApp(): void {
    // Connect to the database
    connectDB();

    // Configure express
    const app = createApp();

    // Get port from environment and store in Express
    const port = normalizePort(process.env.PORT || "3000");
    app.set("port", port);

    // Create HTTP server
    const server = http.createServer(app);

    // Add event handlers
    server.on("error", createErrorHandler(port));
    server.on("listening", createListeningHandler(server));

    // Listen on provided port, on all network interfaces
    server.listen(port);
}

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: string): number | string | boolean {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function createErrorHandler(port: number | string | boolean): (error: HttpError) => void {
    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    return (error) => {
        if (error.syscall !== "listen") {
            throw error;
        }

        // handle specific listen errors with friendly messages
        switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
        }
    };
}

/**
 * Event listener for HTTP server "listening" event.
 */
function createListeningHandler(server: http.Server): () => void {
    return () => {
        const addr = server.address();
        const bind = typeof addr === "string"
            ? "pipe " + addr
            : "port " + addr?.port;
        console.log("Listening on " + bind);
    };
}
