# node-rate-limit

Ensure that a series of functions are called with a minimum interval between each invocation.

## Installation

    npm install rate-limit
    
## Usage

Call `rateLimit.createQueue(options)` to create a queue,
where the interval between function calls is specified in milliseconds by `options.interval`.
Add a function to be called by calling `queue.add(func)`.

For instance:

```javascript

var rateLimit = require("rate-limit");

function getNow() {
    return new Date().getTime();
}

var startTime = getNow();

function printElapsedTime() {
    console.log(getNow() - startTime);
}

var queue = rateLimit.createQueue({interval: 100});

queue.add(printElapsedTime);
queue.add(printElapsedTime);
queue.add(printElapsedTime);


// Sample output:
// 0
// 105
// 206
```
