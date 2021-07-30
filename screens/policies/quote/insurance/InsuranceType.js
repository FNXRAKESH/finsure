import React, { useState, useEffect, Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Checkbox } from 'react-native-paper';

class InsuranceType extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    collision: '',
    comprehensive: '',
    CustomerProperty: [],
    checked: false,
    check: false
  };
  componentDidMount = async () => {
    try {
      const value = await AsyncStorage.getItem('@CustomerProperty');
      if (value !== null) {
        this.setState({ CustomerProperty: JSON.parse(value) }, () => {
          console.log('csst ', this.state.CustomerProperty);
        });
      }
    } catch (e) {
      console.log('Error ', e);
    }
  };
  AddInsuranceDetails = async () => {
    AsyncStorage.removeItem('@CustomerProperty');
    if (
      this.state.CustomerProperty.some(
        (CustomerProperty) =>
          CustomerProperty.ModelName === this.props.route.params.ModelName
      )
    ) {
      this.props.navigation.navigate('DriverDetails', {
        CustomerProperty: this.state.CustomerProperty
      });
    } else {
      this.setState(
        {
          CustomerProperty: [
            ...this.state.CustomerProperty,
            {
              ...this.props.route.params,
              Collision_Insurance__c: this.state.collision,
              Comprehensive_Insurance__c: this.state.comprehensive
            }
          ]
        },
        () => {
          this.props.navigation.navigate('DriverDetails', {
            CustomerProperty: this.state.CustomerProperty
          });
        }
      );
    }
  };
  AddVehicle = async () => {
    this.setState(
      {
        CustomerProperty: [
          ...this.state.CustomerProperty,
          {
            ...this.props.route.params,
            Collision_Insurance__c: this.state.collision,
            Comprehensive_Insurance__c: this.state.comprehensive
          }
        ]
      },
      () => {
        AsyncStorage.setItem(
          '@CustomerProperty',
          JSON.stringify(this.state.CustomerProperty)
        );
        this.props.navigation.navigate('CarDetails', {
          CustomerProperty: this.state.CustomerProperty
        });
      }
    );
  };
  render() {
    return (
      <View style={[styles.container, { backgroundColor: '#fff' }]}>
        <View style={{ flex: 1, paddingHorizontal: 20 }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 30
            }}
            onPress={() => {
              this.props.navigation.navigate('CarUsage');
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} size={16} color={'#000'} />
            <Text style={{ fontSize: 22, paddingLeft: 15, color: '#000' }}>
              Insurance Details
            </Text>
          </TouchableOpacity>

          <Text style={{ padding: 15, fontSize: 20 }}>
            What kind of coverage are you looking for?
          </Text>
          <TouchableWithoutFeedback
            onPress={() => {
              this.setState({ checked: !this.state.checked }, () => {
                if (this.state.checked) {
                  this.setState({ comprehensive: 'Add Comprehensive' });
                } else {
                  this.setState({ comprehensive: 'No Coverage' });
                }
              });
            }}
          >
            <View
              style={
                this.state.comprehensive === 'Add Comprehensive'
                  ? [styles.commuteView, { backgroundColor: '#518EF8' }]
                  : [styles.commuteView, { backgroundColor: '#f8f8f8' }]
              }
            >
              <Text
                style={
                  this.state.comprehensive === 'Add Comprehensive'
                    ? { color: '#fff', fontSize: 20, flex: 1 }
                    : { fontSize: 20, color: '#000', flex: 1 }
                }
              >
                Comprehensive
              </Text>
              <Checkbox
                status={this.state.checked ? 'checked' : 'unchecked'}
                color="#fff"
                onPress={() => {
                  this.setState({ checked: !this.state.checked }, () => {
                    if (this.state.checked) {
                      this.setState({ comprehensive: 'Add Comprehensive' });
                    } else {
                      this.setState({ comprehensive: 'No Coverage' });
                    }
                  });
                }}
              />
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => {
              this.setState({ check: !this.state.check }, () => {
                if (this.state.check) {
                  this.setState({ collision: 'Add Collision' });
                } else {
                  this.setState({ collision: 'No Coverage' });
                }
              });
            }}
          >
            <View
              style={
                this.state.collision === 'Add Collision'
                  ? [styles.commuteView, { backgroundColor: '#518EF8' }]
                  : [styles.commuteView, { backgroundColor: '#f8f8f8' }]
              }
            >
              <Text
                style={
                  this.state.collision === 'Add Collision'
                    ? { color: '#fff', fontSize: 20, flex: 1 }
                    : { fontSize: 20, color: '#000', flex: 1 }
                }
              >
                Collision
              </Text>
              <Checkbox
                status={this.state.check ? 'checked' : 'unchecked'}
                color="#fff"
                onPress={() => {
                  this.setState({ check: !this.state.check }, () => {
                    if (this.state.check) {
                      this.setState({ collision: 'Add Collision' });
                    } else {
                      this.setState({ collision: 'No Coverage' });
                    }
                  });
                }}
              />
            </View>
          </TouchableWithoutFeedback>
          
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: Dimensions.get('window').width,
            backgroundColor: '#1AC29A'
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('CarUsage');
            }}
            style={styles.footerButton}
          >
            <FontAwesomeIcon icon={faArrowLeft} size={18} color={'#fff'} />
            <Text style={{ color: '#fff', padding: 20, fontSize: 20 }}>
              Back
            </Text>
          </TouchableOpacity>
          <View
            style={{
              borderWidth: 0,
              borderColor: '#fff',
              justifyContent: 'center',
              alignSelf: 'center'
            }}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>
              3<Text style={{ fontWeight: 'normal' }}>/10</Text>
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.AddInsuranceDetails();
            }}
            style={styles.footerButton}
          >
            <Text style={{ color: '#fff', padding: 20, fontSize: 20 }}>
              Next
            </Text>
            <FontAwesomeIcon icon={faArrowRight} size={18} color={'#fff'} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default InsuranceType;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  addAnotherVehicle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'tomato',
    padding: 15,
    borderRadius: 15
  },
  commuteView: {
    padding: 15,
    borderRadius: 5,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  footerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  }
});
