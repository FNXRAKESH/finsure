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
import DatePicker from 'react-native-datepicker';
import { BottomNavigation, RadioButton } from 'react-native-paper';

const HealthInformation = (props) => {
  const [Systolic, setSystolic] = useState('');
  const [Diastolic, setDiastolic] = useState('');
  const [bpMedicine, setBpMedicine] = useState('No');
  const [parentsHealth, setParentsHealth] = useState('No');

  const AddDriverDetails = () => {
    props.navigation.navigate('OtherMedicalConditions', {
      Systolic,
      Diastolic,

      parentsHealth,
      bpMedicine
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: '#fff' }]}>
      <View style={{ flex: 1, padding: 20 }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 30
          }}
          onPress={() => {
            props.navigation.navigate('CustomerForm');
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} size={16} color={'#000'} />
          <Text style={{ fontSize: 22, paddingLeft: 15, color: '#000' }}>
            Health Information
          </Text>
        </TouchableOpacity>
        <ScrollView
          keyboardShouldPersistTaps="always"
          centerContent={true}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={{ marginVertical: 5 }}>
            <Text style={{ paddingVertical: 15, fontSize: 16 }}>
              Systolic Blood Pressure
            </Text>
            <TextInput
              placeholder="Systolic Blood Pressure"
              style={styles.textInput}
              value={Systolic}
              onChangeText={(e) => setSystolic(e)}
            />
          </View>
          <View style={{ marginVertical: 5 }}>
            <Text style={{ paddingVertical: 15, fontSize: 16 }}>
              Diastolic Blood Pressure
            </Text>
            <TextInput
              placeholder="Diastolic Blood Pressure"
              style={styles.textInput}
              value={Diastolic}
              onChangeText={(e) => setDiastolic(e)}
            />
          </View>

          <Text style={{ fontSize: 16, paddingTop: 15 }}>
            Blood Pressure Medicine
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableWithoutFeedback onPress={() => setBpMedicine('No')}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton
                  value="No"
                  status={bpMedicine === 'No' ? 'checked' : 'unchecked'}
                  color="#518EF8"
                  onPress={() => setBpMedicine('No')}
                />
                <Text
                  style={
                    bpMedicine === 'No'
                      ? [styles.title, { color: '#518EF8' }]
                      : [styles.title, { color: '#000' }]
                  }
                >
                  No
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => setBpMedicine('Yes')}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton
                  value="Yes"
                  status={bpMedicine === 'Yes' ? 'checked' : 'unchecked'}
                  color="#518EF8"
                  onPress={() => setBpMedicine('Yes')}
                />
                <Text
                  style={
                    bpMedicine === 'Yes'
                      ? [styles.title, { color: '#518EF8' }]
                      : [styles.title, { color: '#000' }]
                  }
                >
                  Yes
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <Text style={{ fontSize: 16, paddingTop: 15 }}>
            Have either Parents suffered from Cancer or Heart Disease?
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 0, alignItems:'flex-start' }}
             
          >
            <TouchableWithoutFeedback onPress={() => setParentsHealth('No')}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton
                  value="No"
                  status={parentsHealth === 'No' ? 'checked' : 'unchecked'}
                  color="#518EF8"
                  onPress={() => setParentsHealth('No')}
                />
                <Text
                  style={
                    parentsHealth === 'No'
                      ? [styles.title, { color: '#518EF8' }]
                      : [styles.title, { color: '#000' }]
                  }
                >
                  No
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => setParentsHealth('One Parent')}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton
                  value="One Parent"
                  status={
                    parentsHealth === 'One Parent' ? 'checked' : 'unchecked'
                  }
                  color="#518EF8"
                  onPress={() => setParentsHealth('One Parent')}
                />
                <Text
                  style={
                    parentsHealth === 'One Parent'
                      ? [styles.title, { color: '#518EF8' }]
                      : [styles.title, { color: '#000' }]
                  }
                >
                  Just One Parent
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => setParentsHealth('Both Parents')}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton
                  value="Both Parents"
                  status={
                    parentsHealth === 'Both Parents' ? 'checked' : 'unchecked'
                  }
                  color="#518EF8"
                  onPress={() => setParentsHealth('Both Parents')}
                />
                <Text
                  style={
                    parentsHealth === 'Both Parents'
                      ? [styles.title, { color: '#518EF8' }]
                      : [styles.title, { color: '#000' }]
                  }
                >
                  Both Parents
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </ScrollView>
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
            props.navigation.navigate('CustomerForm');
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
            2<Text style={{ fontWeight: 'normal' }}>/5</Text>
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            AddDriverDetails();
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

export default HealthInformation;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  gender: {
    backgroundColor: '#f2f2f2',
    borderRadius: 5,

    padding: 15,
    marginRight: 10,
    marginVertical: 10
  },

  textInput: {
    fontSize: 16,
    backgroundColor: '#f8f8f8',

    padding: 20,
    borderRadius: 5
  },
  title: {
    fontSize: 16,
    paddingRight: 10,
    paddingVertical: 10
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

    width: Dimensions.get('window').width - 20
  },
  footerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  }
});
