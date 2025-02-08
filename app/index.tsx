import React, { useState } from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Button,
  Image,
  FlatList,
  ActivityIndicator,
  Linking,
  Pressable
} from 'react-native';

// Define types for the country data
interface Country {
  id: string;
  name: string;
  continents: string;
  capital: string;
  currency: string;
  language: string;
  location: string;
  population: string;
  flag: string;
}

export default function Index() {
  const [searchText, setSearchText] = useState<string>('');
  const [data, setData] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Function to fetch country data based on user input
  const fetchCountryData = async () => {
    if (searchText.trim() !== '') {
      setLoading(true);

      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${searchText}`
        );
        const result = await response.json();

        setCountryData(result);
      } catch (error) {
        console.error('Error fetching data:', error);

        setData([]);
      }

      setLoading(false);
    }
  };

  // Function to fetch a random country
  const fetchRandomCountry = async () => {
    setLoading(true);

    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const allCountries = await response.json();
      const randomCountry =
        allCountries[Math.floor(Math.random() * allCountries.length)];

      setCountryData([randomCountry]);
    } catch (error) {
      console.error('Error fetching data:', error);

      setData([]);
    }

    setLoading(false);
  };

  // Function to format and set country data
  const setCountryData = (countries: any[]) => {
    const formattedData: Country[] = countries.map((country) => ({
      id: country.cca3,
      name: country.name.common,
      continents: country.continents.join(', '),
      capital: country.capital ? country.capital[0] : 'N/A',
      currency:
        Object.values(country.currencies)[0].name +
        ` (${Object.values(country.currencies)[0].symbol})`,
      language: Object.values(country.languages)[0],
      location: country.maps.googleMaps,
      population: country.population.toLocaleString(),
      flag: country.flags.png,
    }));

    setData(formattedData);
  };

  // Function to reset the view
  const resetView = () => {
    setSearchText('');
    setData([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('./../assets/images/logo.png')} style={styles.logo} />
      </View>

      {/* Button Grid */}
      <View style={styles.buttonGrid}>
        <Pressable onPress={fetchRandomCountry} style={styles.gridButtons}>
          <Text style={styles.buttonText}>Random Country</Text>
        </Pressable>
        <Pressable onPress={resetView} style={styles.gridButtons}>
          <Text style={styles.buttonText}>Reset</Text>
        </Pressable>
      </View>

      {/* Search Bar */}
      <View style={styles.searchSection}>
        <TextInput
          style={styles.input}
          placeholder="Enter country name..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <Button title="Search" onPress={fetchCountryData} />
      </View>

      {/* Loader */}
      {loading && (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      )}

      {/* Title */}
      <Text style={styles.title}>Country Information</Text>

      {/* List View */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Image source={{ uri: item.flag }} style={styles.flag} />
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{item.name}</Text>

            <Text style={styles.label}>Continent:</Text>
            <Text style={styles.value}>{item.continents}</Text>

            <Text style={styles.label}>Capital:</Text>
            <Text style={styles.value}>{item.capital}</Text>

            <Text style={styles.label}>Currency:</Text>
            <Text style={styles.value}>{item.currency}</Text>

            <Text style={styles.label}>Language:</Text>
            <Text style={styles.value}>{item.language}</Text>

            <Text style={styles.label}>Population:</Text>
            <Text style={styles.value}>{item.population}</Text>

            <Text style={styles.label}>Location:</Text>
            <Pressable onPress={() => Linking.openURL(item.location)} style={styles.buttonValue}>
              <Text style={styles.buttonText}>View on maps</Text>
            </Pressable>

            <Text style={styles.label}>More information:</Text>
            <Pressable onPress={() => Linking.openURL("https://wikipedia.org/wiki/" + item.name)} style={styles.buttonValue}>
              <Text style={styles.buttonText}>Learn More</Text>
            </Pressable>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  header: {
    alignItems: 'center',
  },
  logo: {
    width: 250,
    height: 100,
    resizeMode: 'contain',
  },
  buttonGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  gridButtons: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 3,
    backgroundColor: '#2196f3',
    width: '48%',
  },
  buttonText: {
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
  },
  loader: {
    marginVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  listItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  flag: {
    width: 160,
    height: 112,
    resizeMode: 'contain',
    marginBottom: 8,
    margin: '0 auto',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    marginBottom: 10,
  },
  buttonValue: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 3,
    backgroundColor: '#2196f3',
    marginBottom: 10,
  },
});
