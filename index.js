import express from "express";
import cors from "cors";
import rootRoutes from "./src/routes/rootRoutes.js";

const app = express();
const port = 3639;

app.use(express.json());
app.use(express.static("."));
app.use(cors());
app.use(rootRoutes);

// app.get("/", (req, res) => {
//   res.send("Connect BE Success");
// });

app.listen(port, () => {
  console.log(`Start Working BE With Port : ${port}`);
});
