(function (c) {
    var e = c('<div id="uLog" class="child clearfix"></div>').on("click", function (a) { c(a.target).is("a") || (a = c("#FirebugUI"), "hidden" == a[0].style.visibility || "true" == a.attr("allowtransparency") ? Firebug.chrome.open() : Firebug.chrome.close()) }); c('<div class="general clearfix"><img class="icon" src="Styles/_log.png"><div class="info hidden">Underscore Log</div></div>').appendTo(e); var h = c('<div class="error clearfix"><div class="icon text">0</div><div class="info hidden">Errors</div></div>').appendTo(e),
    i = c('<div class="warn clearfix"><div class="icon text">0</div><div class="info hidden">Warnings</div></div>').appendTo(e), j = c('<div class="update clearfix hidden"><img class="icon" src="Styles/download.png"><div class="info hidden"><a href="https://github.com/eeColella/Underscore-Log" target="_blank">New version is available</a></div></div>').appendTo(e); Function.prototype.bind = function (a) { var d = this; return function () { return d.apply(a, arguments) } }; String.Format = function (a) {
        for (var d = 0, b = arguments.length; d <
        b; d++) a = a.replace("{" + (d - 1) + "}", arguments[d]); return a
    }; _log = function (a) { console.log(a) }; for (var f in console) _log[f] = console[f] instanceof Function ? function () { return console[this].apply(this, arguments) }.bind(f) : console[f]; _log.time = function (a) { var d = (new Date).getTime(); if (a) _log.timeStat[a] || (_log.timeStat[a] = { avg: void 0, iterations: [] }), _log.timeStat[a].lastStart = d; else throw "Advaced Logging Error: in console.time(key) parameter key is required"; }; _log.timeEnd = function (a, d) {
        var b = (new Date).getTime();
        if (a) if (_log.timeStat[a] && _log.timeStat[a].lastStart) {
            var b = b - _log.timeStat[a].lastStart, c = 0; delete _log.timeStat[a].lastStart; (void 0 === d || d) && _log.log(String.Format("{0} {1}", a, b)); _log.timeStat[a].iterations.push(b); for (var g = _log.timeStat[a].iterations.length - 1; 0 <= g; g--) { c += _log.timeStat[a].iterations[g]; if (void 0 === _log.timeStat[a].min || b < _log.timeStat[a].min) _log.timeStat[a].min = b; if (void 0 === _log.timeStat[a].max || b > _log.timeStat[a].max) _log.timeStat[a].max = b } _log.timeStat[a].avg = Math.round(c /
            _log.timeStat[a].iterations.length); _log.timeStat[a].errMs = ((_log.timeStat[a].max - _log.timeStat[a].min) / 2).toFixed(2); _log.timeStat[a].errPer = (100 * ((_log.timeStat[a].max - _log.timeStat[a].min) / 2 / _log.timeStat[a].avg)).toFixed(2)
        } else throw String.Format('Advaced Logging Error: console.timeEnd("{0}") is not initialized with console.time("{0}")', a); else throw "Advaced Logging Error: in console.timeEnd(key) parameter key is required";
    }; _log.timeStat = function (a) {
        if (a) if (_log.timeStat[a]) console.groupCollapsed(String.Format("TIMER STAT: {0}",
        a)), _log.log(String.Format("interations: {0} [{1}]", _log.timeStat[a].iterations.length, _log.timeStat[a].iterations)), _log.log(String.Format("min: {0} ms", _log.timeStat[a].min)), _log.log(String.Format("max: {0} ms", _log.timeStat[a].max)), _log.log(String.Format("average: {0} ms \u00b1 {1} ms ({2}%)", _log.timeStat[a].avg, _log.timeStat[a].errMs, _log.timeStat[a].errPer)), console.groupEnd(String.Format("TIMER STAT: {0}", a)); else throw String.Format('Advaced Logging Error: there are no time report with key "{0}"',
        a); else throw "Advaced Logging Error: in console.timeStat(key) parameter key is required";
    }; _log.assert = function (a, d, b) { if (void 0 !== a && void 0 !== d) a || ("warn" == b ? _log.warn(d) : _log.error(d)); else throw "Advaced Logging Error: in console.assert(exp,v) all parameters are required"; }; _log.error = function (a) {
        if (a) console.error(a), a = h.children(".icon.text"), a.text(+a.text() + 1), Firebug && c("#FirebugUI").contents().find(".logRow-error").each(function (a, b) {
            var e = function (a) {
                a = a.parents(".logGroup"); 0 < a.length &&
                (a.addClass("opened"), e(a))
            }; e(c(b))
        }); else throw "Advaced Logging Error: in console.error(v) parameter v is required";
    }; _log.warn = function (a) { if (a) console.warn(a), a = i.children(".icon.text"), a.text(+a.text() + 1), Firebug && c("#FirebugUI").contents().find(".logRow-error").each(function (a, b) { var e = function (a) { a = a.parents(".logGroup"); 0 < a.length && (a.addClass("opened"), e(a)) }; e(c(b)) }); else throw "Advaced Logging Error: in console.warn(v) parameter v is required"; }; _log.group = function (a) {
        if (a) console.group(String.Format("GROUP: {0}",
        a)); else throw "Advaced Logging Error: in console.group(v) parameter v is required";
    }; _log.groupCollapsed = function (a) { if (a) console.groupCollapsed(String.Format("GROUP: {0}", a)); else throw "Advaced Logging Error: in console.groupCollapsed(v) parameter v is required"; }; _log.groupEnd = function (a) { if (a) console.groupEnd(String.Format("GROUP: {0}", a)); else throw "Advaced Logging Error: in console.groupEnd(v) parameter v is required"; }; _log.external = function (a, d, b) {
        if (a) console.groupCollapsed(String.Format("EXTERNAL: {0}",
        a)), _log.external[a].apply(b || window, d), console.groupEnd(String.Format("EXTERNAL: {0}", a)); else throw "Advaced Logging Error: in console.timeStat(key) parameter key is required";
    }; c(function () {
        var a = c("#eecBar").length ? c('<div id="eecBar"></div>') : c('<div id="eecBar"></div>').appendTo(c("body")).on("mouseenter", ".child", function () { var a = c(this); a.stop().animate({ width: "230px" }, 150, "linear", function () { a.find(".info").css("opacity", 0).removeClass("hidden").animate({ opacity: 1 }, 300, "linear") }) }).on("mouseleave",
        ".child", function () { var a = c(this); a.find(".info").addClass("hidden"); a.stop().animate({ width: "26px" }, 100, "linear") }); e.appendTo(a); (function (a) { document.getElementsByTagName("head"); var b = document.createElement("script"); b.type = "text/javascript"; b.src = "https://raw.github.com/eeColella/Underscore-Log/master/Scripts/version.js"; b.onload = function () { +a.replace(".", "") < +_log.version.replace(".", "") && j.removeClass("hidden") }; document.getElementsByTagName("head")[0].appendChild(b) })("0.9.0")
    })
})(jQuery);
