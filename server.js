import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { fileURLToPath } from "url";
import cors from "cors";
import errorResponseHandler, {
  invalidPathHandler,
} from "./middleware/errorhandler.js";
import path from "path";

//routes
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import postCategoriesRoutes from "./routes/postCategoriesRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Configure CORS to allow requests from the frontend domain
app.use(
  cors({
    origin: "https://mern-blog-i8vh.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/post-categories", postCategoriesRoutes);

// Get the current directory name using import.meta.url
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Use the current directory name to serve static files from the "uploads" folder
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(invalidPathHandler);
app.use(errorResponseHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
