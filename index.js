const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// user: dbuser2
// pass: AePiAMx4t5uNW1BB



const uri = "mongodb+srv://bike-gallery:PgX49iiexHkpj85b@cluster0.pa0zg.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const itemsCollections = client.db('bike-gallery').collection('item');
        app.get('/items', async (req, res) => {
            const cursor = itemsCollections.find({});
            const items = await cursor.toArray();
            res.send(items);
        }
        );
    }
    finally {
        // await client.close();
    }
}

run().catch(err => console.log(err));


app.get('/', (req, res) => {
    res.send('Hello from node mongo crud server');
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})