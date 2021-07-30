import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TextInput
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faCar,
  faUserCircle,
  faArrowLeft,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { Easing } from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');
var unique;
const {
  Value,
  event,
  block,
  cond,
  eq,
  set,
  Clock,
  startClock,
  stopClock,
  debug,
  timing,
  clockRunning,
  interpolate,
  Extrapolate,
  concat
} = Animated;
function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0)
  };

  const config = {
    duration: 500,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease)
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock)
    ]),
    timing(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position
  ]);
}
class DriversList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Contact: [],
      selectedModel: '',
      selectedVehicle: [],
      showModel: []
    };
    this.buttonOpacity = new Value(1);

    this.onStateChange = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 1, 0))
            )
          ])
      }
    ]);

    this.onCloseState = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 0, 1))
            )
          ])
      }
    ]);

    this.buttonY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [100, 0],
      extrapolate: Extrapolate.CLAMP
    });

    this.bgY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [-height / 3, 0],
      extrapolate: Extrapolate.CLAMP
    });
    this.textInputZindex = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, -1],
      extrapolate: Extrapolate.CLAMP
    });
    this.textInputY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [0, 100],
      extrapolate: Extrapolate.CLAMP
    });
    this.texInputOpacity = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP
    });
    this.rotateCross = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [180, 360],
      extrapolate: Extrapolate.CLAMP
    });
  }
  componentDidMount = async () => {
    try {
      const value = await AsyncStorage.getItem('@Contact');
      console.log('value ', JSON.parse(value));
      if (value !== null) {
        this.setState({ Contact: JSON.parse(value) }, () => {
          const unique = [
            ...new Set(this.state.Contact.map((obj) => obj.ModelName))
          ];
          this.setState({ showModel: unique });
        });
      }
    } catch (e) {
      console.log('Error ', e);
    }
  };

  AddDriverDetails = async () => {
    // await AsyncStorage.removeItem('@Contact');
    this.props.navigation.navigate('InsuranceCoverage');
  };

  render() {
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
        <Text style={{ padding: 15, fontSize: 20, textAlign: 'center' }}>
          Any additional drivers on your insurance?
        </Text>

        <View
          style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 15 }}
        >
          <ScrollView
            keyboardShouldPersistTaps="always"
            centerContent={true}
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
            showsVerticalScrollIndicator={false}
          >
            <Text style={{ fontSize: 18, paddingLeft: 15 }}>
              Current drivers
            </Text>
            {this.state.Contact &&
              this.state.Contact.map((data, i) => {
                console.log('data.CustomerProperty ', data);
                return (
                  <View key={i} style={styles.driverDetails}>
                    <Text style={[styles.textStyle, { color: '#fff' }]}>
                      Marvin McKinney
                    </Text>

                    {/* {data.CustomerProperty &&
                      data.CustomerProperty.map((car, i) => {
                        console.log('car ', car);
                        return (
                          <View key={i} style={{ marginBottom: 10 }}>
                            <Text style={styles.textStyle}>
                              {car.Make}, {car.ModelName}(
                              {car.MakeYear})
                            </Text>
                            
                          </View>
                        );
                      })
                    } */}
                  </View>
                );
              })}
            <View
              style={{
                marginVertical: 30,
                justifyContent: 'center'
              }}
            >
              <TouchableOpacity
                style={styles.addAnotherVehicle}
                onPress={() => {
                  this.props.navigation.navigate('DriverDetails');
                }}
              >
                <FontAwesomeIcon icon={faUserCircle} size={25} color={'#fff'} />
                <Text style={{ paddingLeft: 10, color: '#fff', fontSize: 20 }}>
                  Add Another Driver
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addAnotherVehicle}
                onPress={() => {
                  this.props.navigation.navigate('CarDetails');
                }}
              >
                <FontAwesomeIcon icon={faCar} size={25} color={'#fff'} />
                <Text style={{ paddingLeft: 10, color: '#fff', fontSize: 20 }}>
                  Add Another Vehicle
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          {/* <TouchableOpacity
            style={styles.addAnotherDriver}
            onPress={() => {
              props.navigation.navigate('DriverDetails');
            }}
          >
            <FontAwesomeIcon icon={faPlusCircle} size={25} color={'#fff'} />
            <Text style={{ paddingLeft: 10, color: '#fff', fontSize: 20 }}>
              Add another Driver
            </Text>
          </TouchableOpacity> */}

          {/* <TapGestureHandler onHandlerStateChange={this.onStateChange}>
            <Animated.View
              style={{
                ...styles.addAnotherDriver,
                opacity: this.buttonOpacity,
                transform: [{ translateY: this.buttonY }]
              }}
            >
              <FontAwesomeIcon icon={faUserCircle} size={25} color={'#fff'} />
              <Text style={{ paddingLeft: 10, color: '#fff', fontSize: 20 }}>
                Add another Driver
              </Text>
            </Animated.View>
          </TapGestureHandler> */}
          <Animated.View
            style={{
              zIndex: this.textInputZindex,
              opacity: this.texInputOpacity,
              transform: [{ translateY: this.textInputY }],
              height: height / 3,
              ...StyleSheet.absoluteFill,
              top: null,

              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 15,
              backgroundColor: '#fff'
            }}
          >
            <View style={{ backgroundColor: '#fff', padding: 20 }}>
              <TapGestureHandler onHandlerStateChange={this.onCloseState}>
                <Animated.View style={styles.closeButton}>
                  <Animated.Text
                    style={{
                      fontSize: 15,
                      color: 'tomato',
                      fontWeight: 'bold',
                      transform: [{ rotate: concat(this.rotateCross, 'deg') }]
                    }}
                  >
                    X
                  </Animated.Text>
                </Animated.View>
              </TapGestureHandler>

              <ScrollView
                keyboardShouldPersistTaps="always"
                centerContent={true}
                contentContainerStyle={{
                  flexGrow: 1,
                  justifyContent: 'center'
                }}
                showsVerticalScrollIndicator={false}
              >
                <Text style={{ paddingVertical: 15, fontSize: 18 }}>
                  Select a model
                </Text>
                {this.state.Contact &&
                  this.state.Contact.map((data, i) => {
                    return (
                      <View key={i} style={{ flex: 1 }}>
                        {data.CustomerProperty &&
                          data.CustomerProperty.map((car, i) => {
                            return (
                              <TouchableOpacity
                                key={i}
                                style={{ marginBottom: 10 }}
                                onPress={() => {
                                  this.setState({
                                    selectedModel: car.ModelName,
                                    selectedVehicle: [
                                      ...this.state.selectedVehicle,
                                      car
                                    ]
                                  });
                                }}
                              >
                                <Text
                                  style={
                                    this.state.selectedModel === car.ModelName
                                      ? [styles.textStyle, { color: '#00a3f5' }]
                                      : [styles.textStyle, { color: 'black' }]
                                  }
                                >
                                  Vehicle Model: {car.ModelName}
                                </Text>
                              </TouchableOpacity>
                            );
                          })}
                      </View>
                    );
                  })}
              </ScrollView>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('DriverDetails', {
                    CustomerProperty: this.state.selectedVehicle
                  })
                }
              >
                <Animated.View
                  style={{
                    ...styles.button
                  }}
                >
                  <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                    Continue
                  </Text>
                </Animated.View>
              </TouchableOpacity>
            </View>
          </Animated.View>
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
              this.props.navigation.navigate('PreviousClaims');
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
              7<Text style={{ fontWeight: 'normal' }}>/10</Text>
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

export default DriversList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  addAnotherDriver: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'tomato',
    padding: 15,
    borderRadius: 15
  },
  textStyle: {
    fontSize: 18,
    color: '#1AC29A'
  },
  driverDetails: {
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
    backgroundColor: '#394B63'
  },
  button: {
    backgroundColor: 'white',
    height: 70,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  addAnotherVehicle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#518EF8',
    padding: 15,
    marginVertical: 5,
    borderRadius: 5
  },
  closeButton: {
    height: 40,
    width: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -20,
    left: width / 2 - 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  textInput: {
    height: 50,
    borderBottomWidth: 0.5,

    marginHorizontal: 20,
    paddingLeft: 10,
    marginVertical: 5,
    borderColor: 'rgba(0,0,0,0.2)'
  },
  footerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  }
});
