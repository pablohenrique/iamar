angular.module('starter.services', [])

.factory('Chats', function() {
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

.factory('Educando', function(name, face) {
  return {
    name: name,
    face: face,
    coins: 0
  };
})

.factory('Educandos', function() {

  var data = [
    ['Adam','img/adam.jpg'],
    ['Ben','img/ben.png'],
    ['Max','img/max.png'],
    ['Mike','img/mike.png'],
    ['Perry','img/perry.png']
  ];

  var educandos = [];
  for (var i = 0; i < data.length-1; i++) {
    var dados = data[i];
    educandos[i] = new Educando(dados[0], dados[1]);
  }

  window.educandos = educandos;

  return {
    all: function() {
      return educandos;
    },
    remove: function(educandos) {
      educandos.splice(chats.indexOf(chat), 1);
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
});
