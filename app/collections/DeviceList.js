var Backbone = require('backbone');

var DeviceList = Backbone.Collection.extend({

    initialize: function(list, options) {
        options = options || {};
        this.userId = options.userId;
    },

    url: function() {
        return 'http://localhost:3000/devices';
    }
});

module.exports = DeviceList;
