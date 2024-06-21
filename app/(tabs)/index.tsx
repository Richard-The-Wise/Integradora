import { Image, StyleSheet, Platform, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.contentContainer}>
        <ThemedText type="title" style={styles.title}>¡Bienvenido!</ThemedText>
        <ThemedText style={styles.paragraph}>
        Bienvenido a nuestro innovador proyecto de carrito a control remoto. Este carrito puede ser controlado mediante ondas cerebrales con una diadema o con el teléfono. Nuestro objetivo es proporcionar una herramienta útil y accesible para ayudar a personas con discapacidades motoras. Esperamos que encuentres este proyecto inspirador y útil. ¡Gracias por unirte a nosotros en esta emocionante aventura tecnológica!
        </ThemedText>
        <Image
          source={require('@/assets/images/react-logo.png')}
          style={styles.photo}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    marginBottom: 16,
  },
  paragraph: {
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 16,
  },
  photo: {
    width: 200,
    height: 200,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
