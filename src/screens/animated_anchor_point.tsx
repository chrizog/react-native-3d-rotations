/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {Text} from 'react-native';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

interface Point2D {
  x: number;
  y: number;
}

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
  squareContainer: {
    height: 50,
    width: 50,
    backgroundColor: '#0A0',
  },
  heading: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

const transformOrigin = (
  anchorPoint: Point2D,
  originalCenterPoint: Point2D,
  transforms,
) => {
  const result = [
    {translateX: anchorPoint.x - originalCenterPoint.x},
    {translateY: anchorPoint.y - originalCenterPoint.y},
    ...transforms,
    {translateX: -(anchorPoint.x - originalCenterPoint.x)},
    {translateY: -(anchorPoint.y - originalCenterPoint.y)},
  ];
  return result;
};

const transformOriginWorklet = (
  anchorPoint: Point2D,
  originalCenterPoint: Point2D,
  transforms,
) => {
  'worklet';
  const result = [
    {translateX: anchorPoint.x - originalCenterPoint.x},
    {translateY: anchorPoint.y - originalCenterPoint.y},
    ...transforms,
    {translateX: -(anchorPoint.x - originalCenterPoint.x)},
    {translateY: -(anchorPoint.y - originalCenterPoint.y)},
  ];
  return result;
};

const AnchorPointAnimationsDemoScreen = ({navigation}) => {
  const animatedValue = useSharedValue(0);

  useEffect(() => {
    animatedValue.value = 0;
    animatedValue.value = withRepeat(
      withTiming(1, {duration: 2000, easing: Easing.linear}),
      -1,
      false,
    );
    return () => {
      cancelAnimation(animatedValue);
    };
  }, []);

  const squareSize = 50;

  const squareStyle = {
    height: squareSize,
    width: squareSize,
    backgroundColor: 'rgba(100, 100, 100, 0.8)',
  };

  const animatedStyleZ1 = useAnimatedStyle(() => {
    const degree = interpolate(animatedValue.value, [0, 1], [0, 2 * Math.PI]);
    return {
      transform: transformOriginWorklet(
        {x: squareSize, y: squareSize},
        {x: squareSize / 2.0, y: squareSize / 2.0},
        [{rotateZ: degree}],
      ),
    };
  });

  const animatedStyleZ2 = useAnimatedStyle(() => {
    const degree = interpolate(animatedValue.value, [0, 1], [0, 2 * Math.PI]);
    return {
      transform: transformOriginWorklet(
        {x: 0, y: 0},
        {x: squareSize / 2.0, y: squareSize / 2.0},
        [{rotateZ: degree}],
      ),
    };
  });

  const animatedStyleX1 = useAnimatedStyle(() => {
    const degree = interpolate(animatedValue.value, [0, 1], [0, 2 * Math.PI]);
    return {
      transform: [
        {perspective: 200},
        ...transformOriginWorklet(
          {x: squareSize, y: squareSize},
          {x: squareSize / 2.0, y: squareSize / 2.0},
          [{rotateX: degree}],
        ),
      ],
    };
  });

  const animatedStyleX2 = useAnimatedStyle(() => {
    const degree = interpolate(animatedValue.value, [0, 1], [0, 2 * Math.PI]);
    return {
      transform: [
        {perspective: 200},
        ...transformOriginWorklet(
          {x: 0, y: 0},
          {x: squareSize / 2.0, y: squareSize / 2.0},
          [{rotateX: degree}],
        ),
      ],
    };
  });

  const animatedStyleY1 = useAnimatedStyle(() => {
    const degree = interpolate(animatedValue.value, [0, 1], [0, 2 * Math.PI]);
    return {
      transform: [
        {perspective: 200},
        ...transformOriginWorklet(
          {x: squareSize, y: squareSize},
          {x: squareSize / 2.0, y: squareSize / 2.0},
          [{rotateY: degree}],
        ),
      ],
    };
  });

  const animatedStyleY2 = useAnimatedStyle(() => {
    const degree = interpolate(animatedValue.value, [0, 1], [0, 2 * Math.PI]);
    return {
      transform: [
        {perspective: 200},
        ...transformOriginWorklet(
          {x: 0, y: 0},
          {x: squareSize / 2.0, y: squareSize / 2.0},
          [{rotateY: degree}],
        ),
      ],
    };
  });

  return (
    <SafeAreaView style={styles.screen}>
      <View style={{height: 20, opacity: 0}} />

      <Text style={styles.heading}>Rotate around Z axis</Text>
      <View style={{height: 50, opacity: 0}} />

      <View style={{flexDirection: 'row'}}>
        <View
          style={{flex: 0.5, flexDirection: 'row', justifyContent: 'center'}}>
          <View style={styles.squareContainer}>
            <Animated.View style={[squareStyle, animatedStyleZ1]} />
          </View>
        </View>

        <View
          style={{flex: 0.5, flexDirection: 'row', justifyContent: 'center'}}>
          <View style={styles.squareContainer}>
            <Animated.View style={[squareStyle, animatedStyleZ2]} />
          </View>
        </View>
      </View>

      <View style={{height: 100, opacity: 0}} />

      <Text style={styles.heading}>Rotate around X axis</Text>
      <View style={{height: 50, opacity: 0}} />

      <View style={{flexDirection: 'row'}}>
        <View
          style={{flex: 0.5, flexDirection: 'row', justifyContent: 'center'}}>
          <View style={(styles.squareContainer, {backgroundColor: '#09E'})}>
            <Animated.View
              style={[
                squareStyle,
                animatedStyleX1,
                {backgroundColor: 'rgba(0, 20, 240, 0.8)'},
              ]}
            />
          </View>
        </View>

        <View
          style={{flex: 0.5, flexDirection: 'row', justifyContent: 'center'}}>
          <View style={(styles.squareContainer, {backgroundColor: '#09E'})}>
            <Animated.View
              style={[
                squareStyle,
                animatedStyleX2,
                {backgroundColor: 'rgba(0, 20, 240, 0.8)'},
              ]}
            />
          </View>
        </View>
      </View>

      <View style={{height: 100, opacity: 0}} />

      <Text style={styles.heading}>Rotate around Y axis</Text>
      <View style={{height: 50, opacity: 0}} />

      <View style={{flexDirection: 'row'}}>
        <View
          style={{flex: 0.5, flexDirection: 'row', justifyContent: 'center'}}>
          <View style={(styles.squareContainer, {backgroundColor: '#E90'})}>
            <Animated.View
              style={[
                squareStyle,
                animatedStyleY1,
                {backgroundColor: 'rgba(240, 20, 0, 0.8)'},
              ]}
            />
          </View>
        </View>

        <View
          style={{flex: 0.5, flexDirection: 'row', justifyContent: 'center'}}>
          <View style={(styles.squareContainer, {backgroundColor: '#E90'})}>
            <Animated.View
              style={[
                squareStyle,
                animatedStyleY2,
                {backgroundColor: 'rgba(240, 20, 0, 0.8)'},
              ]}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AnchorPointAnimationsDemoScreen;
