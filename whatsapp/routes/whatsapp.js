const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/send-whatsapp", async (req, res) => {

    const { name, email, message } = req.body;

    const text = `📩 *New Portfolio Contact*

👤 Name:
${name}

📧 Email:
${email}

💬 Message:
${message}`;

    try {

        await axios.post(
            `https://graph.facebook.com/v23.0/${process.env.PHONE_NUMBER_ID}/messages`,
            {
                messaging_product: "whatsapp",
                to: process.env.RECIPIENT,
                type: "text",
                text: {
                    body: text
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
                    "Content-Type": "application/json"
                }
            }
        );

        res.json({
            success: true
        });

    } catch (error) {

        console.log(error.response?.data || error.message);

        res.status(500).json({
            success: false
        });

    }

});

module.exports = router;