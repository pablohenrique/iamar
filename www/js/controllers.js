angular.module('starter.controllers', [])

    .controller('DashCtrl', function ($scope) {
        $scope.user = ProfilesDatabase.find(0);
    })

    .controller('ChatsCtrl', function ($scope, Chats) {
        $scope.chats = Chats.all();
        $scope.user = ProfilesDatabase.find(0);
        $scope.remove = function (chat) {
            Chats.remove(chat);
        };
    })

    .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })

    .controller('NotificacaoCtrl', function ($scope, $stateParams) {
        $scope.user = ProfilesDatabase.find(0);
        $scope.notificacao = NotificacoesDatabase.find($stateParams.notificacaoId);
        //$scope.prova = 0;
        $scope.remove = function (chat) {
            Chats.remove(chat);
        };
        $scope.add = function (chat) {
            Chats.remove(chat);
        };
    })

    .controller('AccountCtrl', function ($scope) {
        $scope.user = ProfilesDatabase.find(0);
        $scope.settings = {
            enableFriends: true
        };
    })

    .controller('RankingCtrl', function ($scope) {
        $scope.educandos = EducandosDatabase.all;
        $scope.user = ProfilesDatabase.find(0);
    })

    .controller('MeCtrl', function ($scope) {
        $scope.me = EducandosDatabase.find(0);
        $scope.user = ProfilesDatabase.find(0);
    });
