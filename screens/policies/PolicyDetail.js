import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  Button,
  TouchableHighlight
} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import moment from 'moment';
import { FloatingAction } from 'react-native-floating-action';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faDollarSign,
  faEdit,
  faArrowLeft,
  faSync,
  faRedoAlt,
  faPen
} from '@fortawesome/free-solid-svg-icons';
 


const PolicyDetail = (props) => {
  console.log(props.route.params.item);
  const item = props.route.params.item;
  const index = props.route.params.index;
  const actions = [
    {
      text: 'Renew',
      icon: <FontAwesomeIcon icon={faDollarSign} color={'#fff'} size={20} />,
      name: 'Renew',
      position: 1
    },
    {
      text: 'FNOLDetails',
      icon: <FontAwesomeIcon icon={faEdit} color={'#fff'} size={20} />,
      name: 'FNOLDetails',
      position: 2
    }
  ];
  return (
    <View style={[styles.container, { backgroundColor: '#fff' }]}>
      <View
        style={{
          backgroundColor: '#023E8A',
          height: 200,
          width: Dimensions.get('window').width
        }}
      >
        <View
          style={{
            position: 'absolute',
            right: 0,
            top: -50,
            height: 400,
            width: 400
          }}
        >
          <Image
            source={require('../../assets/images/HomeHeader.png')}
            style={{ height: null, width: null, flex: 1 }}
            resizeMode="contain"
          />
        </View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 30,
            paddingHorizontal: 20
          }}
          onPress={() => props.navigation.navigate('PolicyList')}
        >
          <FontAwesomeIcon icon={faArrowLeft} size={16} color={'#fff'} />
          <Text style={{ fontSize: 22, paddingLeft: 15, color: '#fff' }}>
            Policy Details
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: -50,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom:20
        }}
      >
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 20,
            padding: 15,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.5,
            shadowRadius: 0.5,

            elevation: 15
          }}
        >
          {item.PolicyType && item.PolicyType === 'Auto' ? (
            <SharedElement id={`${item.Id}.${index}`}>
              <Image
                source={require('../../assets/images/carInsuranceColor.png')}
                style={{
                  width: 80,
                  height: 80
                }}
                resizeMode="contain"
              />
            </SharedElement>
          ) : (
            <SharedElement id={`${item.Id}.${index}`}>
              <Image
                source={require('../../assets/images/homeInsuranceColor.png')}
                style={{
                  width: 80,
                  height: 80
                }}
                resizeMode="contain"
              />
            </SharedElement>
          )}
        </View>
        <View
          style={{
            flex: 0.9,
            flexDirection: 'row',
            justifyContent: 'flex-end'
          }}
        >
          <TouchableOpacity onPress={() =>  props.navigation.navigate("Renew")}
            style={{
              backgroundColor: '#fff',
              borderRadius: 40,
              padding: 15,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2
              },
              shadowOpacity: 0.5,
              shadowRadius: 0.5,
              elevation: 15
            }}
          >
            <FontAwesomeIcon icon={faRedoAlt} size={20} color={'#518EF8'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=>{props.navigation.navigate("FNOLDetails", {
              selectedPolicy: item.Id,
              accessToken: props.route.params.Bearer
            });}}
            style={{
              backgroundColor: '#fff',
              borderRadius: 40,
              padding: 15,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2
              },
              shadowOpacity: 0.5,
              shadowRadius: 0.5,
              elevation: 15,
              marginHorizontal: 20
            }}
          >
            <FontAwesomeIcon icon={faPen} size={20} color={'#518EF8'} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginVertical: 20,
            paddingHorizontal: 15
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View>
              {item.UniversalPolicyNumber === null ? (
                <SharedElement id={`policy.${item.Id}.${index}`}>
                  <Text style={{ fontSize: 23 }}>Null</Text>
                </SharedElement>
              ) : (
                <SharedElement id={`policy.${item.Id}.${index}`}>
                  <Text style={{ fontSize: 23 }}>
                    {item.UniversalPolicyNumber}
                  </Text>
                </SharedElement>
              )}
            </View>
            <View
              style={
                item.Status === 'Initial'
                  ? [styles.status, { backgroundColor: '#c1f7ea' }]
                  : [styles.status, { backgroundColor: '#f5dea2' }]
              }
            >
              {item.Status === null ? (
                <Text
                  style={
                    item.Status === 'Initial'
                      ? [styles.statusText, { color: '#1AC29A' }]
                      : [styles.statusText, { color: '#C2931A' }]
                  }
                >
                  Null
                </Text>
              ) : (
                <Text
                  style={
                    item.Status === 'Initial'
                      ? [styles.statusText, { color: '#1AC29A' }]
                      : [styles.statusText, { color: '#C2931A' }]
                  }
                >
                  {item.Status}
                </Text>
              )}
            </View>
          </View>
          {/* {item.PolicyType && item.PolicyType === 'Auto' ? (
              <Text style={styles.policyInfo}>
                {item.ModelName} {item.Make}
              </Text>
          ) : (
              <Text style={styles.policyInfo}>Property Name</Text>
          )} */}
          <View style={{ paddingVertical: 15 }}>
            <Text style={styles.policyInfoHeading}>Policy name:</Text>
            <Text style={styles.policyInfo}>{item.Name}</Text>
          </View>
          <View style={{ paddingVertical: 15 }}>
            <Text style={styles.policyInfoHeading}>
              Universal Policy number:
            </Text>
            <Text style={styles.policyInfo}>{item.UniversalPolicyNumber}</Text>
          </View>
          {item.PolicyType === null ? (
            <View style={{ paddingVertical: 15 }}>
              <Text style={styles.policyInfoHeading}>Policy Type</Text>
              <Text style={styles.policyInfo}>Property</Text>
            </View>
          ) : (
            <View style={{ paddingVertical: 15 }}>
              <Text style={styles.policyInfoHeading}>Policy Type</Text>
              <Text style={styles.policyInfo}>{item.PolicyType}</Text>
            </View>
          )}
          {item.EffectiveDate === null ? (
            <View style={{ paddingVertical: 15 }}>
              <Text style={styles.policyInfoHeading}>Start Date</Text>
              <Text style={styles.policyInfo}>Null</Text>
            </View>
          ) : (
            <View style={{ paddingVertical: 10 }}>
              <Text style={styles.policyInfoHeading}>Start Date</Text>
              <Text style={styles.policyInfo}>
                {moment(item.EffectiveDate).format('LL')}
              </Text>
            </View>
          )}
          {item.ExpirationDate === null ? (
            <View style={{ paddingVertical: 15 }}>
              <Text style={styles.policyInfoHeading}>End Date</Text>
              <Text style={styles.policyInfo}>Null</Text>
            </View>
          ) : (
            <View style={{ paddingVertical: 10 }}>
              <Text style={styles.policyInfoHeading}>End Date</Text>
              <Text style={styles.policyInfo}>
                {moment(item.ExpirationDate).format('LL')}
              </Text>
            </View>
          )}
          
        </View>
      </ScrollView>
      {/* <FloatingAction
        actions={actions}
        onPressItem={(name) => {
          props.navigation.navigate(`${name}`, {
            selectedPolicy: item.Id,
            accessToken: props.route.params.Bearer
          });
        }}
      /> */}
      {/* <TouchableOpacity
        style={{ position: "absolute", top: 20, left: 20 }}
        onPress={() => props.navigation.goBack()}
      >
        <FontAwesomeIcon icon={faTimes} color={"#000"} />
      </TouchableOpacity> */}
      {/* <FloatingAction
        actions={actions}
         
      /> */}
    </View>
  );
};

PolicyDetail.sharedElements = (route) => {
  const item = route.params.item;
  const index = route.params.index;
  return [
    { id: `${item.Id}.${index}`, animation: 'move' },
    { id: `policy.${item.Id}.${index}`, animation: 'fade' }
  ];
};

export default PolicyDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  policyInfo: {
    fontSize: 19,
    paddingVertical: 5
  },
  policyInfoHeading: {
    fontSize: 19,
    color: 'grey'
  },
  status: {
    marginHorizontal: 20,
    paddingHorizontal: 25,
    borderRadius: 20,
    backgroundColor: '#faa098',
    paddingVertical: 5
  },
  statusText: {
    color: '#FF786D',
    fontWeight: 'bold'
  }
});
