import * as React from 'react';
import {View, Pressable, Text} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {useMemo, useState} from 'react';

export const SwipeList = ({
  data,
  renderItem,
  keyExtractor,
  actions,
  ...otherProps
}) => {
  const [layoutHeight, setLayoutHeight] = useState(0);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const renderHiddenItem = (d, rowMap) => (
    <View
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'flex-end',
        flexDirection: 'row',
      }}>
      {actions.map(({color, callback, shouldCloseRow}, index) => (
        <Pressable
          style={{
            aspectRatio: 1,
            backgroundColor: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            if (shouldCloseRow) {
              closeRow(rowMap, d.item.key);
            }
            callback(d.item, () => closeRow(rowMap, d.item.key));
          }}
          onLayout={e => setLayoutHeight(e.nativeEvent.layout.height)}
          key={index}>
          <Text>A</Text>
        </Pressable>
      ))}
    </View>
  );

  const actionsSize = useMemo(() => {
    return 2 * layoutHeight;
  }, [layoutHeight]);

  return (
    <SwipeListView
      data={data}
      renderHiddenItem={renderHiddenItem}
      rightOpenValue={-actionsSize}
      disableRightSwipe
      renderItem={renderItem}
      closeOnRowOpen
      closeOnRowBeginSwipe
      keyExtractor={keyExtractor}
      useNativeDriver={true}
      {...otherProps}
    />
  );
};
