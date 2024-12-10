import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Animated
} from "react-native";
import LottieView from 'lottie-react-native';
import { useRouter } from "expo-router"; // Correct import for router

const SignUpScreen: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const usernameLabelAnimation = useRef(new Animated.Value(0)).current;
  const emailLabelAnimation = useRef(new Animated.Value(0)).current;
  const passwordLabelAnimation = useRef(new Animated.Value(0)).current;

  const router = useRouter(); // Use the router from expo-router

  const handleSignUp = async () => {
    // Basic validation
    if (!username || !email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    // Handle sign up
    try {
      const response = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful sign up (e.g., navigate to login)
        console.log("Sign up successful:", data);
        Alert.alert("Success", "Account created successfully!");
        router.push('/(auth)'); // Navigate to login screen
      } else {
        // Handle errors (e.g., email already exists)
        Alert.alert("Error", data.message || "Sign up failed.");
      }
    } catch (error) {
      console.error("Sign up error:", error);
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
    animateLabel(username, usernameLabelAnimation);
  }, [username]);

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
      <Text style={styles.title}>Sign Up</Text>

      <View style={styles.inputContainer}>
        <Animated.Text style={[
          styles.label,
          {
            top: usernameLabelAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [20, -10], // Move above the input
            }),
            fontSize: usernameLabelAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [16, 12],
            }),
            color: usernameLabelAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: ["#aaa", "#007BFF"],
            }),
          },
        ]}>
          Username
        </Animated.Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          onFocus={() => animateLabel(username, usernameLabelAnimation)}
          onBlur={() => animateLabel(username, usernameLabelAnimation)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Animated.Text style={[
          styles.label,
          {
            top: emailLabelAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [20, -10], // Move above the input
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
              outputRange: [20, -10], // Move above the input
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

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/(auth)')}>
          <Text style={styles.loginLink}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  animation: {
    width: '100%',
    height: 150, // Adjust based on your animation size
    marginBottom: 20, // Space between animation and title
  },
  inputContainer: {
    marginBottom: 16,
    position: "relative",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  label: {
    position: "absolute",
    left: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 5,
    transition: "all 0.2s ease",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 4,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  loginText: {
    fontSize: 14,
    color: "#000",
  },
  loginLink: {
    fontSize: 14,
    color: "#007BFF",
    fontWeight: "bold",
  },
});
