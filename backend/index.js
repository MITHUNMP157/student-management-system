const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const port = 3030;
const cors = require("cors");

app.use(express.json());
//app.use(cors());

app.use(
  cors({
    origin: ["https://student-management-system-frontend-ektr.onrender.com"], // your deployed frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const users = [];

const secretKey = "your-secret-key";

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

const verifyToken = () => (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(404).json({ valid: false, message: "No Token Provide" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ valid: false, message: "Invalid Token" });
    }
    req.user = decoded;
    next();
  });
};

const isAdmin = () => (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied, admin only" });
  }
};

app.get("/verifyToken", verifyToken(), (req, res) => {
  res.json({ valid: true, user: req.role });
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const student = client.db("studentdb").collection("register");
    const authorized = client.db("studentdb").collection("auth");

    /*Authentication*/

    app.post("/register", async (req, res) => {
      try {
        const { username, password, role } = req.body;

        // Check if user already exists
        const existingUser = await authorized.findOne({ username });
        if (existingUser) {
          return res.status(400).json({ message: "Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const registerDetail = await authorized.insertOne({
          username,
          password: hashedPassword,
          role: role || "user",
        });
        res
          .status(201)
          .json({ message: "User registered successfully", registerDetail });
        console.log(` User registered: ${username} as ${role || "user"}`);
      } catch (error) {
        res.status(401).json({ message: "Register Failed:", error });
      }
    });

    app.post("/login", async (req, res) => {
      const { username, password } = req.body;
      const user = await authorized.findOne({ username });

      if (user) {
        const isValidUser = await bcrypt.compare(password, user.password);
        if (isValidUser) {
          const token = jwt.sign({ username, role: user.role }, secretKey, {
            expiresIn: "1h",
          });
          res.json({ token, role: user.role, username: user.username });
          console.log(`Login Success: ${username}, Role: ${user.role}`, token);
        } else {
          res.status(401).json({
            message: "invalid credential, since Password does not match",
          });
        }
      } else {
        res.status(401).json({
          message:
            "Invalid Credential, since user not found signUp to Login pls",
        });
      }
    });

    app.get(
      "/getdata/managementDB",
      verifyToken(),
      isAdmin(),
      async (req, res) => {
        try {
          const data = await student.find().toArray();
          res.json({ message: "Welcome Admin", data });
        } catch (error) {
          res
            .status(500)
            .json({ message: "Failed to get management data", error });
        }
      }
    );

    /*Operations*/

    app.post("/studentRegister", verifyToken(), async (req, res) => {
      try {
        const data = req.body;
        console.log("Data Upload Successful", data);
        const result = await student.insertOne(data);
        console.log(result);
        res.send(result);
      } catch (error) {
        res.status(204).json({ message: "Upload failed" });
      }
    });

    app.post("/uploadbulk", async (req, res) => {
      const students = req.body;
      const result = await student.insertMany(students);
      console.log("Inserted students:", result.insertedCount);
      res.send(result);
    });

    app.get("/getdata", verifyToken(), async (req, res) => {
      try {
        const sdata = student.find();
        const result = await sdata.toArray();
        res.json(result);
        console.log(`Server data get success...`);
      } catch (error) {
        console.error("Get Student error:", error);
        res.status(500).send("Server error");
      }
    });
    app.get("/testgetdata", async (req, res) => {
      try {
        const sdata = student.find();
        const result = await sdata.toArray();
        res.json(result);
        console.log(`Server data get success...`);
      } catch (error) {
        console.error("Get Student error:", error);
        res.status(500).send("Server error");
      }
    });

    app.get(
      "/getdata/managementDB",
      verifyToken(),
      isAdmin(),
      async (req, res) => {
        try {
          const sdata = student.find();
          const result = await sdata.toArray();
          res.json(result);
          console.log(`Server data get success...`);
        } catch (error) {
          console.error("Get Admin error:", error);
          res.status(500).send("Server error");
        }
      }
    );

    app.get("/getiddata/:id", verifyToken(), isAdmin(), async (req, res) => {
      try {
        const id = req.params.id;
        const obj = { _id: new ObjectId(id) };
        const result = await student.findOne(obj);
        console.log(`Find one data using get id`);
        res.send(201).json({ message: "All student data deleted", result });
      } catch (error) {
        res.status(403).json({ message: "Single id data get failed" });
      }
    });

    app.patch("/editdata/:id", verifyToken(), isAdmin(), async (req, res) => {
      try {
        const id = req.params.id;
        const obj = { _id: new ObjectId(id) };
        const data = req.body;
        const updatedata = { $set: { ...data } };
        const options = { upsert: true };
        const result = await student.updateOne(obj, updatedata, options);
        console.log("Update/Edited successful");
        res.status(200).json({ message: "Update/Edited successful", result });
      } catch (error) {
        res
          .status(500)
          .json({ message: "Update/Edited failed", error: error.message });
      }
    });

    app.delete("/delete/:id", verifyToken(), isAdmin(), async (req, res) => {
      const id = req.params.id;
      const obj = { _id: new ObjectId(id) };
      const result = await student.deleteOne(obj);
      res.send(result);
    });

    app.delete("/deleteall", verifyToken(), isAdmin(), async (req, res) => {
      try {
        const result = await student.deleteMany({});
        res.json({ message: "All student data deleted", result });
      } catch (error) {
        console.error("Delete all error:", error);
        res.status(500).send("Failed to delete all");
      }
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Connected to port ${port}`);
});
