export const setModal = (state, name) => state.set('selectedModal', name);
export const showModal = (state, show = true) => state.set('visible', show);
export const setModalMetaData = (state, metaData) => state.set('metaData', metaData);
