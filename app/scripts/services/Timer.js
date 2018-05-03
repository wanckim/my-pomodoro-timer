(function() {
  function Timer($rootScope, $interval) {
    /**
    * @desc Ding sound preloaded
    */
    var dingSound = new buzz.sound("/assets/sounds/ding.mp3", {
      preload: true
    });

    /**
    * @desc Default settings
    */
    var Timer = {
      runTime: 1500,
      btn_timer: "Start",
      btn_state: "Take a break!",
      onBreak: false,
      stateChange: false,
      counter: 0
    };
    var stop;

    /**
    * @function startTimer
    * @desc Starts the count if the timer is stopped, resets the time if the timer is running,
            and prompts to proceed if count reaches 0
    * @param {Integer} time
    */
    var startTimer = function(time) {
      if ( angular.isDefined(stop) ) {
        $interval.cancel(stop);
        stop = undefined;
        Timer.runTime = time;
        Timer.btn_timer = "Start";
      } else {
        Timer.btn_timer = "Reset";
        stop = $interval(function() {
          if (time > 0) {
            time = time - 1;
            Timer.runTime = time;
          } else {
            $interval.cancel(stop);
            Timer.stateChange = toggle(Timer.stateChange);
          }
        }, 10);
      }
    };

    /**
    * @function changeTimer
    * @desc Toggle timer state button text
    */
    var changeTimer = function() {
      if (Timer.onBreak) {
        Timer.btn_state = "Take a break!";
      } else {
        Timer.btn_state = "Let's work!";
      }
    };

    /**
    * @function toggle
    * @desc Toggle boolean variable
    * @param {Boolean} flag
    * @return {Boolean}
    */
    var toggle = function(flag) {
      flag = !flag;
      return flag;
    };

    /**
    * @function start
    * @desc Initiate the timer according to the state condition
    */
    Timer.start = function() {
      if (!Timer.onBreak) {
        Timer.runTime = 1500;
        startTimer(Timer.runTime);
      } else if (Timer.onBreak && Timer.counter % 4 !== 0) {
        Timer.runTime = 300;
        startTimer(Timer.runTime);
      } else if (Timer.onBreak && Timer.counter % 4 === 0) {
        Timer.runTime = 1800;
        startTimer(Timer.runTime);
      }
    };

    /**
    * @function reStart
    * @desc Toggle state and timer condition, and re-initiate start()
    */
    Timer.reStart = function() {
      if (!Timer.onBreak) { Timer.counter++ };
      changeTimer();
      Timer.stateChange = toggle(Timer.stateChange);
      Timer.onBreak = toggle(Timer.onBreak);
      Timer.start();
    };

    $rootScope.$watch(function() { return Timer.runTime }, function() {
      if (Timer.runTime === 0) {
        dingSound.play();
      }
    });

    return Timer;
  }

  angular
    .module('myPomodoroTimer')
    .factory('Timer', ['$rootScope', '$interval', Timer]);
})();
