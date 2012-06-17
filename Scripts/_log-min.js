(function (b) {
    Function.prototype.bind = function (a) { var d = this; return function () { return d.apply(a, arguments) } }; String.Format = function (a) { for (var d = 0, c = arguments.length; d < c; d++) a = a.replace("{" + (d - 1) + "}", arguments[d]); return a }; _log = function (a) { console.log(a) }; for (var f in console) _log[f] = console[f] instanceof Function ? function () { return console[this].apply(this, arguments) }.bind(f) : console[f]; _log.time = function (a) {
        var d = (new Date).getTime(); if (a) _log.timeStat[a] || (_log.timeStat[a] = { avg: void 0, iterations: [] }),
        _log.timeStat[a].lastStart = d; else throw "Advaced Logging Error: in console.time(key) parameter key is required";
    }; _log.timeEnd = function (a, d) {
        var c = (new Date).getTime(); if (a) if (_log.timeStat[a] && _log.timeStat[a].lastStart) {
            var c = c - _log.timeStat[a].lastStart, b = 0; delete _log.timeStat[a].lastStart; (void 0 === d || d) && _log.log(String.Format("{0} {1}", a, c)); _log.timeStat[a].iterations.push(c); for (var g = _log.timeStat[a].iterations.length - 1; 0 <= g; g--) {
                b += _log.timeStat[a].iterations[g]; if (void 0 === _log.timeStat[a].min ||
                c < _log.timeStat[a].min) _log.timeStat[a].min = c; if (void 0 === _log.timeStat[a].max || c > _log.timeStat[a].max) _log.timeStat[a].max = c
            } _log.timeStat[a].avg = Math.round(b / _log.timeStat[a].iterations.length); _log.timeStat[a].errMs = ((_log.timeStat[a].max - _log.timeStat[a].min) / 2).toFixed(2); _log.timeStat[a].errPer = (100 * ((_log.timeStat[a].max - _log.timeStat[a].min) / 2 / _log.timeStat[a].avg)).toFixed(2)
        } else throw String.Format('Advaced Logging Error: console.timeEnd("{0}") is not initialized with console.time("{0}")',
        a); else throw "Advaced Logging Error: in console.timeEnd(key) parameter key is required";
    }; _log.timeStat = function (a) {
        if (a) if (_log.timeStat[a]) console.groupCollapsed(String.Format("TIMER STAT: {0}", a)), _log.log(String.Format("interations: {0} [{1}]", _log.timeStat[a].iterations.length, _log.timeStat[a].iterations)), _log.log(String.Format("min: {0} ms", _log.timeStat[a].min)), _log.log(String.Format("max: {0} ms", _log.timeStat[a].max)), _log.log(String.Format("average: {0} ms \u00b1 {1} ms ({2}%)", _log.timeStat[a].avg,
        _log.timeStat[a].errMs, _log.timeStat[a].errPer)), console.groupEnd(String.Format("TIMER STAT: {0}", a)); else throw String.Format('Advaced Logging Error: there are no time report with key "{0}"', a); else throw "Advaced Logging Error: in console.timeStat(key) parameter key is required";
    }; _log.assert = function (a, d, b) { if (void 0 !== a && void 0 !== d) a || ("warn" == b ? _log.warn(d) : _log.error(d)); else throw "Advaced Logging Error: in console.assert(exp,v) all parameters are required"; }; _log.error = function (a) {
        if (a) console.error(a),
        a = b("#uLog .error .icon.text"), a.text(+a.text() + 1), Firebug && b("#FirebugUI").contents().find(".logRow-error").each(function (a, c) { var e = function (a) { a = a.parents(".logGroup"); 0 < a.length && (a.addClass("opened"), e(a)) }; e(b(c)) }); else throw "Advaced Logging Error: in console.error(v) parameter v is required";
    }; _log.warn = function (a) {
        if (a) console.warn(a), a = b("#uLog .warn .icon.text"), a.text(+a.text() + 1), Firebug && b("#FirebugUI").contents().find(".logRow-error").each(function (a, c) {
            var e = function (a) {
                a = a.parents(".logGroup");
                0 < a.length && (a.addClass("opened"), e(a))
            }; e(b(c))
        }); else throw "Advaced Logging Error: in console.warn(v) parameter v is required";
    }; _log.group = function (a) { if (a) console.group(String.Format("GROUP: {0}", a)); else throw "Advaced Logging Error: in console.group(v) parameter v is required"; }; _log.groupCollapsed = function (a) { if (a) console.groupCollapsed(String.Format("GROUP: {0}", a)); else throw "Advaced Logging Error: in console.groupCollapsed(v) parameter v is required"; }; _log.groupEnd = function (a) {
        if (a) console.groupEnd(String.Format("GROUP: {0}",
        a)); else throw "Advaced Logging Error: in console.groupEnd(v) parameter v is required";
    }; _log.external = function (a, b, c) { if (a) console.groupCollapsed(String.Format("EXTERNAL: {0}", a)), _log.external[a].apply(c || window, b), console.groupEnd(String.Format("EXTERNAL: {0}", a)); else throw "Advaced Logging Error: in console.timeStat(key) parameter key is required"; }; b(function () {
        var a = b("#eecBar").length ? b('<div id="eecBar"></div>') : b('<div id="eecBar"></div>').appendTo(b("body")).on("mouseenter", ".child", function () {
            var a =
            b(this); a.stop().animate({ width: "226px" }, 150, "linear", function () { a.find(".info").css("opacity", 0).removeClass("hidden").animate({ opacity: 1 }, 300, "linear") })
        }).on("mouseleave", ".child", function () { var a = b(this); a.find(".info").addClass("hidden"); a.stop().animate({ width: "26px" }, 100, "linear") }), a = b('<div id="uLog" class="child clearfix"></div>').appendTo(a).on("click", function () { Firebug.chrome.open() }); b('<div class="general clearfix"><img class="icon" src="_log.png"><div class="info hidden">Underscore Log</div></div>').appendTo(a);
        b('<div class="error clearfix"><div class="icon text">0</div><div class="info hidden">Errors</div></div>').appendTo(a); b('<div class="warn clearfix"><div class="icon text">0</div><div class="info hidden">Warnings</div></div>').appendTo(a)
    })
})(jQuery);
