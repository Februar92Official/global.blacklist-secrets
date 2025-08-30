const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const TRELLO_KEY = process.env.TRELLO_KEY;
const TRELLO_TOKEN = process.env.TRELLO_TOKEN;
const TRELLO_BOARD_1 = process.env.TRELLO_BOARD_1;
const TRELLO_BOARD_2 = process.env.TRELLO_BOARD_2;

// Example: Get lists from a Trello board
app.get('/board/:id/lists', async (req, res) => {
    const board = req.params.id === "1" ? TRELLO_BOARD_1 : TRELLO_BOARD_2;
    try {
        const response = await axios.get(`https://api.trello.com/1/boards/${board}/lists`, {
            params: {
                key: TRELLO_KEY,
                token: TRELLO_TOKEN
            }
        });
        res.json(response.data);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: err.message });
    }
});

// Optional: forward Trello card creation
app.post('/card', async (req, res) => {
    const { boardId, name, desc } = req.body;
    const board = boardId === 1 ? TRELLO_BOARD_1 : TRELLO_BOARD_2;
    try {
        const response = await axios.post(`https://api.trello.com/1/cards`, null, {
            params: {
                idList: board,
                name,
                desc,
                key: TRELLO_KEY,
                token: TRELLO_TOKEN
            }
        });
        res.json(response.data);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
