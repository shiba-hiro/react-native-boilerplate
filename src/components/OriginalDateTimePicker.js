import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Text, View } from 'native-base';
// import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
// import _ from 'lodash';

import MinIntDateTimePicker from './MinIntDateTimePicker';

// import l10n from '../../locales/l10n';

// type Props = {
//   datetime: moment,
//   minimumDate: moment,
//   onConfirm: Function,
//   label: string,
//   invalidDays: Array<moment>,
//   maximumDate: moment,
// }
// type State = {
//   selectedDatetime: moment,
//   isVisible: boolean,
// }
export default class extends React.Component {
  state = {
    selectedDatetime: this.props.datetime,
    isVisible: false,
  };

  componentDidUpdate(prevProps) {
    const { datetime } = this.props;
    if (!prevProps.datetime.isSame(datetime)) {
      this.setState({ // eslint-disable-line
        selectedDatetime: datetime,
      });
    }
  }

  _show = () => this.setState({ isVisible: true })

  _hide = () => this.setState({ isVisible: false })

  _renderValue = () => {
    const { selectedDatetime } = this.state;
    if (selectedDatetime) {
      return <Text success bold style={{ fontSize: 21 }}>{selectedDatetime.format('MM/DD HH:mm')}</Text>;
    }
    return <Text light bold>Select Date</Text>;
  }

  _handleConfirm = (datetime) => {
    this.setState({
      selectedDatetime: datetime,
      isVisible: false,
    });
  }

  render() {
    const {
      minimumDate = moment(),
      maximumDate = moment().add(2, 'month').endOf('month'),
      label,
    } = this.props;
    const {
      selectedDatetime,
    } = this.state;
    return (
      <TouchableWithoutFeedback onPress={this._show}>
        <View>
          <View style={{ marginBottom: 6 }}>
            <Text primary small>{label}</Text>
          </View>
          {this._renderValue()}
          <MinIntDateTimePicker
            datetime={selectedDatetime}
            isVisible={this.state.isVisible}
            locale="ja-JP" // 'en-US', 'ja-JP', l10n.getLocale()
            minimumDate={minimumDate}
            maximumDate={maximumDate}
            onConfirm={(date) => this._handleConfirm(date)}
            onCancel={() => this._hide()}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
