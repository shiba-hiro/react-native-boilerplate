import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Dialog, {
  DialogContent,
  DialogButton,
} from 'react-native-popup-dialog';
import ScrollPicker from 'react-native-picker-scrollview';

const MIN_INTERVALS = {
  30: {
    values: [
      {
        index: 0,
        data: 0,
        dataString: '00',
      },
      {
        index: 1,
        data: 30,
        dataString: '30',
      },
    ],
    convertMinutesToIndex: (minutesData) => {
      if (minutesData) {
        return minutesData < 30 ? 0 : 1;
      }
      return 0;
    },
  },
};

const HOURS_STRINGS = Array.from({ length: 24 }).map((v, i) => i.toString());

const _renderNumberItems = (data, index, isSelected) => isSelected ? (
  <View>
      <Text style={styles.selectedNumber}>{data}</Text>
  </View>
  ) : (
    <View>
        <Text style={styles.nonSelectedNumber}>{data}</Text>
    </View>
  );

export default class extends React.Component {
  state = {
    hoursIndex: this.props.hours || 0,
    minutesIndex: MIN_INTERVALS[this.props.minuteInterval || 30].convertMinutesToIndex(this.props.minutes),
  }

  _completeSelectTime() {
    const { hoursIndex, minutesIndex } = this.state;
    const time = new Date();
    time.setHours(
      hoursIndex,
      MIN_INTERVALS[this.props.minuteInterval || 30].values
        .find((value) => value.index === minutesIndex)
        .data,
    );
    this.props.onConfirm(time);
  }

  render() {
    const {
      onCancel,
      isVisible,
      minuteInterval,
    } = this.props;
    const {
      hoursIndex,
      minutesIndex
    } = this.state;

    const minsStrings = MIN_INTERVALS[minuteInterval || 30].values
      .map(value => value.dataString);

    return (
      <View style={styles.container}>
        <Dialog
          width={0.9}
          visible={isVisible}
          rounded
          actions={[
            <DialogButton
              text="CANCEL"
              onPress={onCancel}
              key="button-1"
              bordered={false}
              textStyle={styles.actionText}
              style={styles.actions}
            />,
            <DialogButton
              text="OK"
              onPress={() => this._completeSelectTime()}
              key="button-2"
              bordered={false}
              textStyle={styles.actionText}
              style={styles.actions}
            />,
          ]}
          containerStyle={styles.dialogContainer}
          dialogStyle={styles.dialogStyle}
          onTouchOutside={() => onCancel()}
        >
          <DialogContent
            style={styles.dialogContent}
          >
            <View
              style={styles.dialogInnerPickersView}
            >
              <View
                style={styles.pickerWrapperView}
              >
                <ScrollPicker
                  dataSource={HOURS_STRINGS}
                  selectedIndex={hoursIndex}
                  itemHeight={30}
                  wrapperHeight={75}
                  highlightColor={'#7B7D81'}
                  renderItem={_renderNumberItems}
                  onValueChange={(data, selectedIndex) => this.setState({ hoursIndex: selectedIndex })}
                />
              </View>
              <View style={styles.timeColon}>
                <Text>:</Text>
              </View>
              <View
                style={styles.pickerWrapperView}
              >
                <ScrollPicker
                  dataSource={minsStrings}
                  selectedIndex={minutesIndex}
                  itemHeight={30}
                  wrapperHeight={75}
                  highlightColor={'#7B7D81'}
                  renderItem={_renderNumberItems}
                  onValueChange={(data, selectedIndex) => this.setState({ minutesIndex: selectedIndex })}
                />
              </View>
            </View>
          </DialogContent>
        </Dialog>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dialogContainer: {
    zIndex: 10,
    elevation: 10,
  },
  dialogStyle: {
    backgroundColor: '#fafafa',
    alignItems: 'center',
    width: '60%',
    height: '35%',
  },
  dialogContent: {
    backgroundColor: '#fafafa',
    width: '80%',
    height: '70%',
  },
  dialogInnerPickersView: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  pickerWrapperView: {
    flex: 3,
    height: 75,
    justifyContent: 'center',
  },
  timeColon: {
    flex: 1,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedNumber: {
    fontSize: 20,
    color: 'black',
  },
  nonSelectedNumber: {
    fontSize: 20,
    color: '#DDD',
  },
  actionText: {
    fontSize: 12,
    color: '#2370DF',
  },
});
