const express = require("express");
const app = express();

const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const paymentRoutes = require("./routes/payment");
const courseRoutes = require("./routes/Course");

const dotenv = require("dotenv");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");

const PORT = process.env.PORT || 4000;

// db connect
database.connect();
dotenv.config();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir:"/tmp/"
}))


// cludinary connect
cloudinaryConnect()

// routes
app.use("/api/v1/auth", userRoutes)
app.use("/api/v1/profile", profileRoutes)
app.use("/api/v1/course", courseRoutes)
app.use("/api/v1/payment", paymentRoutes)


app.get("/",(req, res) => {
    return res.json({
        success: true,
        message: "Your server is up and running"
    })
})


app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`)
})