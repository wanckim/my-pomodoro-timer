(function() {
  function HomeCtrl($scope, $interval) {
    var time = 1500;
    $scope.runTime = time;
    $scope.btn_text = "Start";
    var stop;

    $scope.sessions = function() {
      if ( angular.isDefined(stop) ) {
        $interval.cancel(stop);
        stop = undefined;
        time = 1500;
        $scope.runTime = time;
        $scope.btn_text = "Start";
      } else {
        $scope.btn_text = "Reset";
        stop = $interval(function() {
          if (time > 0) {
            time = time - 1;
            $scope.runTime = time;
          } else {
            $interval.cancel(stop);
          }
        }, 1000);
      }
    };
  }

  angular
    .module('myPomodoroTimer')
    .controller('HomeCtrl', ['$scope', '$interval', HomeCtrl]);
})();
