var Backbone = require('backbone');
var DeviceList = require('../collections/DeviceList');

var DeviceListView = Backbone.View.extend({

    id: 'device-list-view',

    events: {
        'click #save-device': 'saveDevice'
    },
    initialize: function(options) {
        this.deviceId = options.deviceId;
        this.user = options.user;
        this.router = options.router;
    },
    loadDependencies: function() {
        this.deviceList = this.deviceList || new DeviceList();
        this.listenTo(this.deviceList, 'sync', this.render);
        this.deviceList.fetch();
    },
    render: function() {
        var el = document.createElement('div');
        var $el = $(el);
        $el.attr('id', this.id);

        $('#main').html($el);
        this.setElement('#device-list-view');

        var data = {};
        data.devices = this.deviceList.toJSON();

        dust.render('device_list', data, function(err, out) {
            this.$el.html(out);
        }.bind(this));

        return this;
    }
});

module.exports = DeviceListView;
