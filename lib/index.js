exports.createQueue = createQueue;

function createQueue(rateLimit) {
    var queue = []
    var gap = rateLimit.interval;
    var timeOfNextRequest = 0;
    var waiting = false;

    function next() {
        if (queue.length === 0) {
            waiting = false;
            return;
        }

        var now = getNow();
        if (now >= timeOfNextRequest) {
            timeOfNextRequest = now + gap;
            const nextFunc = queue.shift()
            nextFunc[0](nextFunc[1]);
        }
        setTimeout(next, timeOfNextRequest - now);
        waiting = true;
    }

    function add(func, ...params) {
        queue.push([func, ...params]);
        if (!waiting) {
            next();
        }
    }

    return {
        add: add
    }
}

function getNow() {
    return new Date().getTime();
}