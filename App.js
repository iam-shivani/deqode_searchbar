import React, { useEffect, useState, useRef } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  useWindowDimensions,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const data = [
  { id: '1', text: 'burger' },
  { id: '2', text: 'pizza' },
  { id: '3', text: 'cake' },
  { id: '4', text: 'ice-cream' },
  { id: '5', text: 'chicken' },
  { id: '6', text: 'juice' },
];

const App = () => {

  const { width: windowWidth } = useWindowDimensions();

  const ref = useRef(null);
  const [index, setIndex] = useState(0);
  useEffect(() => {

    const interval = setInterval(() => {
      incr_fun()
    }, 2000);

    ref.current?.scrollToIndex({
      index,
      animated: (index === 0) ? false : true,
      viewPosition: 0.5
    })
    return () => clearInterval(interval);

  }, [index])

  function incr_fun() {
    if (index === data.length - 1) {
      setIndex(0);
    }
    else {
      setIndex(index + 1);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={{ paddingLeft: 10 }}>
          <Icon name="search" size={15} color="black" />
        </View>
        <View style={styles.scrollContainer}>

          <FlatList
            ref={ref}
            initialScrollIndex={index}
            data={data}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <View style={{ width: windowWidth }}>
                  <View style={styles.textContainer}>
                    <Text style={styles.infoText}>
                      {'Search "' + item.text + '"'}
                    </Text>
                  </View>
                </View>
              )
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50
  },
  innerContainer: {
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  scrollContainer: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    padding: 10,
    borderRadius: 5,
  },
  infoText: {
    color: 'grey',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;