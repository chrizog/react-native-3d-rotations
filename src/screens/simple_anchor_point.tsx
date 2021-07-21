/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
});

interface Point2D {
  x: number;
  y: number;
}

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

const RotatedSquareTransformOriginFunction = () => {
  const squareSize = 50;

  const squareStyle = {
    height: squareSize,
    width: squareSize,
    backgroundColor: '#00FFFF',
  };

  const targetAnchorPoint: Point2D = {x: 0, y: 0};
  const originalAnchorPoint: Point2D = {x: squareSize / 2, y: squareSize / 2};

  return (
    <View
      style={[
        squareStyle,
        {
          transform: transformOrigin(targetAnchorPoint, originalAnchorPoint, [
            {rotateZ: '-30deg'},
          ]),
        },
      ]}
    />
  );
};

const RotatedSquare = () => {
  const squareSize = 50;
  const anchorPointX = 0;
  const anchorPointY = 0;

  const squareStyle = {
    height: squareSize,
    width: squareSize,
    backgroundColor: '#00FFFF',
  };

  return (
    <View
      style={[
        squareStyle,
        {
          transform: [
            {translateX: anchorPointX - squareSize / 2},
            {translateY: anchorPointY - squareSize / 2},
            {rotateZ: '-30deg'},
            {translateX: -(anchorPointX - squareSize / 2)},
            {translateY: -(anchorPointY - squareSize / 2)},
          ],
        },
      ]}
    />
  );
};

const RotatedComponentOnLayout = () => {
  const [componentDimensions, setComponentDimensions] = useState({
    width: 0,
    height: 0,
  });

  const targetAnchorPoint: Point2D = {x: 0, y: 0};
  const originalAnchorPoint: Point2D = {
    x: componentDimensions.width / 2,
    y: componentDimensions.height / 2,
  };

  return (
    <Text
      onLayout={event => {
        const {width, height} = event.nativeEvent.layout;
        setComponentDimensions({width: width, height: height});
      }}
      style={{
        padding: 12,
        backgroundColor: '#00FFFF',
        transform: transformOrigin(targetAnchorPoint, originalAnchorPoint, [
          {rotateZ: '-30deg'},
        ]),
      }}>
      Some Text
    </Text>
  );
};

const SimpleAnchorPointScreen = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <RotatedComponentOnLayout />
    </SafeAreaView>
  );
};

export default SimpleAnchorPointScreen;
