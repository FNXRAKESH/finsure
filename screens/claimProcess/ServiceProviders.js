import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  FlatList,
  Button,
  TouchableOpacity
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faCheck,
  faChevronDown,
  faMap
} from '@fortawesome/free-solid-svg-icons';

var Bearer, claimId;
const ServiceProviders = (props) => {
  Bearer = 'Bearer ' + props.route.params.accessToken;
  claimId = props.route.params.claimId;
  const [serviceProviders, setServiceProviders] = useState([]);
  const [selectedId, setSelectedId] = useState([]);
  useEffect(() => {
    fetch(
      'https://ackofinaldemo-dev-ed.my.salesforce.com/services/data/v50.0/query/?q=SELECT+Id,Name,Finex__Address__c,Finex__Type__c+FROM+Finex__Service_Provider__c',
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
        var arr = data.records.sort((a, b) => a.Name.localeCompare(b.Name));
        setServiceProviders(arr);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);
  const Item = ({ item, onPress, style }) => (
    <TouchableOpacity
      onPress={onPress}
      style={(style, { flexDirection: 'row', alignItems: 'center' })}
    >
      <Text style={[styles.title, style]}>
        {item.Name} -<Text> {item.Type__c}</Text>
      </Text>
      {selectedId.includes(item.Id) ? (
        <FontAwesomeIcon icon={faCheck} size={16} color={'#518EF8'} />
      ) : null}
    </TouchableOpacity>
  );
  const renderItem = ({ item }) => {
    const fontSize = selectedId.includes(item.Id) ? 19 : 18;
    const color = selectedId.includes(item.Id) ? '#518EF8' : '#000';

    return (
      <Item
        item={item}
        onPress={() => {
          if (selectedId.indexOf(item.Id) === -1) {
            setSelectedId([...selectedId, item.Id]);
            console.log(selectedId);
          } else {
            var value = item.Id;
            setSelectedId(selectedId.filter((item) => item !== value));
          }
        }}
        style={{ fontSize, color }}
      />
    );
  };
  const SubmitServiceProvider = () => {
    console.log('====================================');
    console.log(claimId);
    console.log('====================================');
    {
      selectedId &&
        selectedId.map((id) => {
          fetch(
            `https://ackofinaldemo-dev-ed.my.salesforce.com/services/data/v50.0/sobjects/Claim_Service_Provider__c`,
            {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                Authorization: Bearer,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                Claim__c: claimId
              })
            }
          )
            .then((response) => {
              response.json();
            })
            .then((data) => {
              console.log('data ', JSON.stringify(data));
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        });
    }

    props.navigation.navigate('ThankYou', { claimId });
  };
  return (
    <View style={[styles.container, { backgroundColor: '#fafafa' }]}>
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
          Service Providers
        </Text>
      </TouchableOpacity>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, paddingHorizontal: 15 }}>
          <Text
            style={{
              marginVertical: 20,
              fontSize: 17,
              color: 'grey'
            }}
          >
            Select Service Providers
          </Text>
          <View style={{ backgroundColor: '#fff' }}>
            <FlatList
              data={serviceProviders}
              renderItem={renderItem}
              keyExtractor={(item, index) => {
                return index.toString();
              }}
              extraData={selectedId}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>

      <View
        style={{
          flexDirection: 'row',
          width: Dimensions.get('window').width,
          backgroundColor: '#1AC29A'
        }}
      >
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('UploadImage');
          }}
          style={styles.footerButton}
        >
          <FontAwesomeIcon icon={faArrowLeft} size={18} color={'#fff'} />
          <Text style={{ color: '#fff', padding: 20, fontSize: 20 }}>Back</Text>
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
            6<Text style={{ fontWeight: 'normal' }}>/6</Text>
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            SubmitServiceProvider();
          }}
          style={styles.footerButton}
        >
          <Text style={{ color: '#fff', padding: 20, fontSize: 20 }}>Next</Text>
          <FontAwesomeIcon icon={faArrowRight} size={18} color={'#fff'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ServiceProviders;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    borderRadius: 5,
    borderWidth: 1,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    borderLeftWidth: 25,
    borderColor: '#63AFE8',
    overflow: 'hidden'
  },
  title: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    flex: 0.9
  },
  footerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  }
});
