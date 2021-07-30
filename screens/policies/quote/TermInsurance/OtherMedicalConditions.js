import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  FlatList,
  Button,
  TouchableOpacity
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faCheck,
  faChevronDown,
  faMap
} from '@fortawesome/free-solid-svg-icons';

const medicalConditions = [
  {
    id: 1,
    Name: 'COPD'
  },
  {
    id: 2,
    Name: 'Lupus'
  },
  {
    id: 3,
    Name: 'Diabetes'
  },
  {
    id: 4,
    Name: 'Epilepsy'
  },
  {
    id: 5,
    Name: 'Melanoma'
  },
  {
    id: 6,
    Name: 'Emphysema'
  },
  {
    id: 7,
    Name: 'Sleep Apnea'
  },
  {
    id: 8,
    Name: 'Fibromyalgia'
  },
  {
    id: 9,
    Name: 'Stroke or TIA'
  },
  {
    id: 10,
    Name: 'Kidney Disease'
  },
  {
    id: 11,
    Name: 'Prostate Cancer'
  },
  {
    id: 12,
    Name: "Chron's Disease"
  },
  {
    id: 13,
    Name: 'Multiple Sclerosis'
  },
  {
    id: 14,
    Name: 'Colitis or Ileitis'
  },
  {
    id: 15,
    Name: "Parkinson's Disease"
  },
  {
    id: 16,
    Name: 'Rheumatoid Arthritis'
  },
  {
    id: 17,
    Name: 'Mitral Valve Prolapse'
  },
  {
    id: 18,
    Name: 'Cancer (other than Skin)'
  },
  {
    id: 19,
    Name: 'Mood or Anxiety Disorder'
  },
  {
    id: 20,
    Name: 'Artery (Coronary) Disease'
  },
  {
    id: 21,
    Name: 'Hepatitis or Liver Disease'
  },
  {
    id: 22,
    Name: 'Heart Disease or Arrhythmia'
  }
];
const OtherMedicalConditions = (props) => {
  const [selectedId, setSelectedId] = useState([]);
  const Item = ({ item, onPress, style }) => (
    <TouchableOpacity
      onPress={onPress}
      style={
        selectedId.includes(item.id)
          ? [style, styles.card]
          : [style, styles.card]
      }
    >
      <Text
        style={
          selectedId.includes(item.id)
            ? [styles.title, style, { color: '#518EF8' }]
            : [styles.title, style, { color: '#000' }]
        }
      >
        {item.Name}
      </Text>
      {selectedId.includes(item.id) ? (
        <FontAwesomeIcon icon={faCheck} size={16} color={'#518EF8'} />
      ) : null}
    </TouchableOpacity>
  );
  const renderItem = ({ item }) => {
    const fontSize = selectedId.includes(item.id) ? 19 : 18;
    const color = selectedId.includes(item.id) ? '#518EF8' : '#000';

    return (
      <Item
        item={item}
        onPress={() => {
          if (selectedId.indexOf(item.id) === -1) {
            setSelectedId([...selectedId, item.id]);
            console.log(selectedId);
          } else {
            var value = item.id;
            setSelectedId(selectedId.filter((item) => item !== value));
          }
        }}
        style={{ fontSize, color }}
      />
    );
  };
  const AddDriverDetails = () => {
    props.navigation.navigate('UploadReport');
  };

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
          props.navigation.navigate('HealthInformation');
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} size={16} color={'#000'} />
        <Text style={{ fontSize: 22, paddingLeft: 15, color: '#000' }}>
          Other Medical Conditions
        </Text>
      </TouchableOpacity>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, paddingHorizontal: 15 }}>
          <Text
            style={{
              marginVertical: 20,
              fontSize: 17,
              color: 'grey'
            }}
          >
            Select Medical Conditions if any
          </Text>
          <View style={{ backgroundColor: '#fff', marginBottom:60 }}>
            <FlatList
              data={medicalConditions}
              renderItem={renderItem}
              keyExtractor={(item, index) => {
                return index.toString();
              }}
              extraData={selectedId}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>

      <View
        style={{
          flexDirection: 'row',
          width: Dimensions.get('window').width,
          backgroundColor: '#1AC29A'
        }}
      >
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('HealthInformation');
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
            3<Text style={{ fontWeight: 'normal' }}>/5</Text>
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

export default OtherMedicalConditions;

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
  card: {
   
    paddingLeft: 10,
    flexDirection:'row',
    alignItems:'center'
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
    paddingVertical: 10,
    flex:0.9
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
