var React = require('react-native');
var api = require('../Utils/api.js');
var Dashboard = require('./Dashboard');
var {
  View,
  Text,
  Component,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS
} = React;

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#48BBEC'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});

class Main extends Component {

  constructor(props) {
    super(props);
    //set the inital state for the home page
    this.state = {
      username: '',
      isLoading: false,
      error: false
    }
  }
  // This takes the param event which is the value entered into the search input
  // When you change that value, it calls this method which updates the username state
  handleChange(event) {
    this.setState({
      username: event.nativeEvent.text
    });
  };
  // Updates the indicatorIOS spinner
  // Fetches data from Github
  // Reroutes to the next route pasing in the github information
  handleSubmit() {
    this.setState({
      isLoading: true
    });
    //console.log('Submit ', this.state.username);
    api.getBio(this.state.username)
      .then((res) => {
        if(res.message === 'Not Found') {
          this.setState({
            error: 'User not Found',
            isLoading: false
          })
        } else {
          // ELSE: if it is successfull in finding the specified username then doo all this
          //
          // Pushes a new route onto the stack
          // able to do it becasue in index.io.js we created that nav component
          this.props.navigator.push({
            title: res.name || "Select an Option",
            component : Dashboard,
            passProps: {userInfo: res}
          });
          this.setState({
            isLoading: false,
            error: false,
            username: ''
          });
        }
      });
  }
  render() {
    var showErr = (
      this.state.error ? <Text> {this.state.error}</Text> : <View></View>
  );
    return (
      // For TextInput:
      //set the input value to the username state
      // when that value changes bind that new value to the handlechange method
      // React usually handles binding the 'this' value but with es6 you have to explicitly state it
      <View style={styles.mainContainer}>
        <Text style={styles.title}>  Search for a Github User </Text>

        <TextInput
          style={styles.searchInput}
          value={this.state.username}
          onChange={this.handleChange.bind(this)} />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor="white">
          <Text style={styles.buttonText}> Search</Text>
          </TouchableHighlight>
          <ActivityIndicatorIOS
            animating={this.state.isLoading}
            color="#111111"
            size="large">
          </ActivityIndicatorIOS>
          {showErr}
      </View>
    )
  }
};

module.exports = Main;
