import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TextInput,
  Button
} from 'react-native';
import * as Progress from 'react-native-progress';
import ImageMapper from 'react-native-image-mapper';
const getRandomColor = () => {
  //Function to return random color
  //To highlight the mapping area
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (var i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
  return color;
};
// const imageSource = require('../../assets/images/2869.jpg');
const MAPPING = [
  {
    id: '0',
    name: 'Roof',
    shape: 'rectangle',
    width: 95,
    height: 60,
    x1: 125,
    y1: 30
  },
  {
    id: '1',
    name: 'Bonnet',
    shape: 'rectangle',
    width: 40,
    height: 60,
    x1: 25,
    y1: 30
  },
  {
    id: '2',
    name: 'Bumper',
    shape: 'rectangle',
    width: 10,
    height: 90,
    x1: 10,
    y1: 15
  },
  {
    id: '3',
    name: 'Door',
    shape: 'rectangle',
    width: 100,
    height: 10,
    x1: 100,
    y1: 110
  },
  {
    id: '4',
    name: 'Boot',
    shape: 'rectangle',
    width: 30,
    height: 90,
    x1: 260,
    y1: 15
  }
];
const VehicleDamages = ({ navigation }) => {
  const [selectedAreaId, setSelectedAreaId] = useState([]);
  console.log('selectedAreaId ', selectedAreaId);
  const mapperAreaClickHandler = async (item, idx, event) => {
    const currentSelectedAreaId = selectedAreaId;
    if (Array.isArray(currentSelectedAreaId)) {
      const indexInState = currentSelectedAreaId.indexOf(item.name);
      if (indexInState !== -1) {
        console.log('Removing id', item.name);
        item.prefill = 'transparent';
        setSelectedAreaId([
          ...currentSelectedAreaId.slice(0, indexInState),
          ...currentSelectedAreaId.slice(indexInState + 1)
        ]);
      } else {
        console.log('Setting Id', item.name);
        item.prefill = getRandomColor();
        setSelectedAreaId([...currentSelectedAreaId, item.name]);
      }
    } else {
      if (item.id === currentSelectedAreaId) {
        setSelectedAreaId(null);
      } else {
        setSelectedAreaId(item.name);
      }
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView
        centerContent={true}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginHorizontal: 10 }}>
          <Progress.Bar
            progress={0.4}
            width={Dimensions.get('window').width - 20}
          />
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 20,
            width: Dimensions.get('window').width
          }}
        >
          <Text
            style={{ textAlign: 'center', marginVertical: 20, fontSize: 16 }}
          >
            My Car was damaged in the folowing areas
          </Text>
          {/* <ImageMapper
            imgHeight={120}
            imgWidth={300}
            imgSource={imageSource}
            imgMap={MAPPING}
            onPress={(item, idx, event) =>
              mapperAreaClickHandler(item, idx, event)
            }
            containerStyle={styles.myCustomStyle}
            selectedAreaId="my_area_id"
          /> */}
        </View>
        <View
          style={{
            alignItems: 'center',
            flex: 1,
            width: Dimensions.get('window').width
          }}
        >
          <Text style={{ fontSize: 22, paddingVertical: 15 }}>
            Damaged Parts
          </Text>
          {selectedAreaId.map((i) => {
            return (
              <Text style={{ paddingVertical: 5, fontSize: 18 }}>{i}</Text>
            );
          })}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 20
          }}
        >
          <Button
            title="Back"
            onPress={() => {
              navigation.navigate('SiteOfIncident');
            }}
          />
          <Button
            title="Next"
            onPress={() => {
              navigation.navigate('VehicleDamageVideo');
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default VehicleDamages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
});
