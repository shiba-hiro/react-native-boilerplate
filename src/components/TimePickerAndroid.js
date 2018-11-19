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
        dataString: '30'
      }
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
      MIN_INTERVALS[this.props.minuteInterval || 30].values.find((value) => value.index === minutesIndex).data,
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
            />,
            <DialogButton
              text="OK"
              onPress={() => this._completeSelectTime()}
              key="button-2"
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
              style={styles.dialogInnerView}
            >
              <View
                style={styles.PickerWrapperView}
              >
                <ScrollPicker
                  dataSource={HOURS_STRINGS}
                  selectedIndex={hoursIndex}
                  itemHeight={30}
                  wrapperHeight={75}
                  highlightColor={'#d8d8d8'}
                  renderItem={(data) => (
                    <View>
                        <Text >{data}</Text>
                    </View>
                    )
                  }
                  onValueChange={(data, selectedIndex) => this.setState({ hoursIndex: selectedIndex })}
                />
              </View>
              <View
                style={styles.PickerWrapperView}
              >
                <ScrollPicker
                  dataSource={minsStrings}
                  selectedIndex={minutesIndex}
                  itemHeight={30}
                  wrapperHeight={75}
                  highlightColor={'#d8d8d8'}
                  renderItem={(data) => (
                    <View>
                        <Text >{data}</Text>
                    </View>
                    )
                  }
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialogContainer: {
    zIndex: 10,
    elevation: 10,
  },
  dialogStyle: {
    backgroundColor: '#F7F7F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialogContent: {
    backgroundColor: '#F7F7F8',
    width: '75%',
    height: '30%',
  },
  dialogInnerView: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
  },
  PickerWrapperView: {
    flex: 1,
    height: 75,
  },
});
