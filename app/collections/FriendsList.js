define(function(require, exports, module) {
    var Backbone = require('backbone');

    var FriendsList = Backbone.Collection.extend({

        initialize: function(list, options) {
            this.accessToken = options.accessToken;
            this.userId = options.userId;
        },

        url: function() {
            return 'http://localhost:3000/friends?access_token=' + this.accessToken + '&user_id=' + this.userId;
        },

        parse: function(res) {
            res = res.data;
            return res;
        }
    });

    module.exports = FriendsList;
});
