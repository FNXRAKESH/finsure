import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar,
  Dimensions
} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faSync,
  faArrowRight,
  faArrowLeft,
  faTimes,
  faChevronCircleLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import LottieView from 'lottie-react-native';

var returnedTarget = [];
var Bearer;
const spacing = 25;
const ht = 100;
const ITEM_SIZE = ht + spacing * 2;

class PolicyList extends Component {
  scrollY = new Animated.Value(0);
  constructor(props) {
    super(props);
    Bearer = 'Bearer ' + this.props.route.params.accessToken;
  }
  state = { policies: [], asset: [], loading: true, offset: 1 };
  // const { navigate } = useNavigation();

  componentDidMount = () => {
    this.getPolicy();
  };

  getPolicy = async () => {
    const response = await fetch(
      `https://ackofinaldemo-dev-ed.my.salesforce.com/services/data/v50.0/query/?q=SELECT+NameInsuredId,Id,Name,UniversalPolicyNumber,PolicyType,EffectiveDate,ExpirationDate,Status+FROM+InsurancePolicy`,
      {
        method: 'GET',
        headers: {
          Authorization: Bearer,
          'Content-Type': 'application/json'
        }
      }
    );
    const body = await response.json();
    this.setState({ policies: body.records }, () => {
      console.log(this.state.asset.length);
      this.getAsset();
    });
  };

  getAsset = () => {
    this.setState({ asset: [] });
    this.state.policies &&
      this.state.policies.map((e) => {
        fetch(
          `https://ackofinaldemo-dev-ed.my.salesforce.com/services/data/v50.0/query/?q=select+CustomerProperty.Make,CustomerProperty.ModelName,InsurancePolicyId+from+InsurancePolicyAsset+where+InsurancePolicyId='${e.Id}'`,
          {
            method: 'GET',
            headers: {
              Authorization: Bearer,
              'Content-Type': 'application/json'
            }
          }
        )
          .then((response) => response.json())
          .then((data2) => {
            data2.records.forEach((element) => {
              if (element.InsurancePolicyId === e.Id) {
                var obj = Object.assign(element.CustomerProperty, e);
                if (returnedTarget.indexOf(obj) !== -1) {
                } else {
                  returnedTarget.push(obj);
                }
              }
            });
          })
          .then(() => {
            this.setState({ asset: returnedTarget });
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      });
  };

  render() {
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
            this.props.navigation.navigate('MainScreen');
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} size={16} color={'#000'} />
          <Text style={{ fontSize: 22, paddingLeft: 15, color: '#000' }}>
            My Policies
          </Text>
        </TouchableOpacity>
        {this.state.policies.length === 0 ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <LottieView
              source={require('../../assets/claimsAnimation.json')}
              autoPlay
              style={{ width: 300, height: 300 }}
              loop
            />
          </View>
        ) : (
          <Animated.FlatList
            data={this.state.asset}
            keyExtractor={(item, index) => index.toString()}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.scrollY } } }],
              { useNativeDriver: true }
            )}
            contentContainerStyle={{
              padding: 20,
              paddingTop: StatusBar.currentHeight || 42
            }}
            renderItem={({ item, index }) => {
              const inputRange = [
                -1,
                0,
                ITEM_SIZE * index,
                ITEM_SIZE * (index + 1)
              ];
              const OpacityinputRange = [
                -1,
                0,
                ITEM_SIZE * index,
                ITEM_SIZE * (index + 0.5)
              ];
              const scale = this.scrollY.interpolate({
                inputRange,
                outputRange: [1, 1, 1, 0]
              });
              const opacity = this.scrollY.interpolate({
                inputRange: OpacityinputRange,
                outputRange: [1, 1, 1, 0]
              });
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    this.props.navigation.navigate('PolicyDetail', {
                      item,
                      index,
                      Bearer: this.props.route.params.accessToken,
                      UniversalPolicyNumber: item.UniversalPolicyNumber
                    })
                  }
                  style={[
                    {
                      height: ht + spacing * 2,
                      opacity,
                      transform: [{ scale }]
                    }
                  ]}
                >
                  <View style={styles.Policy}>
                    {item.PolicyType === 'Auto' ? (
                      <SharedElement
                        id={`${item.Id}.${index}`}
                        style={{ height: 80, width: 80 }}
                      >
                        <Image
                          source={require('../../assets/images/carInsurance.png')}
                          resizeMode="contain"
                          style={{
                            flex: 1,
                            width: null,
                            height: null
                          }}
                        />
                      </SharedElement>
                    ) : (
                      <SharedElement
                        id={`${item.Id}.${index}`}
                        style={{ height: 80, width: 80 }}
                      >
                        <Image
                          source={require('../../assets/images/homeInsurance.png')}
                          resizeMode="contain"
                          style={{
                            flex: 1,
                            width: null,
                            height: null
                          }}
                        />
                      </SharedElement>
                    )}

                    <View
                      style={{
                        borderColor: '#00a3f5',
                        paddingLeft: 30,
                        flex: 1
                      }}
                    >
                      <SharedElement id={`policy.${item.Id}.${index}`}>
                        <Text style={{ fontSize: 23 }}>{item.Name}</Text>
                      </SharedElement>

                      <Text
                        style={
                          item.Status === 'Initial'
                            ? [styles.status, { color: '#1AC29A' }]
                            : [styles.status, { color: '#C2931A' }]
                        }
                      >
                        Status: {item.Status}
                      </Text>
                    </View>
                    <View>
                      <FontAwesomeIcon icon={faChevronRight} size={14} />
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )}

        {/* <TouchableOpacity
          style={{ position: 'absolute', bottom: 20, right: 20 }}
          onPress={() => this.getPolicy}
        >
          <View
            style={{
              backgroundColor: '#00a3f5',
              padding: 10,
              borderRadius: 15
            }}
          >
            <FontAwesomeIcon icon={faSync} color={'#fff'} size={30} />
          </View>
        </TouchableOpacity> */}
      </View>
    );
  }
}

export default PolicyList;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  Policy: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 0.5,

    elevation: 15,
    backgroundColor: '#fff',
    flex: 0.9,
    paddingHorizontal: 20
  },
  status: {
    fontSize: 20,
    color: '#FF786D',
    paddingVertical: 10
  }
});
