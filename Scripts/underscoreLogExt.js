window['_' + 'log'].external({
    'I\'m external function' : function (p1, p2, p3) {
        _log(this);
        _log('We are the parameters: p1: ' + p1 + ', p2: ' + p2 + ', p3: ' + p3);
    },
    'external1': function () {
        //TODO
    },
    'external2': function () {
        //TODO
    }
});