
(function () {

    Function.prototype.bind = function (scope) {
        var _function = this;
        return function () {
            return _function.apply(scope, arguments);
        };
    };

    String.Format = function (str) {
        for (var i = 0, length = arguments.length; i < length; i++) {
            str = str.replace('{' + (i - 1) + '}', arguments[i]);
        }
        return str;
    };

    console.time = function (key) {
        var t = (new Date()).getTime();
        if (key) {
            if (!console.timeSummary[key])
                console.timeSummary[key] = { avg: undefined, iterations: [] };
            console.timeSummary[key].lastStart = t;
        } else {
            throw 'Advaced Logging Error: in console.time(key) parameter key is required';
        }
    };

    console.timeEnd = function (key, opt_display) {
        var t = (new Date()).getTime();
        if (key) {
            if (console.timeSummary[key] && console.timeSummary[key].lastStart) {
                var gap = t - console.timeSummary[key].lastStart,
                    sum = 0;

                delete console.timeSummary[key].lastStart;

                //check whether log, default true
                if ((opt_display === undefined) ? true : opt_display)
                    console.log(String.Format('{0} {1}', key, gap));

                console.timeSummary[key].iterations.push(gap);

                for (var i = console.timeSummary[key].iterations.length - 1; i >= 0; i--) {
                    sum += console.timeSummary[key].iterations[i];
                    if ((console.timeSummary[key].min === undefined) || (gap < console.timeSummary[key].min))
                        console.timeSummary[key].min = gap;
                    if ((console.timeSummary[key].max === undefined) || (gap > console.timeSummary[key].max))
                        console.timeSummary[key].max = gap;
                }
                console.timeSummary[key].avg = Math.round(sum / console.timeSummary[key].iterations.length);
                console.timeSummary[key].errMs = ((console.timeSummary[key].max - console.timeSummary[key].min) / 2).toFixed(2);
                console.timeSummary[key].errPer = ((console.timeSummary[key].max - console.timeSummary[key].min) / 2 / console.timeSummary[key].avg * 100).toFixed(2);

            } else {
                throw String.Format('Advaced Logging Error: console.timeEnd("{0}") is not initialized with console.time("{0}")', key);
            }
        } else {
            throw 'Advaced Logging Error: in console.timeEnd(key) parameter key is required';
        }
    };

    console.timeSummary = function (key) {
        if (key) {
            if (console.timeSummary[key]) {
                console.groupCollapsed(String.Format('{0} summary', key));
                console.log(String.Format('{0} interations: {1} [{2}]', key, console.timeSummary[key].iterations.length, console.timeSummary[key].iterations));
                console.log(String.Format('{0} min: {1} ms', key, console.timeSummary[key].min));
                console.log(String.Format('{0} max: {1} ms', key, console.timeSummary[key].max));
                console.log(String.Format('{0} average: {1} ms ± {2} ms ({3}%)', key, console.timeSummary[key].avg, console.timeSummary[key].errMs, console.timeSummary[key].errPer));
                console.groupEnd(String.Format('{0} summary', key));
            } else {
                throw String.Format('Advaced Logging Error: there are no time report with key "{0}"', key);
            }
        } else {
            throw 'Advaced Logging Error: in console.timeSummary(key) parameter key is required';
        }
    };

    console.assert = function (exp, v) {
        if ((exp !== undefined) && (v !== undefined)) {
            if (!exp)
                console.error(v);
        } else {
            throw 'Advaced Logging Error: in console.assert(exp,v) all parameters are required';
        }
    };

    console.external = function (key, args, scope) {
        if (key) {
            console.groupCollapsed(String.Format('external {0}', key));
            _log.external[key].apply(scope || window, args);
            console.groupEnd(String.Format('external {0}', key));
        } else {
            throw 'Advaced Logging Error: in console.timeSummary(key) parameter key is required';
        }
    };

    _log = function (v) {
        console.log(v);
    };

    for (var prop in console) {
        if (console[prop] instanceof Function)
            _log[prop] = function () {
                return console[this].apply(this, arguments);
            }.bind(prop);
        else
            _log[prop] = console[prop];
    }

})();