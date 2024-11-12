import * as React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Switch, TamaguiProvider } from 'tamagui';
import { Switch as RNSwitch } from 'react-native';
import appConfig from './tamagui.config';
import { useLayoutEffect } from 'react';


function HomeScreen({navigation}: {navigation: any}) {

  const navigate = (screen:string) => {
    const startTime = performance.now(); // Start timing
    navigation.navigate(screen, {startTime})

  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Tamagui Switch Performance Demo</Text>
      <Button
        title="Show Tamagui Switches with animation prop"
        onPress={() =>{
          navigate('TamaguiAnimationSwitchesScreen')
        }}
      />
      <Button
        title="Show Tamagui Switches without animation prop"
        onPress={() =>{
          navigate('TamaguiNoAnimationSwitchesScreen')
        }}
      />
      <Button
        title="Show React Native Switches "
        onPress={() =>{
          navigate('ReactNativeSwitchesScreen')
        }}
      />
    </View>
  );
}

const SWITCHES = 50

const style = { flex: 1, flexDirection:'row', flexWrap:'wrap', backgroundColor:'grey' } as const;


const alertNavigationTime = (startTime: number) => {
  const endTime = performance.now(); 
  Alert.alert('useLayoutEffect',(((endTime - startTime)).toFixed(2) + 'ms'))
}
function TamaguiAnimationSwitchesScreen({route}) {
  useLayoutEffect(() => {
    alertNavigationTime(route.params.startTime)
  }, [])
  return (
    <View style={style}>
      {[...Array(SWITCHES)].map((_, index) => (
        <Switch animation={'quick'} key={index} />
      ))}
      </View>
  );
}
function TamaguiNoAnimationSwitchesScreen({route}) {
  useLayoutEffect(() => {
    alertNavigationTime(route.params.startTime)
  }, [])
  return (
    <View style={style}>
      {[...Array(SWITCHES)].map((_, index) => (
        <Switch key={index} />
      ))}
      </View>
  );
}
function ReactNativeSwitchesScreen({route}) {

  useLayoutEffect(() => {
    alertNavigationTime(route.params.startTime)
  }, [])

  return (
    <View style={style}>
      {[...Array(SWITCHES)].map((_, index) => (
        <RNSwitch key={index} />
      ))}
      </View>
  );
}
const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="TamaguiNoAnimationSwitchesScreen" component={TamaguiNoAnimationSwitchesScreen} />
      <Stack.Screen name="TamaguiAnimationSwitchesScreen" component={TamaguiAnimationSwitchesScreen} />
      <Stack.Screen name="ReactNativeSwitchesScreen" component={ReactNativeSwitchesScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <TamaguiProvider config={appConfig}>
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
    </TamaguiProvider>
  );
}
