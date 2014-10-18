var Backbone = require('backbone');

var User = Backbone.Model.extend({

    url: function() {
        return 'http://localhost:3000/me?access_token=' + this.get('accessToken');
    },

    parse: function(res) {
        return res.data;
    }

});

module.exports = User;
