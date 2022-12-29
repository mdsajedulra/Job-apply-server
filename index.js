const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const uri = "mongodb://0.0.0.0:27017";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const applicationCollection = client.db("apply").collection("applications");

app.get("/", (req, res) => {
  res.send("Server is running");
});

async function run() {
  try {
    app.post("/applications", async (req, res) => {
      const applications = req.body;
      const result = await applicationCollection.insertOne({ applications });
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
  try {
    app.get("/applicantcopy", async (req, res) => {
      const email = req.query.email;
      const phone = req.query.phone;
      //   console.log(email, phone);
      const allApplications = await applicationCollection.findOne(
        {
          email: email,
        },
        {}
      );
      res.send(allApplications);
    });
  } catch (error) {
    console.log(error);
  }
}
run().catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
