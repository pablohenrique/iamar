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

// MODELS

function Profile(name, face, owner) {
  this.objectname = 'perfil';
  this.baseurl = 'perfis';
  this.name = name;
  this.face = face;
  this.coins = 0;
  this.notificacoes = [];
};

function Educando(profile, salas) {
  this.objectname = 'educando';
  this.baseurl = 'educandos';
  this.profile = profile;
  this.salas = [];
  if(salas) this.salas = salas;
};

function Educador(profile, salas) {
  this.objectname = 'educador';
  this.baseurl = 'educadores';
  this.profile = profile;
  this.salas = [];
  if(salas) this.salas = salas;
};

function Voluntario(profile) {
  this.objectname = 'voluntario';
  this.baseurl = 'voluntários';
  this.profile = profile;
};

function Sala(name, educadores, educandos) {
  this.objectname = 'sala';
  this.baseurl = 'salas';
  this.name = name;
  this.educadores = [];
  this.educandos = [];
  if(educadores) this.educadores = educadores;
  if(educandos) this.educandos = educandos;
}

function Prova(name, sala) {
  this.objectname = 'prova';
  this.baseurl = 'provas';
  this.name = name;
  this.sala = sala;
}

function Notificacao(actor, action, object, observers, preview) {
  this.objectname = 'notificacao';
  this.baseurl = 'notificacoes';
  this.actor = actor;
  this.object = object;
  this.action = action;
  this.observers = [];
  if(observers) this.observers = observers;
  this.preview = preview;
  this.created_at = new Date();
}

// DATABASES

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

Database.prototype.add = function(obj){
  obj.id = this.total;
  this.total++;
  this.all.push(obj);
};

var ProfilesDatabase = new Database([
  new Profile('Adam Smith','img/adam.jpg'),         // 0
  new Profile('Ben Afflec','img/ben.png'),           // 1
  new Profile('Mad Max','img/max.png'),
  new Profile('Mike Tyson','img/mike.png'),
  new Profile('Perry','img/perry.png'),
  new Profile('Fernando Garcia','img/perry.png'),    // 5
  new Profile('Filipe Forattini','img/perry.png'),
  new Profile('Pablo Henrique','img/perry.png')
]);

var EducandosDatabase = new Database([
  new Educando(ProfilesDatabase.find(0)),
  new Educando(ProfilesDatabase.find(1)),
  new Educando(ProfilesDatabase.find(2)),
  new Educando(ProfilesDatabase.find(3)),
  new Educando(ProfilesDatabase.find(4)),
]);

ProfilesDatabase.find(0).owner = EducandosDatabase.find(0);
ProfilesDatabase.find(1).owner = EducandosDatabase.find(1);
ProfilesDatabase.find(2).owner = EducandosDatabase.find(2);
ProfilesDatabase.find(3).owner = EducandosDatabase.find(3);
ProfilesDatabase.find(4).owner = EducandosDatabase.find(4);

var EducadoresDatabase = new Database([
  new Educador(ProfilesDatabase.find(5)),
  new Educador(ProfilesDatabase.find(6)),
  new Educador(ProfilesDatabase.find(7))
]);

ProfilesDatabase.find(5).owner = EducadoresDatabase.find(0);
ProfilesDatabase.find(6).owner = EducadoresDatabase.find(1);
ProfilesDatabase.find(7).owner = EducadoresDatabase.find(2);

var SalasDatabase = new Database([
  new Sala('Curso: Como falar em público', [
      EducadoresDatabase.find(2),
    ],[
      EducandosDatabase.find(0),
      EducandosDatabase.find(1),
      EducandosDatabase.find(2)
    ]),
]);

var SalasDatabase = new Database([
  new Sala('Curso: Educação financeira para Startups', [
      EducadoresDatabase.find(0),
    ],[
      EducandosDatabase.find(0),
      EducandosDatabase.find(1),
      EducandosDatabase.find(2)
    ]),
]);

EducadoresDatabase.find(0).salas.push(SalasDatabase.find(0));
EducandosDatabase.find(0).salas.push(SalasDatabase.find(0));
EducandosDatabase.find(1).salas.push(SalasDatabase.find(0));
EducandosDatabase.find(2).salas.push(SalasDatabase.find(0));

var ProvasDatabase = new Database([
  new Prova('Pitch #1',SalasDatabase.find(0)),
  new Prova('Demonstração Financeira',SalasDatabase.find(0))
]);

var NotificacoesDatabase = new Database([
  new Notificacao(ProfilesDatabase.find(6), 'criou', ProvasDatabase.find(0), ProvasDatabase.find(0).sala.educandos),
  new Notificacao(ProfilesDatabase.find(7), 'criou', ProvasDatabase.find(1), ProvasDatabase.find(1).sala.educandos)
]);

ProfilesDatabase.find(0).notificacoes.push(NotificacoesDatabase.find(0));
ProfilesDatabase.find(0).notificacoes.push(NotificacoesDatabase.find(1));