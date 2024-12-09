import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router'; // Correct hook for expo-router
import axios from 'axios';

type EmailOrPhonenumber = string | number;

const SignIn = () => {
  const [emailOrPhonenumber, setEmailOrPhoneNumber] = useState<EmailOrPhonenumber>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter(); // Use useRouter for navigation

  const handleSignIn = async () => {
    try {
      const response = await axios.post(
        "http://192.168.1.4:8080/api/users/login", // Adjust endpoint to "login"
        {
          emailOrPhonenumber,
          password,
        },
        { withCredentials: true }
      );
      console.log('Sign-in successful:', response.data); // Handle success (e.g., navigate to home)
    } catch (error) {
      console.log((error as Error).message) // Handle error
    }
  };

  return (
    <View className="flex-1 bg-gray-100 justify-center p-6">
      {/* Logo Section */}
      <View className="items-center mb-8">
        <Image
          source={{ uri: 'https://i.ibb.co/dLrNJYr/applogo.png' }} // Replace with your app logo URL
          className="w-24 h-24 rounded-lg mb-4"
        />
        <Text className="text-2xl font-bold text-gray-800">Welcome Back</Text>
        <Text className="text-sm text-gray-600 mt-1">Sign in to continue</Text>
      </View>

      {/* Input Fields */}
      <View className="space-y-4 flex flex-col gap-3">
        <TextInput
          placeholder="Email or phone number"
          className="bg-white p-4 rounded-md shadow-sm text-gray-800"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          onChangeText={(text) => {
            setEmailOrPhoneNumber(text);
          }}
        />
        <TextInput
          placeholder="Password"
          className="bg-white p-4 rounded-md shadow-sm text-gray-800"
          placeholderTextColor="#aaa"
          secureTextEntry
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
      </View>

      {/* Sign In Button */}
      <TouchableOpacity
        className="bg-blue-600 mt-6 p-4 rounded-md items-center shadow-md"
        onPress={handleSignIn} // Attach the handleSignIn function
      >
        <Text className="text-white font-semibold text-lg">Sign In</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View className="mt-6 items-center">
        <Text className="text-gray-600">
          Don't have an account?{' '}
          <Text
            className="text-blue-600 font-semibold"
            onPress={() => {
              router.push('/signup'); // Use router.push for navigation with expo-router
            }}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default SignIn;
