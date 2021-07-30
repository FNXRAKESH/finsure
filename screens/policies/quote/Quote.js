import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  Animated,
  TouchableOpacity,
  Button,
  ScrollView
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

var Bearer;
const Quote = (props) => {
  Bearer = 'Bearer ' + props.route.params.accessToken;
  const [insuranceType, setInsuranceType] = useState([]);
  useEffect(() => {
    getProducts();
    AsyncStorage.removeItem('@Contact');
  }, []);
  const getProducts = () => {
    fetch(
      `https://ackofinaldemo-dev-ed.my.salesforce.com/services/data/v50.0/query/?q=Select+Id,Family,Name+from+Product2`,
      {
        method: 'GET',
        headers: {
          Authorization: Bearer,
          'Content-Type': 'application/json'
        }
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.records);
        setInsuranceType(data.records);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          // position: 'absolute',
          // top: 50,
          // left: 20,
          // zIndex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 15,
          paddingVertical: 30
        }}
        onPress={() => props.navigation.navigate('MainScreen')}
      >
        <FontAwesomeIcon icon={faArrowLeft} size={20} color={'#000'} />
        <Text style={{ fontSize: 20, paddingLeft: 20 }}>Get a Quote</Text>
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        {insuranceType &&
          insuranceType.map((item, i) => {
            return (
              <TouchableOpacity
                key={i}
                style={{ padding: 15 }}
                onPress={() => {
                  item.Name === 'Auto'
                    ? props.navigation.navigate('CarDetails', { id: item.Id })
                    : props.navigation.navigate('CustomerForm');
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#023E8A',
                    padding: 15,
                    borderRadius: 15
                  }}
                >
                  {item.Name === 'Auto' ? (
                    <View style={{ height: 80, width: 80 }}>
                      <Image
                        source={require('../../../assets/images/autoInsurance.png')}
                        style={{ height: null, width: null, flex: 1 }}
                        resizeMode="contain"
                      />
                    </View>
                  ) : item.Name === 'Home' ? (
                  <View style={{ height: 80, width: 80 }}>
                    <Image
                      source={require('../../../assets/images/propertyInsurance.png')}
                      style={{ height: null, width: null, flex: 1 }}
                      resizeMode="contain"
                    />
                  </View>
                  ) : (
                    <View style={{ height: 80, width: 80 }}>
                      <Image
                        source={require('../../../assets/images/termInsurance.png')}
                        style={{ height: null, width: null, flex: 1 }}
                        resizeMode="contain"
                      />
                    </View>
                  )}
               
                  <View style={{ flex: 1, paddingLeft: 15 }}>
                    <Text
                      style={{
                        fontSize: 22,
                        color: '#fff',
                        paddingBottom: 10
                      }}
                    >
                      {item.Name}
                    </Text>
                    <Text style={{ fontSize: 18, color: '#1AC29A' }}>
                      Starting from $1200
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        {/* <TouchableOpacity
          style={{ padding: 15 }}
          onPress={() => {
            props.navigation.navigate('CustomerForm');
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#023E8A',
              padding: 15,
              borderRadius: 15
            }}
          >
            <View style={{ height: 80, width: 80 }}>
              <Image
                source={require('../../../assets/images/termInsurance.png')}
                style={{ height: null, width: null, flex: 1 }}
                resizeMode="contain"
              />
            </View>
            <View style={{ flex: 1, paddingLeft: 15 }}>
              <Text
                style={{
                  fontSize: 22,
                  color: '#fff',
                  paddingBottom: 10
                }}
              >
                Term Insurance
              </Text>
              <Text style={{ fontSize: 18, color: '#1AC29A' }}>
                Starting from $1200
              </Text>
            </View>
          </View>
        </TouchableOpacity> */}
      </ScrollView>
    </View>
  );
};

export default Quote;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  quoteBtn: {
    // backgroundColor: "#00a3f5",

    paddingTop: 5,
    // marginVertical: 10,
    borderRadius: 15
  }
});
