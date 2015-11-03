(function() {
    var app = angular.module("gitHubViewer", []);

    var MainController = function($scope, $http, $interval) {
            var onSuccess = function(response) {
            $scope.person = response.data;

            // get repos
            $http.get("https://api.github.com/users/" + $scope.person.login + "/repos")
                 .then(showRepos, onError);
        };

        var showRepos = function(data) {
            $scope.repos = data.data;
        };

        var decrementCounter = function() {
            $scope.counter--;

            if($scope.counter < 1) {
                $scope.search($scope.userName);
            }
        };

        var intervalHandle = null;

        var startCountdown = function() {
            intervalHandle = $interval(decrementCounter, 1000, 5);
        };

        var onError = function(response) {
            $scope.person.login = response.data.message;
            $scope.person.avatar_url = "https://avatars.githubusercontent.com/u/79483759843";
            $scope.repos = {};
        };

        $scope.search = function(userName) {
            $http.get("https://api.github.com/users/" + userName)
                 .then(onSuccess, onError);
        };

        $scope.userName = "angular";
        $scope.message = "Search Github user";
        $scope.counter = 5;
        startCountdown();
    };    

    app.controller("MainController", ["$scope", "$http", "$interval", MainController]);
}());