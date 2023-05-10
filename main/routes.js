const {Router} = require('express');
const bodyParser = require('body-parser');

const routes = Router();
routes.use(bodyParser.json());

routes.get("/validate", (request, response) => {
    return response.json({});
});

routes.post("/handle-command", (request, response) => {
    const {history, command} = request.body
    const answer = {
        event_id: "foo",
        created_at: new Date().toISOString(),
        type: "PriceWasCalculated",
        payload: {
            card_id: "123",
            price_amount: 1,
            price_currency: "EUR",
        },
    };
    console.log({history, command, answer})
    return response.json(answer);
});

module.exports = {routes}
