(function() {
    var app = angular.module("gitHubViewer", []);

    var MainController = function($scope, $http) {
        $scope.message = "Search Github user";

        var onSuccess = function(response) {
            $scope.person = response.data;

            // get repos
            $http.get("https://api.github.com/users/" + $scope.person.login + "/repos")
                 .then(showRepos, onError);
        };

        var showRepos = function(data) {
            $scope.repos = data.data;
        };

        var onError = function(response) {
            $scope.person.login = response.data.message;
            $scope.person.avatar_url = "https://avatars.githubusercontent.com/u/79483759843";
        };

        $scope.search = function(userName) {
            $http.get("https://api.github.com/users/" + userName)
                 .then(onSuccess, onError);
        };
    };    

    app.controller("MainController", ["$scope", "$http", MainController]);
}());