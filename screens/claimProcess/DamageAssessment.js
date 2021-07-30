import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TextInput,
  Button
} from 'react-native';
import * as Progress from 'react-native-progress';
import DatePicker from 'react-native-datepicker';
import { Picker } from '@react-native-picker/picker';
class DamageAssessment extends Component {
  state = {
    date: new Date(),
    center: '',
    time: ''
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          centerContent={true}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ marginHorizontal: 10 }}>
            <Progress.Bar
              progress={0.6}
              width={Dimensions.get('window').width - 20}
            />
          </View>
          <Text
            style={{ textAlign: 'center', marginVertical: 20, fontSize: 16 }}
          >
            The date and time that suits me for damage assessment
          </Text>
          <View style={{ flex: 0.8 }}>
            <View
              style={{
                alignItems: 'center'
              }}
            >
              <Picker
                selectedValue={this.state.center}
                style={{ height: 50, width: 200 }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ center: itemValue })
                }
              >
                <Picker.Item label="Reporting Center" />
                <Picker.Item label="Center 1" value="1" />
                <Picker.Item label="Center 2" value="2" />
                <Picker.Item label="Center 3" value="3" />
              </Picker>
            </View>
            <View style={{ alignItems: 'center', marginVertical: 20 }}>
              <DatePicker
                style={{ width: 200 }}
                date={this.state.date}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => {
                  this.setState({ date: date });
                }}
              />
            </View>
            <View
              style={{
                alignItems: 'center'
              }}
            >
              <Picker
                selectedValue={this.state.time}
                style={{ height: 50, width: 200 }}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ time: itemValue })
                }
              >
                <Picker.Item label="Convenient time" />
                <Picker.Item label="12:00" value="12:00" />
                <Picker.Item label="1:00" value="1:00" />
                <Picker.Item label="2:00" value="2:00" />
              </Picker>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 20
            }}
          >
            <Button
              title="Back"
              onPress={() => {
                this.props.navigation.navigate('VehicleDamageVideo');
              }}
            />
            <Button
              title="Next"
              onPress={() => {
                this.props.navigation.navigate('Documents');
              }}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default DamageAssessment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
});
