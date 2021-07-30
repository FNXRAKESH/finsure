import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TextInput,
  Button,
} from "react-native";
import * as Progress from "react-native-progress";

class ClaimRegistration extends Component {
  state = {};
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          centerContent={true}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ marginHorizontal: 10 }}>
            <Progress.Bar
              progress={1}
              width={Dimensions.get('window').width - 20}
            />
          </View>
          <Text
            style={{ textAlign: 'center', marginVertical: 20, fontSize: 16 }}
          >
            Summary of my claim
          </Text>
          <View>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 16,
                color: 'lightgrey'
              }}
            >
              Thank you for your claim.
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 16,
                color: 'lightgrey'
              }}
            >
              Your claim # is <Text style={{ color: 'blue' }}>Z0850214.</Text>
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 10,
              flex: 0.8
            }}
          >
            <View style={styles.imageHolder}></View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default ClaimRegistration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  imageHolder: {
    height: 200,
    width: 250,
    borderWidth: 2,
  },
});
