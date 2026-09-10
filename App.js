import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AllWords from './screens/AllWords';
import AddWord from './screens/AddWord';

export default function App() {
  const [words, setWords] = useState([]);
  const [activeScreen, setActiveScreen] = useState('AllWords'); 

  const switchScreen = (screenName) => {
    setActiveScreen(screenName);
  };

  return (
    <View style={styles.container}>
      {activeScreen === 'AllWords' ? (
        <AllWords 
          switchScreen={() => switchScreen('AddWord')} 
          words={words} 
          setWords={setWords} 
        />
      ) : (
        <AddWord 
          switchScreen={() => switchScreen('AllWords')} 
          setWords={setWords} 
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});