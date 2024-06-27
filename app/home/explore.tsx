import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, PermissionsAndroid, Platform } from 'react-native';

export default function GPSScreen() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message: 'This app needs access to your location to show it on the map.',
              buttonPositive: 'OK',
            },
          );
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            setErrorMsg('Location permission denied');
            return;
          }
        }

        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            setErrorMsg(null);
          },
          (error) => {
            setErrorMsg(error.message);
            console.log(error);
          },
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
      } catch (err) {
        if (err instanceof Error) {
          setErrorMsg(err.message);
        } else {
          setErrorMsg('An unknown error occurred');
        }
        console.warn(err);
      }
    };

    requestLocationPermission();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ubicación Actual</Text>
      {latitude && longitude ? (
        <Text>
          Latitud: {latitude}, Longitud: {longitude}
        </Text>
      ) : errorMsg ? (
        <Text>Error: {errorMsg}</Text>
      ) : (
        <Text>Obteniendo ubicación...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
});
