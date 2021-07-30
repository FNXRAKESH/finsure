import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faCarAlt,
  faEdit,
  faFileAlt,
  faFileUpload,
  faHandHoldingUsd,
  faArrowRight,
  faUserEdit,
  faBars,
  faAngleRight,
  faPen,
  faPenAlt
} from '@fortawesome/free-solid-svg-icons';
import LottieView from 'lottie-react-native';
import { LinearGradient } from 'expo-linear-gradient';

var Bearer;

const Dashboard = (props) => {
  const animation = React.useRef(null);
  Bearer = 'Bearer ' + props.route.params.accessToken;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;
  const fadeAnim3 = useRef(new Animated.Value(0)).current;
  const fadeAnim4 = useRef(new Animated.Value(0)).current;
  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  };

  const fadeIn2 = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim2, {
      toValue: 1,
      delay: 300,
      duration: 500,
      useNativeDriver: true
    }).start();
  };
  const fadeIn3 = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim3, {
      toValue: 1,
      delay: 600,
      duration: 500,
      useNativeDriver: true
    }).start();
  };
  const fadeIn4 = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim4, {
      toValue: 1,
      delay: 900,
      duration: 500,
      useNativeDriver: true
    }).start();
  };
  const [nop, setNop] = useState([]);
  const [noc, setNoc] = useState([]);
  const BASE_PATH =
    'https://cdn1.vectorstock.com/i/1000x1000/51/05/male-profile-avatar-with-brown-hair-vector-12055105.jpg';
  useEffect(() => {
    getpoliciesCount();
    getClaimCount();
  }, []);
  const getpoliciesCount = () => {
    fetch(
      'https://ackofinaldemo-dev-ed.my.salesforce.com/services/data/v50.0/query/?q=SELECT+Name,UniversalPolicyNumber,PolicyType,EffectiveDate,ExpirationDate,Status+FROM+InsurancePolicy',
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
        console.log(data.records.length);

        setNop(data.records.length);
        fadeIn();
        fadeIn2();
        fadeIn3();
        fadeIn4();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  const getClaimCount = () => {
    fetch(
      `https://ackofinaldemo-dev-ed.my.salesforce.com/services/data/v50.0/query/?q=SELECT+Name,PolicyNumberId,InsuredAssetId,ClaimType,LossType,EstimatedAmount,ActualAmount,ApprovedAmount,InitiationDate,AssessmentDate,FinalizedDate,LossDate,CreatedDate,Status+FROM+Claim`,
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
        console.log(data.records.length);
        setNoc(data.records.length);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  return (
    <View style={[styles.container, { backgroundColor: '#FAFAFA' }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 0.3, justifyContent: 'center' }}
      >
        <View
          style={{
            paddingHorizontal: 20,
            backgroundColor: '#023E8A',
            paddingTop: 30,
            paddingBottom: 30
          }}
        >
          <Image
            source={require('../assets/images/HomeHeader.png')}
            style={{
              zIndex: -1,
              position: 'absolute',
              right: 0,
              top: 0,
              height: 450
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              paddingLeft: 10
            }}
          >
            <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
              <FontAwesomeIcon icon={faBars} size={20} color={'#fff'} />
            </TouchableOpacity>
            <Image
              source={require('../assets/images/fsLogo.png')}
              style={{
                width: 34,
                height: 20
              }}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#033575',
              borderRadius: 20,

              padding: 20,
              marginVertical: 30,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2
              },
              shadowOpacity: 0.5,
              shadowRadius: 3.84,

              elevation: 5
            }}
          >
            <Image
              source={{ uri: BASE_PATH }}
              style={styles.sideMenuProfileIcon}
            />
            <View>
              <Text style={[styles.title, { color: '#fff' }]}>
                Hello,{' '}
                <Text style={[styles.titleName, { color: '#fff' }]}>
                  John Doe!
                </Text>
              </Text>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingTop: 5
                }}
              >
                <Text style={{ color: '#fff', paddingRight: 10 }}>
                  Complete your profile
                </Text>
                <FontAwesomeIcon icon={faAngleRight} size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
          {nop.length !== 0 ? (
            <Text
              style={{
                fontSize: 20,
                textAlign: 'center',
                color: '#fff',
                fontWeight: 'bold',

                backgroundColor: '#023E8A'
              }}
            >
              What would you like to do?
            </Text>
          ) : null}
        </View>

        {nop.length !== 0 ? (
          <View
            style={{
              backgroundColor: '#023E8A',
              height: 40,
              width: Dimensions.get('window').width
            }}
          ></View>
        ) : null}
        {nop.length === 0 ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <LottieView
              ref={animation}
              source={require('../assets/loadingAnimation.json')}
              autoPlay
              loop
            />
            {/* <Image source={require("../assets/loading.gif")} /> */}
          </View>
        ) : (
          <>
            <View
              style={{
                marginTop: -30,
                backgroundColor: '#fff',
                marginHorizontal: 20,
                borderRadius: 15,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2
                },
                shadowOpacity: 0.35,
                shadowRadius: 3.84,

                elevation: 15,
                padding: 5
              }}
            >
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  flexWrap: 'wrap',
                  marginHorizontal: 5
                }}
              >
                <Animated.View
                  style={[
                    styles.card,
                    {
                      backgroundColor: '#73A6FF',
                      opacity: fadeAnim // Bind opacity to animated value
                    }
                  ]}
                >
                  <Image
                    source={require('../assets/images/HomeHeader.png')}
                    style={{ zIndex: -1, position: 'absolute' }}
                  />
                  <TouchableOpacity
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      zIndex: 99
                    }}
                    onPress={() =>
                      props.navigation.navigate('MyPolicies', {
                        screen: 'Quote'
                      })
                    }
                  >
                    <View
                      style={{
                        backgroundColor: '#6097f7',
                        padding: 10,
                        borderRadius: 5
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faFileAlt}
                        size={25}
                        color="#fff"
                      />
                    </View>
                    <Text
                      style={{
                        color: '#fff',
                        paddingTop: 10,
                        fontWeight: 'bold',
                        fontSize: 16
                      }}
                    >
                      Get a Quote
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
                <Animated.View
                  style={[
                    styles.card,
                    {
                      backgroundColor: '#2CE4B8',
                      opacity: fadeAnim2 // Bind opacity to animated value
                    }
                  ]}
                >
                  <Image
                    source={require('../assets/images/HomeHeader.png')}
                    style={{ position: 'absolute', top: 0, right: 0 }}
                  />
                  <TouchableOpacity
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                    onPress={() =>
                      //props.navigation.reset('FNOLsubmission')
                      props.navigation.reset({
                        routes: [{ name: 'FNOLsubmission' }]
                      })
                    }
                  >
                    <View
                      style={{
                        backgroundColor: '#49f5cc',
                        padding: 10,
                        borderRadius: 5
                      }}
                    >
                      <FontAwesomeIcon icon={faPenAlt} size={25} color="#fff" />
                    </View>
                    <Text
                      style={{
                        color: '#fff',
                        paddingTop: 10,
                        fontWeight: 'bold',
                        fontSize: 16
                      }}
                    >
                      File a Claim
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
                <Animated.View
                  style={[
                    styles.card,
                    {
                      backgroundColor: '#FF87C4',
                      opacity: fadeAnim3 // Bind opacity to animated value
                    }
                  ]}
                >
                  <View
                    style={{
                      backgroundColor: '#fca9d4',
                      padding: 10,
                      borderRadius: 5
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faFileUpload}
                      size={25}
                      color="#fff"
                    />
                  </View>
                  <Text
                    style={{
                      color: '#fff',
                      paddingTop: 10,
                      fontWeight: 'bold',
                      fontSize: 16
                    }}
                  >
                    Add Docs
                  </Text>
                </Animated.View>

                <Animated.View
                  style={[
                    styles.card,
                    {
                      backgroundColor: '#1D64BE',
                      opacity: fadeAnim4 // Bind opacity to animated value
                    }
                  ]}
                >
                  <View
                    style={{
                      backgroundColor: '#447ec7',
                      padding: 10,
                      borderRadius: 5
                    }}
                  >
                    <FontAwesomeIcon icon={faUserEdit} size={25} color="#fff" />
                  </View>
                  <Text
                    style={{
                      color: '#fff',
                      paddingTop: 10,
                      fontWeight: 'bold',
                      fontSize: 16
                    }}
                  >
                    Edit Profile
                  </Text>
                </Animated.View>
              </View>
            </View>

            <Text
              style={{
                paddingLeft: 20,
                fontSize: 20,

                color: '#0A213E',
                fontWeight: 'bold',
                marginTop: 40
              }}
            >
              Know your products
            </Text>
            <View style={styles.policyCard}>
              <ImageBackground
                source={require('../assets/images/policy.png')}
                style={{
                  ...StyleSheet.absoluteFill
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    alignItems: 'center'
                  }}
                >
                  <View style={{ paddingLeft: 25, flex: 0.9 }}>
                    <Text style={{ color: '#fff', fontSize: 25 }}>
                      My Policies
                    </Text>
                    <View>
                      <Text style={{ color: '#1AC29A', fontWeight: 'bold' }}>
                        Number of active policies: {nop}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('MyPolicies',{screen:'PolicyList'})}
                  >
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      size={20}
                      color={'#fff'}
                    />
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </View>
            <View style={styles.policyCard}>
              <ImageBackground
                source={require('../assets/images/claim.png')}
                style={{
                  ...StyleSheet.absoluteFill
                }}
              >
                {/* <View
                  style={{
                    padding: 20,
                    backgroundColor: '#8036ff',
                    alignItems: 'center'
                  }}
                >
                  <Text style={{ color: '#fff', fontSize: 18 }}>My Claims</Text>
                </View> */}
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    alignItems: 'center'
                  }}
                >
                  <View style={{ paddingLeft: 25, flex: 0.9 }}>
                    <Text style={{ color: '#fff', fontSize: 25 }}>
                      My Claims
                    </Text>
                    <View>
                      <Text style={{ color: '#1AC29A', fontWeight: 'bold' }}>
                        Number of Claims: {noc}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('MyClaims')}
                  >
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      size={20}
                      color={'#fff'}
                    />
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </View>
            <View style={styles.policyCard}>
              <ImageBackground
                source={require('../assets/images/renew.png')}
                style={{
                  ...StyleSheet.absoluteFill
                }}
              >
                {/* <View
                  style={{
                    padding: 20,
                    backgroundColor: '#5e804b',
                    alignItems: 'center'
                  }}
                >
                  <Text style={{ color: '#fff', fontSize: 18 }}>
                    Renew Policy
                  </Text>
                </View> */}
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    alignItems: 'center'
                  }}
                >
                  <View style={{ paddingLeft: 25, flex: 0.9 }}>
                    <Text style={{ color: '#fff', fontSize: 20 }}>
                      Renew Policy
                    </Text>
                    <Text style={{ color: '#FB682A', fontWeight: 'bold' }}>
                      2 Renewals
                    </Text>
                  </View>
                  <TouchableOpacity>
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      size={20}
                      color={'#fff'}
                    />
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  numbers: {
    color: '#000',
    fontSize: 25,
    borderRadius: 15,
    padding: 15,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 40,
    height: 40,
    borderRadius: 40,
    alignSelf: 'center',
    marginRight: 15
  },
  title: {
    fontSize: 20,
    color: '#000'
  },
  titleName: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold'
  },
  card: {
    padding: 10,
    width: 45 + '%',
    height: 120,
    borderRadius: 5,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    overflow: 'hidden'
  },
  policyCard: {
    marginHorizontal: 20,
    borderRadius: 15,
    marginVertical: 10,
    overflow: 'hidden',
    height: 120
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2
    // },
    // shadowOpacity: 0.35,
    // shadowRadius: 3.84,
    // elevation: 15
  }
});
