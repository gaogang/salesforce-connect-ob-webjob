# salesforce-connect-ob-webjob

A simple javascript code which captures Salesforce data changes in a cosmos db. 

## dependencies

1. jsforce 

``` npm
npm install jsforce --save

```

## Key steps

1. Get Salesforce access token

```javascript
const sfconn = new jsforce.Connection({
    oauth2: {
        clientId: '<your client Id>',
        clientSecret: '<your client secret>',
        redirectUrl: '<your redirect url>'
    }
});

sfconn.login('<your SF username>', '<your SF password>', function(err, userInfo) {
    var token = sfconn.accessToken;
    ...
});
```

If you are just need the access token in a background process, the redirectUrl can be anything as long as it matches with what you set up in Salesforce.

2. Subscribe to CDC (capture data change) events
```javascript
sfconn.streaming.topic('/data/ChangeEvents').subscribe(function(message) {
    console.log(JSON.stringify(message));
});
```

