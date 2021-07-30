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

const ClaimDetail = (props) => {
  console.log(props.route.params.item);
  const item = props.route.params.item;
  const index = props.route.params.index;
  
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
          onPress={() => props.navigation.navigate('ClaimList')}
        >
          <FontAwesomeIcon icon={faArrowLeft} size={16} color={'#fff'} />
          <Text style={{ fontSize: 22, paddingLeft: 15, color: '#fff' }}>
            Claim Details
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: -50,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 15,
          paddingBottom: 20
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
          <SharedElement
            id={`claim.${item.Name}.${index}`}
            style={{ height: 80, width: 80 }}
          >
            <Image
              source={require('../../assets/images/claimList.png')}
              resizeMode="contain"
              style={{
                flex: 1,
                width: null,
                height: null
              }}
            />
          </SharedElement>
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
                <SharedElement id={`${item.Name}.${index}`}>
                  <Text style={{ fontSize: 23 }}>Null</Text>
                </SharedElement>
              ) : (
                <SharedElement id={`${item.Name}.${index}`}>
                  <Text style={{ fontSize: 23 }}>{item.Name}</Text>
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
            <Text style={styles.policyInfoHeading}>Claim Number</Text>
            <Text style={styles.policyInfo}>{item.Name}</Text>
          </View>
          <View style={{ paddingVertical: 15 }}>
            <Text style={styles.policyInfoHeading}>Policy Number:</Text>
            <Text style={styles.policyInfo}>{item.PolicyNumberId}</Text>
          </View>

          {item.CreatedDate === null ? (
            <View style={{ paddingVertical: 15 }}>
              <Text style={styles.policyInfoHeading}>Report Date</Text>
              <Text style={styles.policyInfo}>Null</Text>
            </View>
          ) : (
            <View style={{ paddingVertical: 10 }}>
              <Text style={styles.policyInfoHeading}>Report Date</Text>
              <Text style={styles.policyInfo}>
                {moment(item.CreatedDate).format('LL')}
              </Text>
            </View>
          )}
          {item.LossDate === null ? (
            <View style={{ paddingVertical: 15 }}>
              <Text style={styles.policyInfoHeading}>Loss Date</Text>
              <Text style={styles.policyInfo}>Null</Text>
            </View>
          ) : (
            <View style={{ paddingVertical: 10 }}>
              <Text style={styles.policyInfoHeading}>Loss Date</Text>
              <Text style={styles.policyInfo}>
                {moment(item.LossDate).format('LL')}
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

ClaimDetail.sharedElements = (route) => {
  const item = route.params.item;
  const index = route.params.index;
  return [
    { id: `claim.${item.Name}.${index}`, animation: 'move' },
    { id: `${item.Name}.${index}`, animation: 'fade' }
  ];
};

export default ClaimDetail;

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
