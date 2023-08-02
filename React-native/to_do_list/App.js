import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from './colors.js';

const STORAGE_KEY = '@toDos';
const firstPage = 'firstPage';
const BackGroundColor = 'bg';

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState('');
  const [toDos, setToDos] = useState({});
  const [finish, setFinish] = useState(false);
  const [background, setBackground] = useState('dark');

  useEffect(() => {
    loadToDos();
    loadView();
    loadBg();
  }, []);

  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (payload) => setText(payload);

  const changeBackground = async () => {
    if (background === 'dark') {
      setBackground('light');
    } else if (background === 'light') {
      setBackground('dark');
    }
    await AsyncStorage.setItem(BackGroundColor, background);
  };

  const loadBg = async () => {
    const s = await AsyncStorage.getItem(BackGroundColor);
    s !== null ? setToDos(JSON.parse(s)) : null;
  };

  const saveToDos = async (toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    await AsyncStorage.setItem(firstPage, JSON.stringify(working));
  };

  const loadToDos = async () => {
    const s = await AsyncStorage.getItem(STORAGE_KEY);
    s !== null ? setToDos(JSON.parse(s)) : null;
  };

  const loadView = async () => {
    const s = await AsyncStorage.getItem(firstPage);
    s !== null ? setWorking(JSON.parse(s)) : null;
  };

  const addToDo = async () => {
    if (text === '') {
      return;
    }
    const newToDos = {
      [Date.now()]: { text, working, finish },
      ...toDos,
    };
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText('');
  };

  const deleteToDo = (key) => {
    Alert.alert('Delete To Do', 'Are you sure?', [
      { text: 'Cancel' },
      {
        text: "I'm Sure",
        style: 'destructive',
        onPress: () => {
          const newToDos = { ...toDos };
          delete newToDos[key];
          setToDos(newToDos);
          saveToDos(newToDos);
        },
      },
    ]);
  };

  const finishTodo = (key) => {
    const newToDos = { ...toDos };
    const trueOrFalse = newToDos[key].finish;

    if (trueOrFalse === true) {
      newToDos[key].finish = false;
    } else {
      newToDos[key].finish = true;
    }

    setToDos(newToDos);
  };

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: background === 'dark' ? theme.bg : 'white',
      }}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text
            style={{
              ...styles.btnText,
              color: working
                ? background === 'dark'
                  ? 'white'
                  : 'black'
                : 'lightgrey',
            }}>
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text
            style={{
              ...styles.btnText,
              color: !working
                ? background === 'dark'
                  ? 'white'
                  : 'black'
                : 'lightgrey',
            }}>
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        onSubmitEditing={addToDo}
        onChangeText={onChangeText}
        returnKeyType="done"
        value={text}
        placeholder={
          working ? 'What do you have to do?' : 'Where do you want to go?'
        }
        style={{
          ...styles.input,
          backgroundColor: background === 'dark' ? 'white' : 'black',
          color: background === 'dark' ? 'black' : 'white',
        }}
      />
      <ScrollView>
        <View>
          {working
            ? Object.keys(toDos).map((key) =>
                toDos[key].working === working ? (
                  <View style={styles.toDo} key={key}>
                    <Text
                      style={{
                        ...styles.toDoText,
                        textDecorationLine: toDos[key].finish
                          ? 'line-through'
                          : ' none',
                      }}
                      onPress={() => finishTodo(key)}>
                      {toDos[key].text}
                    </Text>
                    <TouchableOpacity onPress={() => deleteToDo(key)}>
                      <Fontisto name="trash" size={18} color={theme.toDoBg} />
                    </TouchableOpacity>
                  </View>
                ) : null
              )
            : Object.keys(toDos).map((key) =>
                toDos[key].working === working ? (
                  <View style={styles.toDo} key={key}>
                    <Text
                      style={{
                        ...styles.toDoText,
                        textDecorationLine: toDos[key].finish
                          ? 'line-through'
                          : ' none',
                      }}
                      onPress={() => finishTodo(key)}>
                      {toDos[key].text}
                    </Text>
                    <TouchableOpacity onPress={() => deleteToDo(key)}>
                      <Fontisto name="trash" size={18} color={theme.toDoBg} />
                    </TouchableOpacity>
                  </View>
                ) : null
              )}
        </View>
        <TouchableOpacity
          onPress={() => changeBackground()}
          style={{
            ...styles.footer,
            color: background === 'dark' ? 'white' : 'black',
          }}>
          {background}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 50,
  },
  btnText: {
    fontSize: 38,
    fontWeight: '600',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 18,
  },
  toDo: {
    backgroundColor: theme.grey,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toDoText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
