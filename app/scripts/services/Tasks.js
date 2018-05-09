(function() {
  function Tasks($firebaseArray) {
    var Tasks = {};
    var ref = firebase.database().ref().child("tasks");
    var tasks = $firebaseArray(ref);

    Tasks.all = tasks;

    Tasks.add = function(task) {
      var timeStamp = new Date();
      var taskObj = {
        name: task,
        createdAt: timeStamp
      };
      tasks.$add(taskObj).then(function(ref) {
        var id = ref.key;
        tasks.$indexFor(id);
      });
    };

    return Tasks;
  }

  angular
    .module('myPomodoroTimer')
    .factory('Tasks', ['$firebaseArray', Tasks]);
})();
