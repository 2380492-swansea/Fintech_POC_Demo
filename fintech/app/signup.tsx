import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { Link } from 'expo-router';
import { useState } from 'react';
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
  } from 'react-native';

  const Page = () => {
    const [countryCode, setCountryCode] = useState('+91');
    const [phoneNumber, setPhoneNumber] = useState('');
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 80 : 0;

    const onSignup = async () => {
      // Add your signup logic here
    };

    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={keyboardVerticalOffset}>
        <View style={defaultStyles.container}>
          <Text style={defaultStyles.header}>Let's get started!</Text>
          <Text style={defaultStyles.descriptionText}>
            Enter your phone number. We will send you a confirmation code there
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, styles.countryCodeInput]}
              placeholder="Country code"
              placeholderTextColor={Colors.gray}
              value={countryCode}
              onChangeText={setCountryCode}
            />
            <TextInput
              style={[styles.input, styles.phoneNumberInput]}
              placeholder="Mobile number"
              placeholderTextColor={Colors.gray}
              keyboardType="numeric"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>

          <Link href={'/login'} replace asChild>
            <TouchableOpacity>
              <Text style={defaultStyles.textLink}>Already have an account? Log in</Text>
            </TouchableOpacity>
          </Link>

          <View style={{ flex: 1 }} />

          <TouchableOpacity
            style={[
              defaultStyles.pillButton,
              phoneNumber !== '' ? styles.enabled : styles.disabled,
              { marginBottom: 20 },
            ]}
            onPress={onSignup}>
            <Text style={defaultStyles.buttonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  };

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    backgroundColor: Colors.lightGray,
    padding: 15,
    borderRadius: 16,
    fontSize: 18,
  },
  countryCodeInput: {
    width: '20%',
    marginRight: 10,
    textAlign: 'center',
    fontSize: 20,
  },
  phoneNumberInput: {
    flex: 1,
  },
  enabled: {
    backgroundColor: Colors.primary,
  },
  disabled: {
    backgroundColor: Colors.primaryMuted,
  },
});

export default Page;
