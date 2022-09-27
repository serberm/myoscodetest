import express from "express";
import { Request, Response, NextFunction } from "express";
import HttpStatus from "http-status-codes";
import HttpError from "./exceptions/http-error";
import route from "./route";

const app = express();

// To read Request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Handling CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        // Set allowed HTTP Methods
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(204);
    }
    next();
});

// Import Routes
app.use("/api", route);

// Handling errors
app.use((req: Request, res: Response, next: NextFunction): void => {
    const error = new HttpError("Not found");
    error.code = HttpStatus.NOT_FOUND;
    next(error);
});

app.use((error: HttpError, req: Request, res: Response, next: NextFunction): void => {
    res.status(error.code || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
});

export default app;
