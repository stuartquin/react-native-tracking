import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { getFormattedDate } from '../services/storage';

const DateListItem = ({ item, onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.date}>{ getFormattedDate(item.created_at) }</Text>
      <Text style={styles.unit}>{ item.amount }{ item.unit }</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#DCDCDC',

    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date: {
    fontSize: 20,
    fontWeight: '900',
  },
  unit: {
    fontSize: 20,
    fontWeight: '900',
  },
});

export default DateListItem;
