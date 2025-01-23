import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';

const HelpScreen = () => {
  const [feedback, setFeedback] = useState('');
  
  const handleFeedbackSubmit = () => {
    if (feedback.trim()) {
      Alert.alert('Thank you for your feedback!', 'We appreciate your input.');
      setFeedback('');
    } else {
      Alert.alert('Error', 'Please enter feedback before submitting.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Help & Support</Text>

      {/* FAQs Section */}
      <Text style={styles.sectionHeader}>FAQs</Text>
      <View style={styles.faqItem}>
        <Text style={styles.question}>Q: How do I link my bank account?</Text>
        <Text style={styles.answer}>A: Go to the 'Accounts' section, click 'Add Bank', and follow the instructions.</Text>
      </View>
      <View style={styles.faqItem}>
        <Text style={styles.question}>Q: How do I reset my password?</Text>
        <Text style={styles.answer}>A: Click 'Forgot Password' on the login screen and follow the steps.</Text>
      </View>
      <View style={styles.faqItem}>
        <Text style={styles.question}>Q: What should I do if I suspect fraud?</Text>
        <Text style={styles.answer}>
          A: Contact our support team immediately at support@fintechdemo.com or call 1800-123-4567.
        </Text>
      </View>

      {/* Contact Section */}
      <Text style={styles.sectionHeader}>Contact Us</Text>
      <Text style={styles.contactText}>Email: support@fintechdemo.com</Text>
      <Text style={styles.contactText}>Phone: 1800-123-4567</Text>

      {/* Feedback Form */}
      <Text style={styles.sectionHeader}>Feedback</Text>
      <TextInput
        style={styles.input}
        placeholder="Let us know your thoughts..."
        multiline
        value={feedback}
        onChangeText={setFeedback}
      />
      <TouchableOpacity style={styles.button} onPress={handleFeedbackSubmit}>
        <Text style={styles.buttonText}>Submit Feedback</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  faqItem: {
    marginBottom: 15,
  },
  question: {
    fontSize: 16,
    fontWeight: '500',
  },
  answer: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  contactText: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    backgroundColor: '#fff',
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HelpScreen;
