import React, { useState } from "react";
import { Text, Image, StyleSheet, Dimensions } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const LocationSearch = (props) => {
  const [fromLat, setFromLat] = useState(0);
  const [fromLong, setFromLong] = useState(0);
  return (
    <GooglePlacesAutocomplete
      placeholder="search location..."
      minLength={2} // minimum length of text to search
      autoFocus={false}
      returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      listViewDisplayed="auto" // true/false/undefined
      fetchDetails={true}
      renderDescription={(row) => row.description} // custom description render
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log('location ', details);
        props.location(
          details.geometry.location.lat,
          details.geometry.location.lng,
          details.formatted_address,
          details.address_components
        );
        // setFromLat(details.geometry.location.lat)
        // setFromLong(details.geometry.location.lng)
      }}
      textInputProps={{ onBlur: () => {} }}
      getDefaultValue={() => ""}
      enablePoweredByContainer={false}
      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: "AIzaSyBov-hgk72VmzPEXpUtzZHvvzFwf7rqhco",
        language: "en", // language of the results
      }}
      styles={{
        textInputContainer: {
          backgroundColor: "#fff",
          width:Dimensions.get('window').width,
          padding:20
        },
        textInput: {
         
          fontSize: 20,
          padding:20
        },
        predefinedPlacesDescription: {
          color: "red",
        },
        renderDescription: {
          backgroundColor: "white",
        },

        description: {
          fontWeight: "bold",
        },
      }}
      currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
      currentLocationLabel="Current location"
      nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      filterReverseGeocodingByTypes={[
        "locality",
        "administrative_area_level_3",
      ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
      debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      // renderLeftButton={() => <Image source={require('path/custom/left-icon')} />}
    />
  );
};

export default LocationSearch;
