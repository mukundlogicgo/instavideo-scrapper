import { getVideos } from "./getVideos.js";
import cors from "cors";
import express from "express";

// (async () => {
//   const url = "https://www.instagram.com/p/CqpWv71p6kY/";
//   const videos = await getVideos(url);
//   console.log({ videos });
// })();

const app = express();
app.use(cors());

app.use("/", async (req, res) => {
  const { url } = req.query;

  const videos = await getVideos(url);
  console.log({ videos });

  return res.status(200).json(videos);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
