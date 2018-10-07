import React from 'react';
import { StyleSheet, Button, Text, TextInput, View } from 'react-native';

import EventList from '../components/EventList';
import DateListItem from '../components/DateListItem';
import * as storage from '../services/storage';

class TrackScreen extends React.Component {
  static navigationOptions = {
    title: 'Track',
  };

  constructor(props) {
    super(props);

    this.state = {
      events: [],
      isLoading: true,
      item: {
        what: '',
        unit: '',
        amount: '',
      }
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleTrack = this.handleTrack.bind(this);

    props.navigation.addListener('didFocus', () => {
      this.handleReceiveFocus();
    });
  }

  handleChange(field, value) {
    this.setState({
      item: {
        ...this.state.item,
        [field]: value
      }
    })
  }

  handleTrack() {
    this.props.navigation.navigate('Landing');
    const item = {
      ...this.state.item,
      key: this.state.item.what.toLowerCase()
    };
    storage.add('events', item);
  }

  handleReceiveFocus () {
    const { navigation } = this.props;
    const key = navigation.getParam('key', null);

    this.setState({
      item: {
        what: navigation.getParam('what', null),
        unit: navigation.getParam('unit', null),
      }
    });

    if (key) {
      storage.get('events', ['key', '==', key]).then((events) => {
        this.setState({ events, isLoading: false });
      });
    }
  }

  render() {
    const { item, events, isLoading } = this.state;

    return (
      <View style={styles.container}>
        <View>
          <TextInput
            style={{ height: 50 }}
            value={item.what}
            placeholder="What?"
            onChangeText={(text) => this.handleChange('what', text)}
          />
          <TextInput
            style={{ height: 50 }}
            value={item.unit}
            placeholder="Unit"
            onChangeText={(text) => this.handleChange('unit', text)}
          />
          <TextInput
            style={{ height: 50 }}
            placeholder="How Much?"
            keyboardType="numeric"
            onChangeText={
              (text) => this.handleChange('amount', parseInt(text, 10))
            }
          />

          <Button
            title="Track"
            disabled={!item.what || !item.amount}
            onPress={this.handleTrack}
          />
        </View>

        <View>
          <EventList
            events={events}
            isLoading={isLoading}
            renderItem={({ item }) => (
              <DateListItem item={item.event} />
            )}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16
  }
});

export default TrackScreen;
