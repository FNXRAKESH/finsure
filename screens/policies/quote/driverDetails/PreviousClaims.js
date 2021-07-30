import React, { useState, Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  Text,
  TouchableOpacity, Dimensions
} from 'react-native';
import CarCrash from './svgImages/CarCrash';
import DrivingLicense from './svgImages/DrivingLicense';
import Insurance from './svgImages/Insurance';
import Intoxicated from './svgImages/Intoxicated';
import Officer from './svgImages/Officer';
import Racing from './svgImages/Racing';
import Tachometer from './svgImages/Tachometer';
import TrafficSignal from './svgImages/TrafficSignal';
import Violation from './svgImages/Violation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faCheck,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons';

class PreviousClaims extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    pastDrivingDetails: [],
    Contact: [],
    Accident__c: 0,
    Failed_To_Stop_Yield__c: 0,
    Passing_violation__c: 0,
    Speeding_Ticket__c: 0,
    Other_moving_violation_ticket__c: 0,
    Major_violation_reckless_driving_racing__c: 0,
    Driving_without_license__c: 0,
    Driving_without_Insurance__c: 0,
    Driving_under_the_infulance__c: 0
  };
  AddDriverDetails = () => {
    this.setState(
      {
        pastDrivingDetails: [
          ...this.state.pastDrivingDetails,
          {
            Accident__c: this.state.Accident__c,
            Failed_To_Stop_Yield__c: this.state.Failed_To_Stop_Yield__c,
            Passing_violation__c: this.state.Passing_violation__c,
            Speeding_Ticket__c: this.state.Speeding_Ticket__c,
            Other_moving_violation_ticket__c: this.state
              .Other_moving_violation_ticket__c,
            Major_violation_reckless_driving_racing__c: this.state
              .Major_violation_reckless_driving_racing__c,
            Driving_without_license__c: this.state.Driving_without_license__c,
            Driving_without_Insurance__c: this.state
              .Driving_without_Insurance__c,
            Driving_under_the_infulance__c: this.state
              .Driving_under_the_infulance__c
          }
        ]
      },
      () => {
        // AsyncStorage.setItem('@pastDrivingDetails', JSON.stringify(this.state.pastDrivingDetails))
        // this.props.navigation.navigate('DriversList');
        this.setState(
          {
            Contact: [
              ...this.state.Contact,
              {
                ...this.props.route.params,
                pastDrivingDetails: this.state.pastDrivingDetails
              }
            ]
          },
          () => {
            console.log('before setItem ', this.state.Contact);
            AsyncStorage.setItem(
              '@Contact',
              JSON.stringify(this.state.Contact)
            );
            this.props.navigation.navigate('DriversList');
          }
        );
      }
    );
  };
  componentDidMount = async () => {
    console.log(
      "AsyncStorage.getItem('@Contact') ",
      AsyncStorage.getItem('@Contact')
    );
    try {
      const value = await AsyncStorage.getItem('@Contact');
      console.log(JSON.parse(value));
      if (value !== null) {
        this.setState({ Contact: JSON.parse(value) });
      }
    } catch (e) {
      console.log('Error ', e);
    }
  };
  render() {
    console.log('Previous Claim ', this.props.route.params);
    return (
      <View style={[styles.container, { backgroundColor: '#fff' }]}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 30,
            paddingHorizontal: 15
          }}
          onPress={() => {
            props.navigation.navigate('InsuranceType');
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} size={16} color={'#000'} />
          <Text style={{ fontSize: 22, paddingLeft: 15, color: '#000' }}>
            Insurance Details
          </Text>
        </TouchableOpacity>

        <ScrollView
          keyboardShouldPersistTaps="always"
          centerContent={true}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ paddingHorizontal: 15 }}>
            <Text style={{ fontSize: 20, padding: 15, textAlign: 'center' }}>
              Any accidents and insurance claims in last 3 years?
            </Text>
            <Text
              style={{
                color: 'grey',
                fontSize: 16,
                textAlign: 'center',
                paddingHorizontal: 25,
              }}
            >
              Accurate information will help provide better quote
            </Text>
            <View style={{paddingTop:20}}>
              <View style={styles.cases}>
                <CarCrash width={40} height={40} />
                <Text style={styles.caseTitle}>Accident</Text>
                <TouchableOpacity
                  style={styles.count}
                  onPress={() => {
                    this.state.Accident__c >= 1
                      ? this.setState({
                          Accident__c: this.state.Accident__c - 1
                        })
                      : null;
                  }}
                >
                  <Text style={{ color: '#63AFE8', fontWeight: 'bold' }}>
                    -
                  </Text>
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold' }}>
                  {this.state.Accident__c}
                </Text>

                <TouchableOpacity
                  style={styles.count}
                  onPress={() => {
                    this.setState({ Accident__c: this.state.Accident__c + 1 });
                  }}
                >
                  <Text style={{ color: '#63AFE8', fontWeight: 'bold' }}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.cases}>
                <TrafficSignal width={40} height={40} />
                <Text style={styles.caseTitle}>Failed to stop / yield</Text>
                <TouchableOpacity
                  style={styles.count}
                  onPress={() => {
                    this.state.Failed_To_Stop_Yield__c >= 1
                      ? this.setState({
                          Failed_To_Stop_Yield__c:
                            this.state.Failed_To_Stop_Yield__c - 1
                        })
                      : null;
                  }}
                >
                  <Text style={{ color: '#63AFE8', fontWeight: 'bold' }}>
                    -
                  </Text>
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold' }}>
                  {this.state.Failed_To_Stop_Yield__c}
                </Text>

                <TouchableOpacity
                  style={styles.count}
                  onPress={() => {
                    this.setState({
                      Failed_To_Stop_Yield__c:
                        this.state.Failed_To_Stop_Yield__c + 1
                    });
                  }}
                >
                  <Text style={{ color: '#63AFE8', fontWeight: 'bold' }}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.cases}>
                <Tachometer width={40} height={40} />
                <Text style={styles.caseTitle}>Speeding ticket</Text>
                <TouchableOpacity
                  style={styles.count}
                  onPress={() => {
                    this.state.Speeding_Ticket__c >= 1
                      ? this.setState({
                          Speeding_Ticket__c: this.state.Speeding_Ticket__c - 1
                        })
                      : null;
                  }}
                >
                  <Text style={{ color: '#63AFE8', fontWeight: 'bold' }}>
                    -
                  </Text>
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold' }}>
                  {this.state.Speeding_Ticket__c}
                </Text>

                <TouchableOpacity
                  style={styles.count}
                  onPress={() => {
                    this.setState({
                      Speeding_Ticket__c: this.state.Speeding_Ticket__c + 1
                    });
                  }}
                >
                  <Text style={{ color: '#63AFE8', fontWeight: 'bold' }}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.cases}>
                <Intoxicated width={40} height={40} />
                <Text style={styles.caseTitle}>
                  Driving under the influence / while Intoxicated
                </Text>
                <TouchableOpacity
                  style={styles.count}
                  onPress={() => {
                    this.state.Driving_under_the_infulance__c >= 1
                      ? this.setState({
                          Driving_under_the_infulance__c:
                            this.state.Driving_under_the_infulance__c - 1
                        })
                      : null;
                  }}
                >
                  <Text style={{ color: '#63AFE8', fontWeight: 'bold' }}>
                    -
                  </Text>
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold' }}>
                  {this.state.Driving_under_the_infulance__c}
                </Text>

                <TouchableOpacity
                  style={styles.count}
                  onPress={() => {
                    this.setState({
                      Driving_under_the_infulance__c:
                        this.state.Driving_under_the_infulance__c + 1
                    });
                  }}
                >
                  <Text style={{ color: '#63AFE8', fontWeight: 'bold' }}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.cases}>
                <DrivingLicense width={40} height={40} />
                <Text style={styles.caseTitle}>
                  Driving without license / suspended / revoked license
                </Text>

                <TouchableOpacity
                  style={styles.count}
                  onPress={() => {
                    this.state.Driving_without_license__c >= 1
                      ? this.setState({
                          Driving_without_license__c:
                            this.state.Driving_without_license__c - 1
                        })
                      : null;
                  }}
                >
                  <Text style={{ color: '#63AFE8', fontWeight: 'bold' }}>
                    -
                  </Text>
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold' }}>
                  {this.state.Driving_without_license__c}
                </Text>
                <TouchableOpacity
                  style={styles.count}
                  onPress={() => {
                    this.setState({
                      Driving_without_license__c:
                        this.state.Driving_without_license__c + 1
                    });
                  }}
                >
                  <Text style={{ color: '#63AFE8', fontWeight: 'bold' }}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.cases}>
                <Racing width={40} height={40} />
                <Text style={styles.caseTitle}>
                  Major violation (reckless driving, racing, etc.)
                </Text>

                <TouchableOpacity
                  style={styles.count}
                  onPress={() => {
                    this.state.Major_violation_reckless_driving_racing__c >= 1
                      ? this.setState({
                          Major_violation_reckless_driving_racing__c:
                            this.state
                              .Major_violation_reckless_driving_racing__c - 1
                        })
                      : null;
                  }}
                >
                  <Text style={{ color: '#63AFE8', fontWeight: 'bold' }}>
                    -
                  </Text>
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold' }}>
                  {this.state.Major_violation_reckless_driving_racing__c}
                </Text>
                <TouchableOpacity
                  style={styles.count}
                  onPress={() => {
                    this.setState({
                      Major_violation_reckless_driving_racing__c:
                        this.state.Major_violation_reckless_driving_racing__c +
                        1
                    });
                  }}
                >
                  <Text style={{ color: '#63AFE8', fontWeight: 'bold' }}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.cases}>
                <Insurance width={40} height={40} />
                <Text style={styles.caseTitle}>Driving without Insurance</Text>

                <TouchableOpacity
                  style={styles.count}
                  onPress={() => {
                    this.state.Driving_without_Insurance__c >= 1
                      ? this.setState({
                          Driving_without_Insurance__c:
                            this.state.Driving_without_Insurance__c - 1
                        })
                      : null;
                  }}
                >
                  <Text style={{ color: '#63AFE8', fontWeight: 'bold' }}>
                    -
                  </Text>
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold' }}>
                  {this.state.Driving_without_Insurance__c}
                </Text>
                <TouchableOpacity
                  style={styles.count}
                  onPress={() => {
                    this.setState({
                      Driving_without_Insurance__c:
                        this.state.Driving_without_Insurance__c + 1
                    });
                  }}
                >
                  <Text style={{ color: '#63AFE8', fontWeight: 'bold' }}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.cases}>
                <Violation width={40} height={40} />
                <Text style={styles.caseTitle}>Passing violation</Text>

                <TouchableOpacity
                  style={styles.count}
                  onPress={() => {
                    this.state.Passing_violation__c >= 1
                      ? this.setState({
                          Passing_violation__c:
                            this.state.Passing_violation__c - 1
                        })
                      : null;
                  }}
                >
                  <Text style={{ color: '#63AFE8', fontWeight: 'bold' }}>
                    -
                  </Text>
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold' }}>
                  {this.state.Passing_violation__c}
                </Text>
                <TouchableOpacity
                  style={styles.count}
                  onPress={() => {
                    this.setState({
                      Passing_violation__c: this.state.Passing_violation__c + 1
                    });
                  }}
                >
                  <Text style={{ color: '#63AFE8', fontWeight: 'bold' }}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.cases}>
                <Officer width={40} height={40} />
                <Text style={styles.caseTitle}>
                  Other moving violation / ticket
                </Text>

                <TouchableOpacity
                  style={styles.count}
                  onPress={() => {
                    this.state.Other_moving_violation_ticket__c >= 1
                      ? this.setState({
                          Other_moving_violation_ticket__c:
                            this.state.Other_moving_violation_ticket__c - 1
                        })
                      : null;
                  }}
                >
                  <Text style={{ color: '#63AFE8', fontWeight: 'bold' }}>
                    -
                  </Text>
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold' }}>
                  {this.state.Other_moving_violation_ticket__c}
                </Text>
                <TouchableOpacity
                  style={styles.count}
                  onPress={() => {
                    this.setState({
                      Other_moving_violation_ticket__c:
                        this.state.Other_moving_violation_ticket__c + 1
                    });
                  }}
                >
                  <Text style={{ color: '#63AFE8', fontWeight: 'bold' }}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            </View>
          </ScrollView>
         
        <View
          style={{
            flexDirection: 'row',
            width: Dimensions.get('window').width,
            backgroundColor: '#1AC29A'
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('CurrentInsurance');
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
              6<Text style={{ fontWeight: 'normal' }}>/10</Text>
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.AddDriverDetails();
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

export default PreviousClaims;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  count: {
    borderColor: '#518EF8',
    borderRadius: 20,
    borderWidth: 1,
    padding: 5,
    margin: 10,
    width: 30,
    alignItems: 'center'
  },
  cases: {
    borderColor: 'lightgrey',
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10
  },
  caseTitle: {
    flex: 1,
    paddingLeft: 15,
    fontSize: 15
  },
  footerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  }
});
