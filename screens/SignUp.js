import React, { Component, useState } from 'react';
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

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '', token: '' };
  }
  render() {
    return (
      <View
        style={[styles.container, { backgroundColor: '#fff' }]}
        onPress={Keyboard.dismiss}
      >
        {/* <View style={{ ...StyleSheet.absoluteFill }}>
        <Image
          source={require('../assets/images/landing.png')}
          style={{ flex: 1, height: null, width: null }}
        />
      </View> */}
        <View style={{ flex: 0.2, justifyContent: 'center' }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('SignIn');
              }}
            >
              <FontAwesomeIcon icon={faArrowLeft} size={18} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('SignIn');
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: '#518EF8'
                }}
              >
                Log In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 0.8 }}>
          <ScrollView
            keyboardShouldPersistTaps="always"
            centerContent={true}
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
            showsVerticalScrollIndicator={false}
          >
            <Text
              style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold' }}
            >
              Create an Account
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                paddingTop: 10
              }}
            >
              <Text style={{ fontSize: 18 }}>Existing FinSure user?</Text>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('SignIn');
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
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 15 }}>
              <View style={styles.InputContainer}>
                <FontAwesomeIcon icon={faEnvelope} size={16} />
                <TextInput
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  placeholder="Email address"
                  style={styles.textInput}
                  placeholderTextColor="#0A213E"
                />
              </View>
              <View style={styles.InputContainer}>
                <FontAwesomeIcon icon={faLock} size={16} />
                <TextInput
                  secureTextEntry={true}
                  placeholder="Password"
                  style={styles.textInput}
                  placeholderTextColor="#0A213E"
                />
              </View>
              <View style={styles.InputContainer}>
                <FontAwesomeIcon icon={faLock} size={16} />
                <TextInput
                  secureTextEntry={true}
                  placeholder="Confirm Password"
                  style={styles.textInput}
                  placeholderTextColor="#0A213E"
                />
              </View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('AccountCreated')}
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
                  Sign Up
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
              <Text style={{ textAlign: 'center', paddingVertical: 20 }}>
                OR
              </Text>
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
      </View>
    );
  }
}

export default SignUp;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  button: {
    backgroundColor: '#1AC29A',
    margin: 20,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center'
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
