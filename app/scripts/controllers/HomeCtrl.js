(function() {
  function HomeCtrl($scope, Timer, Tasks) {
    this.timer = Timer;

    this.tasks = Tasks.all;

    this.addTask = function() {
      if ($scope.newTask) {
        Tasks.add($scope.newTask);
        $scope.newTask = null;
      }
    };
  }

  angular
    .module('myPomodoroTimer')
    .controller('HomeCtrl', ['$scope', 'Timer', 'Tasks', HomeCtrl]);
})();
