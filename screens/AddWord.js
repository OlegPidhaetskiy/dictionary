import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getWordInfo } from '../services/wordsHandler';
import { playSound } from '../services/soundHandler';

function AddWord({ switchScreen, setWords }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [wordData, setWordData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setWordData(null);
      return;
    }

    setLoading(true);
    const controller = new AbortController();

    const timer = setTimeout(async () => {
      try {
        const result = await getWordInfo(searchTerm, controller.signal);
        setWordData(result);
      } catch (error) {
        setWordData(null);
      } finally {
        setLoading(false);
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [searchTerm]);

  const handleAdd = () => {
    if (wordData) {
      setWords((prevWords) => [...prevWords, wordData]);
      switchScreen();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={switchScreen}>
          <Ionicons name="arrow-back-outline" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Word</Text>
        <View style={{ width: 28 }} />
      </View>

      <TextInput
        style={styles.input}
        placeholder="type here..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        autoCapitalize="none"
      />

      {loading && <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />}

      {wordData && !loading && (
        <View style={styles.resultCard}>
          <View style={styles.resultHeader}>
            <Text style={styles.foundWord}>{wordData.word}</Text>
            {wordData.sound && (
              <TouchableOpacity onPress={() => playSound(wordData.sound)}>
                <Ionicons name="volume-medium-outline" size={24} color="#007AFF" />
              </TouchableOpacity>
            )}
          </View>
          {wordData.phonetic && <Text style={styles.phonetic}>{wordData.phonetic}</Text>}
          {wordData.partOfSpeech && <Text style={styles.pos}>{wordData.partOfSpeech}</Text>}
          <Text style={styles.definition}>{wordData.explanation || wordData.definition}</Text>

          <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', paddingTop: 50, paddingHorizontal: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 10, fontSize: 16, borderWidth: 1, borderColor: '#ddd' },
  resultCard: { backgroundColor: '#fff', padding: 20, borderRadius: 10, marginTop: 20, elevation: 2 },
  resultHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  foundWord: { fontSize: 22, fontWeight: 'bold' },
  phonetic: { color: '#8e8e93', fontSize: 14, marginVertical: 5 },
  pos: { fontStyle: 'italic', color: '#555', marginBottom: 10 },
  definition: { fontSize: 16, color: '#333', marginBottom: 20 },
  addButton: { backgroundColor: '#34C759', padding: 15, borderRadius: 10, alignItems: 'center' },
  addButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});

export default AddWord;