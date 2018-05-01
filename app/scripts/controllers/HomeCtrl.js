(function() {
  function HomeCtrl(Timer) {
    this.timer = Timer;
  }

  angular
    .module('myPomodoroTimer')
    .controller('HomeCtrl', ['Timer', HomeCtrl]);
})();
