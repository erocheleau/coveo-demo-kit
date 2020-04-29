({
  poll: function(fn, timeout=2000, interval=100) {
    var endTime = Date.now() + timeout;
    interval = interval;

    var checkCondition = function (resolve, reject) {
      // If the condition is met, we're done! 
      var result = fn();
      if (result) {
        resolve(result);
      }
      // If the condition isn't met but the timeout hasn't elapsed, go again
      else if (Date.now() < endTime) {
        setTimeout(checkCondition, interval, resolve, reject);
      }
      // Didn't match and too much time, reject!
      else {
        reject(new Error('timed out for ' + fn + ': ' + arguments));
      }
    };

    return new Promise(checkCondition);
  }
})
