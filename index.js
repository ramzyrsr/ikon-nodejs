const { default: axios } = require('axios');
const express = require('express')
const app = express()
const port = 8080;
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

app.get('/', jsonParser, async (req, res) => {
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
    
    res.send({
        data: result,
        total: result.length,
    });
})

app.listen(port, () => {
    console.log(`app run at: localhost:${port}`);
    
})