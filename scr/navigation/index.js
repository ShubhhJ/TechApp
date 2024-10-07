import { View, Text, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Init } from '../redux/actions/action';
import Dashboard from '../main/Dashboard';
import Login from '../auth/SignIn';
import Favorites from '../main/AddToFavorite';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Event from '../main/Event';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import Profile from '../main/Profile';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const MyTabs=()=> {
    return (
      <Tab.Navigator
        initialRouteName="home"
        screenOptions={{
          tabBarActiveTintColor: 'purple',
        }}>
        <Tab.Screen
          name="home"
          component={Dashboard}
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="magnify" color={color} size={30} />
            ),
            headerShown: false,
          }}
        />
         <Tab.Screen
          name="event"
          component={Event}
          options={{
            tabBarLabel: 'Events',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="calendar-month-outline" color={color} size={30} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="favorite"
          component={Favorites}
          options={{
            tabBarLabel: 'favorite',
            tabBarIcon: ({ color, size }) => (
                <Feather name="heart" color={color} size={30} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="profile"
          component={Profile}
          options={{
            tabBarLabel: 'profile',
            tabBarIcon: ({ color, size }) => (          
              <Feather name="user" color={color} size={30} />
            ),
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    );
  }
const Auth = () => {
    return (
           <>
    <StatusBar barStyle="light-content" backgroundColor="#cccccc" />
        <Stack.Navigator initialRouteName='login' >
            <Stack.Screen name='login' component={Login} options={{ headerShown: false }} />
        </Stack.Navigator>
    </>
    )
}
const Main = () => {
    return (
        <>
        <StatusBar barStyle="light-content" backgroundColor="#ffffff" />
        <Stack.Navigator initialRouteName='home' >
            <Stack.Screen name='home' component={MyTabs} options={{ headerShown: false }} />
            {/* <Stack.Screen name='favorite' component={Favorites} options={{ headerShown: false }} /> */}
        </Stack.Navigator>
        </>
    )
}
export default function RootNavigation() {
    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
console.log('token',isLoggedIn);
    return (
        <NavigationContainer>
            {!isLoggedIn ? <Auth /> : <Main />}
        </NavigationContainer>
    )
}