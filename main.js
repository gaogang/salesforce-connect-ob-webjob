(function() {
    require('cometd-nodejs-client').adapt();

    const lib = require('cometd');
    const jsforce = require('jsforce');
    const url = 'https://um1.lightning.force.com/cometd/48.0/';
    const channel = '/data/ChangeEvents';

    const cometd = new lib.CometD();
    
    const sfconn = new jsforce().Connection({
        oauth2: {
            clientId: '',
            clientSecret: '',
            redirectUrl: ''
        }
    });


    sfconn.login('username', 'password', function(err, userInfo) {
        cometd.configure({
            url: url,
            appendMessageTypeToURL: false,
            requestHeaders: {
                Authorization: 'OAuth ' + sfconn.sessionId
            }
        });

        cometd.handshake(function(h) {
            if (h.successful) {
                // subscribe to data changes
                cometd.subscribe(channel, function(message) {
                    const data = message.data;
    
                    console.log(data);
                });
            } else {
                console.log('fail to establish connection to ' + url + ' ' + h.error);
            }
        });
    });
})();