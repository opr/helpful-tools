export const changeRowOrColumnCount = (state, key, value) => state.set(key, parseInt(value));
export const toggleSelected = (state, coordinates) => state.setIn(['grid', coordinates.x, coordinates.y, 'checked'], !state.getIn(['grid', coordinates.x, coordinates.y, 'checked'], false));
export const togglePlay = (state, override) => state.set('playing', override === undefined ? !state.get('playing', false) : override);
export const calculateNextState = state => {

  let nextState = state.asMutable();
  //for every cell do a check, can probably be made more efficient with some brainy code but whatever
  state.getIn(['grid']).forEach((row, rowIndex) => row.forEach((column, columnIndex) => {
    const x = rowIndex;
    const y = columnIndex;

    const neighbours = [
      {x: x - 1, y: y - 1},
      {x, y: y - 1},
      {x: x + 1, y: y - 1},
      {x: x - 1, y},
      {x: x + 1, y},
      {x: x - 1, y: y + 1},
      {x, y: y + 1},
      {x: x + 1, y: y + 1},
    ];
    const neighbourCount = neighbours.reduce((acca, current) => {
      //console.log(current, state.getIn(['grid', current.x, current.y, 'checked'], false));
      return acca + (state.getIn(['grid', current.x, current.y, 'checked'], false) ? 1 : 0);
    }, 0);
    const living = state.getIn(['grid', x, y, 'checked'], false);

    if(!living && neighbourCount === 3) {
      nextState = nextState.setIn(['grid', x, y, 'checked'], true);
      return;
    }

    if (living && neighbourCount < 2) {
      nextState = nextState.setIn(['grid', x, y, 'checked'], false);
      return;
    }

    if(living && (neighbourCount === 2 || neighbourCount === 3)) {
      //do nothing
      return;
    }

    if (living && neighbourCount > 3) {
      //console.log('cell', x, ', ', y, 'has', neighbourCount, 'neighbours');
      nextState = nextState.setIn(['grid', x, y, 'checked'], false);
    }
  }));
  return nextState.asImmutable();
};
