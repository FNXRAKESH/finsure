import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class MyAgent extends Component {
  state = {};
  render() {
    return (
      <View style={styles.container}>
        <Text>My Agent</Text>
      </View>
    );
  }
}

export default MyAgent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
