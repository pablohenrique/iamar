function Database(data) {
  this.all = [];
  this.total = 0;
  if(data) {
    for (var i = 0; i < data.length; i++) data[i].id = i;
    this.all = data;
    this.total = data.length;
  }
};

Database.prototype.find = function(n){
  for (var i = 0; i < this.total; i++) {
    if (this.all[i].id === parseInt(n)) {
      return this.all[i];
    }
  }
  return null;
};

function Profile(name, face) {
    this.name = name;
    this.face = face;
    this.coins = 0;
};

function Educando(profile) {
  this.profile = profile;
  this.salas = [];
};

function Educando(profile, salas) {
  this.profile = profile;
  if(salas) this.salas = salas;
};

var ProfilesDatabase = new Database([
  new Profile('Adam','img/adam.jpg'),
  new Profile('Ben','img/ben.png'),
  new Profile('Max','img/max.png'),
  new Profile('Mike','img/mike.png'),
  new Profile('Perry','img/perry.png')
]);

var EducandosDatabase = new Database([
  new Educando(ProfilesDatabase.find(0)),
  new Educando(ProfilesDatabase.find(1)),
  new Educando(ProfilesDatabase.find(2)),
  new Educando(ProfilesDatabase.find(3)),
  new Educando(ProfilesDatabase.find(4)),
]);

function Educador(profile) {
  this.profile = profile;
  this.salas = [];
}

angular.module('starter.services', [])

    .factory('Chats', function () {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var chats = [{
            id: 0,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            face: 'img/ben.png'
        }, {
            id: 1,
            name: 'Max Lynx',
            lastText: 'Hey, it\'s me',
            face: 'img/max.png'
        }, {
            id: 2,
            name: 'Adam Bradleyson',
            lastText: 'I should buy a boat',
            face: 'img/adam.jpg'
        }, {
            id: 3,
            name: 'Perry Governor',
            lastText: 'Look at my mukluks!',
            face: 'img/perry.png'
        }, {
            id: 4,
            name: 'Mike Harrington',
            lastText: 'This is wicked good ice cream.',
            face: 'img/mike.png'
        }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})
