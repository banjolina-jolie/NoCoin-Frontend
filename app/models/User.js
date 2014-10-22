var Backbone = require('backbone');

var User = Backbone.Model.extend({

    url: function() {
        return 'http://localhost:3000/me?access_token=' + this.get('accessToken');
    },

    parse: function(res) {
        if (!res.data) {
            this.trigger('error');
        }
        if (res.devices) {
            this.devices = res.devices;
        }
        return res.data;
    }

});

module.exports = User;
