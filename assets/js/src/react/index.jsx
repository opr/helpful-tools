import React from 'react';
import ReactDOM from 'react-dom';
import {hydrate} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import FrequencyTableCalculator from './FrequencyTableCalculator/FrequencyTableCalculator';
import store from './redux-config/store';
import {Provider} from 'react-redux';
import AgonyCalculator from './AgonyCalculator/AgonyCalculator';
import GameOfLife from './GameOfLife/GameOfLife';

const getRenderFunc = app => () => {
  render(app.component, app.element, app.name, app.hydrate);
};

const render = (Component, element, name, hydrate) => {
  const func = hydrate ? ReactDOM.hydrate : ReactDOM.render;
  func(
    <AppContainer name={name}>
      {Component}
    </AppContainer>,
    element
  );
};

const elements = {
  frequencyTableCalculator: document.getElementById('frequency-table-calculator__react-anchor'),
  agonyCalculator: document.getElementById('agony-calculator__react-root'),
  gameOfLifeAnchor: document.getElementById('game-of-life__react-anchor')
};
const apps = [];

if (elements.frequencyTableCalculator) {
  apps.push({
    element: elements.frequencyTableCalculator,
    component: <Provider store={store}><FrequencyTableCalculator/></Provider>,
    file: './FrequencyTableCalculator/FrequencyTableCalculator',
    name: 'FrequencyTableCalculator',
    hydrate: true
  });
}

if (elements.agonyCalculator) {
  apps.push({
    element: elements.agonyCalculator,
    component: <Provider store={store}><AgonyCalculator/></Provider>,
    file: './AgonyCalculator/AgonyCalculator',
    name: 'AgonyCalculator',
    hydrate: true
  });
}


if (elements.gameOfLifeAnchor) {
  apps.push({
    element: elements.gameOfLifeAnchor,
    component: <Provider store={store}><GameOfLife/></Provider>,
    file: './GameOfLife/GameOfLife',
    name: 'GameOfLife',
    hydrate: true
  });
}


for (const app of apps) {
  app.element ? getRenderFunc(app)() : null;
  module.hot ? module.hot.accept(getRenderFunc(app)()) : null;
}
