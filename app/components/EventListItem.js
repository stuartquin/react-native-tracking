import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';

const getFormattedDate = (timestamp) => {
  const date = timestamp.toDate();
  const time = date.toTimeString().substring(0, 5);

  return `${date.toDateString()} ${time}`;
};

const EventListItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(item)}>
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.what}>{ item.what }</Text>
          <Text style={styles.unit}>{ item.amount }{ item.unit }</Text>
        </View>

        <Text>{ getFormattedDate(item.recent.created_at) }</Text>
      </View>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#DCDCDC',
  },
  what: {
    fontSize: 20,
    fontWeight: '900',
  },
  unit: {
    fontSize: 20,
    fontWeight: '900',
  },
  heading: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

export default EventListItem;
