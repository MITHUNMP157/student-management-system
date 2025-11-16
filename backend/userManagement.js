const express = require("express");
const userApp = express();
const port = 5050;
const cors = require("cors");

userApp.use(cors());
userApp.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://mithunpriyan157official_db_user:Mp%40157157@cluster0.d46wy7s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const users = client.db("userDB").collection("users");

    userApp.post("/login", async (req, res) => {
      const userData = req.body;
      console.log("Data Upload Successful", userData);
      const result = await users.insertOne(userData);
      const newUser = { ...userData, _id: result.insertedId };
      console.log(result);
      res.send(newUser);
    });

    userApp.get("/getlogindata", async (req, res) => {
      const userLoginData = users.find();
      const result = await userLoginData.toArray();
      res.send(result);
    });

    userApp.patch("/update/:id", async (req, res) => {
      const id = req.params.id;
      const obj = { _id: new ObjectId(id) };
      const data = req.body;
      const updateData = { $set: { ...data } };
      const options = { upsert: true };
      const result = await users.updateOne(obj, updateData, options);
      console.log("Update Success");
      res.send(result);
    });

    userApp.delete("/delete/:id", async (req, res) => {
      const id = req.params.id;
      const obj = { _id: new ObjectId(id) };
      const result = await users.deleteOne(obj);
      res.send(result);
      console.log("Delete success :", obj);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

userApp.listen(port, () => {
  console.log(`Connected to port ${port}`);
});
