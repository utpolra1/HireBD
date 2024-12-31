const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: ["https://hirebd.web.app", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3i9ecp5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const usersCollection = client.db("hirebd").collection("user");
    const messageCollection = client.db("hirebd").collection("message");
    const alljobsCollection = client.db("hirebd").collection("Alljobs");

    // User operations
    app.post("/users", async (req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const existingUser = await usersCollection.findOne(query);
      if (existingUser) {
        return res.send({ message: "User already exists", insertedId: null });
      }
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    app.get("/users", async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });

    app.get("/alljobs", async (req, res) => {
      const result = await alljobsCollection.find().toArray();
      res.send(result);
    });

    // PATCH request to update user balance and claimed jobs
    app.patch('/user/:id', async (req, res) => {
      const { id } = req.params;
      const { balance, claimed } = req.body;
    
      try {
        if (balance === undefined || !Array.isArray(claimed)) {
          return res.status(400).json({ message: 'Balance or claimed data missing or invalid' });
        }
    
        // Filter out any empty job IDs and duplicates
        const filteredClaimed = [...new Set(claimed.filter(item => item))]; // Remove empty strings and duplicates
    
        // Update user balance and add unique job IDs to claimed
        const result = await usersCollection.updateOne(
          { _id: new ObjectId(id) },
          {
            $set: { balance },
            $addToSet: { claimed: { $each: filteredClaimed } },  // Use $addToSet to ensure uniqueness
          }
        );
    
        if (result.matchedCount === 0) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        const updatedUser = await usersCollection.findOne({ _id: new ObjectId(id) });
        res.status(200).json(updatedUser);
      } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
      }
    });    
    
    // Save a message
    app.post("/messages", async (req, res) => {
      const { senderId, receiverId, text } = req.body;
      try {
        const message = await messageCollection.insertOne({
          senderId,
          receiverId,
          text,
          timestamp: new Date(),
        });
        res.status(201).json(message);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // Fetch messages for a conversation
    app.get("/messages/:userId/:otherUserId", async (req, res) => {
      const { userId, otherUserId } = req.params;

      try {
        const messages = await messageCollection
          .find({
            $or: [
              { senderId: userId, receiverId: otherUserId },
              { senderId: otherUserId, receiverId: userId },
            ],
          })
          .sort({ timestamp: 1 })
          .toArray();
        res.status(200).json(messages);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log(`Server is running on PORT : ${port}`);
});
