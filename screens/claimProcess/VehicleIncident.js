import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Switch,
  Button
} from 'react-native';
import * as Progress from 'react-native-progress';
import { Col, Row, Grid } from 'react-native-easy-grid';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from 'react-native-simple-radio-button';

var radio_props = [
  { label: 'Accident', value: 0 },
  { label: 'Flood', value: 1 },
  { label: 'Fire', value: 2 }
];

class VehicleIncident extends Component {
  constructor(props) {
    super(props);
  }
  state = { isEnabled: true };
  toggleSwitch = () => this.setState({ isEnabled: !this.state.isEnabled });
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
              progress={0.2}
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
            Tell us about the vehicle
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text style={{ paddingHorizontal: 10, color: 'grey' }}>
              I am the owner of the vehicle
            </Text>
            <Switch
              trackColor={{ false: 'red', true: 'green' }}
              thumbColor={this.state.isEnabled ? '#ffffff' : '#ffffff'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={this.toggleSwitch}
              value={this.state.isEnabled}
            />
          </View>
          <View style={styles.tableContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  paddingVertical: 10,
                  color: 'grey'
                }}
              >
                My Vehicles
              </Text>
              <Grid>
                <Row style={styles.tableHead}>
                  <Col>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
                      Name
                    </Text>
                  </Col>
                  <Col>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
                      Policy
                    </Text>
                  </Col>
                  <Col>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
                      Status
                    </Text>
                  </Col>
                  <Col>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
                      Premium
                    </Text>
                  </Col>
                </Row>
                <Row style={styles.tableContent}>
                  <Col>
                    <Text style={{ textAlign: 'center', color: 'grey' }}>
                      Mercedes X-3 HBS890
                    </Text>
                  </Col>
                  <Col>
                    <Text style={{ textAlign: 'center', color: 'grey' }}>
                      S0987
                    </Text>
                  </Col>
                  <Col>
                    <Text style={{ textAlign: 'center', color: 'grey' }}>
                      Active
                    </Text>
                  </Col>
                  <Col>
                    <Text style={{ textAlign: 'center', color: 'grey' }}>
                      Edit
                    </Text>
                  </Col>
                </Row>
                <Row style={styles.tableContent}>
                  <Col>
                    <Text style={{ textAlign: 'center', color: 'grey' }}>
                      Tesla S-3 HTU9870
                    </Text>
                  </Col>
                  <Col>
                    <Text style={{ textAlign: 'center', color: 'grey' }}>
                      S0987
                    </Text>
                  </Col>
                  <Col>
                    <Text style={{ textAlign: 'center', color: 'grey' }}>
                      Active
                    </Text>
                  </Col>
                  <Col>
                    <Text style={{ textAlign: 'center', color: 'grey' }}>
                      Edit
                    </Text>
                  </Col>
                </Row>
              </Grid>
              <View style={{ marginVertical: 20 }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginVertical: 15,
                    color: 'grey'
                  }}
                >
                  I was involved in
                </Text>
                <RadioForm
                  radio_props={radio_props}
                  initial={0}
                  animation={true}
                  onPress={(value) => {
                    this.setState({ value: value });
                  }}
                  buttonSize={10}
                  labelColor={'grey'}
                  labelStyle={{ fontSize: 18, color: 'grey' }}
                />
              </View>
            </ScrollView>
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
                this.props.navigation.navigate('PersonalDetails');
              }}
            />
            <Button
              title="Next"
              onPress={() => {
                this.props.navigation.navigate('SiteOfIncident');
              }}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default VehicleIncident;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tableHead: {
    borderWidth: 1,
    backgroundColor: 'lightgrey',
    paddingVertical: 10
  },
  tableContent: {
    borderWidth: 1,
    borderTopWidth: 0,
    alignItems: 'center'
  },
  tableContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 4
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,

    elevation: 8,
    margin: 20,

    padding: 20,
    backgroundColor: '#fff'
  }
});
