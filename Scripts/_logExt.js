
_log.external['I\'m external function'] = function (p1, p2, p3) {
    _log(this);
    _log('p1: ' + p1 + ', p2: ' + p2 + ', p3: ' + p3);
};