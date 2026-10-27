
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const employeeRoutes = require("./routes/employees");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
    const connected = mongoose.connection.readyState === 1;

    res.status(connected ? 200 : 503).json({
        status: connected ? "OK" : "DATABASE_DISCONNECTED"
    });
});

app.use("/api/employees", employeeRoutes);

async function startServer() {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("Chua cau hinh MONGODB_URI trong .env");
        }

        await mongoose.connect(process.env.MONGODB_URI);

        console.log("Ket noi MongoDB Atlas thanh cong");

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Backend dang chay tai cong ${PORT}`);
        });
    } catch (error) {
        console.error("Loi khoi dong Backend:", error.message);
        process.exit(1);
    }
}

startServer();
