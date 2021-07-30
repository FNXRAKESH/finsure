import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Button,
  Dimensions
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { RadioButton } from 'react-native-paper';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const CarUsage = (props) => {
  const [commute, setCommute] = useState('');
  const [distance, setDistance] = useState('');
  const [checked, setChecked] = useState('Commute to Work');

  const AddCarDetails = () => {
    props.navigation.navigate('InsuranceType', {
      ...props.route.params,
      PrimaryUse: commute,
      MilesDrivenToWork: distance
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: '#fff' }]}>
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 30
          }}
          onPress={() => {
            props.navigation.navigate('CarDetails');
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} size={16} color={'#000'} />
          <Text style={{ fontSize: 22, paddingLeft: 15, color: '#000' }}>
            Car Details
          </Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 22, paddingBottom: 10 }}>
          I primarily use my car to
        </Text>
        <View style={{ paddingBottom: 20 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableWithoutFeedback
              onPress={() => setCommute('Commute to Work')}
              style={
                commute === 'Commute to Work'
                  ? [styles.commuteView, { backgroundColor: '#518EF8' }]
                  : [styles.commuteView, { backgroundColor: '#f8f8f8' }]
              }
            >
              <Text
                style={
                  commute === 'Commute to Work'
                    ? [styles.title, { color: '#fff' }]
                    : [styles.title, { color: 'grey' }]
                }
              >
                Commute to Work
              </Text>
              <RadioButton
                value="Commute to Work"
                status={commute === 'Commute to Work' ? 'checked' : 'unchecked'}
                color="#fff"
                onPress={() => setCommute('Commute to Work')}
              />
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={() => setCommute('Commute to School')}
              style={
                commute === 'Commute to School'
                  ? [styles.commuteView, { backgroundColor: '#518EF8' }]
                  : [styles.commuteView, { backgroundColor: '#f8f8f8' }]
              }
            >
              <Text
                style={
                  commute === 'Commute to School'
                    ? [styles.title, { color: '#fff' }]
                    : [styles.title, { color: 'grey' }]
                }
              >
                Commute to School
              </Text>
              <RadioButton
                value="Commute to School"
                status={
                  commute === 'Commute to School' ? 'checked' : 'unchecked'
                }
                color="#fff"
                onPress={() => setCommute('Commute to School')}
              />
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={() => setCommute('Commute to Vacation')}
              style={
                commute === 'Commute to Vacation'
                  ? [styles.commuteView, { backgroundColor: '#518EF8' }]
                  : [styles.commuteView, { backgroundColor: '#f8f8f8' }]
              }
              onPress={() => {
                setCommute('Commute to Vacation');
              }}
            >
              <Text
                style={
                  commute === 'Commute to Vacation'
                    ? [styles.title, { color: '#fff' }]
                    : [styles.title, { color: 'grey' }]
                }
              >
                Vacation / Pleasure
              </Text>
              <RadioButton
                value="Commute to Vacation"
                status={
                  commute === 'Commute to Vacation' ? 'checked' : 'unchecked'
                }
                color="#fff"
                onPress={() => setCommute('Commute to Vacation')}
              />
            </TouchableWithoutFeedback>
          </ScrollView>
        </View>
        <View>
          <Text style={{ fontSize: 22, paddingVertical: 5 }}>
            Distance each way (in miles)
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            indicatorStyle="black"
          >
            <TouchableOpacity
              style={
                distance === '5'
                  ? [styles.commuteView, { backgroundColor: '#518EF8' }]
                  : [styles.commuteView, { backgroundColor: '#f8f8f8' }]
              }
              onPress={() => {
                setDistance('5');
              }}
            >
              <Text
                style={
                  distance === '5'
                    ? [styles.title, { color: '#fff' }]
                    : [styles.title, { color: '#000' }]
                }
              >
                &nbsp;5
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                distance === '10'
                  ? [styles.commuteView, { backgroundColor: '#518EF8' }]
                  : [styles.commuteView, { backgroundColor: '#f8f8f8' }]
              }
              onPress={() => {
                setDistance('10');
              }}
            >
              <Text
                style={
                  distance === '10'
                    ? [styles.title, { color: '#fff' }]
                    : [styles.title, { color: '#000' }]
                }
              >
                10
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                distance === '15'
                  ? [styles.commuteView, { backgroundColor: '#518EF8' }]
                  : [styles.commuteView, { backgroundColor: '#f8f8f8' }]
              }
              onPress={() => {
                setDistance('15');
              }}
            >
              <Text
                style={
                  distance === '15'
                    ? [styles.title, { color: '#fff' }]
                    : [styles.title, { color: '#000' }]
                }
              >
                15
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                distance === '25'
                  ? [styles.commuteView, { backgroundColor: '#518EF8' }]
                  : [styles.commuteView, { backgroundColor: '#f8f8f8' }]
              }
              onPress={() => {
                setDistance('25');
              }}
            >
              <Text
                style={
                  distance === '25'
                    ? [styles.title, { color: '#fff' }]
                    : [styles.title, { color: '#000' }]
                }
              >
                25
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                distance === '50'
                  ? [styles.commuteView, { backgroundColor: '#518EF8' }]
                  : [styles.commuteView, { backgroundColor: '#f8f8f8' }]
              }
              onPress={() => {
                setDistance('50');
              }}
            >
              <Text
                style={
                  distance === '50'
                    ? [styles.title, { color: '#fff' }]
                    : [styles.title, { color: '#000' }]
                }
              >
                50
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                distance === '75+'
                  ? [styles.commuteView, { backgroundColor: '#518EF8' }]
                  : [styles.commuteView, { backgroundColor: '#f8f8f8' }]
              }
              onPress={() => {
                setDistance('75+');
              }}
            >
              <Text
                style={
                  distance === '75+'
                    ? [styles.title, { color: '#fff' }]
                    : [styles.title, { color: '#000' }]
                }
              >
                75+
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          width: Dimensions.get('window').width,
          backgroundColor: '#1AC29A'
        }}
      >
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('CarDetails');
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
            2<Text style={{ fontWeight: 'normal' }}>/10</Text>
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            AddCarDetails();
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

export default CarUsage;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  commuteView: {
    padding: 15,
    borderRadius: 5,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: 22,
    padding: 15,
    flex: 1
  },
  footerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  }
});
