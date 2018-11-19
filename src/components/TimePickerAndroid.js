import React from 'react';
import {
  View,
  Text,
  // Button,
  StyleSheet,
} from 'react-native';
import Dialog, {
  DialogContent,
  DialogButton,
} from 'react-native-popup-dialog';
import ScrollPicker from 'react-native-picker-scrollview';

export default class extends React.Component {
  state = {
    // isVisible: false,
    hours: this.props.hours || 0,
    minutes: this._convertMinutesToIndex(),
  }

  _convertMinutesToIndex() {
    const { minutes } = this.props;
    if (minutes) {
      return minutes < 30 ? 0 : 1;
    }
    return 0;
  }

  _handleConfirm() {
    const { hours, minutes } = this.state;
    const d = new Date();
    d.setHours(hours, minutes === 0 ? 0 : 30);
    this.props.onConfirm(d);
  }

  render() {
    const {
      // onConfirm,
      onCancel,
      isVisible
    } = this.props;
    const {
      hours,
      minutes,
    } = this.state;

    return (
      <View style={styles.container}>
        <Dialog
          // onDismiss={() => {
          //   this.setState({ isVisible: false });
          // }}
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
              onPress={() => this._handleConfirm()}
              key="button-2"
            />,
          ]}
          containerStyle={{ zIndex: 10, elevation: 10 }}
          dialogStyle={{
            backgroundColor: '#F7F7F8',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onTouchOutside={onCancel}
        >
          <DialogContent
            style={{
              backgroundColor: '#F7F7F8',
              width: '75%',
              height: '30%',
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                width: '100%',
              }}
            >
              <View
                style={{
                  flex: 1,
                  height: 75,
                }}
              >
                <ScrollPicker
                  dataSource={[
                    '0',
                    '1',
                    '2',
                    '3',
                    '4',
                    '5',
                    '6',
                    '7',
                    '8',
                    '9',
                    '10',
                    '11',
                    '12',
                    '13',
                    '14',
                    '15',
                    '16',
                    '17',
                    '18',
                    '19',
                    '20',
                    '21',
                    '22',
                    '23',
                  ]}
                  selectedIndex={hours}
                  itemHeight={30}
                  wrapperHeight={75}
                  highlightColor={'#d8d8d8'}
                  renderItem={(data, index, isSelected) => { // eslint-disable-line no-unused-vars, arrow-body-style
                      return(
                          <View>
                              <Text >{data}</Text>
                          </View>
                      )
                  }}
                  onValueChange={(data, selectedIndex) => {
                      console.log(data);
                      console.log(selectedIndex);
                      this.setState({ hours: selectedIndex });
                  }}
                  style={{
                    zIndex:20,
                  }}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  height: 75,
                }}
              >
                <ScrollPicker
                  dataSource={[
                    '00',
                    '30',
                  ]}
                  selectedIndex={minutes}
                  itemHeight={30}
                  wrapperHeight={75}
                  highlightColor={'#d8d8d8'}
                  renderItem={(data, index, isSelected) => { // eslint-disable-line no-unused-vars, arrow-body-style
                      return(
                          <View>
                              <Text >{data}</Text>
                          </View>
                      )
                  }}
                  onValueChange={(data, selectedIndex) => {
                      console.log(data);
                      console.log(selectedIndex);
                      this.setState({ minutes: selectedIndex });
                  }}
                  style={{
                    zIndex:20,
                  }}
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
});
