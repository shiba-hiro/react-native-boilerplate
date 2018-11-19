import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { View } from 'react-native';
import moment from 'moment';

import store from './store';
import OriginalDateTimePickerAndroid from './components/OriginalDateTimePickerAndroid';

class RootContainer extends Component {
  state = {
    selectedDate: moment().minute(0), // moment
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 300,
        }}
      >
        <OriginalDateTimePickerAndroid
          datetime={this.state.selectedDate}
          minimumDate={moment()}
          maximumDate={moment().add(2, 'month').endOf('month')}
          invalidDays={[]}
          onConfirm={date => this.setState({ selectedDate: date })}
          label="Here is the label"
        />
      </View>
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
