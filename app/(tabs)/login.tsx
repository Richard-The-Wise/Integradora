import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet, Text, Modal, Pressable } from 'react-native';
import { auth, firestore } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
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

      // Guarda los datos del usuario en Firestore
      /*
      await addDoc(collection(firestore, 'users'), {
        uid: user.uid,
        email: user.email,
        //name: nameForm,
      });
      */

      console.log('User signed up and data saved:', user);
      setModalVisible(false); // Cerrar el modal al registrarse
      setEmailForm('');
      setPasswordForm('');
      setNameForm('');
      setErrorForm(null); //
    } catch (error: any) { // Especificar 'any' para el catch
      console.error('Error signing up:', error);
      setErrorForm(error.message || 'Error signing up'); // Asegurarse de que 'message' exista
    }
  }; 

  return (
    <View style={styles.container}>
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
      <text style={styles.separator}></text>
      <Button title="Registrate" onPress={() => setModalVisible(true)} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="black" />
            </Pressable>
            <Text style={styles.header}>Register</Text>

            {errorForm && <Text style={styles.error}>{errorForm}</Text>}
            <TextInput
                style={styles.input}
                placeholder="Name"
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
    height: 10,
    width: '100%',
    backgroundColor: '#E4E4E4', // Puedes cambiar el color de la línea aquí
    marginVertical: 8, // Puedes ajustar el espacio vertical alrededor de la línea
  },
});
