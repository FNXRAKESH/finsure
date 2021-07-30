import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as Progress from 'react-native-progress';

import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { Audio, Video } from 'expo-av';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faCog,
  faSignOutAlt,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
import { TextInput } from 'react-native-gesture-handler';

class MyCam extends Component {
  state = {
    video: null,
    picture: null,
    recording: false
  };

  _saveVideo = async () => {
    const { video } = this.state;
    const asset = await MediaLibrary.createAssetAsync(video.uri);
    console.log(asset);
    if (asset) {
      this.setState({ video: null });
    }
  };

  _StopRecord = async () => {
    this.setState({ recording: false }, () => {
      this.cam.stopRecording();
    });
  };

  _StartRecord = async () => {
    if (this.cam) {
      this.setState({ recording: false }, async () => {
        const video = await this.cam.takePictureAsync();
        console.log('recording is true');
        this.setState({ video }, () => {
          console.log('video ', this.state.video);
        });
      });
    }
  };

  toogleRecord = () => {
    const { recording } = this.state;

    if (recording) {
      this._StopRecord();
    } else {
      this._StartRecord();
    }
  };

  render() {
    const { recording, video } = this.state;
    return (
      <Camera
        ref={(cam) => (this.cam = cam)}
        style={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          flex: 1,
          width: '100%'
        }}
      >
        {video && (
          <TouchableOpacity
            onPress={this._saveVideo}
            style={{
              padding: 20,
              width: '100%',
              backgroundColor: '#fff'
            }}
          >
            <Text style={{ textAlign: 'center' }}>save</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={this.toogleRecord}
          style={{
            padding: 20,
            width: '100%',
            backgroundColor: recording ? '#ef4f84' : '#4fef97'
          }}
        >
          <Text style={{ textAlign: 'center' }}>
            {recording ? 'Stop' : 'Take a picture'}
          </Text>
        </TouchableOpacity>
      </Camera>
    );
  }
}

class VehicleDamageVideo extends Component {
  state = {
    showCamera: false
  };

  _showCamera = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    const { status1 } = await Audio.requestPermissionsAsync();

    if (status === 'granted') {
      this.setState({ showCamera: true });
    }
  };

  render() {
    const { showCamera } = this.state;
    return (
      <View style={[styles.container, { backgroundColor: '#fff' }]}>
        <ScrollView
          keyboardShouldPersistTaps="always"
          centerContent={true}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          showsVerticalScrollIndicator={false}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1 }}>
              <View style={{ marginHorizontal: 10, marginTop: 20 }}>
                <Progress.Bar
                  progress={0.7}
                  width={Dimensions.get('window').width - 20}
                />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                  width: Dimensions.get('window').width
                }}
              >
                <View style={styles.textInput}>
                  <TextInput
                    placeholder="Title"
                    placeholderTextColor="grey"
                    style={{ color: 'grey' }}
                  />
                </View>
                <View style={styles.textInput}>
                  <TextInput
                    placeholderTextColor="grey"
                    placeholder="Description"
                    style={{ color: 'grey' }}
                    multiline
                    numberOfLines={3}
                  />
                </View>
                {showCamera ? (
                  <MyCam />
                ) : (
                  <TouchableOpacity onPress={this._showCamera}>
                    <Text style={{ color: 'grey' }}> Record Damage </Text>
                  </TouchableOpacity>
                )}
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
                    this.props.navigation.navigate('InvolvedParties');
                  }}
                />
                {showCamera ? (
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => this.setState({ showCamera: false })}
                  >
                    <Text style={{ paddingRight: 10 }}>Close Camera</Text>
                    <FontAwesomeIcon
                      icon={faTimesCircle}
                      size={25}
                      color="red"
                    />
                  </TouchableOpacity>
                ) : null}
                <Button
                  title="Next"
                  onPress={() => {
                    this.props.navigation.navigate('ServiceProviders');
                  }}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </View>
    );
  }
}

export default VehicleDamageVideo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeButton: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  textInput: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginHorizontal: 20,
    marginVertical: 20,
    width: Dimensions.get('window').width - 50
  }
});
