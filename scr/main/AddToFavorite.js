import React from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Favorites = ({ navigation }) => {
  const { favorites, loading, error } = useSelector((state) => state.favorites);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  const handleEventPress = (eventUrl) => {
    navigation.navigate('EventDetail', { eventUrl });
  };

  const toggleFavorite = (item) => {
  
  };

  return (
    <View style={styles.container}>
       <View style={styles.header}>
        <Text style={styles.headerText}>Hello Renzo!</Text>
        <Text>Are you ready to dance?</Text>
      </View>
      {favorites.length === 0 ? (
        <Text style={styles.noFavorites}>No favorites added yet.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.event_id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleEventPress(item.event_url)} style={styles.eventTouchable}>
              <View style={styles.eventContainer}>
                <Image source={{ uri: item.event_profile_img }} style={styles.eventImage} />
                <View style={styles.eventDetailsContainer}>
                  <Text style={styles.eventName}>{item.event_name}</Text>
                  <View style={styles.eventLocationContainer}>
                    <Text style={styles.eventDate}>{item.readable_from_date} - {item.readable_to_date}</Text>
                    <Text style={styles.eventDescription}>{item.city}, {item.country}</Text>
                  </View>
                  <Text style={styles.eventPrice}>{`€${item.event_price_from} - €${item.event_price_to}`}</Text>
                  <FlatList
                    data={item.danceStyles}
                    style={styles.keywordsContainer}
                    keyExtractor={(style) => style.ds_id.toString()}
                    renderItem={({ item: style }) => (
                      <Text style={styles.keywords}>{style.ds_name}</Text>
                    )}
                  />
                </View>
                <View style={styles.iconContainer}>
                  <AntDesign name="upload" size={24} color='grey' />
                  <TouchableOpacity onPress={() => toggleFavorite(item)} style={styles.favoriteButton}>
                    <Ionicons 
                      name={favorites.some((favorite) => favorite.event_id === item.event_id) ? "heart" : "heart-outline"} 
                      size={24} 
                      color={favorites.some((favorite) => favorite.event_id === item.event_id) ? "#11942e" : "grey"} 
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeebeb',
  },
  header: {
    backgroundColor: '#fff',
    padding: 25,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 25,
    color: '#424141',
    fontWeight: '600',
  },
  noFavorites: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
  eventTouchable: {
    paddingHorizontal: 15,
  },
  eventContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  eventImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  eventDetailsContainer: {
    flex: 3,
    paddingLeft: 10,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  eventLocationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventDescription: {
    fontSize: 14,
    color: '#666',
  },
  keywordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 4,
  },
  keywords: {
    backgroundColor: '#ebe8e8',
    borderRadius: 20,
    padding: 5,
    fontSize: 12,
    fontWeight: '700',
    marginRight: 5,
    marginBottom: 5,
    color: '#424141',
  },
  eventDate: {
    fontSize: 12,
    color: '#19ac1c',
  },
  eventPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 4,
  },
  favoriteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    right: 5,
  },
});

export default Favorites;
