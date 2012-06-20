/*!*************************************************************
 *
 *      Underscore Log 0.2.0
 * 
 *      Created by Ermes Enea Colella
 *      Released under CreativeCommons-Attribution-NonCommercial-ShareAlike license.
 *      More information: https://github.com/eeColella/Underscore-Log
 *  
 **************************************************************/

(function ($) {

    var $uLog = $('<div id="uLog" class="child clearfix"></div>').on('click', function (e) {
        if (!$(e.target).is('a')) {
            _log.toggle();
        }
    });
    var $gen = $('<div class="general clearfix"><div class="icon uLog"></div><div class="label hidden">Underscore Log</div></div>').appendTo($uLog);
    var $error = $('<div class="error clearfix"><div class="icon text">0</div><div class="label hidden">Errors</div></div>').appendTo($uLog);
    var $warn = $('<div class="warn clearfix"><div class="icon text">0</div><div class="label hidden">Warnings</div></div>').appendTo($uLog);
    var $update = $('<div class="update clearfix hidden"><div class="icon update"></div><div class="label hidden"><a href="https://github.com/eeColella/Underscore-Log" target="_blank">New version is available</a></div></div>').appendTo($uLog);

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

    _log = function (v) {
        console.log(v);
        _log.stackLog.push(['log', [v]]);
    };

    // heritage by Firebug Lite
    //for (var prop in console) {
    //    if (console[prop] instanceof Function)
    //        _log[prop] = function () {
    //            return console[this].apply(this, arguments);
    //        }.bind(prop);
    //    else
    //        _log[prop] = console[prop];
    //}

    _log.stackLog = [];

    _log.log = function (v) {
        console.log(v);
        _log.stackLog.push(['log', [v]]);
    }

    _log.info = function (v) {
        console.info(v);
        _log.stackLog.push(['info', [v]]);
    }

    _log.error = function (v) {
        if (v) {
            console.error(v);
            _log.stackLog.push(['error', [v]]);
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
            throw 'Advaced Logging Error: in console.error(v) parameter v is required';
        }
    };

    _log.warn = function (v) {
        if (v) {
            console.warn(v);
            _log.stackLog.push(['warn', [v]]);
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
            throw 'Advaced Logging Error: in console.warn(v) parameter v is required';
        }
    };

    _log.time = function (key) {
        var t = (new Date()).getTime();
        if (key) {
            if (!_log.timeStats[key])
                _log.timeStats[key] = { avg: undefined, iterations: [] };
            _log.timeStats[key].lastStart = t;
        } else {
            throw 'Advaced Logging Error: in _log.time(key) parameter key is required';
        }
    };

    _log.timeEnd = function (key, opt_show) {
        var t = (new Date()).getTime();
        if (key) {
            if (_log.timeStats[key] && _log.timeStats[key].lastStart) {
                var gap = t - _log.timeStats[key].lastStart,
                    sum = 0;

                delete _log.timeStats[key].lastStart;

                //check whether log, default true
                if ((opt_show === undefined) ? true : opt_show)
                    _log.log(String.Format('{0} {1}', key, gap));

                _log.timeStats[key].iterations.push(gap);

                for (var i = _log.timeStats[key].iterations.length - 1; i >= 0; i--) {
                    sum += _log.timeStats[key].iterations[i];
                    if ((_log.timeStats[key].min === undefined) || (gap < _log.timeStats[key].min))
                        _log.timeStats[key].min = gap;
                    if ((_log.timeStats[key].max === undefined) || (gap > _log.timeStats[key].max))
                        _log.timeStats[key].max = gap;
                }
                _log.timeStats[key].avg = Math.round(sum / _log.timeStats[key].iterations.length);
                _log.timeStats[key].errMs = ((_log.timeStats[key].max - _log.timeStats[key].min) / 2).toFixed(2);
                _log.timeStats[key].errPer = ((_log.timeStats[key].max - _log.timeStats[key].min) / 2 / _log.timeStats[key].avg * 100).toFixed(2);

            } else {
                throw String.Format('Advaced Logging Error: _log.timeEnd("{0}") is not initialized with _log.time("{0}")', key);
            }
        } else {
            throw 'Advaced Logging Error: in _log.timeEnd(key) parameter key is required';
        }
    };

    _log.timeStats = function (key) {
        if (key) {
            if (_log.timeStats[key]) {
                _log.groupCollapsed(key, 'TIMER STAT');
                _log.stackLog.push(['groupCollapsed', [key]]);

                _log.log(String.Format('interations: {0} [{1}]', _log.timeStats[key].iterations.length, _log.timeStats[key].iterations));
                _log.log(String.Format('min: {0} ms', _log.timeStats[key].min));
                _log.log(String.Format('max: {0} ms', _log.timeStats[key].max));
                _log.log(String.Format('average: {0} ms ± {1} ms ({2}%)', _log.timeStats[key].avg, _log.timeStats[key].errMs, _log.timeStats[key].errPer));

                _log.groupEnd(key, 'TIMER STAT');
                _log.stackLog.push(['groupEnd', [key]]);
            } else {
                throw String.Format('Advaced Logging Error: there are no time reports with key "{0}"', key);
            }
        } else {
            throw 'Advaced Logging Error: in _log.timeStat(key) parameter key is required';
        }
    };

    _log.assert = function (exp, v, opt_mode) {

        if ((exp !== undefined) && (v !== undefined)) {
            if (!exp) {
                if (opt_mode == 'warn')
                    _log.warn(v);
                else
                    _log.error(v);
            }
        } else {
            throw 'Advaced Logging Error: in _log.assert(exp,v) all parameters are required';
        }
    };

    _log.group = function (v, opt_prefix) {
        if (v) {
            if (!opt_prefix) {
                console.group(String.Format('GROUP: {0}', v));
                _log.stackLog.push(['group', [v]]);
            } else {
                console.group(String.Format('{0}: {1}', opt_prefix, v));
                _log.stackLog.push(['group', [v, opt_prefix]]);
            }
        } else {
            throw 'Advaced Logging Error: in _log.group(v) parameter v is required';
        }
    };

    _log.groupCollapsed = function (v, opt_prefix) {
        if (v) {
            if (!opt_prefix) {
                console.groupCollapsed(String.Format('GROUP: {0}', v));
                _log.stackLog.push(['groupCollapsed', [v]]);
            } else {
                console.groupCollapsed(String.Format('{0}: {1}', opt_prefix, v));
                _log.stackLog.push(['groupCollapsed', [v, opt_prefix]]);
            }
        } else {
            throw 'Advaced Logging Error: in _log.groupCollapsed(v) parameter v is required';
        }
    };

    _log.groupEnd = function (v, opt_prefix) {
        if (v) {
            if (!opt_prefix) {
                console.groupEnd(String.Format('GROUP: {0}', v));
                _log.stackLog.push(['groupEnd', [v]]);
            } else {
                console.groupEnd(String.Format('{0}: {1}', opt_prefix, v));
                _log.stackLog.push(['groupEnd', [v, opt_prefix]]);
            }
        } else {
            throw 'Advaced Logging Error: in _log.groupEnd(v) parameter v is required';
        }
    };

    _log.external = function (key, opt_args, opt_scope) {
        if (key) {
            _log.groupCollapsed(key, 'EXTERNAL');
            _log.stackLog.push(['groupCollapsed', [key]]);

            _log.external[key].apply(opt_scope || window, opt_args);

            _log.groupEnd(key, 'EXTERNAL');
            _log.stackLog.push(['groupEnd', [key]]);
        } else {
            throw 'Advaced Logging Error: in _log.timeStat(key) parameter key is required';
        }
    };

    _log.open = function () {
        var iFrameFb = document.getElementById('FirebugUI');
        if ((iFrameFb.style.visibility == 'hidden') || (document.getElementById('FirebugUI').getAttribute('allowtransparency') == 'true')) {
            Firebug.chrome.open(function () {
                var currentStack = _log.stackLog;
                _log.clear();
                for (var i = 0, length = currentStack.length; i < length; i++)
                    _log[currentStack[i][0]].apply(this, currentStack[i][1]);
            });
        }
    };

    _log.close = function () {
        var iFrameFb = document.getElementById('FirebugUI');
        if ((iFrameFb.style.visibility == 'hidden') || (document.getElementById('FirebugUI').getAttribute('allowtransparency') == 'true')) {
        }
        else {
            Firebug.chrome.close();
        }
    };

    _log.toggle = function () {
        var iFrameFb = document.getElementById('FirebugUI');
        if ((iFrameFb.style.visibility == 'hidden') || (document.getElementById('FirebugUI').getAttribute('allowtransparency') == 'true')) {
            Firebug.chrome.open(function () {
                var currentStack = _log.stackLog;
                _log.clear();
                for (var i = 0, length = currentStack.length; i < length; i++)
                    _log[currentStack[i][0]].apply(this, currentStack[i][1]);
            });
        }
        else {
            Firebug.chrome.close();
        }
    };

    _log.clear = function (v) {
        console.clear();

        var $warnRecap = $warn.children('.icon.text');
        $warnRecap.text(0);

        var $errorRecap = $error.children('.icon.text');
        $errorRecap.text(0);

        _log.stackLog = [];
    };

    $(function () {
        if ($('#eecBar').length) {
            var $eecBar = $('<div id="eecBar"></div>');
        }
        else {
            var $eecBar = $('<div id="eecBar"></div>').appendTo($('body')).on('mouseenter', '.child', function () {
                var $this = $(this);
                $this.stop().animate({
                    'width': '230px'
                }, 150, 'linear', function () {
                    $this.find('.label').css('opacity', 0).removeClass('hidden').animate({
                        'opacity': 1
                    }, 300, 'linear');
                });
            }).on('mouseleave', '.child', function () {
                var $this = $(this);
                $this.find('.label').addClass('hidden');
                $this.stop().animate({
                    'width': '26px'
                }, 100, 'linear');
            });
        }

        $uLog.appendTo($eecBar);

        (function (currentVersion) {
            var headID = document.getElementsByTagName("head")[0];
            var _logVer = document.createElement('script');
            _logVer.type = 'text/javascript';
            _logVer.src = 'https://raw.github.com/eeColella/Underscore-Log/master/Scripts/version.js';
            _logVer.onload = function () {
                if (+currentVersion.replace('.', '') < +_log.version.replace('.', ''))
                    $update.removeClass('hidden');
            };
            document.getElementsByTagName("head")[0].appendChild(_logVer);
        })('0.2.0');
    });


})(jQuery);