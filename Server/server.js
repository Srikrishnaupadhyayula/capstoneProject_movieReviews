const express = require('express');
const connectMongoDB = require('./config/db')
const reviewroutes = require('./routes/reviews')
const cors = require('cors')
require('dotenv').config() 


const app = express();
app.use(express.json());

const PORT = process.env.PORT || 9000;

connectMongoDB()

app.use(cors({
    origin: [
        '*',
        "http://localhost:3000",
        "https://spark-movie-review-client.vercel.app",
        "https://spark-movie-review-server.vercel.app"
    ],
    credentials: true
}))


app.use('/api/moviereviews' , reviewroutes)


app.get("/", async (req, res) => {
    return res.status(200).send({ message: "Server is working as intended :)" });
});


app.listen(PORT, () => {
    console.log(`Spark Movie Review server is listening on port ${PORT}`)
})