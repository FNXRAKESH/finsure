import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Modal
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons';
import Slider from '@react-native-community/slider';
var Bearer, claimId;
const CoverageNeeded = (props) => {
  const [sliderValue, setSliderValue] = useState(10);
  const [terms, setTerms] = useState(0);
  return (
    <View style={[styles.container, { backgroundColor: '#fff' }]}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 30,
          paddingHorizontal: 20
        }}
        onPress={() => {
          props.navigation.navigate('UploadReport');
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} size={16} color={'#000'} />
        <Text style={{ fontSize: 22, paddingLeft: 15, color: '#000' }}>
          Coverage Information
        </Text>
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={{ fontSize: 20, padding: 15, color: '#000' }}>
          How much coverage is good for me?
        </Text>
        <View style={{ alignItems: 'center', margin: 20 }}>
          <Text style={{ fontSize: 18, color: '#000' }}>
            {sliderValue === 100 ? 1 : sliderValue}{' '}
            {sliderValue === 100 ? 'Crore' : 'Lakhs'}
          </Text>
          <Slider
            style={{ width: Dimensions.get('window').width - 40, height: 40 }}
            minimumValue={5}
            maximumValue={100}
            thumbTintColor="#63AFE8"
            step={5}
            value={sliderValue}
            minimumTrackTintColor="#1AC29A"
            maximumTrackTintColor="gray"
            onValueChange={(value) => setSliderValue(value)}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: Dimensions.get('window').width - 40
            }}
          >
            <Text>Rs. 5 Lakhs</Text>
            <Text>Rs. 1 Crore</Text>
          </View>
        </View>
        <View style={{ padding: 15 }}>
          <Text style={{ fontSize: 22, paddingVertical:15 }}>Terms (in years)</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              style={
                terms === '5'
                  ? [styles.commuteView, { backgroundColor: '#518EF8' }]
                  : [styles.commuteView, { backgroundColor: '#f8f8f8' }]
              }
              onPress={() => {
                setTerms('5');
              }}
            >
              <Text
                style={
                  terms === '5'
                    ? [styles.title, { color: '#fff' }]
                    : [styles.title, { color: '#000' }]
                }
              >
                &nbsp;5
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                terms === '10'
                  ? [styles.commuteView, { backgroundColor: '#518EF8' }]
                  : [styles.commuteView, { backgroundColor: '#f8f8f8' }]
              }
              onPress={() => {
                setTerms('10');
              }}
            >
              <Text
                style={
                  terms === '10'
                    ? [styles.title, { color: '#fff' }]
                    : [styles.title, { color: '#000' }]
                }
              >
                10
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                terms === '15'
                  ? [styles.commuteView, { backgroundColor: '#518EF8' }]
                  : [styles.commuteView, { backgroundColor: '#f8f8f8' }]
              }
              onPress={() => {
                setTerms('15');
              }}
            >
              <Text
                style={
                  terms === '15'
                    ? [styles.title, { color: '#fff' }]
                    : [styles.title, { color: '#000' }]
                }
              >
                15
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                terms === '20'
                  ? [styles.commuteView, { backgroundColor: '#518EF8' }]
                  : [styles.commuteView, { backgroundColor: '#f8f8f8' }]
              }
              onPress={() => {
                setTerms('20');
              }}
            >
              <Text
                style={
                  terms === '20'
                    ? [styles.title, { color: '#fff' }]
                    : [styles.title, { color: '#000' }]
                }
              >
                20
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                terms === '50'
                  ? [styles.commuteView, { backgroundColor: '#518EF8' }]
                  : [styles.commuteView, { backgroundColor: '#f8f8f8' }]
              }
              onPress={() => {
                setTerms('50');
              }}
            >
              <Text
                style={
                  terms === '50'
                    ? [styles.title, { color: '#fff' }]
                    : [styles.title, { color: '#000' }]
                }
              >
                50
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
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
            props.navigation.navigate('UploadReport');
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
            5<Text style={{ fontWeight: 'normal' }}>/5</Text>
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('QuickQuote', {
              claimId: claimId
            });
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

export default CoverageNeeded;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  commuteView: {
    padding: 5,
    borderRadius: 15,
    margin: 5,
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
