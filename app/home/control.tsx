import React from 'react';
import { View, StyleSheet, Text, Dimensions, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import { movement } from '../../scripts/moveCar';

export default function ControlScreen() {
  // Datos de ejemplo para las ondas cerebrales
  const brainWaveData = {
    labels: ["1s", "2s", "3s", "4s", "5s", "6s"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // color de la línea
        strokeWidth: 2, // grosor de la línea
      }
    ],
    legend: ["Ondas cerebrales"]
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Control Panel</Text>
      
      <View style={styles.buttonRow}>
        <FontAwesome.Button
          name="arrow-up"
          backgroundColor="#3b5998"
          onLongPress={() => movement(true,"UP")}
          onPressOut={() => movement(false,"UP")}
          // onPress={() => console.log('Move Up')}
          style={styles.button}
        >
          Up
        </FontAwesome.Button>
      </View>

      <View style={styles.buttonRow}>
        <FontAwesome.Button
          name="arrow-left"
          backgroundColor="#3b5998"
          onLongPress={() => movement(true,"LEFT")}
          onPressOut={() => movement(false,"LEFT")}
          style={styles.button}
        >
          Left
        </FontAwesome.Button>
        <FontAwesome.Button
          name="stop"
          backgroundColor="#d9534f"
          onPress={() => console.log('Stop')}
          style={styles.button}
        >
          Stop
        </FontAwesome.Button>
        <FontAwesome.Button
          name="arrow-right"
          backgroundColor="#3b5998"
          onLongPress={() => movement(true,"RIGHT")}
          onPressOut={() => movement(false,"RIGHT")}
          style={styles.button}
        >
          Right
        </FontAwesome.Button>
      </View>

      <View style={styles.buttonRow}>
        <FontAwesome.Button
          name="arrow-down"
          backgroundColor="#3b5998"
          onLongPress={() => movement(true,"DOWN")}
          onPressOut={() => movement(false,"DOWN")}
          // onPress={() => console.log('Move Down')}
          style={styles.button}
        >
          Down
        </FontAwesome.Button>
      </View>

      <Text style={styles.graphHeader}>Ondas Cerebrales</Text>
      <View style={styles.graphContainer}>
        <LineChart
          data={brainWaveData}
          width={Dimensions.get('window').width * 0.8} // 80% del ancho de la pantalla
          height={200} // Altura del gráfico ajustada
          chartConfig={chartConfig}
          bezier
          style={styles.graph}
        />
      </View>
    </ScrollView>
  );
}

const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#ffa726"
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  button: {
    marginHorizontal: 10,
  },
  graphHeader: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,
  },
  graphContainer: {
    alignItems: 'center', // Centrar el gráfico horizontalmente
  },
  graph: {
    marginVertical: 8,
    borderRadius: 16,
  },
});
