import mongoose from "mongoose";

const databaseConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "Resolute_Partners",
    })
    .then(() => {
      console.log("Database Connection Established");
    })
    .catch((err) => console.log(err));
};

export default databaseConnection;
