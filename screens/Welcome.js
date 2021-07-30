import React from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faArrowRight,
  faCarAlt,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window').width;
const Welcome = (props) => {
  return (
    <View style={[styles.Container, { backgroundColor: '#fff' }]}>
      <View style={styles.TopContainer}>
        <Image
          source={require('../assets/images/welcome.png')}
          style={{ height: null, width: null, flex: 1 }}
          resizeMode="cover"
        />
        <View style={styles.Logo}>
          <Image
            source={require('../assets/images/icon.png')}
            style={{ height: null, width: null, flex: 1 }}
          />
        </View>
      </View>
      <View
        style={{
          justifyContent: 'center',
          flex: 0.65
        }}
      >
        <ScrollView
          keyboardShouldPersistTaps="always"
          centerContent={true}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              flexDirection: 'row',

              justifyContent: 'center'
            }}
          >
            <View
              style={{
                height: 30,
                width: 30,
                transform: [{ rotate: '320deg' }]
              }}
            >
              <Image
                source={require('../assets/images/waving-hand.png')}
                style={{ height: null, width: null, flex: 1 }}
              />
            </View>
            <View style={{ paddingLeft: 15 }}>
              <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
                Welcome to FinSure
              </Text>
              <Text style={{ fontSize: 20 }}>
                Secure your future. Digitally!
              </Text>
            </View>
          </View>

          <View
            style={{
              marginVertical: 30,
              paddingHorizontal: 20,
              marginHorizontal: 20
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <FontAwesomeIcon icon={faCheckCircle} size={25} color="#1AC29A" />
              <View style={{ paddingLeft: 15 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                  Get easy Insurance
                </Text>
                <Text style={{ fontSize: 16, paddingTop: 5 }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod.
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', paddingVertical: 20 }}>
              <FontAwesomeIcon icon={faCheckCircle} size={25} color="#1AC29A" />
              <View style={{ paddingLeft: 15 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                  Keep track of Policies
                </Text>
                <Text style={{ fontSize: 16, paddingTop: 5 }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod.
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <FontAwesomeIcon icon={faCheckCircle} size={25} color="#1AC29A" />
              <View style={{ paddingLeft: 15 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                  Make Claims
                </Text>
                <Text style={{ fontSize: 16, paddingTop: 5 }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod.
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => props.navigation.navigate('SignIn')}
          >
            <Text style={{ fontSize: 20, color: '#fff', paddingRight: 15 }}>
              Let's Start
            </Text>
            <FontAwesomeIcon icon={faArrowRight} size={18} color="#fff" />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  Container: {
    flex: 1
  },
  TopContainer: {
    flex: 0.33,
    width: width,
    marginBottom: 30
  },
  Logo: {
    width: 100,
    height: 100,
    marginTop: -65,
    backgroundColor: '#CDD8E5',
    borderRadius: 15,
    padding: 10,
    alignSelf: 'center'
  },
  btn: {
    backgroundColor: '#1AC29A',
    marginHorizontal: 40,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  }
});
