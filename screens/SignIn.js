import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Keyboard,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faEnvelope,
  faLock
} from '@fortawesome/free-solid-svg-icons';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state'
]);

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '', token: '' };
  }

  handleSubmit = () => {
    const data = `username=rakeshrajan%40fxdev.com&password=Rocman@911&client_id=3MVG9Nk1FpUrSQHewyoaXh0sJn.2y7N0KCYh6XDI4rnA4XahMX3M4rK6QJBggL.MJeF22x1DG8.8FS13Yr_iy&client_secret=35AC98CEEC9EC11564812420C616DEF09DC4FCB5F8FAC4F733D820B5AD23C23F&grant_type=password`;

    fetch('https://login.salesforce.com/services/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: data
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.access_token !== undefined) {
          console.log('Success:', data);
          this.setState({ token: data.access_token }, () => {
            this.props.route.params.checkLogin(this.state.token, true);
          });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  render() {
    return (
      <View
        style={[styles.container, { backgroundColor: '#fff' }]}
        onPress={Keyboard.dismiss}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',

            paddingVertical: 30,
            paddingHorizontal: 20
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Welcome');
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} size={18} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('SignUp');
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: '#518EF8'
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          keyboardShouldPersistTaps="always"
          centerContent={true}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center'
          }}
          showsVerticalScrollIndicator={false}
        >
          <Text
            style={{
              textAlign: 'center',
              fontSize: 30,
              fontWeight: 'bold'
            }}
          >
            Sign in to your account
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              paddingTop: 10
            }}
          >
            <Text style={{ fontSize: 18 }}>New to Finsure?</Text>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('SignUp');
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: '#518EF8',
                  paddingLeft: 10,
                  textDecorationLine: 'underline'
                }}
              >
                Create an Account
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginVertical: 20 }}>
            <View style={styles.InputContainer}>
              <FontAwesomeIcon icon={faEnvelope} size={16} />
              <TextInput
                keyboardType="email-address"
                textContentType="emailAddress"
                placeholder="Email address"
                style={styles.textInput}
                placeholderTextColor="#0A213E"
                value="test@finsure.com"
              />
            </View>
            <View style={styles.InputContainer}>
              <FontAwesomeIcon icon={faLock} size={16} />
              <TextInput
                secureTextEntry={true}
                placeholder="Password"
                style={styles.textInput}
                placeholderTextColor="#0A213E"
                value="test"
              />
            </View>

            <TouchableOpacity
              onPress={() => this.handleSubmit()}
              style={{
                ...styles.button
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#fff'
                }}
              >
                Sign In
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={{
                  fontSize: 18,
                  textDecorationLine: 'underline',
                  textAlign: 'center'
                }}
              >
                Forgot password?
              </Text>
            </TouchableOpacity>
            <Text style={{ textAlign: 'center', paddingVertical: 20 }}>OR</Text>

            {/* <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Quote')}
              style={{
                ...styles.socialButton
              }}
            >
             
              <Text
                style={{
                  fontSize: 20,
                  paddingLeft: 15,
                  color: '#F14336'
                }}
              >
                quote
              </Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => this.handleSubmit()}
              style={{
                ...styles.socialButton
              }}
            >
              <View style={{ height: 20, width: 20 }}>
                <Image
                  source={require('../assets/images/search.png')}
                  style={{ height: null, width: null, flex: 1 }}
                  resizeMode="contain"
                />
              </View>
              <Text
                style={{
                  fontSize: 20,
                  paddingLeft: 15,
                  color: '#F14336'
                }}
              >
                Login with Google
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.handleSubmit()}
              style={{
                ...styles.socialButton
              }}
            >
              <View style={{ height: 20, width: 20 }}>
                <Image
                  source={require('../assets/images/facebook.png')}
                  style={{ height: null, width: null, flex: 1 }}
                  resizeMode="contain"
                />
              </View>
              <Text
                style={{
                  fontSize: 20,
                  paddingLeft: 10,
                  color: '#4267B2'
                }}
              >
                Login with Facebook
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default SignIn;
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    backgroundColor: '#1AC29A',
    margin: 20,
    padding: 15,
    alignItems: 'center',
    borderRadius: 5
  },
  InputContainer: {
    backgroundColor: '#F8F8F8',
    borderWidth: 0,
    borderRadius: 5,
    marginHorizontal: 20,
    padding: 20,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  textInput: {
    fontSize: 18,
    paddingLeft: 15
  },
  socialButton: {
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    marginHorizontal: 20,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'center'
  }
});
