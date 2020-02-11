import React, { Component } from "react";
import {StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Alert} from "react-native";
import firebaseSDK from '../config/firebaseSDK';
import * as Google from "expo-google-app-auth";


firebase.initializeApp(firebaseSDK)

const IOS_CLIENT_ID =
  "247965728555-klbq9p8mt334r9o3evpgjjtkssmdktb2.apps.googleusercontent.com";
const ANDROID_CLIENT_ID =
  "247965728555-i0tfrbo27tasr0lo2g2o7gi4oj1l7fpk.apps.googleusercontent.com";

export default class LoginScreen extends Component {


  static navigationOptions = {
		title: 'RN + Firebase Chat App'
	};

	state = {
		name: '',
		email: '',
		password: '',
		avatar: ''
	};

	onPressLogin = async () => {
		const user = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			avatar: this.state.avatar
		};

		const response = firebaseSDK.login(
			user,
			this.loginSuccess,
			this.loginFailed
		);
	};

	loginSuccess = () => {
		console.log('login successful, navigate to chat.');
		this.props.navigation.navigate('DashboardScreen', {
			name: this.state.name,
			email: this.state.email,
			avatar: this.state.avatar
		});
	};

	loginFailed = () => {
		alert('Login failure. Please tried again.');
	};

	onChangeTextEmail = email => this.setState({ email });
	onChangeTextPassword = password => this.setState({ password });

  signInWithGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        iosClientId: IOS_CLIENT_ID,
        androidClientId: ANDROID_CLIENT_ID,
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        console.log("LoginScreen.js.js 21 | ", result.user.givenName);
        this.props.navigation.navigate("Profile", {
          username: result.user.givenName
        }); //after Google login redirect to Profile
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log('LoginScreen.js.js 30 | Error with login', e);
      return { error: true };
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.bgImage} source={{ uri: "data:image/jpeg;base64,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" }}/>
        <Image style={styles.mainImage} source={require('../assets/sportImg.png')} />
        <View>
				<Text style={styles.title}>Email:</Text>
				<TextInput
					style={styles.nameInput}
					placeHolder="test3@gmail.com"
					onChangeText={this.onChangeTextEmail}
					value={this.state.email}
				/>
				<Text style={styles.title}>Password:</Text>
				<TextInput
					style={styles.nameInput}
					onChangeText={this.onChangeTextPassword}
					value={this.state.password}
				/>
				<Button
					title="Login"
					style={styles.buttonText}
					onPress={this.onPressLogin}
				/>
           {/* <Button
					title="Make an account?"
					style={styles.buttonText}
					onPress={() => this.props.navigation.navigate('Signup')}
				/>

        <TouchableOpacity style={styles.buttonContainer, styles.googleButton} onPress={this.signInWithGoogle}>
            <Text style={styles.loginText}>Sign In With Google</Text>
        </TouchableOpacity> */}
			</View>
      </View>
		);
	}
}

const resizeMode = 'center';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  mainImage: {
    width: 300,
    height: 300,
    alignContent: "center",
    margin: 5 
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    borderBottomWidth: 1,
    width:300,
    height:45,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center',

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  inputs:{
    height:45,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginRight:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:300,
    borderRadius:30,
    backgroundColor:'transparent'
  },
  btnForgotPassword: {
    height:15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom:10,
    width:300,
    backgroundColor:'transparent'
  },
  loginButton: {
    backgroundColor: "#00b5ec",

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 12.35,

    elevation: 19,
  },
  loginText: {
    color: 'white',
  },
  bgImage:{
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  btnText:{
    color:"white",
    fontWeight:'bold'
  },
  googleButton:{
    color: 'green',
    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 12.35,

    elevation: 19,

  }
}); 
