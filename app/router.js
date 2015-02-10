define(function(require, exports, module) {
    "use strict";

    // External dependencies.
    var Backbone = require('backbone');
    var simpleStorage = require('simpleStorage');
    var SignInView = require('./views/SignIn');
    var DeviceView = require('./views/DeviceView');
    var DeviceListView = require('./views/DeviceListView');
    var SingleFriendView = require('./views/SingleFriendView');
    var FriendsView = require('./views/FriendsView');
    var UserModel = require('./models/User');

    // Defining the application router.
    var Router = Backbone.Router.extend({
        routes: {
            '': 'index',
            'friends': 'friendsAction',
            'friends/:id': 'friendsAction',
            'devices': 'devicesAction',
            'devices/:id': 'devicesAction'
        },

        friendsAction: function(id) {
            var view = id ? new SingleFriendView({ friendId: id }) : new FriendsView({ router: this, user: this.user });

            view.loadDependencies();
        },

        execute: function(callback, args) {
            if (!this.user) {
                this.setup(callback, args);
                return;
            }
            if (callback) {
                callback.apply(this, args);
            }
        },

        setup: function(callback, args) {
            if (!this.user) {
                if (this.getQueryVariable('code')) {
                    this.exchangeAuthCode(callback, args);
                    return;
                }
                // get localStorage mongoId
                var noQuarterId = simpleStorage.get('no_quarter_id');

                if (!noQuarterId) {
                    this.getAuthCode();
                    return;
                }

                this.user = new UserModel({ id: noQuarterId });

                this.listenToOnce(this.user, 'sync', function() {
                    callback.apply(this, args);
                }.bind(this));

                this.user.fetch();
            } else {
                callback.apply(this, args);
            }
        },

        exchangeAuthCode: function(callback, args) {
            $.ajax({
                type: 'POST',
                url: 'http://localhost:3000/me',
                data: {
                    code: this.getQueryVariable('code')
                },
                success: function(res) {
                    this.navigate('/ah');
                    this.navigate('/');
                    res = JSON.parse(res);
                    simpleStorage.set('no_quarter_id', res._id);
                    this.user = new UserModel(res, { parse: true });
                    callback.apply(this, args);
                }.bind(this)
            });
        },

        getAuthCode: function() {
            var url = 'https://api.venmo.com/v1/oauth/authorize?client_id=2026&redirect_uri=http://localhost:8000/&scope=access_friends%20make_payments%20access_profile%20access_email%20access_phone%20access_balance&response_type=code';
            window.location.href = url;
        },

        getQueryVariable: function(variable) {
            var query = window.location.search.substring(1);
            var vars = query.split('&');
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split('=');
                if (decodeURIComponent(pair[0]) == variable) {
                    return decodeURIComponent(pair[1]);
                }
            }
        },

        index: function() {
            var view = new SignInView({ router: this, user: this.user });
            view.render();
        },

        devicesAction: function(id) {
            var options = {
                router: this,
                user: this.user,
                deviceId: id
            };
            var ViewConstructor = id ? DeviceView : DeviceListView;
            var view = new ViewConstructor(options);
            view.loadDependencies();
        }
    });

  module.exports = Router;

});
