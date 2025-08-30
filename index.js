const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

// Use environment variable to store the secret
const WEBHOOK_URL = process.env.WEBHOOK_URL;

app.post('/sendWebhook', async (req, res) => {
  try {
    const { content } = req.body;

    // Forward to real webhook
    await axios.post(WEBHOOK_URL, { content });

    res.status(200).send({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
