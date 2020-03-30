(function() {
    var jsforce = require('jsforce');

    const url = 'https://um1.lightning.force.com/cometd/48.0/';
    const channel = '/data/ChangeEvents';

    console.log('Setting up jsforce...');

    const sfconn = new jsforce.Connection({
        oauth2: {
            clientId: '<your client Id>',
            clientSecret: '<your client secret>',
            redirectUrl: '<your redirect url>'
        }
    });

    console.log('Acquiring SF session Id...');

    sfconn.login('<your SF username>', '<your SF password>', function(err, userInfo) {
        console.log('SF session id acquired: ' + sfconn.accessToken);
        sfconn.streaming.topic(channel).subscribe(function(message) {
            console.log(JSON.stringify(message));
        });
    });
})();