const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/expense_tracker', {
  useNewUrlParser: true, useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Sample endpoint
app.get('/', (req, res) => { res.send('API Running'); });

app.listen(3000, () => { console.log('Server started on port 3000'); });
