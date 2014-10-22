define(function(require, exports, module) {
    "use strict";

    // External dependencies.
    var Backbone = require('backbone');
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
            this.accessToken = this.accessToken || this.getQueryVariable('access_token');
            if (!this.accessToken) {
                this.login();
                return;
            }
            if (callback) {
                this.setup(callback, args);
            }
        },

        setup: function(callback, args) {
            if (!this.user) {
                this.user = new UserModel({ accessToken: this.accessToken });

                this.listenToOnce(this.user, 'sync', function() {
                    callback.apply(this, args);
                }.bind(this));

                this.listenToOnce(this.user, 'error', this.login);
                this.user.fetch();
            } else {
                callback.apply(this, args);
            }
        },

        goHome: function() {
            this.navigate('/', { trigger: true });
        },

        login: function(route) {
            route = route || '';
            var url = 'https://api.venmo.com/v1/oauth/authorize?client_id=2026&redirect_uri=http://localhost:8000/&scope=access_friends%20make_payments%20access_profile%20access_email%20access_phone%20access_balance&response_type=token';
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
