var React = require('react-native');
var Profile = require('./Profile');
var Repos = require('./Repos');
var api = require('../Utils/api');
var Notes = require('./Notes');

var {
  Text,
  Component,
  View,
  StyleSheet,
  Image,
  TouchableHighlight
} = React;

var styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flex: 1
  },
  image: {
    height: 350,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  }
});

class Dashboard extends Component {

  // Using a function to create a styles. In Sass or Less you could just do variable or mixins I guess
  makeBackground(btn) {
    var obj = {
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center',
      flex: 1
    }

    if( btn === 0 ) {
      obj.backgroundColor = '#48BBEC';
    } else if( btn === 1 ) {
      obj.backgroundColor = '#E77AAE';
    } else {
      obj.backgroundColor = '#758BF4';
    }
    return obj;
  };
  goToProfile() {
    //This is basically just a redirect in React
    this.props.navigator.push({
      component: Profile,
      title: 'Profile Page',
      passProps: {userInfo: this.props.userInfo}
    });
  };
  goToRepos() {
    // name of github username that were working with
    api.getRepos(this.props.userInfo.login)
      .then((res) => {
        this.props.navigator.push({
          component: Repos,
          title: 'Repos Page',
          passProps: {
            userInfo: this.props.userInfo,
            repos: res
          }
        });
      });
  };
  goToNotes() {
    api.getNotes(this.props.userInfo.login)
      .then((res) => {
        res = res || {};
        // if ther is no results, then return an empty object so it doesn't error out
        this.props.navigator.push({
          component: Notes,
          title: 'Notes',
          passProps: {
            notes: res,
            userInfo: this.props.userInfo
          }
        });
      });
  }
  render(){
    return (
      <View style={styles.container}>

        <Image source={{uri: this.props.userInfo.avatar_url}} style={styles.image}/>

        <TouchableHighlight
          style={this.makeBackground(0)}
          onPress={this.goToProfile.bind(this)}
          underlayColor='#88D4F5'>
            <Text style={styles.buttonText}> View Profile </Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={this.makeBackground(1)}
          onPress={this.goToRepos.bind(this)}
          underlayColor='#88D4F5'>
            <Text style={styles.buttonText}> View Repos </Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={this.makeBackground(2)}
          onPress={this.goToNotes.bind(this)}
          underlayColor='#88D4F5'>
            <Text style={styles.buttonText}> View Notes </Text>
        </TouchableHighlight>
      </View>
    )
  }
};

module.exports = Dashboard;
