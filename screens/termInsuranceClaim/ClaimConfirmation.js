import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faCheck,
  faChevronDown,
  faMap
} from '@fortawesome/free-solid-svg-icons';

const ClaimConfirmation = (props) => {
  return (
    <View style={[styles.container, { backgroundColor: '#FAFAFA' }]}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 30,
          paddingHorizontal: 20
        }}
        onPress={() => {
          props.navigation.navigate('ServiceProviders');
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} size={16} color={'#000'} />
        <Text style={{ fontSize: 22, paddingLeft: 15, color: '#000' }}>
          Confirmation
        </Text>
      </TouchableOpacity>
      {/* <Image
          style={{ width: Dimensions.get("window").width, flex:1  }}
          source={require("../../assets/images/thankyou.jpg")}
          resizeMode="contain"
        /> */}

      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View
          style={{
            position: 'absolute',
            top: 30,
            width: Dimensions.get('window').width,
            height: 200,
            zIndex: -99
          }}
        >
          <Image
            source={require('../../assets/images/AccountCreated.png')}
            style={{ height: null, width: null, flex: 1 }}
            resizeMode="contain"
          />
        </View>
        <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center' }}>
          Claim Successful
        </Text>
        <Text style={{ textAlign: 'center', paddingTop: 10, fontSize: 18 }}>
          You can Check the status of the claim on
        </Text>

        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('MyClaims');
          }}
        >
          <Text style={{ color: '#1AC29A', fontSize: 18, textAlign: 'center' }}>
            "My Claims"
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ paddingHorizontal: 15 }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.navigation.navigate('MainScreen');
          }}
        >
          <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>
            Done
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ClaimConfirmation;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    marginVertical: 25,
    backgroundColor: '#1AC29A',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    justifyContent: 'center'
  }
});
