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
  faCheck,
  faChevronDown,
  faEdit,
  faPen,
  faPenAlt
} from '@fortawesome/free-solid-svg-icons';
import Slider from '@react-native-community/slider';
import { useEffect } from 'react';
const lifeCover = [
  5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 1
];
const modeOfPayment = ['Monthly', 'Quarterly', 'Half-Yearly', 'Annually'];
const NumberOfTerms = [5, 10, 15, 20, 50];
const QuickQuote = (props) => {
  const [covermodalVisible, setCoverModalVisible] = useState(false);
  const [modemodalVisible, setModeModalVisible] = useState(false);
  const [termmodalVisible, setTermModalVisible] = useState(false);
  const [cover, setCover] = useState('50 lakhs');
  const [term, setTerm] = useState(20);
  const [mode, setMode] = useState('Annually');
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    setAmount(Math.floor(1000 + Math.random() * 5000));
  }, [cover, mode, term]);
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
          props.navigation.navigate('CoverageNeeded');
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} size={16} color={'#000'} />
        <Text style={{ fontSize: 22, paddingLeft: 15, color: '#000' }}>
          Quote Information
        </Text>
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={{ fontSize: 18, color: '#000', textAlign: 'center' }}>
          Your highest money saver Quote
        </Text>
        <View
          style={{
            margin: 20
          }}
        >
          <TouchableOpacity
            onPress={() => setCoverModalVisible(!covermodalVisible)}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: '#F8F8F8',
              padding: 15,
              borderRadius: 5,
              marginVertical: 10
            }}
          >
            <Text style={{ textAlign: 'center', fontSize: 16, color: '#000' }}>
              Life Cover
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{ textAlign: 'center', fontSize: 16, color: '#025AAA' }}
              >
                {cover}{' '}
              </Text>
              <FontAwesomeIcon icon={faChevronDown} color={'grey'} size={12} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setModeModalVisible(!modemodalVisible)}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: '#F8F8F8',
              padding: 15,
              borderRadius: 5,
              marginVertical: 10
            }}
          >
            <Text style={{ textAlign: 'center', fontSize: 16, color: '#000' }}>
              Payment Mode
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{ textAlign: 'center', fontSize: 16, color: '#025AAA' }}
              >
                {mode}{' '}
              </Text>
              <FontAwesomeIcon icon={faChevronDown} color={'grey'} size={12} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setTermModalVisible(!termmodalVisible)}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: '#F8F8F8',
              padding: 15,
              borderRadius: 5,
              marginVertical: 10
            }}
          >
            <Text style={{ textAlign: 'center', fontSize: 16, color: '#000' }}>
              Policy Term
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{ textAlign: 'center', fontSize: 16, color: '#025AAA' }}
              >
                {term + ' years'}{' '}
              </Text>
              <FontAwesomeIcon icon={faChevronDown} color={'grey'} size={12} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.planView}>
          <Text style={{ fontSize: 18, color: '#fff' }}>Smart Secure Plus</Text>
          <View style={{ marginVertical: 15 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesomeIcon icon={faCheck} size={16} color={'#1AC29A'} />
              <Text
                style={{
                  fontSize: 16,

                  padding: 10,
                  color: '#fff'
                }}
              >
                Elite Term Insurance Plan
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesomeIcon icon={faCheck} size={16} color={'#1AC29A'} />
              <Text style={{ fontSize: 16, color: '#fff', padding: 10 }}>
                Please review your benefit illustration details
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('StripePayment');
            }}
            style={[
              styles.footerButton,
              {
                backgroundColor: '#1AC29A',
                marginVertical: 10,
                borderRadius: 5
              }
            ]}
          >
            <Text style={{ color: '#fff', padding: 20, fontSize: 20 }}>
              Pay Rs. {amount} per month
            </Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent
          visible={modemodalVisible}
          onRequestClose={() => setModeModalVisible(!modemodalVisible)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {modeOfPayment.map((element, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{ paddingVertical: 2 }}
                    onPress={() => {
                      setModeModalVisible(!modemodalVisible);
                      setMode(element);
                    }}
                  >
                    <Text
                      style={
                        mode === element
                          ? [styles.title, { color: '#518EF8', fontSize: 22 }]
                          : [styles.title, { color: '#000', fontSize: 18 }]
                      }
                    >
                      {element}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent
          visible={covermodalVisible}
          onRequestClose={() => setCoverModalVisible(!covermodalVisible)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {lifeCover.map((element, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{ paddingVertical: 2 }}
                    onPress={() => {
                      setCoverModalVisible(!covermodalVisible);
                      {
                        element !== 1
                          ? setCover(element + ' lakhs')
                          : setCover(element + ' crore');
                      }
                    }}
                  >
                    <Text
                      style={
                        cover === element + ' lakhs'
                          ? [styles.title, { color: '#518EF8', fontSize: 22 }]
                          : [styles.title, { color: '#000', fontSize: 18 }]
                      }
                    >
                      {element !== 1 ? element + ' lakhs' : element + ' crore'}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent
          visible={termmodalVisible}
          onRequestClose={() => setTermModalVisible(!termmodalVisible)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {NumberOfTerms.map((element, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{ paddingVertical: 2 }}
                    onPress={() => {
                      setTermModalVisible(!termmodalVisible);
                      setTerm(element);
                    }}
                  >
                    <Text
                      style={
                        term === element
                          ? [styles.title, { color: '#518EF8', fontSize: 22 }]
                          : [styles.title, { color: '#000', fontSize: 18 }]
                      }
                    >
                      {element}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </Modal>
      </ScrollView>
      {/* <View
        style={{
          flexDirection: 'row',
          width: Dimensions.get('window').width,
          backgroundColor: '#1AC29A'
        }}
      >
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('CoverageNeeded');
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
            1<Text style={{ fontWeight: 'normal' }}>/3</Text>
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Confirmation');
          }}
          style={styles.footerButton}
        >
          <Text style={{ color: '#fff', padding: 20, fontSize: 20 }}>Pay</Text>
          <FontAwesomeIcon icon={faArrowRight} size={18} color={'#fff'} />
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default QuickQuote;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
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
    width: Dimensions.get('window').width - 40,
    justifyContent: 'center'
  },
  footerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  planView: {
    backgroundColor: '#0A213E',
    margin: 20,
    padding: 20,
    borderRadius: 5
  }
});
