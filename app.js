import express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';
import FrequencyTableCalculator from './assets/js/src/react/FrequencyTableCalculator/FrequencyTableCalculator';
import store from './assets/js/src/react/redux-config/store';
import {Provider} from 'react-redux';
import AgonyCalculator from './assets/js/src/react/AgonyCalculator/AgonyCalculator';
import {calculateAgony} from './backend/agony/api';

const app = express();
const port = 3002;

app.get('/', (req, res) => res.render('index'));
app.get('/maths/frequency-table-calculator', (req, res) => res.render('maths/frequency-table-calculator', {title: 'Frequency table calculator', component: renderToString(<Provider store={store}><FrequencyTableCalculator /></Provider>)}));
app.get('/gw2/agony-calculator', (req, res) => res.render('gw2/agony-calculator', {title: 'Agony calculator', component: renderToString(<Provider store={store}><AgonyCalculator/></Provider>)}))

//backend stuff
app.get('/api/agonyPrices', async (req, res) => {
  res.send(await calculateAgony(req.query.source, req.query.result, req.query.count));
});
app.listen(port);
app.set('view engine', 'pug');
app.use('/assets', express.static('assets'));
