var Backbone = require('backbone');
var app = require('app');
var FriendsList = require('../collections/FriendsList');
var UserModel = require('../models/User');
var DeviceList = require('../collections/DeviceList');

var SignInView = Backbone.View.extend({

    el: '#main',

    events: {
    },
    initialize: function(options) {
        this.user = options.user;
        this.router = options.router;
    },
    loadDependencies: function() {
        this.devices = new DeviceList();
    },
    render: function() {
        var data = this.user.toJSON();
        data.devices = this.user.devices;

        dust.render('welcome', data, function(err, out) {
            this.$el.html(out);
        }.bind(this));

        return this;
    },
    makePayment: function() {
        var friend = _.find($('[name=owner]'), function(input){
            return $(input).prop('checked');
        });

        friend = $(friend).val();

        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/payfriend',
            data: {
                user_id: friend,
                access_token: this.user.get('accessToken')
            }
        });
    }
});

module.exports = SignInView;
