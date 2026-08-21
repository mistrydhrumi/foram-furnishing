import express from "express";
import "dotenv/config";
import connectDB from "./database/db.js";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js";
import cors from "cors";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import consultationRoutes from "./routes/consultationRoutes.js";

const app = express();

const PORT = process.env.PORT || 3000;

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://foram-furnishing-eight.vercel.app",
];

app.use(
    cors({
        origin: (origin, callback) => {
            // Allow requests like Postman/server-to-server
            if (!origin) {
                return callback(null, true);
            }

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            console.log("Blocked CORS origin:", origin);
            return callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
    })
);

app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/orders", orderRoute);
app.use("/api/v1/wishlist", wishlistRoutes);
app.use("/api/v1/contact", contactRoutes);
app.use("/api/v1/consultation", consultationRoutes);

// Test API
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Foram Furnishing API is running",
    });
});

// Connect DB first, then start server
connectDB()
    .then(() => {
        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server is listening at port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Database connection failed:", error);
        process.exit(1);
    });