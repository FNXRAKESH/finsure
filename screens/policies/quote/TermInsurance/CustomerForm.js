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
  Modal,
  KeyboardAvoidingView
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-native-datepicker';
import { RadioButton } from 'react-native-paper';

const CustomerForm = (props) => {
  const [FirstName, setFirstName] = useState('Olivia');
  const [LastName, setLastName] = useState('Jayden');
  const [Birthdate, setDateOfBirth] = useState(new Date());
  const [Gender__c, setGender] = useState('Male');
  const [health, setHealth] = useState('Excellent');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [occupation, setOccupation] = useState('');
  const [mobile, setMobile] = useState(0);

  const [education, setEducation] = useState('Select One');
  const [modalVisible, setModalVisible] = useState(false);
  const [educationModal, setEducationModal] = useState(false);
  const [smoker, setSmoker] = useState(false);
  const [income, setIncome] = useState(0);

  const AddDriverDetails = () => {
    props.navigation.navigate('HealthInformation', {
      FirstName,
      LastName,
      Birthdate,
      Gender__c,
      height,
      weight,
      occupation,
      mobile,

      education,
      health,
      smoker
    });
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
          padding: 20
        }}
        onPress={() => {
          props.navigation.navigate('Quote');
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} size={16} color={'#000'} />
        <Text style={{ fontSize: 22, paddingLeft: 15, color: '#000' }}>
          Customer Details
        </Text>
      </TouchableOpacity>

      <ScrollView
        keyboardShouldPersistTaps="always"
        centerContent={true}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          paddingHorizontal: 20
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginVertical: 5 }}>
          <Text style={{ paddingVertical: 15, fontSize: 16 }}>First Name</Text>
          <TextInput
            placeholder="First Name"
            style={styles.textInput}
            value={FirstName}
            onChangeText={(e) => setFirstName(e)}
          />
        </View>
        <View style={{ marginVertical: 5 }}>
          <Text style={{ paddingVertical: 15, fontSize: 16 }}>Last Name</Text>
          <TextInput
            placeholder="Last Name"
            style={styles.textInput}
            value={LastName}
            onChangeText={(e) => setLastName(e)}
          />
        </View>
        <View style={{ marginVertical: 5 }}>
          <Text style={{ paddingVertical: 15, fontSize: 16 }}>
            Mobile Number
          </Text>
          <TextInput
            placeholder="Mobile Number"
            style={styles.textInput}
            value={mobile}
            onChangeText={(e) => setMobile(e)}
          />
        </View>
        <View>
          <Text
            style={{
              paddingVertical: 15,
              fontSize: 16
            }}
          >
            Date of Birth
          </Text>
          <DatePicker
            style={{
              width: Dimensions.get('window').width,
              backgroundColor: '#f2f2f2'
            }}
            date={Birthdate}
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
              dateInput: { borderWidth: 0 }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {
              setDateOfBirth(date);
            }}
          />
        </View>
        <Text style={{ fontSize: 16, paddingTop: 15 }}>Gender</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableWithoutFeedback onPress={() => setGender('Male')}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton
                value="Male"
                status={Gender__c === 'Male' ? 'checked' : 'unchecked'}
                color="#518EF8"
                onPress={() => setGender('Male')}
              />
              <Text
                style={
                  Gender__c === 'Male'
                    ? [styles.title, { color: '#518EF8' }]
                    : [styles.title, { color: '#000' }]
                }
              >
                Male
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setGender('Female')}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton
                value="Female"
                status={Gender__c === 'Female' ? 'checked' : 'unchecked'}
                color="#518EF8"
                onPress={() => setGender('Female')}
              />
              <Text
                style={
                  Gender__c === 'Female'
                    ? [styles.title, { color: '#518EF8' }]
                    : [styles.title, { color: '#000' }]
                }
              >
                Female
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setGender('Non-Binary')}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton
                value="Non-Binary"
                status={Gender__c === 'Non-Binary' ? 'checked' : 'unchecked'}
                color="#518EF8"
                onPress={() => setGender('Non-Binary')}
              />
              <Text
                style={
                  Gender__c === 'Non-Binary'
                    ? [styles.title, { color: '#518EF8' }]
                    : [styles.title, { color: '#000' }]
                }
              >
                Non-Binary
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <Text style={{ fontSize: 16, paddingTop: 15 }}>I'm a </Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableWithoutFeedback onPress={() => setSmoker(true)}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton
                value="Smoker"
                status={smoker === true ? 'checked' : 'unchecked'}
                color="#518EF8"
                onPress={() => setSmoker(true)}
              />
              <Text
                style={
                  smoker === true
                    ? [styles.title, { color: '#518EF8' }]
                    : [styles.title, { color: '#000' }]
                }
              >
                Smoker
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setSmoker(false)}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton
                value="Non-Smoker"
                status={smoker === false ? 'checked' : 'unchecked'}
                color="#518EF8"
                onPress={() => setSmoker(false)}
              />
              <Text
                style={
                  smoker === false
                    ? [styles.title, { color: '#518EF8' }]
                    : [styles.title, { color: '#000' }]
                }
              >
                Non-Smoker
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={{ marginVertical: 5 }}>
          <Text style={{ paddingVertical: 15, fontSize: 16 }}>
            My Height is
          </Text>
          <TextInput
            placeholder="height"
            style={styles.textInput}
            value={height}
            onChangeText={(e) => setHeight(e)}
          />
        </View>
        <View style={{ marginVertical: 5 }}>
          <Text style={{ paddingVertical: 15, fontSize: 16 }}>
            My Weight is
          </Text>
          <TextInput
            placeholder="weight"
            style={styles.textInput}
            value={weight}
            onChangeText={(e) => setWeight(e)}
          />
        </View>
        <View style={{ marginVertical: 5 }}>
          <Text style={{ paddingVertical: 15, fontSize: 16 }}>
            My Health is
          </Text>

          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{
              backgroundColor: '#F8F8F8',
              padding: 20,
              flexDirection: 'row',
              borderRadius: 5,
              borderColor: '#0A213E',
              marginVertical: 10
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, color: '#0A213E' }}>{health}</Text>
            </View>
            <FontAwesomeIcon icon={faChevronDown} size={16} color={'#000'} />
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                onPress={() => {
                  setHealth('Excellent');
                  setModalVisible(!modalVisible);
                }}
                style={{ paddingVertical: 5 }}
              >
                <Text
                  style={
                    health === 'Excellent'
                      ? {
                          color: '#518EF8',
                          fontSize: 25,
                          textAlign: 'center'
                        }
                      : {
                          color: '#000',
                          fontSize: 18,
                          textAlign: 'center'
                        }
                  }
                >
                  Excellent
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setHealth('Very Good');
                  setModalVisible(!modalVisible);
                }}
                style={{ paddingVertical: 5 }}
              >
                <Text
                  style={
                    health === 'Very Good'
                      ? {
                          color: '#518EF8',
                          fontSize: 25,
                          textAlign: 'center'
                        }
                      : {
                          color: '#000',
                          fontSize: 18,
                          textAlign: 'center'
                        }
                  }
                >
                  Very Good
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setHealth('Good');
                  setModalVisible(!modalVisible);
                }}
                style={{ paddingVertical: 5 }}
              >
                <Text
                  style={
                    health === 'Good'
                      ? {
                          color: '#518EF8',
                          fontSize: 25,
                          textAlign: 'center'
                        }
                      : {
                          color: '#000',
                          fontSize: 18,
                          textAlign: 'center'
                        }
                  }
                >
                  Good
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setHealth('Fair');
                  setModalVisible(!modalVisible);
                }}
                style={{ paddingVertical: 5 }}
              >
                <Text
                  style={
                    health === 'Fair'
                      ? {
                          color: '#518EF8',
                          fontSize: 25,
                          textAlign: 'center'
                        }
                      : {
                          color: '#000',
                          fontSize: 18,
                          textAlign: 'center'
                        }
                  }
                >
                  Fair
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Text style={{ fontSize: 16, paddingTop: 15 }}>
          Highest Level of Education
        </Text>
        <TouchableOpacity
          onPress={() => setEducationModal(true)}
          style={{
            backgroundColor: '#F8F8F8',
            padding: 20,
            flexDirection: 'row',
            borderRadius: 5,
            borderColor: '#0A213E',
            marginVertical: 10
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, color: '#0A213E' }}>{education}</Text>
          </View>
          <FontAwesomeIcon icon={faChevronDown} size={16} color={'#000'} />
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent
          visible={educationModal}
          onRequestClose={() => {
            setEducation('No Diploma');
            setEducationModal(!educationModal);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                onPress={() => {
                  setEducation('No Diploma');
                  setEducationModal(!educationModal);
                }}
                style={{ paddingVertical: 5 }}
              >
                <Text
                  style={
                    education === 'No Diploma'
                      ? {
                          color: '#518EF8',
                          fontSize: 25,
                          textAlign: 'center'
                        }
                      : {
                          color: '#000',
                          fontSize: 18,
                          textAlign: 'center'
                        }
                  }
                >
                  No Diploma
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setEducation('High School');
                  setEducationModal(!educationModal);
                }}
                style={{ paddingVertical: 5 }}
              >
                <Text
                  style={
                    education === 'High School'
                      ? {
                          color: '#518EF8',
                          fontSize: 25,
                          textAlign: 'center'
                        }
                      : {
                          color: '#000',
                          fontSize: 18,
                          textAlign: 'center'
                        }
                  }
                >
                  High School
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setEducation('Some College');
                  setEducationModal(!educationModal);
                }}
                style={{ paddingVertical: 5 }}
              >
                <Text
                  style={
                    education === 'Some College'
                      ? {
                          color: '#518EF8',
                          fontSize: 25,
                          textAlign: 'center'
                        }
                      : {
                          color: '#000',
                          fontSize: 18,
                          textAlign: 'center'
                        }
                  }
                >
                  Some College
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setEducation('Associates');
                  setEducationModal(!educationModal);
                }}
                style={{ paddingVertical: 5 }}
              >
                <Text
                  style={
                    education === 'Associates'
                      ? {
                          color: '#518EF8',
                          fontSize: 25,
                          textAlign: 'center'
                        }
                      : {
                          color: '#000',
                          fontSize: 18,
                          textAlign: 'center'
                        }
                  }
                >
                  Associates
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setEducation('Bachelors');
                  setEducationModal(!educationModal);
                }}
                style={{ paddingVertical: 5 }}
              >
                <Text
                  style={
                    education === 'Bachelors'
                      ? {
                          color: '#518EF8',
                          fontSize: 25,
                          textAlign: 'center'
                        }
                      : {
                          color: '#000',
                          fontSize: 18,
                          textAlign: 'center'
                        }
                  }
                >
                  Bachelors
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setEducation('Masters');
                  setEducationModal(!educationModal);
                }}
                style={{ paddingVertical: 5 }}
              >
                <Text
                  style={
                    education === 'Masters'
                      ? {
                          color: '#518EF8',
                          fontSize: 25,
                          textAlign: 'center'
                        }
                      : {
                          color: '#000',
                          fontSize: 18,
                          textAlign: 'center'
                        }
                  }
                >
                  Masters
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setEducation('Doctoral');
                  setEducationModal(!educationModal);
                }}
                style={{ paddingVertical: 5 }}
              >
                <Text
                  style={
                    education === 'Doctoral'
                      ? {
                          color: '#518EF8',
                          fontSize: 25,
                          textAlign: 'center'
                        }
                      : {
                          color: '#000',
                          fontSize: 18,
                          textAlign: 'center'
                        }
                  }
                >
                  Doctoral
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Text style={{ fontSize: 16, paddingTop: 15 }}>Occupation</Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableWithoutFeedback
            onPress={() => setOccupation('Self Employed')}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton
                value="Self Employed"
                status={
                  occupation === 'Self Employed' ? 'checked' : 'unchecked'
                }
                color="#518EF8"
                onPress={() => setOccupation('Self Employed')}
              />
              <Text
                style={
                  occupation === 'Self Employed'
                    ? [styles.title, { color: '#518EF8' }]
                    : [styles.title, { color: '#000' }]
                }
              >
                Self Employed
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setOccupation('Salaried')}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton
                value="Salaried"
                status={occupation === 'Salaried' ? 'checked' : 'unchecked'}
                color="#518EF8"
                onPress={() => setOccupation('Salaried')}
              />
              <Text
                style={
                  occupation === false
                    ? [styles.title, { color: '#518EF8' }]
                    : [styles.title, { color: '#000' }]
                }
              >
                Salaried
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={{ marginVertical: 5 }}>
          <Text style={{ paddingVertical: 15, fontSize: 16 }}>
            Annual Income
          </Text>
          <TextInput
            placeholder="Annual Income"
            style={styles.textInput}
            value={income}
            onChangeText={(e) => setIncome(e)}
          />
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
            props.navigation.navigate('Quote');
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
            1<Text style={{ fontWeight: 'normal' }}>/5</Text>
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
    </KeyboardAvoidingView>
  );
};

export default CustomerForm;

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
