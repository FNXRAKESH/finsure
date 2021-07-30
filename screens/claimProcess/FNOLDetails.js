import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TextInput,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Modal,
  FlatList,
  KeyboardAvoidingView
} from 'react-native';
import * as Progress from 'react-native-progress';
import DatePicker from 'react-native-datepicker';
import MapView from 'react-native-maps';
import { Picker } from '@react-native-picker/picker';
import LocationSearch from './LocationSearch';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faChevronDown,
  faMap,
  faTintSlash
} from '@fortawesome/free-solid-svg-icons';
import Geocode from 'react-geocode';

Geocode.setApiKey('AIzaSyBov-hgk72VmzPEXpUtzZHvvzFwf7rqhco');

var Bearer;
class FNOLDetails extends Component {
  constructor(props) {
    super(props);
    Bearer = 'Bearer ' + this.props.route.params.accessToken;
    console.log('params ', this.props.route.params);
  }
  state = {
    fromLat: 13.075999696,
    fromLong: 80.271832246,
    lossDate: '',
    IncidentSiteCity: '',
    IncidentSiteCountry: '',
    IncidentSiteGeocodeAccuracy: '',
    IncidentSiteLatitude: 13.075999696,
    IncidentSiteLongitude: 80.271832246,
    IncidentSitePostalCode: '',
    IncidentSiteState: '',
    IncidentSiteStreet: '',
    Summary: '',
    vehicle: [],
    Selectedvehicle: '',
    AssetName: '',
    InsurancePolicyCoverageId: '',
    SelectedvehicleId: [],
    btnDisabled: false,
    modalVisible: false,
    mapModalVisible: false,
    markerTitle: '',
    markerDescription: '',
    mapOverlay: false,
    fromAddress: '',
    showAlert: false,
    claimId: ''
  };
  location = (lat, long, fromAddress, addressComponents) => {
    {
      addressComponents &&
        addressComponents.map((address, i) => {
          address.types.forEach((element) => {
            if (element === 'street_number') {
              console.log('street_number ', address.long_name);
            }
            if (element === 'route') {
              console.log('street ', address.long_name);
              this.setState({ IncidentSiteStreet: address.long_name });
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
              this.setState({ IncidentSiteCity: address.long_name });
            }
            if (element === 'administrative_area_level_2') {
              console.log('district ', address.long_name);
            }
            if (element === 'administrative_area_level_1') {
              console.log('state ', address.long_name);
              this.setState({ IncidentSiteState: address.long_name });
            }
            if (element === 'country') {
              console.log('country ', address.long_name);
              this.setState({ IncidentSiteCountry: address.long_name });
            }
            if (element === 'postal_code') {
              console.log('postal_code ', address.long_name);
              this.setState({ IncidentSitePostalCode: address.long_name });
            }
          });
        });
    }
    this.setState(
      {
        IncidentSiteLatitude: lat,
        IncidentSiteLongitude: long,
        fromAddress: fromAddress
      },
      () => {
        console.log(
          'lat long ',
          this.state.IncidentSiteLatitude,
          this.state.IncidentSiteLongitude
        );
      }
    );
  };
  componentDidMount = () => {
    this.fetchVehicles();
  };
  fetchVehicles = () => {
    fetch(
      `https://ackofinaldemo-dev-ed.my.salesforce.com/services/apexrest/Finex/SelectVehicle?insure_policy_id=${this.props.route.params.selectedPolicy}&policyType=Auto`,
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
        console.log('data ', data);
        this.setState({ vehicle: data, Selectedvehicle: data[0].CAssetName });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  ClaimItem = (ClaimId) => {
    fetch(
      'https://ackofinaldemo-dev-ed.my.salesforce.com/services/data/v50.0/query/?q=SELECT+Id,InsurancePolicyAssetId+FROM+InsurancePolicyCoverage',
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
        console.log('claimItem ', data, ' ', this.state.Selectedvehicle);
        {
          data.records.map((p, key) => {
            var isPresent = this.state.vehicle.some(function (el) {
              return el.AssetId === p.InsurancePolicyAssetId;
            });

            if (isPresent) {
              this.setState(
                {
                  InsurancePolicyCoverageId: p.Id
                },
                () => {
                  fetch(
                    'https://ackofinaldemo-dev-ed.my.salesforce.com/services/data/v50.0/sobjects/ClaimItem',
                    {
                      method: 'POST',
                      headers: {
                        Authorization: Bearer,
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        InsurancePolicyCoverageId:
                          this.state.InsurancePolicyCoverageId,
                        ClaimId: ClaimId,
                        Name: this.state.Selectedvehicle
                      })
                    }
                  )
                    .then((response) => response.json())
                    .then((data) => {
                      console.log('ClaimItem ', data);

                      this.setState({ showAlert: true, claimId: ClaimId });
                    })

                    .catch((error) => {
                      console.error('Error:', error);
                    });
                }
              );
            }
          });
        }
      });
  };
  submitCase = (claimId) => {
    this.setState({ btnDisabled: true });
    var caseId;
    fetch(
      'https://ackofinaldemo-dev-ed.my.salesforce.com/services/data/v50.0/sobjects/case',
      {
        method: 'POST',
        headers: {
          Authorization: Bearer,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Priority: 'Medium',
          Status: 'New',
          Subject: 'Initiate FNOL',
          Description: this.state.Summary
        })
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('caseid ', data.id);
        caseId = data.id;
        this.updateClaim(caseId);
      })
      .catch((error) => {
        console.error('Error:', error);
        this.setState({ btnDisabled: false });
      });
  };
  updateClaim = (caseId) => {
    fetch(
      'https://ackofinaldemo-dev-ed.my.salesforce.com/services/data/v50.0/sobjects/claim',
      {
        method: 'POST',
        headers: {
          Authorization: Bearer,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          CaseId: caseId,
          LossDate: this.state.lossDate,
          PolicyNumberId: this.props.route.params.selectedPolicy,
          Summary: this.state.Summary,
          IncidentSiteCity: this.state.IncidentSiteCity,
          IncidentSiteCountry: this.state.IncidentSiteCountry,
          IncidentSiteGeocodeAccuracy: this.state.IncidentSiteGeocodeAccuracy,
          IncidentSiteLatitude: this.state.IncidentSiteLatitude,
          IncidentSiteLongitude: this.state.IncidentSiteLongitude,
          IncidentSitePostalCode: this.state.IncidentSitePostalCode,
          IncidentSiteState: this.state.IncidentSiteState,
          IncidentSiteStreet: this.state.IncidentSiteStreet
        })
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('claimId ', data.id);
        this.ClaimItem(data.id);
      })

      .catch((error) => {
        console.error('Error:', error);
        this.setState({ btnDisabled: false });
      });
  };
  getAddress = (coordinates) => {
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
                this.setState({ IncidentSiteCity: city });
                break;
              case 'administrative_area_level_1':
                state = response.results[0].address_components[i].long_name;
                this.setState({ IncidentSiteState: state });
                break;
              case 'country':
                country = response.results[0].address_components[i].long_name;
                this.setState({ IncidentSiteCountry: country });
                break;
              case 'postal_code':
                postal_code =
                  response.results[0].address_components[i].long_name;
                this.setState({ IncidentSitePostalCode: postal_code });
                break;
              case 'route':
                route = response.results[0].address_components[i].long_name;
                this.setState({ IncidentSiteStreet: route });
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
        this.setState({ markerTitle: address, fromAddress: address });
      },
      (error) => {
        console.error(error);
      }
    );
  };
  render() {
    let coordinates = {
      latitude: this.state.IncidentSiteLatitude,
      longitude: this.state.IncidentSiteLongitude
    };

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 30,
            paddingHorizontal: 20
          }}
          onPress={() => {
            this.props.navigation.navigate('FNOLsubmission');
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} size={16} color={'#000'} />
          <Text style={{ fontSize: 22, paddingLeft: 15, color: '#000' }}>
            FNOL Details
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
              <Text style={{ paddingVertical: 15 }}>Select Vehicle</Text>
              <TouchableOpacity
                onPress={() => this.setState({ modalVisible: true })}
                style={{
                  backgroundColor: '#F8F8F8',
                  padding: 20,
                  flexDirection: 'row',
                  borderRadius: 5,
                  borderColor: '#0A213E',
                  borderWidth: 0.5
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 18, color: '#0A213E' }}>
                    {this.state.Selectedvehicle}
                  </Text>
                </View>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  size={16}
                  color={'#000'}
                />
              </TouchableOpacity>
              <Modal
                animationType="slide"
                transparent
                visible={this.state.modalVisible}
                onRequestClose={() => {
                  this.setState({ modalVisible: !this.state.modalVisible });
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <FlatList
                      keyExtractor={(item, index) =>
                        index + item.AssetId.toString()
                      }
                      showsVerticalScrollIndicator={false}
                      data={this.state.vehicle}
                      renderItem={({ item, index }) => {
                        return (
                          <TouchableOpacity
                            style={styles.item}
                            onPress={() => {
                              this.setState({
                                Selectedvehicle: item.CAssetName,
                                modalVisible: false
                              });
                            }}
                          >
                            <Text
                              style={
                                item.CAssetName === this.state.Selectedvehicle
                                  ? [
                                      styles.title,
                                      { color: '#518EF8', fontSize: 22 }
                                    ]
                                  : [
                                      styles.title,
                                      { color: '#000', fontSize: 18 }
                                    ]
                              }
                            >
                              {item.CAssetName}
                            </Text>
                          </TouchableOpacity>
                        );
                      }}
                    />
                  </View>
                </View>
              </Modal>

              <View style={{ paddingVertical: 15 }}>
                <Text
                  style={{
                    paddingVertical: 15,
                    color: 'grey'
                  }}
                >
                  Loss Date
                </Text>
                <View style={{ alignItems: 'center' }}>
                  <DatePicker
                    style={{
                      width: Dimensions.get('window').width - 30,
                      backgroundColor: '#f2f2f2'
                    }}
                    date={this.state.lossDate}
                    mode="date"
                    placeholder="select date"
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
                        dateInput: { borderWidth: 0 }
                      }
                      // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => {
                      this.setState({ lossDate: date });
                    }}
                  />
                </View>
              </View>

              <Text style={{ paddingVertical: 15 }}>Location of Incident</Text>

              {this.state.fromAddress !== '' ? (
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
                      {this.state.fromAddress}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        mapModalVisible: !this.state.mapModalVisible
                      });
                    }}
                  >
                    <Text style={{ color: '#518EF8' }}>Change</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      mapModalVisible: !this.state.mapModalVisible
                    });
                  }}
                  style={{
                    flexDirection: 'row',
                    backgroundColor: '#518EF8',
                    padding: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5
                  }}
                >
                  <FontAwesomeIcon icon={faMap} size={16} color={'#fff'} />
                  <Text
                    style={{
                      paddingHorizontal: 15,
                      color: '#fff',
                      fontSize: 18
                    }}
                  >
                    Select in Map
                  </Text>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    size={16}
                    color={'#fff'}
                  />
                </TouchableOpacity>
              )}

              <Modal
                animationType="slide"
                transparent
                visible={this.state.mapModalVisible}
                onRequestClose={() => {
                  this.setState({
                    mapModalVisible: !this.state.mapModalVisible
                  });
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    {!this.state.mapOverlay ? (
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          paddingHorizontal: 25,
                          backgroundColor: 'rgba(0,0,0,0.5)',
                          zIndex: 999,
                          ...StyleSheet.absoluteFill
                        }}
                      >
                        <Text
                          style={{
                            textAlign: 'center',
                            fontSize: 22,
                            color: '#fff'
                          }}
                        >
                          Search for location (or) Long Press the marker to
                          select the incident spot
                        </Text>
                        <Text>{this.state.IncidentSiteLatitude}</Text>
                        <TouchableOpacity
                          style={{
                            backgroundColor: '#1AC29A',
                            padding: 20,
                            margin: 20,
                            borderRadius: 5
                          }}
                          onPress={() => {
                            this.setState({ mapOverlay: true });
                          }}
                        >
                          <Text
                            style={{
                              textAlign: 'center',
                              fontSize: 22,
                              color: '#fff'
                            }}
                          >
                            Got It
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : null}
                    <View style={{ position: 'absolute', top: 0, zIndex: 9 }}>
                      <View
                        style={{
                          flexDirection: 'row',

                          width: Dimensions.get('window').width,
                          backgroundColor: '#fff'
                        }}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            this.setState({
                              mapModalVisible: !this.state.mapModalVisible
                            })
                          }
                          style={{
                            alignItems: 'center',
                            paddingVertical: 30,
                            paddingHorizontal: 15
                          }}
                        >
                          <FontAwesomeIcon icon={faArrowLeft} size={18} />
                        </TouchableOpacity>
                        <LocationSearch location={this.location} />
                      </View>
                    </View>
                    <MapView
                      region={
                        Platform.OS == 'ios'
                          ? {
                              latitude: this.state.IncidentSiteLatitude,
                              longitude: this.state.IncidentSiteLongitude
                            }
                          : {
                              latitude: this.state.IncidentSiteLatitude,
                              longitude: this.state.IncidentSiteLongitude,
                              latitudeDelta: 0.0922,
                              longitudeDelta: 0.0421
                            }
                      }
                      style={styles.map}
                      minZoomLevel={15}
                      onMarkerDragEnd={(e) => {
                        this.getAddress(e.nativeEvent.coordinate);
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
                        title={this.state.markerTitle}
                        onDragEnd={(e) => {
                          console.log(
                            'e.nativeEvent.coordinate ',
                            e.nativeEvent.coordinate.latitude
                          );
                          this.setState({
                            IncidentSiteLatitude:
                              e.nativeEvent.coordinate.latitude,
                            IncidentSiteLongitude:
                              e.nativeEvent.coordinate.longitude
                          });
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
                        this.setState({
                          mapModalVisible: !this.state.mapModalVisible
                        });
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
              <Text style={{ paddingVertical: 20 }}>Summary</Text>
              <View style={styles.textInput}>
                <TextInput
                  multiline
                  value={this.state.Summary}
                  placeholder="Write summary here ..."
                  numberOfLines={3}
                  placeholderTextColor="grey"
                  style={{ color: 'grey' }}
                  onChangeText={(e) => {
                    this.setState({ Summary: e });
                  }}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
        {this.state.showAlert ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingHorizontal: 25,
              backgroundColor: 'rgba(0,0,0,0.8)',
              zIndex: 999,
              ...StyleSheet.absoluteFill
            }}
          >
            <View style={{ backgroundColor: '#fff', padding: 20 }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 22
                }}
              >
                Your claim ID is
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 25,
                  color: '#518EF8',
                  paddingVertical: 15
                }}
              >
                {this.state.claimId}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  textAlign: 'center'
                }}
              >
                You can visit "My Claims" page to view your claims
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: '#1AC29A',
                  padding: 20,
                  margin: 20,
                  borderRadius: 5
                }}
                onPress={() => {
                  this.setState(
                    { showAlert: false, btnDisabled: false },
                    () => {
                      this.props.navigation.navigate('LossDetails', {
                        selectedPolicy: this.props.route.params.selectedPolicy,
                        claimId: this.state.claimId
                      });
                    }
                  );
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 22,
                    color: '#fff'
                  }}
                >
                  Got It
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
        <View
          style={{
            flexDirection: 'row',
            width: Dimensions.get('window').width,
            backgroundColor: '#1AC29A'
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('FNOLsubmission');
            }}
            style={styles.footerButton}
          >
            <FontAwesomeIcon icon={faArrowLeft} size={18} color={'#fff'} />
            <Text style={{ color: '#fff', padding: 20, fontSize: 20 }}>
              Back
            </Text>
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
              2<Text style={{ fontWeight: 'normal' }}>/2</Text>
            </Text>
          </View>
          <TouchableOpacity
            disabled={this.state.btnDisabled}
            onPress={() => {
              this.submitCase();
            }}
            style={styles.footerButton}
          >
            <Text style={{ color: '#fff', padding: 20, fontSize: 20 }}>
              Next
            </Text>
            <FontAwesomeIcon icon={faArrowRight} size={18} color={'#fff'} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default FNOLDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  textInput: {
    backgroundColor: '#F8F8F8',
    borderRadius: 5,
    paddingHorizontal: 10,
    flex: 0.8
  },
  centeredView: {
    flex: 1
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
    width: Dimensions.get('window').width,
    borderRadius: 10
  },

  footerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  }
});
