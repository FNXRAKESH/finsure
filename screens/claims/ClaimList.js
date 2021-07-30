import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Animated,
  StatusBar,
  Image
} from 'react-native';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSync, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import LottieView from 'lottie-react-native';
import { SharedElement } from 'react-navigation-shared-element';

var Bearer;
const spacing = 25;
const ht = 100;
const ITEM_SIZE = ht + spacing * 2;
const ClaimList = (props) => {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  Bearer = 'Bearer ' + props.route.params.accessToken;
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(1);
  const { navigate } = useNavigation();
  useEffect(() => {
    getClaims();
  }, []);
  const getClaims = () => {
    setLoading(true);
    fetch(
      `https://ackofinaldemo-dev-ed.my.salesforce.com/services/data/v50.0/query/?q=SELECT+Name,PolicyNumberId,InsuredAssetId,ClaimType,LossType,EstimatedAmount,ActualAmount,ApprovedAmount,InitiationDate,AssessmentDate,FinalizedDate,LossDate,CreatedDate,Status+FROM+Claim+OFFSET+${offset}`,
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
        console.log(data.records[0]);
        var arr = data.records.sort((a, b) =>
          b.CreatedDate.localeCompare(a.CreatedDate)
        );
        setOffset(offset + 1);
        setClaims(arr);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  const renderFooter = () => {
    return (
      //Footer View with Load More button
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={getClaims}
          //On Click of button load more data
          style={styles.loadMoreBtn}
        >
          <Text style={styles.btnText}>Load More</Text>
          {loading ? (
            <ActivityIndicator color="black" style={{ marginLeft: 8 }} />
          ) : null}
        </TouchableOpacity>
      </View>
    );
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
          props.navigation.navigate('MainScreen');
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} size={16} color={'#000'} />
        <Text style={{ fontSize: 22, paddingLeft: 15, color: '#000' }}>
          My Claims
        </Text>
      </TouchableOpacity>
      {claims.length === 0 ? (
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
          data={claims}
          keyExtractor={(item, index) => item.Name + index}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          contentContainerStyle={{
            padding: spacing
          }}
          renderItem={({ item, index }) => {
            const inputRange = [
              -1,
              0,
              ITEM_SIZE * index,
              ITEM_SIZE * (index + 2)
            ];
            const OpacityinputRange = [
              -1,
              0,
              ITEM_SIZE * index,
              ITEM_SIZE * (index + 0.5)
            ];
            const scale = scrollY.interpolate({
              inputRange,
              outputRange: [1, 1, 1, 0]
            });
            const opacity = scrollY.interpolate({
              inputRange: OpacityinputRange,
              outputRange: [1, 1, 1, 1]
            });
            return (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  props.navigation.navigate('ClaimDetail', {
                    item,
                    index,
                    Bearer: props.route.params.accessToken
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
                <Animated.View
                  key={index}
                  style={[
                    styles.Claim,
                    {
                      opacity,
                      transform: [{ scale }]
                    }
                  ]}
                >
                  <SharedElement
                    id={`claim.${item.Name}.${index}`}
                    style={{ height: 30, width: 30 }}
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
                  <View style={{ padding: 20 }}>
                    <SharedElement id={`${item.Name}.${index}`}>
                      <Text style={{ fontSize: 23 }}>{item.Name}</Text>
                    </SharedElement>
                    {item.CreatedDate === null ? (
                      <Text style={{}}>Null</Text>
                    ) : (
                      <Text style={{}}>
                        {moment(item.CreatedDate).format('LL')} - {item.Status}
                      </Text>
                    )}
                  </View>
                </Animated.View>
              </TouchableOpacity>
            );
          }}
          ListFooterComponent={renderFooter}
          onEndReached={getClaims}
          onEndReachedThreshold={0.1}
        />
      )}

      {/* <TouchableOpacity
        style={{ position: 'absolute', bottom: 20, right: 20 }}
        onPress={getClaims}
      >
        <View
          style={{ backgroundColor: '#8036ff', padding: 10, borderRadius: 15 }}
        >
          <FontAwesomeIcon icon={faSync} color={'#fff'} size={30} />
        </View>
      </TouchableOpacity> */}
    </View>
  );
};

export default ClaimList;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  Claim: {
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
  },
  btnText: {
    textAlign: 'center',
    paddingVertical: 15
  }
});
