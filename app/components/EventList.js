import React from 'react';
import { StyleSheet, ActivityIndicator, FlatList, View } from 'react-native';

const EventList = ({ events, isLoading, renderItem }) => {
  const data = events.map((event) => {
    return { event, key: event.id }
  });

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
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
