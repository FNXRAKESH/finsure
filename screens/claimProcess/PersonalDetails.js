import React, { useState, useEffect } from 'react';
import {
  Button,
  Image,
  View,
  Platform,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  TextInput
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Progress from 'react-native-progress';
import { ScrollView } from 'react-native-gesture-handler';

export default function PersonalDetails({ navigation }) {
  const [lisence, setLisence] = useState('null');
  const [passport, setPassport] = useState('null');
  const [insuranceId, setInsuranceId] = useState('null');

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickLisence = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    if (!result.cancelled) {
      setLisence(result.uri);
    }
  };

  const pickPassport = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    if (!result.cancelled) {
      setPassport(result.uri);
    }
  };

  const pickInsuranceId = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    if (!result.cancelled) {
      setInsuranceId(result.uri);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <ScrollView
        centerContent={true}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginHorizontal: 10 }}>
          <Progress.Bar
            progress={0.1}
            width={Dimensions.get('window').width - 20}
            animated
            animationType="decay"
          />
        </View>
        <View
          style={{
            marginVertical: 20,
            alignItems: 'center'
          }}
        >
          <ScrollView
            horizontal={true}
            centerContent={true}
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          >
            <View style={styles.uploadContainer}>
              <Text style={{ color: 'grey' }}>Driver's Lisence</Text>
              <TouchableOpacity
                style={{ ...styles.imageContainer, borderColor: 'green' }}
                onPress={pickLisence}
              >
                {lisence && (
                  <Image
                    source={{ uri: lisence }}
                    style={{ width: 100 + '%', height: 100 + '%' }}
                  />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.uploadContainer}>
              <Text style={{ color: 'grey' }}>Passport</Text>
              <TouchableOpacity
                style={{ ...styles.imageContainer, borderColor: 'red' }}
                onPress={pickPassport}
              >
                {passport && (
                  <Image
                    source={{ uri: passport }}
                    style={{ width: 100 + '%', height: 100 + '%' }}
                  />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.uploadContainer}>
              <Text style={{ color: 'grey' }}>Insurance Id</Text>
              <TouchableOpacity
                style={{ ...styles.imageContainer, borderColor: 'blue' }}
                onPress={pickInsuranceId}
              >
                {insuranceId && (
                  <Image
                    source={{ uri: insuranceId }}
                    style={{ width: 100 + '%', height: 100 + '%' }}
                  />
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        <View
          style={{
            justifyContent: 'center',
            marginHorizontal: 20
          }}
        >
          <Text style={{ textAlign: 'center', color: 'grey' }}>
            My Driving License Details
          </Text>
          <View style={styles.textInput}>
            <TextInput
              placeholder="First Name"
              placeholderTextColor="grey"
              style={{ color: 'grey' }}
            />
          </View>
          <View style={styles.textInput}>
            <TextInput
              placeholder="Last Name"
              placeholderTextColor="grey"
              style={{ color: 'grey' }}
            />
          </View>
          <View style={styles.textInput}>
            <TextInput
              placeholder="Drivers License Number"
              placeholderTextColor="grey"
              style={{ color: 'grey' }}
            />
          </View>
          <View style={styles.textInput}>
            <TextInput
              placeholder="Drivers License Expiry date"
              placeholderTextColor="grey"
              style={{ color: 'grey' }}
            />
          </View>
          <View style={styles.textInput}>
            <TextInput
              placeholder="Address"
              multiline
              numberOfLines={3}
              placeholderTextColor="grey"
              style={{ color: 'grey' }}
            />
          </View>
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
              navigation.navigate('FNOLsubmission');
            }}
          />
          <Button
            title="Next"
            onPress={() => {
              navigation.navigate('VehicleIncident');
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,

    borderWidth: 5,
    overflow: 'hidden',
    marginVertical: 10
  },

  uploadContainer: {
    margin: 15,
    alignItems: 'center'
  },
  textInput: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginVertical: 10,
    color: '#f2f2f2'
  }
});
