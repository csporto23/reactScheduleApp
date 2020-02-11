import React, { Component } from "react";
import { Text, View, StyleSheet, Button, Image } from "react-native";
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen';
import DirectScreen from './DirectScreen';

 class SettingsScreen extends Component {
    
  render() {
    return (
      <View style={styles.container}>
 <Text style={styles.info} onPress={() => this.props.navigation.navigate("Login")}>Sign out</Text>
 </View>
    );
  }
}

    export default createMaterialBottomTabNavigator({
        
        HomeScreen: { screen: HomeScreen,
            navigationOptions: {
                tabBarLabel: 'Home',
                tabBarIcon: ({tintColor})=>(
                    <Icon name="ios-home" color={'red'} size={24} />
                )
            } },
       
        DirectScreen: { screen: DirectScreen,
            navigationOptions: {
                tabBarLabel: 'Direct Message',
                tabBarIcon: ({tintColor})=>(
                    <Icon name="ios-contacts" color={'red'} size={24} />
                )
            }
         },
        SettingsScreen: { screen: SettingsScreen,
            navigationOptions: {
                tabBarLabel: 'Settings',
                tabBarIcon: ({tintColor})=>(
                    <Icon name="ios-settings" color={'red'} size={24} />
                )
            } },
},
                {initialRouteName: 'HomeScreen',
                TintColor: 'black'
            });

      const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }
    });
