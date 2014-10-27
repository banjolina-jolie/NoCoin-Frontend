define(function(require, exports, module) {
    var Backbone = require('backbone');
    var app = require('app');
    var FriendsList = require('../collections/FriendsList');
    var UserModel = require('../models/User');

    var FriendsView = Backbone.View.extend({

        id: 'FriendsView',

        events: {
            'keyup #searchFriends': 'searchFriends'
        },

        initialize: function(options) {
            this.user = options.user;
            this.router = options.router;
        },

        render: function() {
            var el = document.createElement('div');
            var $el = $(el);
            $el.attr('id', this.id);

            $('#main').html($el);
            this.setElement('#FriendsView');

            var data = this.friends.toJSON();
            dust.render('friends', {data: data}, function(err, out) {
                this.$el.html(out);
            }.bind(this));

            return this;
        },

        loadDependencies: function() {
            var user = this.user;
            var options = {
                userId: user.get('venmo_id'),
                accessToken: user.get('access_token')
            };
            this.friends = this. friends || new FriendsList([], options);

            this.listenToOnce(this.friends, 'sync', this.render);

            this.friends.fetch();
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
        }
    });

    module.exports = FriendsView;
});
