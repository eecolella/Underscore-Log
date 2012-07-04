/*!*************************************************************
 *
 *      Underscore Log 1.0.0
 * 
 *      Created by Ermes Enea Colella
 *      Released under CreativeCommons-Attribution-NonCommercial-ShareAlike license.
 *      More information: https://github.com/eeColella/Underscore-Log
 *  
 **************************************************************/

window['_' + 'log'] = (function ($) {

    var $uLog = $('<div id="uLog" class="child"><div></div></div>').on('click', function (e) {
        if (!$(e.target).is('a')) {
            ulog.toggle();
        }
    });
    window.asd = $uLog;
    var $ul = $('<ul></ul>').appendTo($uLog.children());
    var $gen = $('<li class="clearfix noborder"><div class="icon uLog"></div><div class="text uLog">Underscore Log</div></li>').appendTo($ul);
    var $error = $('<li><div class="counter error">0</div><div class="text error">Errors</div></li>').appendTo($ul);
    var $warn = $('<li><div class="counter warn">0</div><div class="text warn">Warnings</div></li>').appendTo($ul);
    var $update = $('<li class="hidden"><div class="icon update"></div><a href="https://github.com/eeColella/Underscore-Log" target="_blank">New version is available</a></li>').appendTo($ul);

    //Function.prototype.bind
    "undefined" === typeof Function.prototype.bind && (Function.prototype.bind = function (c) { for (var d = this, b = [], a = 1, e = arguments.length; a < e; a++) b.push(arguments[a]); return function () { return d.apply(c, b) } });
    //String.Format
    String.Format = function (a) { var b = arguments; return a.replace(/\{\d+?\}/g, function (a) { return b[+a.match(/\d/) + 1] }) };
    //String.prototype.format
    String.prototype.format = function () { var a = arguments; return this.replace(/\{\d+?\}/g, function (b) { return a[+b.match(/\d/)] }) };

    var ulog = function () {
        if (arguments.length > 0) {
            _console.log.apply(this, arguments);
            ulog.stackLog.push(['log', arguments]);
        } else {
            throw 'Underscore Log Error: in _' + 'log(v [,v, ...]) at least one parameter v is required';
        }
    };

    ulog.stackLog = [];

    ulog.log = function () {
        if (arguments.length > 0) {
            _console.log.apply(this, arguments);
            ulog.stackLog.push(['log', arguments]);
        } else {
            throw 'Underscore Log Error: in _' + 'log.log(v [,v, ...]) at least one parameter v is required';
        }
    }

    ulog.info = function () {
        if (arguments.length > 0) {
            _console.info.apply(this, arguments);
            ulog.stackLog.push(['info', arguments]);
        } else {
            throw 'Underscore Log Error: in _' + 'log.info(v [,v, ...]) at least one parameter v is required';
        }
    }

    ulog.error = function () {
        if (arguments.length > 0) {
            _console.error.apply(this, arguments);
            ulog.stackLog.push(['error', arguments]);
            var $errorRecap = $error.children('.counter');
            $errorRecap.text(+$errorRecap.text() + 1);
            //if you are using Firebug Lite expand all group container
            if (Firebug) {
                $('#FirebugUI').contents().find('.logRow-error').each(function (i, el) {
                    var fOpenParent = function ($el) {
                        var $parentGroup = $el.parents('.logGroup');
                        if ($parentGroup.length > 0) {
                            $parentGroup.addClass('opened');
                            fOpenParent($parentGroup);
                        }
                    };
                    fOpenParent($(el));
                });
            }
        } else {
            throw 'Underscore Log Error: in _' + 'log.error(v [,v, ...]) at least one parameter v is required';
        }
    };

    ulog.warn = function () {
        if (arguments.length > 0) {
            _console.warn.apply(this, arguments);
            ulog.stackLog.push(['warn', arguments]);
            var $warnRecap = $warn.children('.counter');
            $warnRecap.text(+$warnRecap.text() + 1);
            //if you are using Firebug Lite expand all group container
            if (Firebug) {
                $('#FirebugUI').contents().find('.logRow-error').each(function (i, el) {
                    var fOpenParent = function ($el) {
                        var $parentGroup = $el.parents('.logGroup');
                        if ($parentGroup.length > 0) {
                            $parentGroup.addClass('opened');
                            fOpenParent($parentGroup);
                        }
                    };
                    fOpenParent($(el));
                });
            }
        } else {
            throw 'Underscore Log Error: in _' + 'log.warn(v [,v, ...]) at least one parameter v is required';
        }
    };

    ulog.time = function (key) {
        var t = (new Date()).getTime();
        if (key) {
            if (!ulog.timeStats[key])
                ulog.timeStats[key] = { avg: undefined, iterations: [] };
            ulog.timeStats[key].lastStart = t;
        } else {
            throw 'Underscore Log Error: in _' + 'log.time(key) parameter key is required';
        }
    };

    ulog.timeEnd = function (key, opt_show) {
        var t = (new Date()).getTime();
        if (key) {
            if (ulog.timeStats[key] && ulog.timeStats[key].lastStart) {
                var gap = t - ulog.timeStats[key].lastStart,
                    sum = 0;

                delete ulog.timeStats[key].lastStart;

                //check whether log, default true
                if ((opt_show === undefined) ? true : opt_show)
                    ulog(String.Format('{0} {1}', key, gap));

                ulog.timeStats[key].iterations.push(gap);

                for (var i = ulog.timeStats[key].iterations.length - 1; i >= 0; i--) {
                    sum += ulog.timeStats[key].iterations[i];
                    if ((ulog.timeStats[key].min === undefined) || (gap < ulog.timeStats[key].min))
                        ulog.timeStats[key].min = gap;
                    if ((ulog.timeStats[key].max === undefined) || (gap > ulog.timeStats[key].max))
                        ulog.timeStats[key].max = gap;
                }
                ulog.timeStats[key].avg = Math.round(sum / ulog.timeStats[key].iterations.length);
                ulog.timeStats[key].errMs = ((ulog.timeStats[key].max - ulog.timeStats[key].min) / 2).toFixed(2);
                ulog.timeStats[key].errPer = ((ulog.timeStats[key].max - ulog.timeStats[key].min) / 2 / ulog.timeStats[key].avg * 100).toFixed(2);

            } else {
                throw String.Format('Underscore Log Error: _' + 'log.timeEnd("{0}") is not initialized with _' + 'log.time("{0}")', key);
            }
        } else {
            throw 'Underscore Log Error: in _' + 'log.timeEnd(key) parameter key is required';
        }
    };

    ulog.timeStats = function (key) {
        if (key) {
            if (ulog.timeStats[key]) {
                ulog.groupCollapsed(key, 'TIMER STAT');

                ulog(String.Format('interations: {0} [{1}]', ulog.timeStats[key].iterations.length, ulog.timeStats[key].iterations));
                ulog(String.Format('min: {0} ms', ulog.timeStats[key].min));
                ulog(String.Format('max: {0} ms', ulog.timeStats[key].max));
                ulog(String.Format('average: {0} ms ± {1} ms ({2}%)', ulog.timeStats[key].avg, ulog.timeStats[key].errMs, ulog.timeStats[key].errPer));

                ulog.groupEnd(key, 'TIMER STAT');
            } else {
                throw String.Format('Underscore Log Error: in _' + 'log.timeStats("{0}") there are no time reports with key "{0}"', key);
            }
        } else {
            throw 'Underscore Log Error: in _' + 'log.timeStats(key) parameter key is required';
        }
    };

    ulog.assert = function (exp, v) {

        if (v !== undefined) {
            if (!exp) {
                var args = [];
                for (var i = 1, length = arguments.length; i < length; i++) {
                    args.push(arguments[i]);
                }
                ulog.error.apply(this,args);
            }
        } else {
            throw 'Advaced Logging Error: in _' + 'log.assert(exp, v [,v, ...]) at least one parameter v is required';
        }
    };

    ulog.assertWarn = function (exp, v) {

        if (v !== undefined) {
            if (!exp) {
                var args = [];
                for (var i = 1, length = arguments.length; i < length; i++) {
                    args.push(arguments[i]);
                }
                ulog.warn.apply(this, args);
            }
        } else {
            throw 'Advaced Logging Error: in _' + 'log.assertWarn(exp,v) parameter v is required';
        }
    };

    ulog.group = function (v, opt_prefix) {
        if (v) {
            if (!opt_prefix) {
                _console.group(String.Format('GROUP: {0}', v));
                ulog.stackLog.push(['group', [v]]);
            } else {
                _console.group(String.Format('{0}: {1}', opt_prefix, v));
                ulog.stackLog.push(['group', [v, opt_prefix]]);
            }
        } else {
            throw 'Advaced Logging Error: in _' + 'log.group(v) parameter v is required';
        }
    };

    ulog.groupCollapsed = function (v, opt_prefix) {
        if (v) {
            if (!opt_prefix) {
                _console.groupCollapsed(String.Format('GROUP: {0}', v));
                ulog.stackLog.push(['groupCollapsed', [v]]);
            } else {
                _console.groupCollapsed(String.Format('{0}: {1}', opt_prefix, v));
                ulog.stackLog.push(['groupCollapsed', [v, opt_prefix]]);
            }
        } else {
            throw 'Advaced Logging Error: in _' + 'log.groupCollapsed(v) parameter v is required';
        }
    };

    ulog.groupEnd = function (v, opt_prefix) {
        if (v) {
            if (!opt_prefix) {
                _console.groupEnd(String.Format('GROUP: {0}', v));
                ulog.stackLog.push(['groupEnd', [v]]);
            } else {
                _console.groupEnd(String.Format('{0}: {1}', opt_prefix, v));
                ulog.stackLog.push(['groupEnd', [v, opt_prefix]]);
            }
        } else {
            throw 'Advaced Logging Error: in _' + 'log.groupEnd(v) parameter v is required';
        }
    };

    ulog.external = function (key, opt_args, opt_scope) {
        if (key) {
            if (typeof key === 'string') {
                ulog.groupCollapsed(key, 'EXTERNAL');
                ulog.external[key].apply(opt_scope || window, opt_args);
                ulog.groupEnd(key, 'EXTERNAL');
            } else {
                //key is the object that contains the external functions
                for (var prop in key) {
                    ulog.external[prop] = key[prop];
                }
            }
        } else {
            throw 'Advaced Logging Error: in _' + 'log.timeStat(key) parameter key is required';
        }
    };

    ulog.open = function () {
        var iFrameFb = document.getElementById('FirebugUI');
        if (iFrameFb && Firebug && Firebug.chrome) {
            if (document.getElementById('FirebugUI').className != 'opened') {
                Firebug.chrome.open(function () {
                    var currentStack = ulog.stackLog;
                    ulog.clear();
                    for (var i = 0, length = currentStack.length; i < length; i++)
                        ulog[currentStack[i][0]].apply(this, currentStack[i][1]);
                });
            }
        } else {
            //Firebug Lite is not loaded yet
            setTimeout(function () {
                ulog.open();
            }, 50);
        }
    };

    ulog.close = function () {
        var iFrameFb = document.getElementById('FirebugUI');
        if (iFrameFb && Firebug.chrome) {
            if (document.getElementById('FirebugUI').className == 'opened') {
                Firebug.chrome.close();
            }
        } else {
            //Firebug Lite is not loaded yet
            setTimeout(function () {
                ulog.close();
            }, 50);
        }
    };

    ulog.toggle = function () {
        var iFrameFb = document.getElementById('FirebugUI');
        if (iFrameFb) {
            if (document.getElementById('FirebugUI').className != 'opened') {
                Firebug.chrome.open(function () {
                    var currentStack = ulog.stackLog;
                    ulog.clear();
                    for (var i = 0, length = currentStack.length; i < length; i++)
                        ulog[currentStack[i][0]].apply(this, currentStack[i][1]);
                });
            }
            else {
                Firebug.chrome.close();
            }
        } else {
            //Firebug Lite is not loaded yet
            setTimeout(function () {
                ulog.close();
            }, 500);
        }
    };

    ulog.clear = function (v) {
        _console.clear();

        $warn.children('.counter').text(0);
        $error.children('.counter').text(0);

        ulog.stackLog = [];
    };

    $(function () {
        if ($('#eecBar').length)
            var $eecBar = $('<div id="eecBar"></div>');
        else
            var $eecBar = $('<div id="eecBar"></div>').appendTo($('body')).on('mouseenter', '.child', function () {
                $(this).stop().animate({
                    'margin-right': '-10px'
                }, 100);
            }).on('mouseleave', '.child', function () {
                $(this).stop().animate({
                    'margin-right': '-213px'
                }, 100);
            });

        $uLog.appendTo($eecBar);

        (function (currentVersion) {
            var headID = document.getElementsByTagName("head")[0];
            var ulogVer = document.createElement('script');
            ulogVer.type = 'text/javascript';
            ulogVer.src = 'https://raw.github.com/eeColella/Underscore-Log/master/Scripts/version.js';
            ulogVer.onload = function () {
                if (+currentVersion.replace('.', '') < +window['_' + 'log'].version.replace('.', '')) {
                    $update.removeClass('hidden');
                    $uLog.addClass('update');
                }
            };
            document.getElementsByTagName("head")[0].appendChild(ulogVer);
        })('1.0.0');
    });

    return ulog;

})(jQuery);