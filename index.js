import express from "express";
import cors from "cors";
import rootRoutes from "./src/routes/rootRoutes.js";
import dotenv from "dotenv";
dotenv.config();
let portBE = process.env.PORT_BE;

const app = express();

app.use(express.json());
app.use(express.static("."));
app.use(cors());
app.use(rootRoutes);

app.get("/", (req, res) => {
  res.send("Connect BE Success");
});

app.listen(portBE, () => {
  console.log(`Start Working BE With Port : ${portBE}`);
});
