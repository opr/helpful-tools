export const setAndShowModal = name => ({type: 'SET_AND_SHOW_MODAL', payload: {name}});
export const setModal = name => ({type: 'SET_MODAL', payload: {name}});
export const showModal = (show = true) => ({type: 'SHOW_MODAL', payload: {show}});
export const setModalMetaData = (metaData) => ({type: 'SET_MODAL_METADATA', payload: {metaData}});
