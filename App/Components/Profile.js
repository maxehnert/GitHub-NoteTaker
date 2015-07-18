var React = require('react-native');
var Badge = require('./Badge');
var Separator = require('../Helpers/Separator');

var {
  Text,
  View,
  StyleSheet,
  Component,
  ScrollView
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  rowContainer: {
    padding: 10
  },
  rowTitle: {
    color: '#48BBEC',
    fontSize: 16
  },
  rowContent: {
    fontSize: 19
  }
});

class Profile extends Component {

  // This formats the github item string to something more presentable
  getRowTitle(user, item) {
    //strip out the underscore from public_repos
    item = ( item === 'public_repos' ) ? item.replace('_', ' ') : item;
    // Format the first letter of each word to upper case
    return item[0] ? item[0].toUpperCase() + item.slice(1) : item;
  }
  render() {
    // Caching the userInfo
    var userInfo = this.props.userInfo;
    // These are strings that are returned when you curl the api.github You can specify any you wish
    var topicArr = ['company', 'location', 'followers', 'following', 'blog', 'bio', 'public_repos'];
    // This is an array of View components
    var list = topicArr.map((item, index) => {
      //if there isn't a company listed, then return an empty view
      if(!userInfo[item]) {
        return <View key={index} />
      } else {
        return (
          <View key={index}>
            <View style={styles.rowContainer}>
              <Text style={styles.rowTitle}> {this.getRowTitle(userInfo, item)} </Text>
              <Text style={styles.rowContent}> {userInfo[item]} </Text>
            </View>
            <Separator />
          </View>
        )
      }
    });
  return (
    <ScrollView style={styles.container}>
      <Badge userInfo={this.props.userInfo} />
      {list}
    </ScrollView>
  )
  }
};

module.exports = Profile;
