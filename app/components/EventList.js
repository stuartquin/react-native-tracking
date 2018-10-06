import React from 'react';
import { StyleSheet, ActivityIndicator, FlatList, View } from 'react-native';

import EventListItem from './EventListItem';

const EventList = ({ events, isLoading, onPressItem }) => {
  const data = events.map((event) => {
    return { ...event, key: event.what }
  });

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={data}
          renderItem={({item}) => (
            <EventListItem item={item} onPress={onPressItem} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 16,
  }
});

export default EventList;
