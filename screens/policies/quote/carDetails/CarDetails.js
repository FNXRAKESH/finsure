import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
  Modal,
  Dimensions,
  TextInput,
  Image,
  FlatList
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons';
import filter from 'lodash.filter';

const year = new Date().getFullYear();
const years = Array.from(new Array(30), (val, index) => year - index);

const CarDetails = (props) => {
  const [yr, setYear] = useState(year);
  const [make, setMake] = useState([]);
  const [filterMake, setFilterMake] = useState([]);
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [model, setModel] = useState([]);
  const [modalYearVisible, setModalYearVisible] = useState(false);
  const [modalMakeVisible, setModalMakeVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [query, setQuery] = useState('');

  const flatList = React.useRef(null);
  const Item = ({ make, style }) => (
    <TouchableOpacity
      style={make === selectedMake ? [styles.item, style] : styles.item}
      onPress={() => {
        setSelectedMake(make);
        setSelectedModel('');
        setModalMakeVisible(false);
      }}
    >
      <Text
        style={make === selectedMake ? [styles.title, style] : styles.title}
      >
        {make}
      </Text>
    </TouchableOpacity>
  );
  const renderItem = ({ item }) => {
    // const backgroundColor = selectedMake !== '' ? '#63AFE8' : '#fff';
    const color = selectedMake !== '' ? '#518EF8' : '#000';
    const fontSize = selectedMake !== '' ? 22 : 18;
    return <Item make={item.Make_Name} style={{ color, fontSize }} />;
  };

  const getMake = async () => {
    const response = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    const body = await response.json();
    setMake(body.Results);
    if (selectedMake === '') {
      setSelectedMake(body.Results[0].Make_Name);
    }
  };
  function renderHeader() {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          padding: 20,
          marginVertical: 0,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 15
        }}
      >
        <TextInput
          autoFocus
          autoCorrect={false}
          clearButtonMode="always"
          value={query}
          onChangeText={(queryText) => handleSearch(queryText)}
          placeholder="Search for Vehicle Make"
          style={{ backgroundColor: '#fff', paddingHorizontal: 20 }}
        />
      </View>
    );
  }
  const handleSearch = (text) => {
    const formattedQuery = text.toUpperCase();
    const filteredData = filter(make, (user) => {
      return contains(user, formattedQuery);
    });
    console.log('filteredData ', filteredData);
    setFilterMake(filteredData);
    setQuery(text);
  };
  const contains = ({ Make_Name }, query) => {
    if (Make_Name.includes(query)) {
      return true;
    }
    return false;
  };
  useEffect(() => {
    getMake();
    if (selectedMake !== '') {
      getModel();
    }
    // getModel();
  }, [selectedMake, yr]);
  const getModel = async () => {
    const response = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/${selectedMake}/modelyear/${yr}?format=json`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    const body = await response.json();
    setModel(body.Results);
    if (selectedModel === '') {
      setSelectedModel(body.Results[0].Model_Name);
    }
     
  };
  const AddCarDetails = () => {
    AsyncStorage.setItem('@id', JSON.stringify(props.route.params.id));
    //if (selectedModel === '') return alert('select a model');
    props.navigation.navigate('CarUsage', {
      Make: selectedMake,
      ModelName: selectedModel,
      MakeYear: yr
    });
  };
  return (
    <View style={[styles.container, { backgroundColor: '#fff' }]}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 30,
            paddingHorizontal: 20
          }}
          onPress={() => {
            props.navigation.navigate('Quote');
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} size={16} color={'#000'} />
          <Text style={{ fontSize: 22, paddingLeft: 15, color: '#000' }}>
            Auto Insurance
          </Text>
        </TouchableOpacity>

        {/* <View style={styles.InputContainer}>
          <TextInput
            placeholder="Search car, model..."
            style={styles.textInput}
            placeholderTextColor="black"
            value={search}
            onChangeText={(e) => setSearch(e)}
          />
          <FontAwesomeIcon icon={faSearch} size={16} color={'#0A213E'} />
        </View> */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ paddingHorizontal: 15 }}>
            <Text style={{ fontSize: 18, paddingVertical: 20 }}>
              Popular Makers
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity
                style={styles.brand}
                onPress={() => {
                  setSelectedMake('toyota');
                  setSelectedModel('');
                }}
              >
                <Image
                  source={require('../../../../assets/images/brands/toyota.png')}
                  style={{ height: null, width: null, flex: 1 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.brand}
                onPress={() => {
                  setSelectedMake('ford');
                  setSelectedModel('');
                }}
              >
                <Image
                  source={require('../../../../assets/images/brands/ford.png')}
                  style={{ height: null, width: null, flex: 1 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.brand}
                onPress={() => {
                  setSelectedMake('honda');
                  setSelectedModel('');
                }}
              >
                <Image
                  source={require('../../../../assets/images/brands/honda.png')}
                  style={{ height: null, width: null, flex: 1 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.brand}
                onPress={() => {
                  setSelectedMake('gmc');
                  setSelectedModel('');
                }}
              >
                <Image
                  source={require('../../../../assets/images/brands/gmc.png')}
                  style={{ height: null, width: null, flex: 1 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.brand}
                onPress={() => {
                  setSelectedMake('mazda');
                  setSelectedModel('');
                }}
              >
                <Image
                  source={require('../../../../assets/images/brands/mazda.png')}
                  style={{ height: null, width: null, flex: 1 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.brand}
                onPress={() => {
                  setSelectedMake('chevrolet');
                  setSelectedModel('');
                }}
              >
                <Image
                  source={require('../../../../assets/images/brands/chevrolet.png')}
                  style={{ height: null, width: null, flex: 1 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.brand}
                onPress={() => {
                  setSelectedMake('nissan');
                  setSelectedModel('');
                }}
              >
                <Image
                  source={require('../../../../assets/images/brands/nissan.png')}
                  style={{ height: null, width: null, flex: 1 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.brand}
                onPress={() => {
                  setSelectedMake('jeep');
                  setSelectedModel('');
                }}
              >
                <Image
                  source={require('../../../../assets/images/brands/jeep.png')}
                  style={{ height: null, width: null, flex: 1 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.brand}
                onPress={() => {
                  setSelectedMake('ram');
                  setSelectedModel('');
                }}
              >
                <Image
                  source={require('../../../../assets/images/brands/ram.png')}
                  style={{ height: null, width: null, flex: 1 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.brand}
                onPress={() => {
                  setSelectedMake('subaru');
                  setSelectedModel('');
                }}
              >
                <Image
                  source={require('../../../../assets/images/brands/subaru.png')}
                  style={{ height: null, width: null, flex: 1 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.brand, { alignItems: 'center' }]}
                onPress={() => {
                  setModalMakeVisible(true);
                  setSelectedModel('');
                }}
              >
                <Text style={{ textAlign: 'center', fontSize: 18 }}>
                  Not in the list?
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
          <Modal
            animationType="slide"
            transparent
            visible={modalMakeVisible}
            onRequestClose={() => {
              setModalMakeVisible(!modalMakeVisible);
            }}
          >
            <View style={styles.MakeCenteredView}>
              <View style={styles.makeModalView}>
                <FlatList
                  ListHeaderComponent={renderHeader}
                  data={filterMake && filterMake.length > 0 ? filterMake : make}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.Make_ID.toString()}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </View>
          </Modal>
          <View style={{ padding: 15 }}>
            <Text style={{ fontSize: 18, paddingVertical: 15 }}>
              Select Car year
            </Text>
            <TouchableOpacity
              onPress={() => setModalYearVisible(true)}
              style={{
                backgroundColor: '#F8F8F8',
                padding: 20,
                flexDirection: 'row',
                borderRadius: 5,
                borderColor: '#0A213E',
                borderWidth: 0.5
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18, color: '#0A213E' }}>{yr}</Text>
              </View>
              <FontAwesomeIcon icon={faChevronDown} size={16} color={'#000'} />
            </TouchableOpacity>
          </View>
          <Modal
            animationType="slide"
            transparent
            visible={modalYearVisible}
            onRequestClose={() => {
              setModalYearVisible(!modalYearVisible);
            }}
          >
            <View style={styles.modalView}>
              <ScrollView
                contentContainerStyle={{
                  flexGrow: 1,
                  justifyContent: 'center'
                }}
                showsVerticalScrollIndicator={false}
              >
                {years &&
                  years.map((p, key) => {
                    return (
                      <TouchableOpacity
                        key={key}
                        onPress={() => {
                          setYear(p);
                          setModalYearVisible(!modalYearVisible);
                        }}
                        style={{ padding: 15 }}
                      >
                        <Text
                          style={
                            p === yr
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
                          {p}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
              </ScrollView>
            </View>
          </Modal>
          <View style={{ padding: 15 }}>
            <Text style={{ fontSize: 18, paddingVertical: 15 }}>
              Select Make
            </Text>
            <TouchableOpacity
              onPress={() => setModalMakeVisible(true)}
              style={{
                backgroundColor: '#F8F8F8',
                padding: 20,
                flexDirection: 'row',
                borderRadius: 5,
                borderColor: '#0A213E',
                borderWidth: 0.5
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18, color: '#0A213E' }}>
                  {selectedMake}
                </Text>
              </View>
              <FontAwesomeIcon icon={faChevronDown} size={16} color={'#000'} />
            </TouchableOpacity>
          </View>
          <View style={{ padding: 15 }}>
            <Text style={{ fontSize: 18, paddingVertical: 15 }}>
              Select Model
            </Text>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={{
                backgroundColor: '#F8F8F8',
                padding: 20,
                flexDirection: 'row',
                borderRadius: 5,
                borderColor: '#0A213E',
                borderWidth: 0.5
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18, color: '#0A213E' }}>
                  {selectedModel}
                </Text>
              </View>
              <FontAwesomeIcon icon={faChevronDown} size={16} color={'#000'} />
            </TouchableOpacity>
          </View>
          {model.length !== 0 ? (
            <Modal
              animationType="slide"
              transparent
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={[styles.modalView]}>
                  <FlatList
                    data={model}
                    ref={flatList}
                    onContentSizeChange={() =>
                      flatList.current.scrollToIndex({
                        aniamted: true,
                        index: 0
                      })
                    }
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.Model_ID.toString()}
                    renderItem={({ item, index }) => {
                      const color = selectedModel !== '' ? '#518EF8' : '#000';
                      const fontSize = selectedModel !== '' ? 22 : 18;
                      return (
                        <TouchableOpacity
                          style={
                            item.Model_Name === selectedModel
                              ? [styles.item]
                              : styles.item
                          }
                          onPress={() => {
                            setSelectedModel(item.Model_Name);
                            setModalVisible(false);
                          }}
                        >
                          <Text
                            style={
                              item.Model_Name === selectedModel
                                ? [styles.title, { color, fontSize }]
                                : styles.title
                            }
                          >
                            {item.Model_Name}
                          </Text>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
              </View>
            </Modal>
          ) : null}
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
            props.navigation.navigate('Quote');
          }}
          style={styles.footerButton}
        >
          <FontAwesomeIcon icon={faArrowLeft} size={18} color={'#fff'} />
          <Text style={{ color: '#fff', padding: 20, fontSize: 20 }}>Back</Text>
        </TouchableOpacity>
        <View
          style={{
            borderWidth: 0.3,
            borderColor: '#fff',
            justifyContent: 'center',
            alignSelf: 'center',
            height: 65 + '%'
          }}
        ></View>
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

export default CarDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    paddingVertical: 10,
    borderRadius: 25,
    overflow: 'hidden'
  },
  title: {
    paddingHorizontal: 15,
    fontSize: 18,
    color: '#000',
    textAlign: 'center'
  },
  flatListStyle: {
    // height: 300,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 15,
    padding: 15,
    marginVertical: 20,
    borderWidth: 0.5,
    borderColor: '#63AFE8'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  MakeCenteredView: {
    flex: 1,
    justifyContent: 'center',

    padding: 0
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
  makeModalView: {
    backgroundColor: '#E5E5E5',

    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  InputContainer: {
    backgroundColor: '#fff',
    borderWidth: 0,
    borderRadius: 5,
    marginHorizontal: 15,
    padding: 20,
    marginTop: -30,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 15,
    marginBottom: 20
  },
  textInput: {
    fontSize: 18,

    flex: 1,
    color: '#0A213E'
  },
  footerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  brand: {
    height: 120,
    width: 120,
    marginRight: 15,
    backgroundColor: '#F8F8F8',
    borderRadius: 120,
    padding: 20,

    justifyContent: 'center'
  }
});
