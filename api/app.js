require('dotenv').config();
const mongo = require('mongodb').MongoClient
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const { MONGO_URI, MONGO_USER, MONGO_PASSWORD } = process.env;
const url = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URI}`
const port = 3001
const app = express()
const mongoOpts = { 
  useNewUrlParser: true,
  useUnifiedTopology: true
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (req, res) => {
  const startDate = req.query.start;
  const endDate = req.query.end;
  console.log(req.query,{ startDate, endDate});
  
  mongo.connect(url, mongoOpts, (err, client) => {
    const db = client.db('dollar-today');
    const collection = db.collection('dollar-history')
    if (startDate && endDate) {
      collection.aggregate([
        {
          $match: {
            d: {
              $gt: startDate,
              $lt: endDate
            }
          }
        },
        {
        $group: {
          _id: null,
          avgPrice: {
              $avg: "$v"
            }
          }
        }
      ],
        async (err, data) => {
          const flattenedData = await data.toArray(); 
          res.json(flattenedData[0])
        }
      );
    } else {
      collection.findOne(
        {},
        { sort: { d: -1 } },
        (err, data) => res.json(data)
      )
    }
  })
})

app.listen(port);