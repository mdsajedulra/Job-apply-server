const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const { query } = require("express");
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://applyosaca:applyosaca@cluster0.6crvlzi.mongodb.net/?retryWrites=true&w=majority";
// const uri = "mongodb://0.0.0.0:27017";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const applicationCollection = client.db("apply").collection("applications");
const usersCollection = client.db("apply").collection("users");

app.get("/", (req, res) => {
  res.send("Server is running");
});

async function run() {
  try {
    app.post("/applications", async (req, res) => {
      // const applications = req.body;
      const result = await applicationCollection.insertOne(req.body);
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
  try {
    app.post("/user", async (req, res) => {
      // const applications = req.body;
      const result = await usersCollection.insertOne(req.body);
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
  try {
    app.get("/download", async (req, res) => {
      const email = req.query.email;
      // const phone = req.query.phone;
      // console.log(phone, email)
      const result = await applicationCollection.findOne({ mainEmail: email });
      res.send(result);
    });
  } catch (error) {}
  try {
    app.get("/allApplication", async (req, res) => {
      const result = await applicationCollection.find({}).toArray();
      res.send(result);
    });
  } catch (error) {}
}
run().catch((error) => res.send(error));

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
