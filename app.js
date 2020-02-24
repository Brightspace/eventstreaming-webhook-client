const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.all('',function(req,res) {
  const brightspaceEvents = JSON.parse(req.body).Records;
  console.log(`Successfully received ${brightspaceEvents.length} events.`);
  res.send('OK');
  process(events);
});

const process = (events) => {
  for (const event of events) {
    console.log(JSON.stringify(event));
  }
}

module.exports = app;
