import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AnchorPointAnimationsDemoScreen from './src/screens/animated_anchor_point';
import SimpleAnchorPointScreen from './src/screens/simple_anchor_point';
import Matrix3DAnchorPointScreen from './src/screens/matrix_3d_anchor_point';
import Matrix3DAnimatedAnchorPointScreen from './src/screens/matrix_3d_anchor_point_animated';
import CubeScreen from './src/screens/cube';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="StartScreen"
          options={{headerShown: false}}
          component={CubeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
