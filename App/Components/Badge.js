var React = require('react-native');

var {
  Text,
  View,
  Image,
  StyleSheet,
  Component
} = React;

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#48BBEC',
    paddingBottom: 10
  },
  name: {
    alignSelf: 'center',
    fontSize: 21,
    marginTop: 10,
    marginBottom: 5,
    color: 'white'
  },
  handle: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'white'
  },
  image: {
    height: 125,
    width: 125,
    borderRadius: 65,
    marginTop: 10,
    alignSelf: 'center'
  }
});

class Badge extends Component {
  // Create Pure Components
  // They are components that don't have a state but they take in data from their parent component
  render() {
    return (
      <View style={styles.container}>
        <Image source={{uri: this.props.userInfo.avatar_url}} style={styles.image} />
        <Text style={styles.name}> {this.props.userInfo.name} </Text>
        <Text style={styles.handle}> {this.props.userInfo.login} </Text>
      </View>
    )
  }
};

//propTypes verifies is certain props and types exist
// It's going to verify that there is userInfo, otherwise it will throw an error
Badge.propTypes = {
  userInfo: React.PropTypes.object.isRequired
};

module.exports = Badge;
