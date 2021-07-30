import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faCheck,
  faChevronDown,
  faMap
} from '@fortawesome/free-solid-svg-icons';
import { Transition, Transitioning } from 'react-native-reanimated';

const transition = (
  <Transition.Together>
    <Transition.In type={'fade'} durationMs={200} />
    <Transition.Change />
    <Transition.Out type={'fade'} durationMs={200} />
  </Transition.Together>
);
const data = [
  {
    category: 'Personal Details',
    subCategory: [32, 'Male']
  },
  {
    category: 'Plan Details',
    subCategory: ['Exide Life Term Insurance Plan', 'Rs. 8684/yr']
  },
  {
    category: 'Total Model Premium',
    subCategory: ['Rs. 8684/yr', 'Rs.1557/yr', 'Rs. 10205 /yr']
  }
];
const Confirmation = (props) => {
  const [currentIndex, setCurrentIndex] = useState(null);
  const ref = React.useRef();
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
          props.navigation.navigate('QuickQuote');
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} size={16} color={'#000'} />
        <Text style={{ fontSize: 22, paddingLeft: 15, color: '#000' }}>
          Confirmation
        </Text>
      </TouchableOpacity>
      <View style={{flex:1}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            marginBottom: 5
          }}
        >
          <View
            style={{
              height: 200,
              zIndex: -99
            }}
          >
            <Image
              source={require('../../../../assets/images/AccountCreated.png')}
              style={{ height: null, width: null, flex: 1 }}
              resizeMode="contain"
            />
          </View>
          <Text
            style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center' }}
          >
            Purchase Successful!
          </Text>
          <Text style={{ textAlign: 'center', padding: 10, fontSize: 18 }}>
            Thank you for purchasing the life term policy. Here are your policy
            details.
          </Text>
          <Transitioning.View ref={ref} transition={transition}>
            {data.map((info, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    ref.current.animateNextTransition();
                    setCurrentIndex(index === currentIndex ? null : index);
                  }}
                  style={styles.cards}
                >
                  <View style={{flexDirection:'row', alignItems:'center', paddingHorizontal:10}}>
                    <Text style={styles.cardTitle}>{info.category}</Text>
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      size={16}
                      color={'#000'}
                    />
                  </View>
                  {index === currentIndex && (
                    <View>
                      {info.subCategory.map((sub, i) => {
                        return (
                          <View style={styles.subCategory} key={i}>
                            <Text style={{ color: '#000' }}>{sub}</Text>
                          </View>
                        );
                      })}
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </Transitioning.View>
          <View style={{ padding: 15, flexGrow: 1 }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                props.navigation.navigate('MainScreen');
              }}
            >
              <Text
                style={{ color: 'white', fontSize: 20, textAlign: 'center' }}
              >
                Done
              </Text>
            </TouchableOpacity>
          </View>
           
           
        </ScrollView>
      </View>
    </View>
  );
};

export default Confirmation;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1
  },
  button: {
    marginVertical: 25,
    backgroundColor: '#1AC29A',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    justifyContent: 'center'
  },
  cards: {
    backgroundColor: '#fff',
    marginVertical: 5,
    borderRadius: 3,
    marginHorizontal: 15
  },
  cardTitle: {
    fontSize: 18,
    color: '#000',
    paddingVertical: 15,
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    flexGrow:1
  },
  subCategory: {
    paddingHorizontal: 15,
    paddingVertical: 5
  }
});
