import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router'; // Correct hook for expo-router
import axios from 'axios';
const Signup = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<number | string>('');
  const router = useRouter(); // For navigation

  const handleSignup = async () => {
    try {
      const httpRequest = await axios.post("http://192.168.1.4:8080/api/users/register",{
      firstName,
      lastName,
      email,
      password,
      address,
      phoneNumber
      },{withCredentials : true});
      console.log(httpRequest);
    } catch (error) {
      console.log((error as Error).message);
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
        <Text className="text-2xl font-bold text-gray-800">Create an Account</Text>
        <Text className="text-sm text-gray-600 mt-1">Sign up to get started</Text>
      </View>

      {/* Input Fields */}
      <View className="space-y-4 flex flex-col gap-3">
        <TextInput
          placeholder="First Name"
          className="bg-white p-4 rounded-md shadow-sm text-gray-800"
          placeholderTextColor="#aaa"
          onChangeText={(text) => setFirstName(text)}
        />
        <TextInput
          placeholder="Last Name"
          className="bg-white p-4 rounded-md shadow-sm text-gray-800"
          placeholderTextColor="#aaa"
          onChangeText={(text) => setLastName(text)}
        />
        <TextInput
          placeholder="Email"
          className="bg-white p-4 rounded-md shadow-sm text-gray-800"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="Phone Number"
          className="bg-white p-4 rounded-md shadow-sm text-gray-800"
          placeholderTextColor="#aaa"
          keyboardType="phone-pad"
          onChangeText={(text) => setPhoneNumber(text)}
        />
        <TextInput
          placeholder="Address"
          className="bg-white p-4 rounded-md shadow-sm text-gray-800"
          placeholderTextColor="#aaa"
          onChangeText={(text) => setAddress(text)}
        />
        <TextInput
          placeholder="Password"
          className="bg-white p-4 rounded-md shadow-sm text-gray-800"
          placeholderTextColor="#aaa"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity
        className="bg-blue-600 mt-6 p-4 rounded-md items-center shadow-md"
        onPress={handleSignup}
      >
        <Text className="text-white font-semibold text-lg">Sign Up</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View className="mt-6 items-center">
        <Text className="text-gray-600">
          Already have an account?{' '}
          <Text
            className="text-blue-600 font-semibold"
            onPress={() => {
              router.push('/signin'); // Navigate to sign-in screen
            }}
          >
            Sign In
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Signup;
