const express = require('express');
const { routes } = require('./routes');

const app = express();

app.use(routes);

const port = 8000;
app.listen(port, () => {
    console.log(`⚡️ Server started on port ${port}`);
});
