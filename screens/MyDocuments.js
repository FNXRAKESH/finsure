import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
class MyDocuments extends Component {
  state = {};
  render() {
    return (
      <View style={styles.container}>
        <Text>My Documents</Text>
      </View>
    );
  }
}

export default MyDocuments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
