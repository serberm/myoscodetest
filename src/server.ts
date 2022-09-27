import dotenv from "dotenv";
import fs from "fs";

import mongoose from "mongoose";
import app from "./app";
if (fs.existsSync(".env")) {
  dotenv.config({ path: ".env" });
} else {
  dotenv.config({ path: ".env.example" }); // you can delete this after you create your own .env file!
}
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};
// Handling MongoDB connection
mongoose.connect(process.env.DB_CONNECTION, options).then(
  () => {
    console.log("Connected to database.");
  },
  (err) => {
    console.log("Couldn't connect to database.");
  }
);

mongoose.connection.on("connecting", function () {
  console.log("connecting to MongoDB...");
});

mongoose.connection.on("error", function (error) {
  console.log("Error in MongoDb connection");
  mongoose.connect(process.env.DB_CONNECTION, options).then(
    () => {
      console.log("Connected to database.");
    },
    (err) => {
      console.log(err, "Couldn't connect to database.");
    }
  );
});

mongoose.connection.on("reconnected", function () {
  console.log("MongoDB reconnected!");
});

mongoose.connection.on("disconnected", function () {
  console.log("MongoDB disconnected!");
});

// Start server
console.log(`server started on ${process.env.PORT}`);
app.listen(process.env.PORT || 3000);
