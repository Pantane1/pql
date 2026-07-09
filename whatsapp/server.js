require("dotenv").config();

const express = require("express");
const cors = require("cors");

const whatsappRoute = require("./routes/whatsapp");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", whatsappRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});