import React, {useCallback, useState} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import {SwipeList} from './components/SwipeList';

const Item = ({index, name}) => {
  return (
    <Text
      style={{
        borderWidth: 1,
        borderColor: '#000000',
        padding: 20,
        backgroundColor: '#fff',
      }}>
      Item N° {index} - {name}
    </Text>
  );
};

const App = () => {
  const [offset, setOffset] = useState(0);

  const onScroll = useCallback(event => {
    const {nativeEvent} = event;
    const {contentOffset} = nativeEvent;
    const {y} = contentOffset;
    setOffset(y);
    console.log(y);
  }, []);

  const items = [
    {index: 1, name: 'AAA'},
    {index: 2, name: 'BBB'},
  ];

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Text
          style={{
            marginTop: 20,
            marginBottom: 20,
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          Offset : {offset}
        </Text>
        <SwipeList
          scrollEventThrottle={1}
          overScrollMode="always"
          onScroll={onScroll}
          data={items}
          renderItem={({item}) => <Item index={item.index} name={item.name} />}
          keyExtractor={item => `${item.index}`}
          actions={[
            {
              color: 'blue',
              callback: item => console.log(`Action 1 on item ${item.name}`),
              shouldCloseRow: true,
            },
            {
              color: 'red',
              callback: item => console.log(`Action 1 on item ${item.name}`),
              shouldCloseRow: false,
            },
          ]}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;
