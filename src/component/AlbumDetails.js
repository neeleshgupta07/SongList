import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import Sound from 'react-native-sound';
import {LocalNotification} from './LocalPushController';
const AlbumDetails = ({navigation}) => {
  const route = useRoute();
  var sound1;
  function playSound(item) {
    sound1 = new Sound(item, Sound.MAIN_BUNDLE, (error, sound) => {
      if (error) {
        alert('error' + error.message);
        return;
      }
      sound1.play(() => {
        sound1.release();
      });
    });
  }

  function stopSound() {
    if (sound1) {
      sound1.stop(() => {
        console.log('Stop');
      });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>{route.params.item.artistName}</Text>
      <Text style={styles.subHeaderTitle}>
        {route.params.item.collectionName}
      </Text>
      <View style={styles.imageContainer}>
        <Image
          style={{height: 200, width: 200, margin: 20}}
          source={{uri: route.params.item.artworkUrl100}}
          resizeMode={'stretch'}
        />
      </View>

      <View style={styles.feature}>
        <TouchableOpacity
          onPress={() => {
            return playSound(route.params.item.previewUrl);
          }}>
          <Text style={styles.buttonPlay}>Play</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            return stopSound();
          }}>
          <Text style={styles.buttonStop}>Stop</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.notificationContainer}>
        <TouchableOpacity
          style={styles.notificationButton}
          color="#6C1919"
          onPress={LocalNotification}>
          <Text style={styles.notificationText}>Local Push Notification</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AlbumDetails;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  imageContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 10,
  },
  notificationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 5,
  },
  headerTitle: {
    fontSize: 20,
    color: '#990000',
    fontWeight: 'bold',
    paddingVertical: 20,
    textAlign: 'center',
  },
  subHeaderTitle: {
    fontSize: 16,
    color: '#990000',
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonPlay: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'rgba(00,80,00,1)',
    borderWidth: 1,
    borderColor: 'rgba(80,80,80,0.5)',
    overflow: 'hidden',
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
  buttonStop: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'rgba(80,00,00,1)',
    borderWidth: 1,
    borderColor: 'rgba(80,80,80,0.5)',
    overflow: 'hidden',
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
  feature: {
    flexDirection: 'row',
    padding: 10,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  notificationButton: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 5,
    borderColor: '#990000',
    borderRadius: 1,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: 40,
  },
  notificationText: {
    padding: 10,
    color: '#990000',
  },
});
