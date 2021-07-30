import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import {
  StripeProvider,
  CardField,
  useStripe
} from '@stripe/stripe-react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons';

const PaymentScreen = (props) => {
  const [brand, setBrand] = useState('');
  return (
    <>
      <CardField
        postalCodeEnabled={false}
        placeholder={{
          number: 'Card Number'
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000'
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 30
        }}
        onCardChange={(cardDetails) => {
          console.log('cardDetails', cardDetails);
          props.setBrand(cardDetails.brand);
        }}
      />
    </>
  );
};

const StripePayment = (props) => {
  const [brand, setBrand] = useState('');
  const handleSubmit = () => {
    if (brand !== '') {
      props.navigation.navigate('Confirmation');
    } else {
      alert('Check your card details');
    }
  };
  return (
    <StripeProvider
      publishableKey="pk_test_51J51PySHACGFmbJ20BSpZ5QdNd2mkdFYIJRzaO45WRDcTZNy9qnUA6D4eB2sVTHT2QOtMXpTpWTg6jT8rem3Is7T00WQ5U0ewN"
      merchantIdentifier="merchant.identifier"
    >
      <View style={[styles.container, { backgroundColor: '#fff' }]}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 30
          }}
          onPress={() => {
            props.navigation.navigate('QuickQuote');
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} size={16} color={'#000'} />
          <Text style={{ fontSize: 22, paddingLeft: 15, color: '#000' }}>
            Make the Payment
          </Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, paddingLeft: 15, color: '#000' }}>
            Card Details
          </Text>
          <PaymentScreen setBrand={setBrand} />
        </View>

        <TouchableOpacity
          onPress={() => {
            handleSubmit();
          }}
          style={{
            backgroundColor: '#1AC29A',
            marginVertical: 10,
            borderRadius: 5,
            alignItems: 'center'
          }}
        >
          <Text style={{ color: '#fff', padding: 20, fontSize: 20 }}>
            Continue to Payment
          </Text>
        </TouchableOpacity>
      </View>
    </StripeProvider>
  );
};

export default StripePayment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  }
});
