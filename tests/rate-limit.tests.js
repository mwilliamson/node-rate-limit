var rateLimit = require("../");


exports["single call is unaffected by rate limit"] = function(test) {
    var startTime = getNow();
    var queue = rateLimit.createQueue({interval: 100});
    queue.add(function() {
        test.ok(getNow() - startTime < 10);
        test.done();
    });
};


exports["gap between functions is at least rate limit interval"] = function(test) {
    var startTime = getNow();
    var queue = rateLimit.createQueue({interval: 100});
    queue.add(function() {
        var firstTime = getNow();
        queue.add(function() {
            var secondTime = getNow();
            test.ok(firstTime - startTime < 10);
            test.ok(secondTime - firstTime >= 100);
            test.done();
        });
    });
};


exports["multiple functions can be queued"] = function(test) {
    var record = [];
    var startTime = getNow();
    var queue = rateLimit.createQueue({interval: 100});
    queue.add(function() {
        test.equal(record.length, 0);
        record.push(getNow());
    });
    queue.add(function() {
        test.equal(record.length, 1);
        record.push(getNow());
    });
    queue.add(function() {
        test.equal(record.length, 2);
        test.ok(getNow() - record[1] >= 100);
        test.ok(record[1] - record[0] >= 100);
        test.done();
    });
};

function getNow() {
    return new Date().getTime();
}
