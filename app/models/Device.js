var Backbone = require('backbone');

var Device = Backbone.Model.extend({

    urlRoot: 'http://localhost:3000/devices',

    parse: function(res) {
        res.id = res._id;

        return res;
    }

});

module.exports = Device;
