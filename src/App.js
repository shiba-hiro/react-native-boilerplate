import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';

import store from './store';
import TimePickerAndroid from './components/TimePickerAndroid';

class RootContainer extends Component {
  state = {
    visible: false,
  }

  render() {
    return (
        <TimePickerAndroid />
    );
  }
}

const mapStateToProps = (state) => ({
	state,
});

const ConnectedRootContainer = connect(mapStateToProps,null)(RootContainer);
class App extends Component { // eslint-disable-line react/no-multi-comp
  render() {
    return (
      <Provider store={store}>
			  <ConnectedRootContainer />
      </Provider>
    );
  }
}

export default App;
