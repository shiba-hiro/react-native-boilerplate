import React from 'react';
import { View } from 'native-base';
import DatePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

import LimitedMinsTimePicker from './LimitedMinsTimePicker';

// type Props = {
//   datetime: moment, // optional
//   isVisible: boolean, // optional
//   locale // like 'en-US', 'ja-JP', l10n.getLocale()
//   minimumDate: moment, // optional
//   maximumDate: moment, // optional
//   invalidDays: Array<moment>, // optional
//   onConfirm: Function, // uses by timePicker's onConfirm
//   onCancel, // Function, used by both DateTimePicker and TimePickerAndroid
// }
export default class extends React.Component {
  state = {
    selectedDate: null, // instance of Date which stores data in Date
    isDatePickerVisible: false, // state of the DatePicker
    isTimePickerVisible: false, // state of the TimePicker
  }

  _changeToTimePicker(selectedDate) {
    this.setState({
      selectedDate,
      isDatePickerVisible: false,
      isTimePickerVisible: true,
    });
  }

  _completeProcess = (selectedTime) => { // Date instance, only filled time information
    const { selectedDate } = this.state;
    const selectedDateTime = moment([
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      selectedTime.getHours(),
      selectedTime.getMinutes(),
    ]);
    if (this._isAcceptableDate(selectedDateTime)) {
      this.setState({
        selectedDate: null,
        isTimePickerVisible: false,
      });
      const { onConfirm } = this.props;
      onConfirm(selectedDateTime);
    } else {
      console.warn('Invalid Date', selectedDateTime);
    }
  }

  _isAcceptableDate = (selectedDateTime) => { // moment instance
    const { invalidDays = [] } = this.props;
    return !(invalidDays.find((dt) => dt.isSame(selectedDateTime, 'day')));
  }

  _handleCancel = () => {
    this.setState({
      selectedDate: null,
      isDatePickerVisible: false,
      isTimePickerVisible: false,
    });
    const { onCancel } = this.props;
    onCancel();
  }


  render() {
    const {
      datetime,
      isVisible,
      locale,
      minimumDate,
      maximumDate,
    } = this.props;
    return(
      <View>
        <DatePicker
          mode="date"
          date={datetime.toDate()}
          isVisible={isVisible}
          onConfirm={(selectedDate) => this._changeToTimePicker(selectedDate)}
          onCancel={() => this._handleCancel()}
          locale={locale}
          minimumDate={minimumDate.toDate()}
          maximumDate={maximumDate.toDate()}
        />
        <LimitedMinsTimePicker
          onConfirm={(selectedTime) => this._completeProcess(selectedTime)}
          onCancel={() => this._handleCancel()}
          isVisible={this.state.isTimePickerVisible}
          hours={datetime.toDate().getHours()}
          minutes={datetime.toDate().getMinutes()}
        />
      </View>
    );
  }
}
