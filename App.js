import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import React, { Component, useState, useRef } from 'react';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAP_KEY } from './googleMapKey'

export default function App() {
  const [state, setState] = useState({
    pickupCords: {
      latitude: 7.4833,
      longitude: 	9.0667,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    droplocationCords: {
      latitude: 8.4833,
      longitude: 	11.0667,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
  })


  const mapRef = useRef()

  const {pickupCords, droplocationCords} = state


  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        initialRegion={{ pickupCords }}
      >
        <Marker 
          coordinate={pickupCords}
        />
        <Marker 
          coordinate={droplocationCords}
        />
        <MapViewDirections
          origin={pickupCords}
          destination={droplocationCords}
          apikey={GOOGLE_MAP_KEY}
          strokWidth={3}
          strokeColor="hotpink"
          optimizeWaypoints={true}
          onReady={result => {
            mapRef.current.fitToCoordinates(result.coordinates,{
              edgePadding:{
                right: 30,
                bottom: 300,
                left: 30,
                top: 100
              }
            })
          }}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
