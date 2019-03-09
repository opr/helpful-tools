export const changeRowOrColumnCount = (key, value) => ({type: 'GOL_CHANGE_ROW_OR_COLUMN_COUNT', payload: {key, value}});
export const toggleSelected = (coordinates) => ({type: 'GOL_TOGGLE_SELECTED', payload: {coordinates}});
export const togglePlay = override => ({type: 'GOL_TOGGLE_PLAY', payload: {override}});
export const togglePlayStateChanged = () => ({type: 'GOL_TOGGLE_PLAY_STATE_CHANGED'});
export const calculateNextState = () => ({type: 'GOL_CALCULATE_NEXT_STATE'});
