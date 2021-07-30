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
import MapView from 'react-native-maps';
import { Picker } from '@react-native-picker/picker';
import LocationSearch from './LocationSearch';

class SiteOfIncident extends Component {
  state = {
    date: new Date(),
    fromLat: 13.075999696,
    fromLong: 80.271832246,
    weather: ''
  };
  location = (lat, long, fromAddress) => {
    this.setState({ fromLat: lat, fromLong: long, fromAddress: fromAddress });
  };
  render() {
    const coordinates = [
      {
        latitude: this.state.fromLat,
        longitude: this.state.fromLong
      }
    ];
    return (
      <View style={styles.container}>
        <ScrollView
          keyboardShouldPersistTaps="always"
          centerContent={true}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ marginHorizontal: 10 }}>
            <Progress.Bar
              progress={0.3}
              width={Dimensions.get('window').width - 20}
            />
          </View>
          <Text
            style={{
              textAlign: 'center',
              marginVertical: 20,
              fontSize: 17,
              color: 'grey'
            }}
          >
            Provide the event details
          </Text>
          <Text style={{ textAlign: 'center', marginBottom: 5, color: 'grey' }}>
            Date of event
          </Text>
          <View style={{ alignItems: 'center' }}>
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
          {/* <Text
            style={{ textAlign: "center", marginVertical: 10, color: "grey" }}
          >
            Location of event
          </Text> */}
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <LocationSearch location={this.location} />
            <MapView
              region={{
                latitude: this.state.fromLat,
                longitude: this.state.fromLong,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
              }}
              style={styles.map}
              minZoomLevel={15}
            >
              <MapView.Marker
                draggable
                coordinate={coordinates[0]}
                pinColor="red"
              />
            </MapView>
          </View>
          <View
            style={{
              alignItems: 'center'
            }}
          >
            <Picker
              selectedValue={this.state.weather}
              style={{ height: 50, width: 200, color: 'grey' }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ weather: itemValue })
              }
            >
              <Picker.Item label="Weather Condition" />
              <Picker.Item label="Rain" value="Rain" />
              <Picker.Item label="Fog" value="Fog" />
              <Picker.Item label="Heat" value="Heat" />
            </Picker>
          </View>
          <View style={styles.textInput}>
            <TextInput placeholder="Road Surface" />
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
                this.props.navigation.navigate('VehicleIncident');
              }}
            />
            <Button
              title="Next"
              onPress={() => {
                this.props.navigation.navigate('VehicleDamages');
              }}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default SiteOfIncident;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  map: {
    width: Dimensions.get('window').width - 50,
    height: Dimensions.get('window').height / 3
  },
  textInput: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginHorizontal: 20
  }
});
