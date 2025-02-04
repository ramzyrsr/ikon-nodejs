const { default: axios } = require('axios');
const express = require('express')
const app = express()
const { body, validationResult } = require('express-validator');
const port = 8080;
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const { dataResponse } = require('./middleware')

app.get(
    '/',
    jsonParser,
    [
        body('offset').isInt({ min: 0 }).withMessage('Offset must be a non-negative integer'),
        body('limit').isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }

    try {
        const data = await axios({
            method: 'get',
            url: 'https://jsonplaceholder.typicode.com/posts',
        })
    
        const result = data.data.map((x) => {
            const data = {
                id: x.id,
                title: x.title,
            }
    
            return data;
        })
        const filteredResult = result.slice(parseInt(req.body.offset), parseInt(req.body.offset) + parseInt(req.body.limit));

        return res.status(200).json(
            dataResponse(200, {
                    data: filteredResult,
                    totalFiltered: filteredResult.length,
                    total: result.length,
                })
        )
    } catch (error) {
        return res.status(500).json(dataResponse(500, [error.message]));
    }
})

app.listen(port, () => {
    console.log(`app run at: localhost:${port}`);
    
})