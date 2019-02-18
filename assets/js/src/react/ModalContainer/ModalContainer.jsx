import React from 'react';
import * as actionCreators from './actions';
import {connect} from 'react-redux';
import {constants} from '../constants/constants';
import SearchAndHighlightModal from '../SearchAndHighlightModal/SearchAndHighlightModal';
import SaveSnippetModal from '../SaveSnippetModal/SaveSnippetModal';
import SnippetSavedModal from '../SaveSnippetModal/SnippetSavedModal';
import SaveSearchModal from '../SaveSearchModal/SaveSearchModal';
import SearchSavedModal from '../SaveSearchModal/SearchSavedModal';
import ConfirmDeleteSavedItemModal from '../SavedItemsTable/ConfirmDeleteSavedItemModal';
import SavedItemDeletedModal from '../SavedItemsTable/SavedItemDeletedModal';

class ModalContainer extends React.Component {

  constructor(props) {
    super();
    this.state = {...props};
  }

  render() {
    let visibleElement = null;
    switch (this.props.modal) {
      case constants.SEARCH_AND_HIGHLIGHT_MODAL:
        visibleElement = <SearchAndHighlightModal/>;
        break;
      case constants.SAVE_SNIPPET_MODAL:
        visibleElement = <SaveSnippetModal/>;
        break;
      case constants.SNIPPET_SAVED_MODAL:
        visibleElement = <SnippetSavedModal/>;
        break;
      case constants.SAVE_SEARCH_MODAL:
        visibleElement = <SaveSearchModal/>;
        break;
      case constants.SEARCH_SAVED_MODAL:
        visibleElement = <SearchSavedModal/>;
        break;
      case constants.CONFIRM_DELETE_SAVED_ITEM_MODAL:
        visibleElement = <ConfirmDeleteSavedItemModal metaData={this.props.metaData}/>;
        break;
      case constants.SAVED_ITEM_DELETED_MODAL:
        visibleElement = <SavedItemDeletedModal />;
        break;
      default:
        visibleElement = null;
    }

    return (
      <div className={`modal-container${this.props.visible ? ' --visible' : ''}`}>
        <div className={'modal-container__body'}>
          <div className={'modal-container__close-button'} onClick={() => this.props.showModal(false)}/>
          <div className={'modal-container__inner'}>
            {visibleElement}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => {
  const visible = state.getIn(['modal', 'visible'], false);
  const modal = state.getIn(['modal', 'selectedModal'], false);
  const metaData = state.getIn(['modal', 'metaData'], null);
  return {
    visible,
    modal,
    metaData
  };
}, actionCreators)(ModalContainer);
