import mongoose from "mongoose";

interface ConnectionState {
  isConnected?: number;
}

const connection: ConnectionState = {};

const connectToDB = async (): Promise<void> => {
  try {
    if (connection.isConnected) return;

    const db = await mongoose.connect(process.env.MONGO_URI as string, {
      dbName: "AIResumeBuilder",
    });

    connection.isConnected = db.connections[0].readyState;

    console.log("Connected with DB successfully");
  } catch (error) {
    console.log("Failed to connect with DB");
    console.error(error);
  }
};

export default connectToDB;
