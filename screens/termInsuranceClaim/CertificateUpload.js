import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TextInput,
  Platform,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TouchableOpacity
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faCheck,
  faChevronDown,
  faImage,
  faMap
} from '@fortawesome/free-solid-svg-icons';
var Bearer, claimId;

const CertificateUpload = (props) => {
  Bearer = props.route.params.Bearer;
  claimId = props.route.params.claimId;
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('Death certificate');
  const [description, setDescription] = useState('');
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    });
    if (!result.cancelled) {
      console.log(result);
      setImage(result.uri);
    }
  };
   const blobToBase64 = (blob) => {
     const reader = new FileReader();
     reader.readAsDataURL(blob);
     return new Promise((resolve) => {
       reader.onloadend = () => {
         resolve(reader.result);
       };
     });
   };
  const Upload = async () => {
    if (image === null) return alert('select the image before upload');
    console.log('Bearer ', Bearer);
     let formData = new FormData();
    
    formData.append('ContentUrl', {
      uri: image,
      name:'filename'
    });
     formData.append('Title', title);
     formData.append('Description', description);
    fetch(
      'https://ackofinaldemo-dev-ed.my.salesforce.com/services/data/v50.0/sobjects/ContentVersion',
      {
        method: 'POST',
        headers: {
          Authorization: Bearer,
          'Content-Type': 'multipart/form-data; '
        },
        body:formData

          
        
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('data ', data.id);
        fetch(
          `https://ackofinaldemo-dev-ed.my.salesforce.com/services/data/v50.0/query/?q=SELECT+ContentDocumentId+FROM+ContentVersion+WHERE+Id+=+'${data.id}'`,
          {
            method: 'GET',
            headers: {
              Authorization: Bearer,
              'Content-Type': 'application/json'
            }
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log('data 2 ', data.records);
            {
              data.records &&
                data.records.map((data) => {
                  fetch(
                    `https://ackofinaldemo-dev-ed.my.salesforce.com/services/data/v50.0/sobjects/ContentDocumentLink`,
                    {
                      method: 'POST',
                      headers: {
                        Authorization: Bearer,
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        ContentDocumentId: data.ContentDocumentId,
                        LinkedEntityId: props.route.params.claimId
                      })
                    }
                  )
                    .then((response) => response.json())
                    .then((data) => {
                      console.log('data 3 ', data, ' ', claimId);
                      setImage('null');
                    })
                    .catch((error) => {
                      console.error('Error:', error);
                    });
                });
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
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
          props.navigation.navigate('intimation');
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} size={16} color={'#000'} />
        <Text style={{ fontSize: 22, paddingLeft: 15, color: '#000' }}>
          Upload Death certificate
        </Text>
      </TouchableOpacity>
      <ScrollView
        keyboardShouldPersistTaps="always"
        centerContent={true}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        showsVerticalScrollIndicator={false}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <View
              style={{ marginVertical: 20, flex: 1, justifyContent: 'center' }}
            >
              <View style={styles.uploadContainer}>
                <TouchableOpacity
                  style={{ ...styles.imageContainer }}
                  onPress={pickImage}
                >
                  {/* {image && (
                     <Image
                       source={{ uri: image }}
                       style={{ width: 100 + "%", height: 100 + "%" }}
                     />
                   )} */}
                  {image === null ? (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faImage}
                        size={50}
                        color={'#f2f2f2'}
                      />
                      <Text
                        style={{ textAlign: 'center', paddingHorizontal: 20 }}
                      >
                        Click here to choose image from Gallery
                      </Text>
                    </View>
                  ) : (
                    <Image
                      source={{ uri: image }}
                      style={{ width: 100 + '%', height: 100 + '%' }}
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  title="Upload selected Image"
                  onPress={() => {
                    Upload();
                  }}
                  style={styles.UploadImageBtn}
                >
                  <Text style={{ color: '#fff', fontSize: 18 }}>
                    Upload selected Image
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <View style={styles.textInput}>
                  <TextInput
                    placeholder="Title"
                    placeholderTextColor="grey"
                    style={{ color: 'grey' }}
                    value={title}
                    onChangeText={(e) => setTitle(e)}
                  />
                </View>
                <View style={styles.textInput}>
                  <TextInput
                    placeholderTextColor="grey"
                    placeholder="Description"
                    style={{ color: 'grey' }}
                    multiline
                    numberOfLines={3}
                    value={description}
                    onChangeText={(e) => setDescription(e)}
                  />
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
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
            props.navigation.navigate('intimation');
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
            props.navigation.navigate('AutopsyReport', {
              claimId,
              Bearer
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

export default CertificateUpload;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageContainer: {
    width: 250,
    height: 250,
    borderRadius: 5,
    borderWidth: 2,
    overflow: 'hidden',
    marginVertical: 20,
    borderStyle: 'dotted',
    borderColor: '#c8c8c8'
  },

  uploadContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  textInput: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginHorizontal: 20,
    marginVertical: 20,
    width: Dimensions.get('window').width - 50
  },
  UploadImageBtn: {
    backgroundColor: '#1AC29A',
    paddingVertical: 20,
    borderRadius: 10,
    paddingHorizontal: 30
  },
  footerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  }
});
