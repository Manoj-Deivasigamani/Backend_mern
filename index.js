const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

// Connect to the MongoDB database
mongoose
  .connect(
    "mongodb+srv://anuharikumar2001:Mern12345@secondcluster.pzosldd.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to todo-list database");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

// Schema for users of the app
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("App is Working");
});

app.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    const result = await user.save();
    const sanitizedResult = result.toObject();
    delete sanitizedResult.password; // Assuming you have a 'password' field
    res.status(201).json(sanitizedResult);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Something Went Wrong" });
  }
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
