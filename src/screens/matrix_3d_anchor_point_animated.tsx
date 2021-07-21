/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {
  createIdentityMatrix,
  reuseRotateYCommand,
  reuseRotateXCommand,
  transformWithOrigin,
  reuseRotateZCommand,
} from './matrix_math_worklets';

const styles = StyleSheet.create({
  heading: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  squareContainer: {
    height: 80,
    width: 80,
    backgroundColor: '#0A0',
  },
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
});

const Matrix3DAnimatedAnchorPointScreen = () => {
  const animatedValue = useSharedValue(0);

  useEffect(() => {
    animatedValue.value = 0;
    animatedValue.value = withRepeat(
      withTiming(1, {duration: 3000, easing: Easing.linear}),
      -1,
      false,
    );
    return () => {
      cancelAnimation(animatedValue);
    };
  }, []);

  const squareSize = 80;
  const anchorPointXYZ = {
    x: 0,
    y: 0,
    z: 50,
  };

  const squareStyle = {
    height: squareSize,
    width: squareSize,
    backgroundColor: '#00FFFF',
  };

  const animatedStyleX = useAnimatedStyle(() => {
    const degree = interpolate(animatedValue.value, [0, 1], [0, 2 * Math.PI]);
    let rotX = createIdentityMatrix();
    reuseRotateXCommand(rotX, degree);
    transformWithOrigin(rotX, anchorPointXYZ);

    return {
      transform: [{perspective: 1000}, {matrix: rotX}],
    };
  });

  const animatedStyleY = useAnimatedStyle(() => {
    const degree = interpolate(animatedValue.value, [0, 1], [0, 2 * Math.PI]);
    let rotY = createIdentityMatrix();
    reuseRotateYCommand(rotY, degree);
    transformWithOrigin(rotY, anchorPointXYZ);

    return {
      transform: [{perspective: 1000}, {matrix: rotY}],
    };
  });

  const animatedStyleZ = useAnimatedStyle(() => {
    const degree = interpolate(animatedValue.value, [0, 1], [0, 2 * Math.PI]);
    let rotZ = createIdentityMatrix();
    reuseRotateZCommand(rotZ, degree);
    transformWithOrigin(rotZ, anchorPointXYZ);

    return {
      transform: [{perspective: 1000}, {matrix: rotZ}],
    };
  });

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.heading}>Rotate around X axis</Text>
      <View style={{height: 20, opacity: 0}} />

      <View
        style={[
          styles.squareContainer,
          {backgroundColor: 'rgba(100, 100, 100, 0.5)'},
        ]}>
        <Animated.View style={[squareStyle, animatedStyleX]} />
      </View>

      <View style={{height: 50, opacity: 0}} />
      <Text style={styles.heading}>Rotate around Y axis</Text>
      <View style={{height: 20, opacity: 0}} />

      <View
        style={[
          styles.squareContainer,
          {backgroundColor: 'rgba(100, 100, 100, 0.5)'},
        ]}>
        <Animated.View style={[squareStyle, animatedStyleY]} />
      </View>

      <View style={{height: 50, opacity: 0}} />
      <Text style={styles.heading}>Rotate around Z axis</Text>
      <View style={{height: 20, opacity: 0}} />

      <View
        style={[
          styles.squareContainer,
          {backgroundColor: 'rgba(100, 100, 100, 0.5)'},
        ]}>
        <Animated.View style={[squareStyle, animatedStyleZ]} />
      </View>
    </SafeAreaView>
  );
};

export default Matrix3DAnimatedAnchorPointScreen;
