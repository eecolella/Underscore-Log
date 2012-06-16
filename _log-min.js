(function () {
    Function.prototype.bind = function (a) { var b = this; return function () { return b.apply(a, arguments) } }; String.Format = function (a) { for (var b = 0, c = arguments.length; b < c; b++) a = a.replace("{" + (b - 1) + "}", arguments[b]); return a }; console.time = function (a) { var b = (new Date).getTime(); a ? (console.timeSummary[a] || (console.timeSummary[a] = { avg: void 0, iterations: [] }), console.timeSummary[a].lastStart = b) : console.warn("error in console.time(key): parameter key is required") }; console.timeEnd = function (a, b) {
        var c = (new Date).getTime();
        if (a) if (console.timeSummary[a] && console.timeSummary[a].lastStart) {
            var c = c - console.timeSummary[a].lastStart, d = 0; delete console.timeSummary[a].lastStart; (void 0 === b || b) && console.log(String.Format("{0} {1}", a, c)); console.timeSummary[a].iterations.push(c); for (var e = console.timeSummary[a].iterations.length - 1; 0 <= e; e--) {
                d += console.timeSummary[a].iterations[e]; if (void 0 === console.timeSummary[a].min || c < console.timeSummary[a].min) console.timeSummary[a].min = c; if (void 0 === console.timeSummary[a].max || c > console.timeSummary[a].max) console.timeSummary[a].max =
                c
            } console.timeSummary[a].avg = Math.round(d / console.timeSummary[a].iterations.length); console.timeSummary[a].errMs = ((console.timeSummary[a].max - console.timeSummary[a].min) / 2).toFixed(2); console.timeSummary[a].errPer = (100 * ((console.timeSummary[a].max - console.timeSummary[a].min) / 2 / console.timeSummary[a].avg)).toFixed(2)
        } else console.warn(String.Format('error in console.timeEnd("{0}"): {0} is not initialized with console.time({0})', a)); else console.warn("error in console.timeEnd(key): parameter key is required")
    };
    console.timeSummary = function (a) {
        console.timeSummary[a] && (console.groupCollapsed(String.Format("{0} summary", a)), console.log(String.Format("{0} interations: {1} [{2}]", a, console.timeSummary[a].iterations.length, console.timeSummary[a].iterations)), console.log(String.Format("{0} min: {1} ms", a, console.timeSummary[a].min)), console.log(String.Format("{0} max: {1} ms", a, console.timeSummary[a].max)), console.log(String.Format("{0} average: {1} ms \u00b1 {2} ms ({3}%)", a, console.timeSummary[a].avg, console.timeSummary[a].errMs,
        console.timeSummary[a].errPer)), console.groupEnd(String.Format("{0} summary", a)))
    }; console.assert = function (a, b) { void 0 !== a && void 0 !== b ? a || console.error(b) : console.warn("error in console.assert(exp,v): parameters exp and v are required") }; console.external = function (a, b, c) { console.groupCollapsed(String.Format("external {0}", a)); _log.external[a].apply(c || window, b); console.groupEnd(String.Format("external {0}", a)) }; _log = function (a) { console.log(a) }; for (var d in console) _log[d] = console[d] instanceof Function ?
    function () { return console[this].apply(this, arguments) }.bind(d) : console[d]
})();
