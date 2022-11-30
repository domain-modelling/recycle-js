const {Router} = require('express');
const bodyParser = require('body-parser');

const routes = Router();
routes.use(bodyParser.json());

routes.get("/validate", (request, response) => {
    return response.json({});
});

routes.post("/calculate", (request, response) => {
    const {events, command} = request.body
    console.log({events, command})
    return response.json({priceWasCalculated: {id: 1, price: {amount: 0, currency: "euro"}}});
});

module.exports = {routes}
