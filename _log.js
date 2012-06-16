
(function ($) {

    var $uLog = $('<div id="uLog" class="child clearfix"></div>').on('click', function () {
        Firebug.chrome.open();
    });
    var $gen = $('<div class="general clearfix"><img class="icon" src="_log.png"><div class="info hidden">Underscore Log</div></div>').appendTo($uLog);
    var $error = $('<div class="error clearfix"><div class="icon text">0</div><div class="info hidden">Errors</div></div>').appendTo($uLog);
    var $warn = $('<div class="warn clearfix"><div class="icon text">0</div><div class="info hidden">Warnings</div></div>').appendTo($uLog);

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
    };

    for (var prop in console) {
        if (console[prop] instanceof Function)
            _log[prop] = function () {
                return console[this].apply(this, arguments);
            }.bind(prop);
        else
            _log[prop] = console[prop];
    }

    _log.time = function (key) {
        var t = (new Date()).getTime();
        if (key) {
            if (!_log.timeStat[key])
                _log.timeStat[key] = { avg: undefined, iterations: [] };
            _log.timeStat[key].lastStart = t;
        } else {
            throw 'Advaced Logging Error: in console.time(key) parameter key is required';
        }
    };

    _log.timeEnd = function (key, opt_display) {
        var t = (new Date()).getTime();
        if (key) {
            if (_log.timeStat[key] && _log.timeStat[key].lastStart) {
                var gap = t - _log.timeStat[key].lastStart,
                    sum = 0;

                delete _log.timeStat[key].lastStart;

                //check whether log, default true
                if ((opt_display === undefined) ? true : opt_display)
                    _log.log(String.Format('{0} {1}', key, gap));

                _log.timeStat[key].iterations.push(gap);

                for (var i = _log.timeStat[key].iterations.length - 1; i >= 0; i--) {
                    sum += _log.timeStat[key].iterations[i];
                    if ((_log.timeStat[key].min === undefined) || (gap < _log.timeStat[key].min))
                        _log.timeStat[key].min = gap;
                    if ((_log.timeStat[key].max === undefined) || (gap > _log.timeStat[key].max))
                        _log.timeStat[key].max = gap;
                }
                _log.timeStat[key].avg = Math.round(sum / _log.timeStat[key].iterations.length);
                _log.timeStat[key].errMs = ((_log.timeStat[key].max - _log.timeStat[key].min) / 2).toFixed(2);
                _log.timeStat[key].errPer = ((_log.timeStat[key].max - _log.timeStat[key].min) / 2 / _log.timeStat[key].avg * 100).toFixed(2);

            } else {
                throw String.Format('Advaced Logging Error: console.timeEnd("{0}") is not initialized with console.time("{0}")', key);
            }
        } else {
            throw 'Advaced Logging Error: in console.timeEnd(key) parameter key is required';
        }
    };

    _log.timeStat = function (key) {
        if (key) {
            if (_log.timeStat[key]) {
                console.groupCollapsed(String.Format('TIMER STAT: {0}', key));
                _log.log(String.Format('interations: {0} [{1}]', _log.timeStat[key].iterations.length, _log.timeStat[key].iterations));
                _log.log(String.Format('min: {0} ms', _log.timeStat[key].min));
                _log.log(String.Format('max: {0} ms', _log.timeStat[key].max));
                _log.log(String.Format('average: {0} ms ± {1} ms ({2}%)', _log.timeStat[key].avg, _log.timeStat[key].errMs, _log.timeStat[key].errPer));
                console.groupEnd(String.Format('TIMER STAT: {0}', key));
            } else {
                throw String.Format('Advaced Logging Error: there are no time report with key "{0}"', key);
            }
        } else {
            throw 'Advaced Logging Error: in console.timeStat(key) parameter key is required';
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
            throw 'Advaced Logging Error: in console.assert(exp,v) all parameters are required';
        }
    };

    _log.error = function (v) {
        if (v) {
            console.error(v);
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

    _log.group = function (v) {
        if (v) {
            console.group(String.Format('GROUP: {0}', v));
        } else {
            throw 'Advaced Logging Error: in console.group(v) parameter v is required';
        }
    };

    _log.groupCollapsed = function (v) {
        if (v) {
            console.groupCollapsed(String.Format('GROUP: {0}', v));
        } else {
            throw 'Advaced Logging Error: in console.groupCollapsed(v) parameter v is required';
        }
    };

    _log.groupEnd = function (v) {
        if (v) {
            console.groupEnd(String.Format('GROUP: {0}', v));
        } else {
            throw 'Advaced Logging Error: in console.groupEnd(v) parameter v is required';
        }
    };

    _log.external = function (key, args, scope) {
        if (key) {
            console.groupCollapsed(String.Format('EXTERNAL: {0}', key));
            _log.external[key].apply(scope || window, args);
            console.groupEnd(String.Format('EXTERNAL: {0}', key));
        } else {
            throw 'Advaced Logging Error: in console.timeStat(key) parameter key is required';
        }
    };

    $(function () {
        if ($('#eecBar').length) {
            var $eecBar = $('<div id="eecBar"></div>');
        }
        else {
            var $eecBar = $('<div id="eecBar"></div>').appendTo($('body')).on('mouseenter', '.child', function () {
                var $this = $(this);
                $this.stop().animate({
                    'width': '226px'
                }, 150, 'linear', function () {
                    $this.find('.info').css('opacity', 0).removeClass('hidden').animate({
                        'opacity': 1
                    }, 300, 'linear');
                });
            }).on('mouseleave', '.child', function () {
                var $this = $(this);
                $this.find('.info').addClass('hidden');
                $this.stop().animate({
                    'width': '26px'
                }, 100, 'linear');
            });
        }

        $uLog.appendTo($eecBar);
        
    });

})(jQuery);