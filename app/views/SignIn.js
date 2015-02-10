define(function(require, exports, module) {
    var Backbone = require('backbone');
    var simpleStorage = require('simpleStorage');
    var app = require('app');
    var FriendsList = require('../collections/FriendsList');
    var UserModel = require('../models/User');
    var DeviceList = require('../collections/DeviceList');

    var SignInView = Backbone.View.extend({

        el: '#main',

        events: {
            'click #log-out': 'logOut'
        },
        initialize: function(options) {

            this.user = options.user;
            this.router = options.router;
        },
        render: function() {
            var data = this.user.toJSON();
            data.devices = this.user.devices;

            dust.render('welcome', data, function(err, out) {
                this.$el.html(out);
            }.bind(this));

            return this;
        },
        logOut: function() {
            simpleStorage.deleteKey('no_quarter_id');
            window.location.href = "http://localhost:8000";
        }
    });

    module.exports = SignInView;
});
