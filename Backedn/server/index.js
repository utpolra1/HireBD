
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.json());



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3i9ecp5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const usersCollection = client.db('hirebd').collection('user');
    

    // users operation------->>
    //post user
    app.post('/users', async (req, res) => {
      const user = req.body;
      console.log(user)
      const query = { email: user.email };
      const existingUser = await usersCollection.findOne(query)
      if (existingUser) {
        return res.send({ message: 'User already exists', insertedId: null })
      }
      const result = await usersCollection.insertOne(user);
      res.send(result)
    })

    app.get('/users', async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });

    //Get Operations------>>

    // app.get('/allBooks', async (req, res) => {
    //   const result = await booksCollection.find().toArray();
    //   res.send(result);
    // });

    // app.get('/details/:id', async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: new ObjectId(id) };
    //   const result = await booksCollection.findOne(query);
    //   res.send(result);
    // });

    // app.get('/cart', async (req, res) => {
    //   const email = req.query.email;
    //   const query = { email: email };
    //   const result = await cartCollection.find(query).toArray();
    //   res.send(result);
    // })

    // Post Operations

    // app.post('/add_user', async (req,res) => {
    //   const user = req.body;
    //   const query = { email: user.email };
    //   const alreadyUser = await usersCollection.findOne(query);

    //   if(alreadyUser){
    //     res.send({insertedId: null});
    //   }
    //   else{
    //     const result = await usersCollection.insertOne(user);
    //     res.send(result);
    //   }
    // });

    // //Get users 
    // app.get('/users', async (req, res) => {
    //   const result = await usersCollection.find().toArray();
    //   res.send(result);
    // });

    // //user profile update
    // app.patch("/user/update/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const user = req.body;
    //   const filter = { _id: new ObjectId(id) };
    //   const updateDoc = {
    //     $set: {
    //       ...user,
    //     },
    //   };

    //   try {
    //     const result = await usersCollection.updateOne(filter, updateDoc);
    //     if (result.matchedCount === 0) {
    //       return res.status(404).send({ message: "user not found" });
    //     }
    //     res.send(result);
    //   } catch (error) {
    //     console.error("Error updating blog:", error);
    //     res.status(500).send({ message: "Failed to update user", error });
    //   }
    // });

    // app.post('/add_to_cart', async (req, res) => {
    //   const add = req.body;
    //   const result = await cartCollection.insertOne(add);
    //   res.send(result);
    // });

    // //add to books
    // app.post("/addbook", async (req, res) => {
    //   const newbook = req.body;
    //   const result = await booksCollection.insertOne(newbook);
    //   res.send(result);
    // });

    // //Make a admin
    // app.patch("/users/admin/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const filter = { _id: new ObjectId(id) };
    //   const updateDoc = {
    //     $set: {
    //       role: "admin",
    //     },
    //   };
    //   const result = await usersCollection.updateOne(filter, updateDoc);
    //   res.send(result);
    // });

    // //make user seller
    // app.patch("/users/seller/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const filter = { _id: new ObjectId(id) };
    //   const updateDoc = {
    //     $set: {
    //       role: "seller",
    //     },
    //   };
    //   const result = await usersCollection.updateOne(filter, updateDoc);
    //   res.send(result);
    // });

    // //make user
    // app.patch("/users/user/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const filter = { _id: new ObjectId(id) };
    //   const updateDoc = {
    //     $set: {
    //       role: "user",
    //     },
    //   };
    //   const result = await usersCollection.updateOne(filter, updateDoc);
    //   res.send(result);
    // });

    // // make admin and seller delete api
    // app.delete("/users/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: new ObjectId(id) };
    //   const result = await usersCollection.deleteOne(query);
    //   res.send(result);
    // });

    // // delete a Books
    // app.delete("/books/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: new ObjectId(id) };
    //   const result = await booksCollection.deleteOne(query);
    //   res.send(result);
    // });

    // // make Books Approved api
    // app.patch("/books/approved/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const filter = { _id: new ObjectId(id) };
    //   const updateDoc = {
    //     $set: {
    //       status: "approve",
    //     },
    //   };
    //   const result = await booksCollection.updateOne(filter, updateDoc);
    //   res.send(result);
    // });

    // // make books Decline api
    // app.patch("/books/decline/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const filter = { _id: new ObjectId(id) };
    //   const updateDoc = {
    //     $set: {
    //       status: "Decline",
    //     },
    //   };
    //   const result = await booksCollection.updateOne(filter, updateDoc);
    //   res.send(result);
    // });


    // // books update
    // app.patch("/booksupdate/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const books = req.body;
    //   const filter = { _id: new ObjectId(id) };
    //   const updateDoc = {
    //     $set: {
    //       ...books,
    //     },
    //   };

    //   try {
    //     const result = await booksCollection.updateOne(filter, updateDoc);
    //     if (result.matchedCount === 0) {
    //       return res.status(404).send({ message: "books not found" });
    //     }
    //     res.send(result);
    //   } catch (error) {
    //     console.error("Error updating books:", error);
    //     res.status(500).send({ message: "Failed to update books", error });
    //   }
    // });

    // Send a ping to confirm a successful connection
    //await client.db("admin").command({ ping: 1 });
    //console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('Server is running')
})

app.listen(port, () => {
  console.log(`Server is running on PORT : ${port}`)
})
