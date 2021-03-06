(function() {
  function timeformat() {
    /**
    * @desc Formats the time (seconds) into MM:SS
    * @param {Integer} seconds
    * @return {String}
    */
    return function(seconds) {
      var min = parseInt(seconds / 60, 10);
      var sec = seconds % 60;

      return ((min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec));
    };
  }

  angular
    .module('myPomodoroTimer')
    .filter('timeformat', [timeformat]);
})();
