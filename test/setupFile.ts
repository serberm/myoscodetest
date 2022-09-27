import mongoose from "mongoose";

beforeEach(async () => {
  // put your client connection code here, example with mongoose:
  await mongoose.connect(process.env["MONGO_URI"]);
  await clearDatabase();
});

afterEach(async () => {
  // put your client disconnection code here, example with mongodb:
  await mongoose.disconnect();
});

export const clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  try {
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  } catch(e) {
    console.error(e);
  }
};