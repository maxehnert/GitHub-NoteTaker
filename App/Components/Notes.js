// var React = require('react-native');
// var api = require('../Utils/api');
// var Separator = require('../Helpers/Separator');
// var Badge = require('./Badge');
//
// var {
//   View,
//   Text,
//   ListView,
//   TextInput,
//   StyleSheet,
//   Component,
//   TouchableHighlight
// } = React;
//
// var styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//   },
//   buttonText: {
//     fontSize: 18,
//     color: 'white'
//   },
//   button: {
//     height: 60,
//     backgroundColor: '#48BBEC',
//     flex: 3,
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   searchInput: {
//     height: 60,
//     padding: 10,
//     fontSize: 18,
//     color: '#111',
//     flex: 10
//   },
//   rowContainer: {
//     padding: 10,
//   },
//   footerContainer: {
//     backgroundColor: '#E3E3E3',
//     alignItems: 'center',
//     flexDirection: 'row'
//   }
// });
//
// class Notes extends Component {
//
//   constructor(props) {
//     super(props)
//     this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
//     this.state = {
//       dataSouce : this.ds.cloneWithRows(this.props.notes),
//       note: '',
//       error: ''
//     }
//   };
//   //takes an event and keeps our note prop on our state object up to date
//   handleChange(event) {
//     this.setState({
//       note: event.nativeEvent.text
//     });
//   };
//   // Takes the note property on state and send it to Firebase
//   handleSubmit() {
//     //gets the note
//     var note = this.state.note;
//     // resets the state so it clears out the input field
//     this.setState({
//       note: ''
//     });
//
//     //this is a method from api.js
//     //it expects to receive users username and a note
//     api.addNote(this.props.userInfo.login, note)
//       .then((data) => {
//         //get the notes again
//         api.getNotes(this.propsuserInfo.login)
//           .then((data) => {
//             this.setState({
//               // now the rows of notes are populated by the 'data' you just pulled from firebase
//               dataSouce: this.ds.cloneWithRows(data)
//             })
//           })
//       }).catch((err) => {
//         console.log('Request faile ', err);
//         this.setState({error});
//       });
//   };
//   // This is returns the UI for every item in the list
//   renderRow(rowData) {
//     return (
//       <View>
//         <View style={styles.rowContainer}>
//           <Text> {rowData} </Text>
//         </View>
//         <Separator />
//       </View>
//     )
//   };
//
//   footer() {
//     return (
//       <View style={styles.footerContainer}>
//         <TextInput
//           style={styles.searchInput}
//           value={this.state.note}
//           onChange={this.handleChange.bind(this)}
//           placeholder="New Note" />
//         <TouchableHighlight
//           style={styles.button}
//           onPress={this.handleSubmit.bind(this)}
//           underlayColor="#88D4F5">
//             <Text style={styles.buttonText}> Submit </Text>
//           </TouchableHighlight>
//       </View>
//     )
//   };
//
//   render() {
//     return (
//       <View style={styles.container}>
//         <ListView
//           dataSouce={this.state.dataSouce}
//           renderRow={this.renderRow}
//           renderHeader={() => <Badge userInfo={this.props.userInfo} />} />
//         {this.footer()}
//       </View>
//     )
//   }
// };
//
// Notes.propTypes = {
//   userInfo: React.PropTypes.object.isRequired,
//   notes: React.PropTypes.object.isRequired
// };
//
// module.exports = Notes;


var React = require('react-native');
var api = require('../Utils/api');
var Separator = require('../Helpers/Separator');
var Badge = require('./Badge');

var {
  View,
  Text,
  ListView,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  Component
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  buttonText: {
    fontSize: 18,
    color: 'white'
  },
  button: {
    height: 60,
    backgroundColor: '#48BBEC',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchInput: {
    height: 60,
    padding: 10,
    fontSize: 18,
    color: '#111',
    flex: 10
  },
  rowContainer: {
    padding: 10,
  },
  footerContainer: {
    backgroundColor: '#E3E3E3',
    alignItems: 'center',
    flexDirection: 'row'
  }
});

class Notes extends Component{
  constructor(props){
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.notes),
      note: '',
      error: ''
    }
  }
  handleChange(e){
    this.setState({
      note: e.nativeEvent.text
    })
  }
  handleSubmit(){
    var note = this.state.note;
    this.setState({
      note: ''
    });
    api.addNote(this.props.userInfo.login, note)
      .then((data) => {
        api.getNotes(this.props.userInfo.login)
          .then((data) => {
            this.setState({
              dataSource: this.ds.cloneWithRows(data)
            })
          });
      })
      .catch((error) => {
        console.log('Request failed', error);
        this.setState({error})
      });
  }
  renderRow(rowData){
    return (
      <View>
        <View style={styles.rowContainer}>
          <Text> {rowData} </Text>
        </View>
        <Separator />
      </View>
    )
  }
  footer(){
    return (
      <View style={styles.footerContainer}>
        <TextInput
            style={styles.searchInput}
            value={this.state.note}
            onChange={this.handleChange.bind(this)}
            placeholder="New Note" />
        <TouchableHighlight
            style={styles.button}
            onPress={this.handleSubmit.bind(this)}
            underlayColor="#88D4F5">
              <Text style={styles.buttonText}>Submit</Text>
          </TouchableHighlight>
      </View>
    )
  }
  render(){
    return (
      <View style={styles.container}>
          <ListView
            renderHeader={() => <Badge userInfo={this.props.userInfo}/>}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
             />
        {this.footer()}
      </View>
    )
  }
};

Notes.propTypes = {
  userInfo: React.PropTypes.object.isRequired,
  notes: React.PropTypes.object.isRequired
}

module.exports = Notes;
