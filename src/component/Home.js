import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNetInfo} from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';

const numColumns = 2;
const size = Dimensions.get('window').width / numColumns;
const STORAGE_KEY = '@albumlist';
const Home = ({navigation}) => {
  const [data, setData] = useState({});
  const netInfo = useNetInfo();
  useEffect(() => {
    console.log('------isConnected-------', netInfo.isConnected.toString());
    if (netInfo.isConnected.toString()) {
      goForFetch();
    } else {
      goForLocal();
    }
  }, []);

  const goForFetch = () => {
    console.log('------goForFetch-------');
    fetch('https://itunes.apple.com/search?term=jack+johnson')
      .then((response) => response.json())
      .then((responseJson) => {
        setData(responseJson);
        _storeData(responseJson);
      })
      .catch((error) => console.log('------error-------', error))
      .finally(() => console.log('------finally-------'));
  };

  const goForLocal = () => {
    _retrieveData();
  };

  const _storeData = async (responseJson) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(responseJson));
    } catch (error) {
      console.log('--_storeData--error---' + error);
    }
  };

  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY);
      if (value !== null) {
        setData(JSON.parse(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={data.results}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                navigation.navigate('AlbumDetails', {item});
              }}>
              <Image
                style={{height: '100%', width: '100%'}}
                source={{uri: item.artworkUrl100}}
                resizeMode={'stretch'}
              />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.trackId}
        numColumns={numColumns}
      />
    </View>
  );
};

export default Home;
const styles = StyleSheet.create({
  itemContainer: {
    width: size,
    height: size,
  },
  item: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 5,
    borderColor: '#990000',
    borderRadius: 1,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
