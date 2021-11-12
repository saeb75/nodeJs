const multer = require("multer");
const API = require("../controllers/api");

const router = require("express").Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });
router.get("/", API.fetchAllPosts);
router.get("/:id", API.fetchPostById);
router.post("/", upload.single("image"), API.createPost);
router.patch("/:id", upload.single("image"), API.updatePost);
router.delete("/:id", API.deletePost);

module.exports = router;
