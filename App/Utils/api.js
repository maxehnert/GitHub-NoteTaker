var api = {

  getBio(username) {
    username = username.toLowerCase().trim();
    // ES6 way of doing string concat
    // Use back ticks `` then INSERT your param with ${ VARIABLE }
    var url = `https://api.github.com/users/${username}`;

    return fetch(url).then((res) => res.json());

  },
  getRepos(username) {
    username = username.toLowerCase().trim();
    // ES6 way of doing string concat
    // Use back ticks `` then INSERT your param with ${ VARIABLE }
    var url = `https://api.github.com/users/${username}/repos`;

    // ES6 => is a function
    return fetch(url).then((res) => res.json());
  },
  getNotes(username) {
    username = username.toLowerCase().trim();
    // This is the url given by firebase when you make a new app on there
    // then we just append the username on to the end of the url and it will allow us to store notes under that persons username
    var url = `https://github-saver-max.firebaseio.com/${username}.json`;
    return fetch(url).then((res) => res.json());
  },
  addNote(username, note) {
    username = username.toLowerCase().trim();
    var url = `https://github-saver-max.firebaseio.com/${username}.json`;

    return fetch(url, {
      method: 'post',
      body: JSON.stringify(note)
    }).then((res) => res.json());
  }
};

module.exports = api;
