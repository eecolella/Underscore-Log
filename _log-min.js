(function () {
    Function.prototype.bind = function (a) { var b = this; return function () { return b.apply(a, arguments) } }; String.Format = function (a) { for (var b = 0, c = arguments.length; b < c; b++) a = a.replace("{" + (b - 1) + "}", arguments[b]); return a }; _log = function (a) { console.log(a) }; for (var e in console) _log[e] = console[e] instanceof Function ? function () { return console[this].apply(this, arguments) }.bind(e) : console[e]; _log.time = function (a) {
        var b = (new Date).getTime(); if (a) _log.timeStat[a] || (_log.timeStat[a] = { avg: void 0, iterations: [] }),
        _log.timeStat[a].lastStart = b; else throw "Advaced Logging Error: in console.time(key) parameter key is required";
    }; _log.timeEnd = function (a, b) {
        var c = (new Date).getTime(); if (a) if (_log.timeStat[a] && _log.timeStat[a].lastStart) {
            var c = c - _log.timeStat[a].lastStart, d = 0; delete _log.timeStat[a].lastStart; (void 0 === b || b) && _log.log(String.Format("{0} {1}", a, c)); _log.timeStat[a].iterations.push(c); for (var f = _log.timeStat[a].iterations.length - 1; 0 <= f; f--) {
                d += _log.timeStat[a].iterations[f];
                if (void 0 === _log.timeStat[a].min || c < _log.timeStat[a].min) _log.timeStat[a].min = c; if (void 0 === _log.timeStat[a].max || c > _log.timeStat[a].max) _log.timeStat[a].max = c
            } _log.timeStat[a].avg = Math.round(d / _log.timeStat[a].iterations.length); _log.timeStat[a].errMs = ((_log.timeStat[a].max - _log.timeStat[a].min) / 2).toFixed(2); _log.timeStat[a].errPer = (100 * ((_log.timeStat[a].max - _log.timeStat[a].min) / 2 / _log.timeStat[a].avg)).toFixed(2)
        } else throw String.Format('Advaced Logging Error: console.timeEnd("{0}") is not initialized with console.time("{0}")',
        a); else throw "Advaced Logging Error: in console.timeEnd(key) parameter key is required";
    }; _log.timeStat = function (a) {
        if (a) if (_log.timeStat[a]) console.groupCollapsed(String.Format("SUMMARY: {0}", a)), _log.log(String.Format("{0} interations: {1} [{2}]", a, _log.timeStat[a].iterations.length, _log.timeStat[a].iterations)), _log.log(String.Format("{0} min: {1} ms", a, _log.timeStat[a].min)), _log.log(String.Format("{0} max: {1} ms", a, _log.timeStat[a].max)), _log.log(String.Format("{0} average: {1} ms \u00b1 {2} ms ({3}%)",
        a, _log.timeStat[a].avg, _log.timeStat[a].errMs, _log.timeStat[a].errPer)), console.groupEnd(String.Format("SUMMARY: {0}", a)); else throw String.Format('Advaced Logging Error: there are no time report with key "{0}"', a); else throw "Advaced Logging Error: in console.timeStat(key) parameter key is required";
    }; _log.assert = function (a, b) { if (void 0 !== a && void 0 !== b) a || _log.error(b); else throw "Advaced Logging Error: in console.assert(exp,v) all parameters are required"; }; _log.error = function (a) {
        if (a) console.error(a),
        Firebug && $("#FirebugUI").contents().find(".logRow-error").each(function (a, c) { var d = function (a) { a = a.parents(".logGroup"); 0 < a.length && (a.addClass("opened"), d(a)) }; d($(c)) }); else throw "Advaced Logging Error: in console.error(v) parameter v is required";
    }; _log.warn = function (a) {
        if (a) console.warn(a), Firebug && $("#FirebugUI").contents().find(".logRow-error").each(function (a, c) { var d = function (a) { a = a.parents(".logGroup"); 0 < a.length && (a.addClass("opened"), d(a)) }; d($(c)) }); else throw "Advaced Logging Error: in console.warn(v) parameter v is required";
    }; _log.group = function (a) { if (a) console.group(String.Format("GROUP: {0}", a)); else throw "Advaced Logging Error: in console.group(v) parameter v is required"; }; _log.groupCollapsed = function (a) { if (a) console.groupCollapsed(String.Format("GROUP: {0}", a)); else throw "Advaced Logging Error: in console.groupCollapsed(v) parameter v is required"; }; _log.groupEnd = function (a) { if (a) console.groupEnd(String.Format("GROUP: {0}", a)); else throw "Advaced Logging Error: in console.groupEnd(v) parameter v is required"; }; _log.external =
    function (a, b, c) { if (a) console.groupCollapsed(String.Format("EXTERNAL: {0}", a)), _log.external[a].apply(c || window, b), console.groupEnd(String.Format("EXTERNAL: {0}", a)); else throw "Advaced Logging Error: in console.timeStat(key) parameter key is required"; }
})();
