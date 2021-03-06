import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';

import EventList from '../components/EventList';
import EventListItem from '../components/EventListItem';
import * as storage from '../services/storage';


const aggregateEvents = (events) => {
  const aggregated = {};

  events.forEach((event) => {
    const key = event.key;
    const existing = aggregated[key] || { recent: event, amount: 0 };

    aggregated[key] = {
      ...existing,
      ...event,
      amount: existing.amount + event.amount,
    };
  });

  return Object.values(aggregated);
};

class LandingScreen extends React.Component {
  static navigationOptions = {
    title: 'LifeTrack',
  };

  constructor (props) {
    super(props);
    this.handlePressTrack = this.handlePressTrack.bind(this);
    this.handlePressItem = this.handlePressItem.bind(this);

    this.state = {
      events: [],
      isLoading: true,
    };

    props.navigation.addListener('didFocus', () => {
      this.handleReceiveFocus();
    });
  }

  handleReceiveFocus () {
    storage.get('events').then((events) => {
      this.setState({ events: aggregateEvents(events), isLoading: false });
    });
  }

  handlePressTrack () {
    this.props.navigation.navigate('Track');
  }

  handlePressItem (item) {
    this.props.navigation.navigate('Track', item);
  }

  render () {
    const { events, isLoading } = this.state;

    return (
      <View style={styles.container}>
        <EventList
          events={events}
          isLoading={isLoading}
          renderItem={({ item }) => (
            <EventListItem item={item.event} onPress={this.handlePressItem} />
          )}
        />
        <Button title="Add" onPress={this.handlePressTrack}>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16
  }
});

export default LandingScreen;
