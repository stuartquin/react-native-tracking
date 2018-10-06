import React from 'react';
import { StyleSheet, Button, Text, TextInput, View } from 'react-native';

import * as storage from '../services/storage';

class TrackScreen extends React.Component {
  static navigationOptions = {
    title: 'Track',
  };

  constructor(props) {
    super(props);

    this.state = {
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
    storage.add('events', this.state.item);
  }

  handleReceiveFocus () {
    const { navigation } = this.props;
    this.setState({
      item: {
        what: navigation.getParam('what', null),
        unit: navigation.getParam('unit', null),
      }
    });
  }

  render() {
    const { item } = this.state;

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

          <Button title="Track" onPress={this.handleTrack}></Button>
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
