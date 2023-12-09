// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/";

const App = () => {
  const [stocks, setStocks] = useState([]);
  const [n, setN] = useState(1);   

  useEffect(() => {
    const updatePrices = async () => {
      const response = await axios.get(`${API_URL}/api/stocks`);
      setStocks(response.data);
    };
    updatePrices();
    const interval = setInterval(updatePrices, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleFetchStocks = async () => {
    const response = await axios.get(`${API_URL}/api/stocks/${n}`);
    setStocks(response.data);
  };

  return (
    <View style={styles.container}>
      <Text>Enter number of stocks:</Text>
      <TextInput onChangeText={(text) => setN(Number(text))} style={styles.input} />
      <Button title="Fetch Stocks" onPress={handleFetchStocks} />
      <FlatList
        data={stocks}
        keyExtractor={(stock) => stock.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.name}</Text>
            <Text>{item.previous_close.toFixed(2)}</Text>
            <Text>Refresh Interval: {item.refresh_interval} seconds</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: 200,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
});

export default App;
