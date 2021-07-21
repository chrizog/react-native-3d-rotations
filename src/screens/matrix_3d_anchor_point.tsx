/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import MatrixMath from 'react-native/Libraries/Utilities/MatrixMath';

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

interface Point3D {
  x: number;
  y: number;
  z: number;
}

/* this function is directly modifying the transformMatrix */
const transformWithOrigin = (
  transformMatrix: Array<number>,
  origin: Point3D,
) => {
  const {x, y, z} = origin;
  const translateToOrigin = MatrixMath.createIdentityMatrix();
  MatrixMath.reuseTranslate3dCommand(translateToOrigin, -x, -y, -z);
  MatrixMath.multiplyInto(transformMatrix, translateToOrigin, transformMatrix);
  const translateBack = MatrixMath.createIdentityMatrix();
  MatrixMath.reuseTranslate3dCommand(translateBack, x, y, z);
  MatrixMath.multiplyInto(transformMatrix, transformMatrix, translateBack);
};

const degreeToRad = (degree: number) => {
  return (degree / 180) * Math.PI;
};

const Matrix3DAnchorPointScreen = () => {
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

  let rotX = MatrixMath.createIdentityMatrix();
  MatrixMath.reuseRotateXCommand(rotX, degreeToRad(30));
  transformWithOrigin(rotX, anchorPointXYZ);

  let rotY = MatrixMath.createIdentityMatrix();
  MatrixMath.reuseRotateYCommand(rotY, degreeToRad(30));
  transformWithOrigin(rotY, anchorPointXYZ);

  let rotZ = MatrixMath.createIdentityMatrix();
  MatrixMath.reuseRotateZCommand(rotZ, degreeToRad(30));
  transformWithOrigin(rotZ, anchorPointXYZ);

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.heading}>Rotate around X axis</Text>
      <View style={{height: 20, opacity: 0}} />

      <View
        style={[
          styles.squareContainer,
          {backgroundColor: 'rgba(100, 100, 100, 0.5)'},
        ]}>
        <View
          style={[
            squareStyle,
            {
              transform: [{perspective: 1000}, {matrix: rotX}],
            },
          ]}
        />
      </View>

      <View style={{height: 50, opacity: 0}} />
      <Text style={styles.heading}>Rotate around Y axis</Text>
      <View style={{height: 20, opacity: 0}} />

      <View
        style={[
          styles.squareContainer,
          {backgroundColor: 'rgba(100, 100, 100, 0.5)'},
        ]}>
        <View
          style={[
            squareStyle,
            {
              transform: [{perspective: 1000}, {matrix: rotY}],
            },
          ]}
        />
      </View>

      <View style={{height: 50, opacity: 0}} />
      <Text style={styles.heading}>Rotate around Z axis</Text>
      <View style={{height: 20, opacity: 0}} />

      <View
        style={[
          styles.squareContainer,
          {backgroundColor: 'rgba(100, 100, 100, 0.5)'},
        ]}>
        <View
          style={[
            squareStyle,
            {
              transform: [{perspective: 1000}, {matrix: rotZ}],
            },
          ]}
        />
      </View>
    </SafeAreaView>
  );
};

export default Matrix3DAnchorPointScreen;
