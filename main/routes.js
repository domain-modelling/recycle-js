const {Router} = require('express');
const bodyParser = require('body-parser');

const routes = Router();
routes.use(bodyParser.json());

routes.get("/validate", (request, response) => {
    return response.json({});
});

routes.post("/handle-command", (request, response) => {
    const {events, command} = request.body
    const answer = {
        event_id: "foo",
        created_at: new Date().toISOString(),
        type: "PriceWasCalculated",
        payload: {
            person_id: "Tom",
            price_amount: 0,
            price_currency: "EUR",
        },
    };
    console.log({events, command, answer})
    return response.json(answer);
});

module.exports = {routes}
