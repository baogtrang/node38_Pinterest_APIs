import express from "express";
import cors from "cors";
import rootRoutes from "./src/routes/rootRoutes.js";
import dotenv from "dotenv";
dotenv.config();
let portBE = process.env.PORT_BE;

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.static("."));
app.use(cors());
app.use(rootRoutes);

app.get("/", (req, res) => {
  res.send("Connect BE Success");
});

app.listen(port, () => {
  console.log(`Start Working BE With Port : ${port}`);
});
