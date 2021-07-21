/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {rotateXYZ, transformWithOrigin} from './matrix_math_worklets';

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
  containerGesture: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  container: {
    height: 100,
    width: 100,
  },
  square: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 100,
    width: 100,
    backgroundColor: '#AAA',
    zIndex: 10,
  },
});

const use2DSharedVector = () => {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  return {x, y};
};

const CubeScreen = () => {
  const vectorFront = use2DSharedVector();
  const originCube = {
    x: 0,
    y: 0,
    z: 50,
  };

  const onGestureEvent =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onStart: () => {},
      onActive: ({translationX, translationY}) => {
        vectorFront.x.value = translationX / 50.0;
        vectorFront.y.value = -translationY / 50.0;
      },
      onEnd: () => {},
    });

  const animatedStyleFront = useAnimatedStyle(() => {
    const rotationMatrix = rotateXYZ(
      vectorFront.y.value,
      vectorFront.x.value,
      0,
    );
    transformWithOrigin(rotationMatrix, originCube);
    return {
      transform: [{perspective: 1000}, {matrix: rotationMatrix}],
    };
  });

  const animatedStyleLeft = useAnimatedStyle(() => {
    const rotationMatrix = rotateXYZ(
      vectorFront.y.value,
      vectorFront.x.value - Math.PI / 2.0, // -90 degree for the left surface of the cube
      0,
    );
    transformWithOrigin(rotationMatrix, originCube);
    return {
      transform: [{perspective: 1000}, {matrix: rotationMatrix}],
    };
  });

  const animatedStyleRight = useAnimatedStyle(() => {
    const rotationMatrix = rotateXYZ(
      vectorFront.y.value,
      vectorFront.x.value + Math.PI / 2.0, // +90 degree for the left surface of the cube
      0,
    );
    transformWithOrigin(rotationMatrix, originCube);
    return {
      transform: [{perspective: 1000}, {matrix: rotationMatrix}],
    };
  });

  const animatedStyleBack = useAnimatedStyle(() => {
    const rotationMatrix = rotateXYZ(
      vectorFront.y.value,
      vectorFront.x.value + Math.PI, // +180 degree for the back surface of the cube
      0,
    );
    transformWithOrigin(rotationMatrix, originCube);
    return {
      transform: [{perspective: 1000}, {matrix: rotationMatrix}],
    };
  });

  const animatedStyleTop = useAnimatedStyle(() => {
    const rotationMatrix = rotateXYZ(
      vectorFront.y.value + Math.PI / 2.0, // +90 degree for the top surface of the cube
      0,
      -vectorFront.x.value,
    );
    transformWithOrigin(rotationMatrix, originCube);
    return {
      transform: [{perspective: 1000}, {matrix: rotationMatrix}],
    };
  });

  const animatedStyleBottom = useAnimatedStyle(() => {
    const rotationMatrix = rotateXYZ(
      vectorFront.y.value - Math.PI / 2.0, // -90 degree for the top surface of the cube
      0,
      vectorFront.x.value,
    );
    transformWithOrigin(rotationMatrix, originCube);
    return {
      transform: [{perspective: 1000}, {matrix: rotationMatrix}],
    };
  });

  return (
    <SafeAreaView style={styles.screen}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={styles.containerGesture}>
          <Animated.View style={styles.container}>
            <Animated.View style={[styles.square, animatedStyleFront]} />
            <Animated.View
              style={[
                styles.square,
                animatedStyleLeft,
                {backgroundColor: 'rgba(255, 0, 0, 0.5)'},
              ]}
            />
            <Animated.View
              style={[
                styles.square,
                animatedStyleRight,
                {backgroundColor: 'rgba(0, 255, 0, 0.5)'},
              ]}
            />
            <Animated.View
              style={[
                styles.square,
                animatedStyleBack,
                {backgroundColor: 'rgba(0, 255, 255, 0.5)'},
              ]}
            />
            <Animated.View
              style={[
                styles.square,
                animatedStyleTop,
                {backgroundColor: 'rgba(0, 0, 0, 0.8)'},
              ]}
            />
            <Animated.View
              style={[
                styles.square,
                animatedStyleBottom,
                {backgroundColor: 'rgba(100,1000, 0, 0.8)'},
              ]}
            />
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </SafeAreaView>
  );
};

export default CubeScreen;
