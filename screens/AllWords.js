import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { playSound } from '../services/soundHandler';

function AllWords({ words, switchScreen, setWords }) {
  const deleteWord = (wordItem) => {
    setWords(words.filter((item) => item !== wordItem));
  };

  const renderItem = ({ item }) => (
    <View style={styles.wordCard}>
      <View style={styles.wordInfo}>
        <Text style={styles.wordTitle}>{item.word}</Text>
        {item.phonetic && <Text style={styles.wordPhonetic}>{item.phonetic}</Text>}
        {item.partOfSpeech && <Text style={styles.wordPos}>{item.partOfSpeech}</Text>}
        <Text style={styles.wordDefinition}>{item.explanation || item.definition}</Text>
      </View>
      <View style={styles.actions}>
        {item.sound && (
          <TouchableOpacity onPress={() => playSound(item.sound)} style={styles.iconButton}>
            <Ionicons name="play-outline" size={24} color="#007AFF" />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => deleteWord(item)} style={styles.iconButton}>
          <Ionicons name="trash-outline" size={24} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dictionary</Text>
        <TouchableOpacity onPress={switchScreen} style={styles.addButton}>
          <Ionicons name="add-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {words.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No words yet</Text>
        </View>
      ) : (
        <FlatList
          data={words}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', paddingTop: 50 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 15 },
  headerTitle: { fontSize: 24, fontWeight: 'bold' },
  addButton: { backgroundColor: '#007AFF', borderRadius: 20, padding: 5 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, color: '#8e8e93' },
  listContainer: { paddingHorizontal: 20 },
  wordCard: { backgroundColor: '#fff', borderRadius: 10, padding: 15, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 2 },
  wordInfo: { flex: 1, marginRight: 10 },
  wordTitle: { fontSize: 18, fontWeight: 'bold' },
  wordPhonetic: { color: '#8e8e93', fontSize: 14, marginVertical: 2 },
  wordPos: { fontStyle: 'italic', color: '#555', fontSize: 12 },
  wordDefinition: { marginTop: 5, color: '#333' },
  actions: { flexDirection: 'row', alignItems: 'center' },
  iconButton: { marginLeft: 15 }
});

export default AllWords;