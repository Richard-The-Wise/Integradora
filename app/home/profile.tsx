import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, PermissionsAndroid, Platform } from 'react-native';

export default function profile() {
 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuario</Text>
      
      <Text>Nombre:</Text>
      <Text>E-mail:</Text>


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
