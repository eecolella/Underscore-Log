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

    var $uLog = $('<div id="uLog" class="child clearfix"></div>').on('click', function (e) {
        if (!$(e.target).is('a')) {
            ulog.toggle();
        }
    });
    var $gen = $('<div class="general clearfix"><div class="icon uLog"></div><div class="label">Underscore Log</div></div>').appendTo($uLog);
    var $error = $('<div class="error clearfix"><div class="icon text">0</div><div class="label">Errors</div></div>').appendTo($uLog);
    var $warn = $('<div class="warn clearfix"><div class="icon text">0</div><div class="label">Warnings</div></div>').appendTo($uLog);
    var $update = $('<div class="update clearfix hidden"><div class="icon update"></div><div class="label"><a href="https://github.com/eeColella/Underscore-Log" target="_blank">New version is available</a></div></div>').appendTo($uLog);

    //Function.prototype.bind
    "undefined" === typeof Function.prototype.bind && (Function.prototype.bind = function (c) { for (var d = this, b = [], a = 1, e = arguments.length; a < e; a++) b.push(arguments[a]); return function () { return d.apply(c, b) } });
    //String.Format
    String.Format = function (a) { var b = arguments; return a.replace(/\{\d+?\}/g, function (a) { return b[+a.match(/\d/) + 1] }) };
    //String.prototype.format
    String.prototype.format = function () { var a = arguments; return this.replace(/\{\d+?\}/g, function (b) { return a[+b.match(/\d/)] }) };

    var ulog = function (v) {
        _console.log(v);
        ulog.stackLog.push(['log', [v]]);
    };

    ulog.stackLog = [];

    ulog.log = function (v) {
        _console.log(v);
        ulog.stackLog.push(['log', [v]]);
    }

    ulog.info = function (v) {
        if (v) {
            _console.info(v);
            ulog.stackLog.push(['info', [v]]);
        } else {
            throw 'Underscore Log Error: in _' + 'log.info(v) parameter v is required';
        }
    }

    ulog.error = function (v) {
        if (v) {
            _console.error(v);
            ulog.stackLog.push(['error', [v]]);
            var $errorRecap = $error.children('.icon.text');
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
            throw 'Underscore Log Error: in _' + 'log.error(v) parameter v is required';
        }
    };

    ulog.warn = function (v) {
        if (v) {
            _console.warn(v);
            ulog.stackLog.push(['warn', [v]]);
            var $warnRecap = $warn.children('.icon.text');
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
            throw 'Underscore Log Error: in _' + 'log.warn(v) parameter v is required';
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
                    ulog.log(String.Format('{0} {1}', key, gap));

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

                ulog.log(String.Format('interations: {0} [{1}]', ulog.timeStats[key].iterations.length, ulog.timeStats[key].iterations));
                ulog.log(String.Format('min: {0} ms', ulog.timeStats[key].min));
                ulog.log(String.Format('max: {0} ms', ulog.timeStats[key].max));
                ulog.log(String.Format('average: {0} ms ± {1} ms ({2}%)', ulog.timeStats[key].avg, ulog.timeStats[key].errMs, ulog.timeStats[key].errPer));

                ulog.groupEnd(key, 'TIMER STAT');
            } else {
                throw String.Format('Underscore Log Error: in _' + 'log.timeStats("{0}") there are no time reports with key "{0}"', key);
            }
        } else {
            throw 'Underscore Log Error: in _' + 'log.timeStats(key) parameter key is required';
        }
    };

    ulog.assert = function (exp, v, opt_mode) {

        if ((exp !== undefined) && (v !== undefined)) {
            if (!exp) {
                if (opt_mode == 'warn')
                    ulog.warn(v);
                else
                    ulog.error(v);
            }
        } else {
            throw 'Advaced Logging Error: in _' + 'log.assert(exp,v) all parameters are required';
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
        if (iFrameFb) {
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
            }, 500);
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
            }, 500);
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

        var $warnRecap = $warn.children('.icon.text');
        $warnRecap.text(0);

        var $errorRecap = $error.children('.icon.text');
        $errorRecap.text(0);

        ulog.stackLog = [];
    };

    $(function () {
        if ($('#eecBar').length) {
            var $eecBar = $('<div id="eecBar"></div>');
        }
        else {
            var $eecBar = $('<div id="eecBar"></div>').appendTo($('body')).on('mouseenter', '.child', function () {
                var $this = $(this);
                $this.stop().animate({
                    'margin-right': '0px'
                }, 204, 'linear');
            }).on('mouseleave', '.child', function () {
                var $this = $(this);
                $this.stop().animate({
                    'margin-right': '-197px'
                }, 100, 'linear');
            });
        }

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