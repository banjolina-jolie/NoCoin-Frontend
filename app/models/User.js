define(function(require, exports, module) {
    var Backbone = require('backbone');

    var User = Backbone.Model.extend({

        url: function() {
            return 'http://localhost:3000/users/' + this.id;
        },

        parse: function(res) {
            if (res.devices) {
                this.devices = res.devices;
            }
            if (res._id) {
                this.set('id', res._id);
            }
            return res;
        }

    });

    module.exports = User;
});
