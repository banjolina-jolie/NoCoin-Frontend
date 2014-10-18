var Backbone = require('backbone');
var app = require('app');
var router = require('router');
var FriendsList = require('../collections/FriendsList');
var UserModel = require('../models/User');

var SignInView = Backbone.View.extend({

    el: '#main',

    events: {
        'click #login': 'login',
        'click #get-friends': 'getFriends',
        'click #make-payment': 'makePayment'
    },

    render: function() {

        dust.render('welcome', {}, function(err, out) {
            this.$el.html(out);
        }.bind(this));

        if (this.userLoaded()) {
            this.addPaymentButton();
        }

        return this;
    },

    login: function() {
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

    userLoaded: function() {
        this.accessToken = this.getQueryVariable('access_token');

        if (!accessToken) {
            this.login();
            return;
        }

        this.user = this.user || new UserModel({ accessToken: accessToken });

        if (!this.user.get('user')) {
            this.listenToOnce(this.user, 'sync', this.render);
            this.user.fetch();
            return false;
        }

        return true;
    },

    addPaymentButton: function() {
        this.$el.append('<button id="make-payment">make 1 cent payment</button>');
    },

    getFriends: function() {
        var user = this.user;
        var options = {
            userId: user.get('user').id,
            accessToken: user.get('accessToken')
        };
        this.friends = this. friends || new FriendsList([], options);

        this.listenToOnce(this.friends, 'sync', this.renderFriends);

        this.friends.fetch();
    },

    renderFriends: function(options) {

        var data = this.friends.toJSON();

        dust.render('friends', {data: data}, function(err, out) {
            this.$el.append(out);
        }.bind(this));
    },

    makePayment: function() {
        var friend = _.find($('[name=owner]'), function(input){
            return $(input).prop('checked');
        });

        friend = $(friend).val();

        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/pay',
            data: {
                user_id: friend,
                access_token: this.user.get('accessToken')
            }
        });
    }

});

module.exports = SignInView;
