const {Router} = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const PriceCalculator = require('./priceCalculator');

const routes = Router();
routes.use(bodyParser.json());

routes.get('/', (request, response) => {
    return response.json({
        status: 'ok',
        message: 'please enter a public URL to this site on https://domainmodelling.dev, as specified in the readme'
    });
});

routes.get('/validate', (request, response) => {
    return response.json({status: 'ok'});
});

routes.post('/handle-command', (request, response) => {
    const {history, command} = request.body;

    // If you have no inspiration to start implementing, uncomment this part:
    const price = new PriceCalculator(history).calculatePrice(command.payload.card_id);
    // const price = 1;

    const answer = {
        event_id: uuid.v1(),
        created_at: new Date().toISOString(),
        type: 'PriceWasCalculated',
        payload: {
            card_id: command.payload.card_id,
            price_amount: price,
            price_currency: 'EUR',
        },
    };
    console.log({history, command, answer})
    return response.json(answer);
});

module.exports = {routes}
