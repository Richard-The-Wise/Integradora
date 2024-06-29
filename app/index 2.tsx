import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet, Text, Modal, Pressable } from 'react-native';
import { auth, firestore } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { router } from 'expo-router';
import Swal from 'sweetalert2';

export default function IndexScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // Cambiar a 'string | null'
  const [modalVisible, setModalVisible] = useState(false);

  //Variables del formulario de registro
  const [emailForm, setEmailForm] = useState('');
  const [passwordForm, setPasswordForm] = useState('');
  const [nameForm, setNameForm] = useState('');
  const [errorForm, setErrorForm] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      // Inicia sesión con Firebase Auth
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in');
      setError(null); // Limpiar el error si el login es exitoso
      router.replace('/home');
    } catch (error: any) { // Especificar 'any' para el catch
      console.error('Error logging in:', error);
      setError(error.message || 'Error logging in'); // Asegurarse de que 'message' exista
    }
  };

  const handleSignUp = async () => {
    try {
      // Crea el usuario con Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, emailForm, passwordForm);
      const user = userCredential.user;

      console.log('User signed up and data saved:', user);
      setModalVisible(false); // Cerrar el modal al registrarse
      setEmailForm('');
      setPasswordForm('');
      setNameForm('');
      setErrorForm(null);
      Swal.fire("SweetAlert2 is working!");
    } catch (error: any) { // Especificar 'any' para el catch
      console.error('Error signing up:', error);
      setErrorForm(error.message || 'Error signing up'); // Asegurarse de que 'message' exista
    }
  }; 

  return (
    <View style={styles.container}>
      <FontAwesome6 name="user-ninja" style={styles.loginIcon} size={74}  />
      <Text style={styles.header}>Login</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoFocus={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Text style={styles.separator}></Text>
      <Button title="Registrate" onPress={() => setModalVisible(true)} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable onPress={() => setModalVisible(false)}>
                <Ionicons name="close" style= {styles.closeModal} size = {28}/>
            </Pressable>
            <Text style={styles.header}>Registro</Text>

            {errorForm && <Text style={styles.error}>{errorForm}</Text>}
            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={nameForm}
                onChangeText={setNameForm}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={emailForm}
                onChangeText={setEmailForm}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={passwordForm}
                onChangeText={setPasswordForm}
                secureTextEntry
            />
            <Button title="Sign Up" onPress={handleSignUp} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  separator: {
    height: 5,
    width: '100%',
    backgroundColor: '#FFFFF', 
    marginVertical: 5, 
  },
  closeModal: {    
    color: "black",
    position: "absolute",
    top: -30,
    right: -120,
    zIndex: 1000,
    padding: 10,
  },
  loginIcon: {
    color: "black",
    position: "absolute",
    top: 230,
    left: 120,
    zIndex: 1000,
  }

});
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
