var Backbone = require('backbone');

var Device = Backbone.Model.extend({

    urlRoot: 'http://localhost:3000/devices'

});

module.exports = Device;
