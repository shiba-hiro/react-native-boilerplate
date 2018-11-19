import React from 'react';
import { View } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

import TimePickerAndroid from './TimePickerAndroid';

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
    tempDate: null, // instance of Date which stores data in Date
    isDatePickerVisible: false, // state of the DatePicker
    isTimePickerVisible: false, // state of the TimePicker
  }
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     tempDate: null, // instance of Date which stores data in Date
  //     isDatePickerVisible: props.isVisible || false, // state of the DatePicker
  //     isTimePickerVisible: false, // state of the TimePicker
  //   }
  // }

  _passToTimePicker(date) {
    this.setState({
      tempDate: date,
      isDatePickerVisible: false,
      isTimePickerVisible: true,
    });
  }

  _handleConfirm = (selectedTime) => { // Date instance, only filled time information
    const { tempDate } = this.state;
    const selectedDateTime = moment([
      tempDate.getFullYear(),
      tempDate.getMonth(),
      tempDate.getDate(),
      selectedTime.getHours(),
      selectedTime.getMinutes(),
    ]);
    if (this._validate(selectedDateTime)) {
      this.setState({
        isTimePickerVisible: false,
      });
      this.props.onConfirm(selectedDateTime);
    } else {
      console.warn('Invalid Date', selectedDateTime);
    }
  }

  _validate = (selectedDateTime) => { // moment instance
    const { invalidDays = [] } = this.props;
    return !(invalidDays.find((dt) => dt.isSame(selectedDateTime, 'day')));
  }


  render() {
    const {
      datetime,
      locale,
      minimumDate,
      maximumDate,
      onCancel, // Function, used by both DateTimePicker and TimePickerAndroid
    } = this.props;
    // if (!datetime) {
    //   datetime = moment();
    // }
    return(
      <View>
        <DateTimePicker
          mode="date"
          date={datetime.toDate()}
          // isVisible={this.state.isDatePickerVisible}
          isVisible={this.props.isVisible}
          onConfirm={(date) => this._passToTimePicker(date)}
          onCancel={onCancel}
          locale={locale}
          minimumDate={minimumDate.toDate()}
          maximumDate={maximumDate.toDate()}
        />
        <TimePickerAndroid
          onConfirm={(date) => this._handleConfirm(date)}
          onCancel={() => {
            this.setState({
              isTimePickerVisible: false,
            });
            onCancel();
          }}
          isVisible={this.state.isTimePickerVisible}
          hours={datetime.toDate().getHours()}
          minutes={datetime.toDate().getMinutes()}
        />
      </View>
    );
  }
}
