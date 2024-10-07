import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/authSlice';

const facebookLogo = require('../assets/image/facebooklogo.png');
const googleLogo = require('../assets/image/googlelog.png');

function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const error = useSelector((state) => state.auth.error); 

  const passwordIcon = useMemo(
    () => (passwordVisible ? 'eye-slash' : 'eye'),
    [passwordVisible]
  );

  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisible((prevState) => !prevState);
  }, []);

  const handleSubmit = () => {
    if (email && password) {
      dispatch(login({ email, password }));
    } else {
      Alert.alert('Please enter both email and password');
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigation.replace('Main');
    }

    if (error) {
      Alert.alert('Login Error', error);
    }
  }, [isLoggedIn, error, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Pliē</Text>
        <Image source={require('../assets/image/placeholder.png')} style={styles.imagePlaceholder} />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="email@email.com"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#9E9E9E"
        />

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            style={styles.passwordInput}
            secureTextEntry={!passwordVisible}
            placeholderTextColor="#9E9E9E"
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
            <FontAwesome name={passwordIcon} size={20} color="gray" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signInButton} onPress={handleSubmit}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>

        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Not a member?</Text>
          <TouchableOpacity>
            <Text style={styles.signUpLink}> Sign Up Here</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>or Sign In with:</Text>
        <View style={styles.dividerLine} />
      </View>

      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Image 
            source={googleLogo} 
            style={{ width: 30, height: 30 }} 
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="apple" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image 
            source={facebookLogo} 
            style={{ width: 30, height: 30 }} 
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.guestButton}>
        <Text style={styles.guestText}>Enter as Guest</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  logoContainer: {
    width: '100%',
    height: '39%',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#cccccc',
  },
  logoText: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    tintColor:'#4b4949'
  },
  formContainer: {
    width: '100%',
    marginTop: 20,
    paddingHorizontal: '8%',
  },
  label: {
    fontSize: 16,
    color: '#424242',
    marginBottom: 5,
  },
  input: {
    height: 50, 
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 8,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50, 
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    backgroundColor: '#FFF',
    paddingLeft: 15,
    paddingRight: 45,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 8,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
  },
  forgotPassword: {
    alignItems: 'flex-end',
    marginTop: 5,
  },
  forgotPasswordText: {
    color: 'gray',
  },
  signInButton: {
    backgroundColor: '#21D393',
    padding: 10,
    borderRadius: 6,
    alignSelf: 'flex-end',
    marginVertical: 10,
  },
  signInButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  signUpText: {
    color: 'gray',
  },
  signUpLink: {
    color: '#003',
    textDecorationLine: 'underline'
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: '8%',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'gray',
  },
  dividerText: {
    marginHorizontal: 10,
    color: 'gray',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10,
    paddingHorizontal: '18%',
  },
  socialButton: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 8,
  },
  guestButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: '8%',
  },
  guestText: {
    color: 'gray',
  },
});

export default Login;
