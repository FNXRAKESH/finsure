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
import { RadioButton } from 'react-native-paper';

const DriverDetails = (props) => {
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Birthdate, setDateOfBirth] = useState(new Date());
  const [Gender__c, setGender] = useState('Male');
  const [License_Status__c, setLicenseStatus] = useState('Lisence Status');
  const [License_Suspensions__c, setLicenseSuspensions] = useState('');
  const [License_Number__c, setLicenseNumber] = useState('');
  const [derogatory, setDerogatory] = useState('');
  const [age, setAge] = useState('');
  const [education, setEducation] = useState('Select One');
  const [modalVisible, setModalVisible] = useState(false);
  const [educationModal, setEducationModal] = useState(false);

  const AddDriverDetails = () => {
    props.navigation.navigate('CurrentInsurance', {
      FirstName,
      LastName,
      Birthdate,
      Gender__c,
      License_Status__c,
      License_Suspensions__c,
      License_Number__c,
      derogatory,
      age,
      education,
      CustomerProperty: props.route.params.CustomerProperty
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
            props.navigation.navigate('InsuranceType');
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} size={16} color={'#000'} />
          <Text style={{ fontSize: 22, paddingLeft: 15, color: '#000' }}>
            Driver Details
          </Text>
        </TouchableOpacity>
        <ScrollView
          keyboardShouldPersistTaps="always"
          centerContent={true}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        >
          <View style={{ marginVertical: 5 }}>
            <Text style={{ paddingVertical: 15, fontSize: 16 }}>
              First Name
            </Text>
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

          <View style={{}}>
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
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
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
          <View style={{ marginVertical: 5 }}>
            <Text style={{ paddingVertical: 15, fontSize: 16 }}>
              License Details
            </Text>
            <TextInput
              placeholder="License Number"
              style={styles.textInput}
              value={License_Number__c}
              onChangeText={(e) => setLicenseNumber(e)}
            />
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
                <Text style={{ fontSize: 16, color: '#0A213E' }}>
                  {License_Status__c}
                </Text>
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
                    setLicenseStatus('Active');
                    setModalVisible(!modalVisible);
                  }}
                  style={{ paddingVertical: 5 }}
                >
                  <Text
                    style={
                      License_Status__c === 'Active'
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
                    Active
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setLicenseStatus('Permit');
                    setModalVisible(!modalVisible);
                  }}
                  style={{ paddingVertical: 5 }}
                >
                  <Text
                    style={
                      License_Status__c === 'Permit'
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
                    Permit
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setLicenseStatus('Suspended');
                    setModalVisible(!modalVisible);
                  }}
                  style={{ paddingVertical: 5 }}
                >
                  <Text
                    style={
                      License_Status__c === 'Suspended'
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
                    Suspended
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setLicenseStatus('Foreign');
                    setModalVisible(!modalVisible);
                  }}
                  style={{ paddingVertical: 5 }}
                >
                  <Text
                    style={
                      License_Status__c === 'Foreign'
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
                    Foreign
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setLicenseStatus('Expired');
                    setModalVisible(!modalVisible);
                  }}
                  style={{ paddingVertical: 5 }}
                >
                  <Text
                    style={
                      License_Status__c === 'Expired'
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
                    Expired
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Text style={{ fontSize: 16 }}>Any License Suspension?</Text>
          <View style={{ flexDirection: 'row', paddingBottom: 15 }}>
            <TouchableWithoutFeedback
              onPress={() => {
                setLicenseSuspensions('Yes');
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton
                  value="Yes"
                  status={
                    License_Suspensions__c === 'Yes' ? 'checked' : 'unchecked'
                  }
                  color="#518EF8"
                  onPress={() => {
                    setLicenseSuspensions('Yes');
                  }}
                />
                <Text
                  style={
                    License_Suspensions__c === 'Yes'
                      ? [styles.title, { color: '#518EF8' }]
                      : [styles.title, { color: '#000' }]
                  }
                >
                  Yes
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                setLicenseSuspensions('No');
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton
                  value="No"
                  status={
                    License_Suspensions__c === 'No' ? 'checked' : 'unchecked'
                  }
                  color="#518EF8"
                  onPress={() => {
                    setLicenseSuspensions('No');
                  }}
                />
                <Text
                  style={
                    License_Suspensions__c === 'No'
                      ? [styles.title, { color: '#518EF8' }]
                      : [styles.title, { color: '#000' }]
                  }
                >
                  No
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

          <Text style={{ fontSize: 16 }}>Any Derogatory Report?</Text>
          <View style={{ flexDirection: 'row', paddingBottom: 15 }}>
            <TouchableWithoutFeedback
              onPress={() => {
                setDerogatory('Yes');
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton
                  value="Yes"
                  status={derogatory === 'Yes' ? 'checked' : 'unchecked'}
                  color="#518EF8"
                  onPress={() => {
                    setDerogatory('Yes');
                  }}
                />
                <Text
                  style={
                    derogatory === 'Yes'
                      ? [styles.title, { color: '#518EF8' }]
                      : [styles.title, { color: '#000' }]
                  }
                >
                  Yes
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                setDerogatory('No');
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton
                  value="No"
                  status={derogatory === 'No' ? 'checked' : 'unchecked'}
                  color="#518EF8"
                  onPress={() => {
                    setDerogatory('No');
                  }}
                />
                <Text
                  style={
                    derogatory === 'No'
                      ? [styles.title, { color: '#518EF8' }]
                      : [styles.title, { color: '#000' }]
                  }
                >
                  No
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

          <Text style={{ fontSize: 16 }}>
            Age when you obtained driver's license
          </Text>
          <View style={{ paddingVertical: 10 }}>
            <ScrollView
              horizontal
              contentContainerStyle={{ flexGrow: 0.2 }}
              showsHorizontalScrollIndicator={false}
            >
              <TouchableOpacity
                onPress={() => {
                  setAge('16');
                }}
                style={
                  age === '16'
                    ? [styles.gender, { backgroundColor: '#518EF8' }]
                    : styles.gender
                }
              >
                <Text
                  style={age === '16' ? { color: '#fff' } : { color: '#000' }}
                >
                  16
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setAge('17');
                }}
                style={
                  age === '17'
                    ? [styles.gender, { backgroundColor: '#518EF8' }]
                    : styles.gender
                }
              >
                <Text
                  style={age === '17' ? { color: '#fff' } : { color: '#000' }}
                >
                  17
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setAge('18');
                }}
                style={
                  age === '18'
                    ? [styles.gender, { backgroundColor: '#518EF8' }]
                    : styles.gender
                }
              >
                <Text
                  style={age === '18' ? { color: '#fff' } : { color: '#000' }}
                >
                  18
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setAge('19');
                }}
                style={
                  age === '19'
                    ? [styles.gender, { backgroundColor: '#518EF8' }]
                    : styles.gender
                }
              >
                <Text
                  style={age === '19' ? { color: '#fff' } : { color: '#000' }}
                >
                  19
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setAge('20');
                }}
                style={
                  age === '20'
                    ? [styles.gender, { backgroundColor: '#518EF8' }]
                    : styles.gender
                }
              >
                <Text
                  style={age === '20' ? { color: '#fff' } : { color: '#000' }}
                >
                  20
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setAge('21');
                }}
                style={
                  age === '21'
                    ? [styles.gender, { backgroundColor: '#518EF8' }]
                    : styles.gender
                }
              >
                <Text
                  style={age === '21' ? { color: '#fff' } : { color: '#000' }}
                >
                  21
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setAge('22');
                }}
                style={
                  age === '22'
                    ? [styles.gender, { backgroundColor: '#518EF8' }]
                    : styles.gender
                }
              >
                <Text
                  style={age === '22' ? { color: '#fff' } : { color: '#000' }}
                >
                  22
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setAge('23+');
                }}
                style={
                  age === '23+'
                    ? [styles.gender, { backgroundColor: '#518EF8' }]
                    : styles.gender
                }
              >
                <Text
                  style={age === '23+' ? { color: '#fff' } : { color: '#000' }}
                >
                  23+
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
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
              <Text style={{ fontSize: 16, color: '#0A213E' }}>
                {education}
              </Text>
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
            props.navigation.navigate('InsuranceType');
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
            4<Text style={{ fontWeight: 'normal' }}>/10</Text>
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

export default DriverDetails;

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
