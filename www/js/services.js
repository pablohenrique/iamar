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
});

// MODELS

function Profile(name, face, owner) {
  this.objectname = 'perfil';
  this.baseurl = 'perfis';
  this.name = name;
  this.face = face;
  this.coins = 0;
  this.points = 0;
  this.notificacoes = [];
  this.medalhas = [];
};

function Educando(profile, salas) {
  this.objectname = 'educando';
  this.baseurl = 'educandos';
  this.profile = profile;
  profile.owner = this;
  this.salas = [];
  if(salas) this.salas = salas;
};

function Educador(profile, salas) {
  this.objectname = 'educador';
  this.baseurl = 'educadores';
  this.profile = profile;
  profile.owner = this;
  this.salas = [];
  if(salas) this.salas = salas;
};

function Voluntario(profile) {
  this.objectname = 'voluntario';
  this.baseurl = 'voluntários';
  this.profile = profile;
  profile.owner = this;
};

function Sala(name, educadores, educandos, provas) {
  this.objectname = 'sala';
  this.baseurl = 'salas';
  this.name = name;
  this.educadores = [];
  this.educandos = [];
  this.provas = [];
  if(educadores) {
    for (var i = 0; i < educadores.length; i++) {
      educadores[i].salas.push(this);
    }
    this.educadores = educadores;
  }
  if(educandos) {
    for (var i = 0; i < educandos.length; i++) {
      educandos[i].salas.push(this);
    }
    this.educandos = educandos;
  }
  if(provas) {
    for (var i = 0; i < provas.length; i++) {
      provas[i].sala = this;
    }
    this.provas = provas;
  }
  this.comentarios = [];
}

function Prova(name, sala) {
  this.objectname = 'prova';
  this.baseurl = 'provas';
  this.name = name;
  this.sala = sala;
  sala.provas.push(this);
  this.comentarios = [];
}

function Notificacao(actor, action, object, observers, preview) {
  this.objectname = 'notificacao';
  this.baseurl = 'notificacoes';
  this.actor = actor;
  this.object = object;
  this.action = action;
  this.preview = preview;
  this.created_at = new Date();
  this.comentarios = [];

  this.observers = [];
  if(observers) {
    for (var i = 0; i < observers.length; i++) {
      if(observers[i].hasOwnProperty('notificacoes')) {
        observers[i].notificacoes.push(this);
      } else {
        if(observers[i].hasOwnProperty('profile')) {
          observers[i].profile.notificacoes.push(this);
        }
      }
      this.observers = observers;
    }
  }
}

function Medalha(name, descricao, icon, xp) {
  this.objectname = 'medalha';
  this.baseurl = 'medalhas';
  this.name = name;
  this.descricao = descricao;
  this.icon = icon;
  this.xp = xp;
  this.comentarios = [];
}

function Comentario(object, profile, text, date) {
  this.objectname = 'comentario';
  this.baseurl = 'comentarios';
  this.object = object;
  this.profile = profile;
  this.text = text;
  this.data = date;
  object.comentarios.push(this);
}

function Projeto(name) {
  this.objectname = 'medalha';
  this.baseurl = 'medalhas';
  this.name = name;
  this.comentarios = [];
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
  new Profile('João Ricardo','img/adam.jpg'),         // 0
  new Profile('André Nascimento','img/ben.png'),           // 1
  new Profile('Alberto Roberto','img/max.png'),
  new Profile('Marcelo Silva','img/mike.png'),
  new Profile('Eduardo Souza','img/perry.png'),
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

var EducadoresDatabase = new Database([
  new Educador(ProfilesDatabase.find(5)),
  new Educador(ProfilesDatabase.find(6)),
  new Educador(ProfilesDatabase.find(7))
]);

var SalasDatabase = new Database([
  new Sala('Curso: Como falar em público', [
      EducadoresDatabase.find(2),
    ],[
      EducandosDatabase.find(0),
      EducandosDatabase.find(1),
      EducandosDatabase.find(2)
  ]),
  new Sala('Curso: Educação financeira para Startups', [
      EducadoresDatabase.find(0),
    ],[
      EducandosDatabase.find(0),
      EducandosDatabase.find(1),
      EducandosDatabase.find(2)
  ])
]);

var ProvasDatabase = new Database([
  new Prova('Como fazer um Pitch',SalasDatabase.find(0)),
  new Prova('Demonstração Financeira',SalasDatabase.find(1))
]);

var MedalhasDatabase = new Database([
  new Medalha('Caçador de Zaps!', 'Faça 10x logins em um dia!', 'img/m1.png', 100),
  new Medalha('Destruidor de provas!', 'Fechou prova com 100%! Só não tirou mais porque não tinha mais questões.', 'img/m2.png', 230),
  new Medalha('Zerando o ano!','Passe em dois semestres consecutivos com todas notas acima de 60%', 'img/m3.png', 300)
]);

ProfilesDatabase.find(0).medalhas.push(MedalhasDatabase.find(0));
ProfilesDatabase.find(0).medalhas.push(MedalhasDatabase.find(1));
ProfilesDatabase.find(0).medalhas.push(MedalhasDatabase.find(2));

var NotificacoesDatabase = new Database([
  new Notificacao(ProfilesDatabase.find(1), 'conquistou', MedalhasDatabase.find(0)),
  new Notificacao(ProfilesDatabase.find(6), 'criou', ProvasDatabase.find(0), ProvasDatabase.find(0).sala.educandos),
  new Notificacao(ProfilesDatabase.find(2), 'conquistou', MedalhasDatabase.find(1)),
  new Notificacao(ProfilesDatabase.find(7), 'modificou', ProvasDatabase.find(1), ProvasDatabase.find(1).sala.educandos),
  new Notificacao(ProfilesDatabase.find(3), 'conquistou', MedalhasDatabase.find(2))
]);

var ProjetosDatabase = new Database([
  new Projeto('Recilagem com eficinência'),
  new Projeto('Recilagem com eficinência')
]);