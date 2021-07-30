import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TextInput,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Modal
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Checkbox } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faArrowRight,
  faArrowLeft,
  faMap
} from '@fortawesome/free-solid-svg-icons';
import MapView from 'react-native-maps';
import LocationSearch from './LocationSearch';
import Geocode from 'react-geocode';
import { add } from 'react-native-reanimated';

Geocode.setApiKey('AIzaSyBov-hgk72VmzPEXpUtzZHvvzFwf7rqhco');
var Bearer, claimId;

const LossDetails = (props) => {
  Bearer = 'Bearer ' + props.route.params.accessToken;
  claimId = props.route.params.claimId;

  const [Repair_shop_selected__c, setToggleRepairShop] = useState(false);
  const [RepairShopLocation, setRepairShopLocation] = useState('');
  const [RepairShop, setRepairShop] = useState('');
  const [IsAuthoritiesNotified, setToggleAuthorities] = useState(false);
  const [ReportingAuthority, setReportingAuthority] = useState('');
  const [ReportNumber, setReportNumber] = useState('');
  const [IsDrivable, setToggleIsDrivable] = useState(false);
  const [ReportDate, setReportDate] = useState('');
  const [VisitDate, setVisitDate] = useState('');
  const [VisitSite, setVisitSite] = useState('');
  const [shopAddress, setShopAddress] = useState('');
  const [mapModal, setmapModal] = useState(false);
  const [shopLatitude, setShopLatitude] = useState(13.075999696);
  const [shopLongitude, setShopLongitude] = useState(80.271832246);
  const [markerTitle, setMarkerTitle] = useState('');

  const location = (lat, long, fromAddress, addressComponents) => {
    {
      addressComponents &&
        addressComponents.map((address, i) => {
          address.types.forEach((element) => {
            if (element === 'street_number') {
              console.log('street_number ', address.long_name);
            }
            if (element === 'route') {
              console.log('street ', address.long_name);
              // this.setState({ IncidentSiteStreet: address.long_name });
            }
            if (element === 'neighborhood') {
              console.log('neighborhood ', address.long_name);
            }
            if (element === 'sublocality_level_1') {
              console.log('sublocality_level_1 ', address.long_name);
            }
            if (element === 'sublocality_level_2') {
              console.log('sublocality_level_2 ', address.long_name);
            }
            if (element === 'locality') {
              console.log('city ', address.long_name);
              // this.setState({ IncidentSiteCity: address.long_name });
            }
            if (element === 'administrative_area_level_2') {
              console.log('district ', address.long_name);
            }
            if (element === 'administrative_area_level_1') {
              console.log('state ', address.long_name);
              // this.setState({ IncidentSiteState: address.long_name });
            }
            if (element === 'country') {
              console.log('country ', address.long_name);
              // this.setState({ IncidentSiteCountry: address.long_name });
            }
            if (element === 'postal_code') {
              console.log('postal_code ', address.long_name);
              // this.setState({ IncidentSitePostalCode: address.long_name });
            }
          });
        });
    }
    setShopAddress(fromAddress);
    // this.setState({
    //   IncidentSiteLatitude: lat,
    //   IncidentSiteLongitude: long,
    //   fromAddress: fromAddress
    // });
  };
  const getAddress = (coordinates) => {
    const latlng = {
      lat: coordinates.latitude,
      lng: coordinates.longitude
    };

    Geocode.fromLatLng(latlng.lat, latlng.lng).then(
      (response) => {
        const address = response.results[0].formatted_address;
        let city, state, country, postal_code, route;
        for (
          let i = 0;
          i < response.results[0].address_components.length;
          i++
        ) {
          for (
            let j = 0;
            j < response.results[0].address_components[i].types.length;
            j++
          ) {
            switch (response.results[0].address_components[i].types[j]) {
              case 'locality':
                city = response.results[0].address_components[i].long_name;
                // this.setState({ IncidentSiteCity: city });
                break;
              case 'administrative_area_level_1':
                state = response.results[0].address_components[i].long_name;
                // this.setState({ IncidentSiteState: state });
                break;
              case 'country':
                country = response.results[0].address_components[i].long_name;
                // this.setState({ IncidentSiteCountry: country });
                break;
              case 'postal_code':
                postal_code =
                  response.results[0].address_components[i].long_name;
                // this.setState({ IncidentSitePostalCode: postal_code });
                break;
              case 'route':
                route = response.results[0].address_components[i].long_name;
                // this.setState({ IncidentSiteStreet: route });
                break;
            }
            console.log(
              'response.results[0].address_components[i]',
              response.results[0].address_components[i]
            );
          }
        }
        console.log(city, state, country);
        console.log(address);
        setMarkerTitle(address);
        setShopAddress(address);
      },
      (error) => {
        console.error(error);
      }
    );
  };
  const submitLossDetails = () => {
    fetch(
      `https://ackofinaldemo-dev-ed.my.salesforce.com/services/data/v50.0/sobjects/claim/${claimId}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: Bearer,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Repair_shop_selected__c: Repair_shop_selected__c,
          RepairShopLocation: RepairShopLocation,
          RepairShop: RepairShop,
          IsAuthoritiesNotified: IsAuthoritiesNotified,
          ReportingAuthority: ReportingAuthority,
          ReportDate: ReportDate,
          ReportNumber: ReportNumber,
          IsDrivable: IsDrivable,
          VisitDate: VisitDate,
          VisitSite: VisitSite
        })
      }
    )
      .then((response) => {
        response.json();
      })
      .then((data) => {
        console.log('claim updated ', data);
        props.navigation.navigate('InvolvedParties', {
          selectedPolicy: props.route.params.selectedPolicy,
          claimId: claimId
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  let coordinates = {
    latitude: shopLatitude,
    longitude: shopLongitude
  };
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
          props.navigation.navigate('FNOLDetails');
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} size={16} color={'#000'} />
        <Text style={{ fontSize: 22, paddingLeft: 15, color: '#000' }}>
          Loss Details
        </Text>
      </TouchableOpacity>
      <ScrollView
        keyboardShouldPersistTaps="always"
        centerContent={true}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        showsVerticalScrollIndicator={false}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1, paddingHorizontal: 15 }}>
            <View
              style={{
                backgroundColor: '#fff',
                padding: 20,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
                marginVertical: 20
              }}
            >
              <TouchableWithoutFeedback
                onPress={() => {
                  setToggleRepairShop(!Repair_shop_selected__c);
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}
                >
                  <Text style={{ flex: 1, fontSize: 18 }}>
                    Repair shop selected
                  </Text>
                  <Checkbox
                    status={Repair_shop_selected__c ? 'checked' : 'unchecked'}
                    color="#518EF8"
                    onPress={() => {
                      setToggleRepairShop(!Repair_shop_selected__c);
                    }}
                  />
                </View>
              </TouchableWithoutFeedback>
              {Repair_shop_selected__c ? (
                <View
                  style={{
                    borderTopColor: '#f2f2f2',
                    borderTopWidth: 1,
                    paddingTop: 10,
                    marginTop: 10
                  }}
                >
                  {shopAddress !== '' ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        padding: 15,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderRadius: 5,
                        backgroundColor: '#F8F8F8'
                      }}
                    >
                      <View style={{ flex: 0.9 }}>
                        <Text style={{ fontWeight: 'bold' }}>
                          {shopAddress}
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          setmapModal(!mapModal);
                        }}
                      >
                        <Text style={{ color: '#518EF8' }}>Change</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        setmapModal(!mapModal);
                      }}
                      style={{
                        flexDirection: 'row',
                        backgroundColor: '#e5eefe',
                        padding: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 5
                      }}
                    >
                      <Text
                        style={{
                          paddingHorizontal: 15,
                          color: '#518EF8',
                          fontSize: 18
                        }}
                      >
                        Select Shop in Map
                      </Text>
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        size={16}
                        color={'#518EF8'}
                      />
                    </TouchableOpacity>
                  )}
                  <View style={styles.textInput}>
                    <TextInput
                      placeholder="Shop Name"
                      value={RepairShop}
                      onChangeText={(e) => setRepairShop(e)}
                    />
                  </View>
                </View>
              ) : null}
            </View>
            <Modal
              animationType="slide"
              transparent
              visible={mapModal}
              onRequestClose={() => {
                setmapModal(!mapModal);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={{ position: 'absolute', top: 0, zIndex: 9 }}>
                    <View
                      style={{
                        flexDirection: 'row',

                        width: Dimensions.get('window').width,
                        backgroundColor: '#fff'
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          setmapModal(!mapModal);
                        }}
                        style={{
                          alignItems: 'center',
                          paddingVertical: 30,
                          paddingHorizontal: 15
                        }}
                      >
                        <FontAwesomeIcon icon={faArrowLeft} size={18} />
                      </TouchableOpacity>
                      <LocationSearch location={location} />
                    </View>
                  </View>
                  <MapView
                    region={{
                      latitude: shopLatitude,
                      longitude: shopLongitude,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421
                    }}
                    style={styles.map}
                    minZoomLevel={15}
                    onMarkerDragEnd={(e) => {
                      getAddress(e.nativeEvent.coordinate);
                    }}
                    showsUserLocation={true}
                    moveOnMarkerPress={true}
                    animateToRegion
                    followsUserLocation={true}
                  >
                    <MapView.Marker
                      draggable
                      coordinate={coordinates}
                      pinColor="red"
                      title={markerTitle}
                      onDragEnd={(e) => {
                        setShopLatitude(e.nativeEvent.coordinate.latitude);
                        setShopLongitude(e.nativeEvent.coordinate.longitude);
                      }}
                    />
                  </MapView>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#1AC29A',
                      width: Dimensions.get('window').width,
                      borderRadius: 5,
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      paddingVertical: 20,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                    onPress={() => {
                      setmapModal(!mapModal);
                    }}
                  >
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 22,
                        color: '#fff',
                        paddingRight: 15
                      }}
                    >
                      Select this Location
                    </Text>
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      size={16}
                      color={'#fff'}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            {/* <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Checkbox
                status={Repair_shop_selected__c ? 'checked' : 'unchecked'}
                onPress={() => {
                  setToggleRepairShop(!Repair_shop_selected__c);
                  setRepairShopLocation('');
                  setRepairShop('');
                }}
                uncheckedColor="#8036ff"
                color="#8036ff"
              />

              <Text
                onPress={() => {
                  setToggleRepairShop(!Repair_shop_selected__c);
                  setRepairShopLocation('');
                  setRepairShop('');
                }}
              >
                Repair Shop Selected?
              </Text>
            </View> */}
            <View
              style={{
                backgroundColor: '#fff',
                padding: 20,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
                marginVertical: 20
              }}
            >
              <TouchableWithoutFeedback
                onPress={() => {
                  setToggleAuthorities(!IsAuthoritiesNotified);
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}
                >
                  <Text style={{ flex: 1, fontSize: 18 }}>
                    Authorities Notified
                  </Text>
                  <Checkbox
                    status={IsAuthoritiesNotified ? 'checked' : 'unchecked'}
                    color="#518EF8"
                    onPress={() => {
                      setToggleAuthorities(!IsAuthoritiesNotified);
                    }}
                  />
                </View>
              </TouchableWithoutFeedback>
              {IsAuthoritiesNotified ? (
                <View>
                  <View style={styles.textInput}>
                    <TextInput
                      placeholder="Reporting Authority"
                      value={ReportingAuthority}
                      onChangeText={(e) => setReportingAuthority(e)}
                    />
                  </View>
                  <View style={{ alignItems: 'center', marginVertical: 5 }}>
                    <DatePicker
                      style={{ width: 100 + '%' }}
                      date={ReportDate}
                      mode="date"
                      placeholder="Report date"
                      format="YYYY-MM-DD"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateIcon: {
                          position: 'absolute',
                          left: 0,
                          top: 4,
                          marginLeft: 0
                        },
                        dateInput: {
                          borderWidth: 0,
                          backgroundColor: '#F8F8F8'
                        }
                        // ... You can check the source to find the other keys.
                      }}
                      onDateChange={(date) => {
                        setReportDate(date);
                      }}
                    />
                  </View>

                  <View style={styles.textInput}>
                    <TextInput
                      placeholder="Report Number"
                      value={ReportNumber}
                      onChangeText={(e) => setReportNumber(e)}
                    />
                  </View>
                </View>
              ) : null}
            </View>

            <View
              style={{
                backgroundColor: '#fff',
                padding: 20,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
                marginVertical: 20
              }}
            >
              <TouchableWithoutFeedback
                onPress={() => {
                  setToggleIsDrivable(!IsDrivable);
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}
                >
                  <Text style={{ flex: 1, fontSize: 18 }}>Is Drivable</Text>
                  <Checkbox
                    status={IsDrivable ? 'checked' : 'unchecked'}
                    color="#518EF8"
                    onPress={() => {
                      setToggleIsDrivable(!IsDrivable);
                    }}
                  />
                </View>
              </TouchableWithoutFeedback>
              {IsDrivable ? (
                <View>
                  <View style={{ alignItems: 'center', marginVertical: 10 }}>
                    <DatePicker
                      style={{ width: 100 + '%' }}
                      date={VisitDate}
                      mode="date"
                      placeholder="Visit date"
                      format="YYYY-MM-DD"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateIcon: {
                          position: 'absolute',
                          left: 0,
                          top: 4,
                          marginLeft: 0
                        },
                        dateInput: {
                          borderWidth: 0,
                          backgroundColor: '#F8F8F8'
                        }
                        // ... You can check the source to find the other keys.
                      }}
                      onDateChange={(date) => {
                        setVisitDate(date);
                      }}
                    />
                  </View>
                  <View style={styles.textInput}>
                    <TextInput
                      placeholder="Visit Site"
                      value={VisitSite}
                      onChangeText={(e) => setVisitSite(e)}
                    />
                  </View>
                </View>
              ) : null}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          width: Dimensions.get('window').width,
          backgroundColor: '#1AC29A'
        }}
      >
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('FNOLDetails');
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
            3<Text style={{ fontWeight: 'normal' }}>/6</Text>
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            submitLossDetails();
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

export default LossDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  textInput: {
    backgroundColor: '#f8f8f8',
    paddingVertical: 15,
    paddingHorizontal: 5,
    marginVertical: 10
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView: {
    backgroundColor: '#fff',

    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  footerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  }
});
