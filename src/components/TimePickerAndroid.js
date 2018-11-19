import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native';
import Dialog, {
  DialogContent,
  DialogButton,
} from 'react-native-popup-dialog';
import ScrollPicker from 'react-native-picker-scrollview';

export default class extends React.Component {
  state = {
    visible: false,
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <Button
            title="Show Dialog"
            onPress={() => {
              this.setState({
                visible: true,
              });
            }}
          />
        </View>

        <Dialog
          onDismiss={() => {
            this.setState({ visible: false });
          }}
          width={0.9}
          visible={this.state.visible}
          rounded
          actions={[
            <DialogButton
              text="CANCEL"
              onPress={() => {
                this.setState({ visible: false });
              }}
              key="button-1"
            />,
            <DialogButton
              text="OK"
              onPress={() => {
                this.setState({ visible: false });
              }}
              key="button-2"
            />,
          ]}
          containerStyle={{ zIndex: 10, elevation: 10 }}
          dialogStyle={{
            backgroundColor: '#F7F7F8',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onTouchOutside={() => {
            this.setState({ visible: false });
          }}
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
                  selectedIndex={0}
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
                  selectedIndex={0}
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
