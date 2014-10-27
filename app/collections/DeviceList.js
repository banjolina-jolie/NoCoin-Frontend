define(function(require, exports, module) {
    var Backbone = require('backbone');
    var Device = require('../models/Device');

    var DeviceList = Backbone.Collection.extend({

        initialize: function(list, options) {
            options = options || {};
            this.userId = options.userId;
        },

        model: Device,

        url: function() {
            return 'http://localhost:3000/devices';
        },

        parse: function(res) {
            if (res._id) {
                res.id = res._id;
            }
            return res;
        }
    });

    module.exports = DeviceList;
});
