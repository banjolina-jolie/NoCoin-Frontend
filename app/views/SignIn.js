var Backbone = require('backbone');
var app = require('app');
var FriendsList = require('../collections/FriendsList');
var UserModel = require('../models/User');

var SignInView = Backbone.View.extend({

    el: '#main',

    events: {
        // 'click #make-payment': 'makePayment',
        // 'keyup #searchFriends': 'searchFriends',
        // 'click #start-devices': 'startDevices',
        'click #start-friends': 'startFriends'
    },

    initialize: function(options) {
        this.user = options.user;
        this.router = options.router;
    },

    setup: function() {

        this.user = new UserModel({ accessToken: this.router.accessToken });
        this.listenToOnce(this.user, 'sync', this.render);
        this.listenToOnce(this.user, 'error', router.login);
        this.user.fetch();
    },

    render: function() {
        var data = {};
        data._userLoaded = !!this.user.get('user');

        dust.render('welcome', data, function(err, out) {
            this.$el.html(out);
        }.bind(this));

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

        this.user = this.user || new UserModel({ accessToken: accessToken });

        if (!this.user.get('user')) {
            return false;
        }

        return true;
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

    getDevices: function() {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/devices'
        }).done(function(res) {
            console.log(res);
        });
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
            url: 'http://localhost:3000/payfriend',
            data: {
                user_id: friend,
                access_token: this.user.get('accessToken')
            }
        });
    },

    searchFriends: function(e) {
        var search = $(e.currentTarget).val();
        var regex = new RegExp(search, 'i');

        this.friends.each(function(friend) {
            var name = friend.get('username');
            var $row = this.$('#' + friend.id);
            if (name.match(regex)) {
                $row.show();
            } else {
                $row.hide();
            }
        }.bind(this));
    },

    // startDevices: function() {

    // },

    startFriends: function(e) {
        e.preventDefault();
        this.router.navigate('/friends', { trigger: true });
    }

});

module.exports = SignInView;
