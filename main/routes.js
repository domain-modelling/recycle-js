const {Router} = require('express');
const bodyParser = require('body-parser');

const routes = Router();
routes.use(bodyParser.json());

class PriceCalculator {
    calculatePrice(cardId) {
        return 0;
    }
}

routes.get("/", (request, response) => {
    return response.json({status: "ok"});
});

routes.get("/validate", (request, response) => {
    return response.json({});
});

routes.post("/handle-command", (request, response) => {
    const { history, command } = request.body
    const priceCalculator = new PriceCalculator()
    const answer = {
        event_id: "foo",
        created_at: new Date().toISOString(),
        type: "PriceWasCalculated",
        payload: {
            card_id: "123",
            price_amount: priceCalculator.calculatePrice("123"),
            price_currency: "EUR",
        },
    };
    console.log({history, command, answer})
    return response.json(answer);
});

module.exports = {routes}
