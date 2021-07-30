import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  StatusBar,
} from "react-native";
 
import Animated, { Easing } from "react-native-reanimated";
import {
  TapGestureHandler,
  State,
  TouchableOpacity,
} from "react-native-gesture-handler";
const { width, height } = Dimensions.get("window");

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
  concat,
} = Animated;

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: 500,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease),
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, debug("stop clock", stopClock(clock))),
    state.position,
  ]);
}
class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", token:"" };
    this.buttonOpacity = new Value(1);

    this.onStateChange = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 1, 0))
            ),
          ]),
      },
    ]);

    this.onCloseState = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 0, 1))
            ),
          ]),
      },
    ]);

    this.buttonY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [100, 0],
      extrapolate: Extrapolate.CLAMP,
    });

    this.bgY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [-height / 2, 0],
      extrapolate: Extrapolate.CLAMP,
    });
    this.textInputZindex = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, -1],
      extrapolate: Extrapolate.CLAMP,
    });
    this.textInputY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [0, 100],
      extrapolate: Extrapolate.CLAMP,
    });
    this.texInputOpacity = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP,
    });
    this.rotateCross = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [180, 360],
      extrapolate: Extrapolate.CLAMP,
    });
  }
  handleSubmit = () => {
    const data = `username=fxrelease%40fxinsurance.com&password=D0nk3y100&client_id=3MVG9Kip4IKAZQEUaAF9gJSlB42klZTOXw7V_dYGx_cqqO84hrZ85r_iNKAb3FF.1uXSKCnzpHp24I9E.eDPz&client_secret=CD86623F904961ACACFB50BC8A32E02ED6A14771FC6C5357F0465F4646E52B79&grant_type=password`;
 
     fetch("https://login.salesforce.com/services/oauth2/token", {
       method: "POST",
       headers: {
         "Content-Type": "application/x-www-form-urlencoded",
       },
       body: data
     })
       .then((response) => response.json())
       .then((data) => {
         if (data.access_token !== undefined) {
           console.log("Success:", data.access_token);
           this.setState({ token: data.access_token }, () => {
             this.props.route.params.checkLogin(this.state.token,true);
           });
           
         }
         
       })
       .catch((error) => {
         console.error("Error:", error);
       });
    
   }
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          justifyContent: 'flex-end'
        }}
      >
        <StatusBar hidden />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Animated.View
            style={{
              ...StyleSheet.absoluteFill,
              transform: [{ translateY: this.bgY }]
            }}
          >
            {/* <Image
              source={require('../assets/images/landing.png')}
              style={{ flex: 1, height: null, width: null }}
            /> */}
          </Animated.View>
        </TouchableWithoutFeedback>
        <View style={{ height: height / 3, justifyContent: 'center' }}>
          <TapGestureHandler onHandlerStateChange={this.onStateChange}>
            <Animated.View
              style={{
                ...styles.button,
                opacity: this.buttonOpacity,
                transform: [{ translateY: this.buttonY }]
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                GET STARTED
              </Text>
            </Animated.View>
          </TapGestureHandler>
          {/* <Animated.View
            style={{
              ...styles.button,
              backgroundColor: "#2E71DC",
              opacity: this.buttonOpacity,
              transform: [{ translateY: this.buttonY }],
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
              SIGN IN WITH FACEBOOK
            </Text>
          </Animated.View> */}
          <Animated.View
            style={{
              zIndex: this.textInputZindex,
              opacity: this.texInputOpacity,
              transform: [{ translateY: this.textInputY }],
              height: height / 2,
              ...StyleSheet.absoluteFill,
              top: null,
              justifyContent: 'center',
              backgroundColor: '#f7f8fc'
            }}
          >
            <TapGestureHandler onHandlerStateChange={this.onCloseState}>
              <Animated.View style={styles.closeButton}>
                <Animated.Text
                  style={{
                    fontSize: 15,
                    transform: [{ rotate: concat(this.rotateCross, 'deg') }]
                  }}
                >
                  X
                </Animated.Text>
              </Animated.View>
            </TapGestureHandler>
            <TextInput
              keyboardType="email-address"
              textContentType="emailAddress"
              placeholder="Email"
              style={styles.textInput}
              placeholderTextColor="black"
              value={this.state.username}
              onChangeText={(e) => this.setState({ username: e })}
            />
            <TextInput
              secureTextEntry={true}
              placeholder="Password"
              style={styles.textInput}
              placeholderTextColor="black"
              value={this.state.password}
              onChangeText={(e) => this.setState({ password: e })}
            />
            <TouchableOpacity onPress={() => this.handleSubmit()}>
              <Animated.View
                style={{
                  ...styles.button
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                  SIGN IN
                </Text>
              </Animated.View>
            </TouchableOpacity>
            <View
              style={{
                marginVertical: 5,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('SignUp', { name: 'SignUp' })
                }
              >
                <Text>New to FinSure? Create an Account</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </View>
    );
  }
}
export default Landing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "white",
    height: 70,
    marginHorizontal: 20,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  closeButton: {
    height: 40,
    width: 40,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -20,
    left: width / 2 - 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  textInput: {
    height: 60,
    borderWidth: 0.5,
    marginHorizontal: 20,
    paddingLeft: 10,
    marginVertical: 5,
    borderColor: "rgba(0,0,0,0.2)",
    borderRadius: 15,
    backgroundColor:"#fff"
  },
});
