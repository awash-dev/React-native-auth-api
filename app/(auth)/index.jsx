import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Animated,
  StyleSheet
} from "react-native";
import LottieView from 'lottie-react-native';
import { useRouter } from "expo-router"; 

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailLabelAnimation = useRef(new Animated.Value(0)).current;
  const passwordLabelAnimation = useRef(new Animated.Value(0)).current;

  const router = useRouter(); 

  const handleLogin = async () => {
    // Basic validation
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    // Handle authentication
    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
        router.replace('/(tabs)'); // Use replace to prevent back navigation
      } else {
        Alert.alert("Error", data.message || "Login failed.");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "An error occurred. Please try again.");
    }
  };

  const animateLabel = (value: string, animation: Animated.Value) => {
    Animated.timing(animation, {
      toValue: value === "" ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    animateLabel(email, emailLabelAnimation);
  }, [email]);

  useEffect(() => {
    animateLabel(password, passwordLabelAnimation);
  }, [password]);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../log.json')} // Update the path to your Lottie file
        autoPlay
        loop
        style={styles.animation}
      />
      <Text style={styles.title}>Login</Text>

      <View style={styles.inputContainer}>
        <Animated.Text style={[
          styles.label,
          {
            top: emailLabelAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [20, -10],
            }),
            fontSize: emailLabelAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [16, 12],
            }),
            color: emailLabelAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: ["#aaa", "#007BFF"],
            }),
          },
        ]}>
          Email
        </Animated.Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          onFocus={() => animateLabel(email, emailLabelAnimation)}
          onBlur={() => animateLabel(email, emailLabelAnimation)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Animated.Text style={[
          styles.label,
          {
            top: passwordLabelAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [20, -10],
            }),
            fontSize: passwordLabelAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [16, 12],
            }),
            color: passwordLabelAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: ["#aaa", "#007BFF"],
            }),
          },
        ]}>
          Password
        </Animated.Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          onFocus={() => animateLabel(password, passwordLabelAnimation)}
          onBlur={() => animateLabel(password, passwordLabelAnimation)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>You don't have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/register')}>
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  animation: {
    width: '100%',
    height: 144, // Adjust based on your animation size
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
    position: 'relative',
  },
  label: {
    position: 'absolute',
    left: 8,
    backgroundColor: 'white',
    paddingHorizontal: 4,
  },
  input: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 12,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  footerText: {
    fontSize: 16,
    color: 'black',
  },
  registerText: {
    fontSize: 16,
    color: '#007BFF',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
