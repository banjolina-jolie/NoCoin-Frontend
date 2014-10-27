define(function(require, exports, module) {
    var Backbone = require('backbone');
    var Friend = require('../models/Friend');

    var FriendsView = Backbone.View.extend({

        id: 'single-friend-view',

        events: {
        },

        initialize: function(options) {
            this.friendId = options.friendId;
        },

        render: function() {
            var el = document.createElement('div');
            var $el = $(el);
            $el.attr('id', this.id);

            $('#main').html($el);
            this.setElement('#single-friend-view');

            var data = this.friend.toJSON();
            dust.render('single_friend', data, function(err, out) {
                this.$el.html(out);
            }.bind(this));

            return this;
        },

        loadDependencies: function() {
            this.friend = new Friend({ id: this.friendId });

            this.listenToOnce(this.friend, 'sync', this.render);

            this.friend.fetch();
        }

    });

    module.exports = FriendsView;
});
