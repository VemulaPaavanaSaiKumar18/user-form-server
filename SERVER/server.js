import express from "express";
import fileupload from "express-fileupload";
import cors from "cors";

const app = express();

app.use(
  fileupload({
    createParentPath: true,
  })
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/upload-file", async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: "failed",
        message: "No file uploaded",
      });
    } else {
      let file = req.files.file;

      console.log(req.files);

      file.mv("./uploads/" + file.name);

      res.send({
        status: "success",
        message: "File is uploaded",
        data: {
          name: file.name,
          mimetype: file.mimetype,
          size: file.size,
        },
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/show-files", async (req, res) => {
  res.sendFile(
    "D:/REACT-PROJECTS/server/SERVER/uploads/wallpaperflare.com_wallpaper.jpg"
  );
});
// app.get("/download", function (req, res) {
//   res.download("../download" + "/download_gfg.txt", function (err) {
//     if (err) {
//       console.log(err);
//     }
//   });
// });
// app.get("../uploads", function (req, res) {
//   console.log(res);
// });

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server started on port ${port}`));
