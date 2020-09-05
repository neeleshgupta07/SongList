import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './Home';
import AlbumDetails from './AlbumDetails';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        // screenOptions={{
        //   cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        // }}
        headerMode="float">
        {
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                title: 'List of Albums',
                headerStyle: {
                  backgroundColor: '#660000',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />

            <Stack.Screen
              name="AlbumDetails"
              component={AlbumDetails}
              options={{
                title: 'Album Details',
                headerStyle: {
                  backgroundColor: '#660000',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
          </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
