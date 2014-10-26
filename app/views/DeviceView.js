var Backbone = require('backbone');
var Device = require('../models/Device');

var DeviceView = Backbone.View.extend({

    id: 'single-device-view',

    events: {
        'click #save-device': 'saveDevice',
        'click #payNow': 'payDevice'
    },
    initialize: function(options) {
        this.deviceId = options.deviceId;
        this.user = options.user;
        this.router = options.router;
    },
    loadDependencies: function() {
        if (this.deviceId === 'new') {
            this.device = new Device();
            this.render('edit_device');
        } else {
            this.device = new Device({ id: this.deviceId });
            this.listenToOnce(this.device, 'sync', function() {
                this.render();
            }.bind(this));
            this.device.fetch();
        }
    },
    render: function(template) {
        template = template || 'single_device';
        var el = document.createElement('div');
        var $el = $(el);
        $el.attr('id', this.id);

        $('#main').html($el);
        this.setElement('#single-device-view');
        var data = this.device.toJSON();
        dust.render(template, data, function(err, out) {
            this.$el.html(out);
        }.bind(this));

        return this;
    },
    getDevice: function() {
        this.device = new Device({ id: this.deviceId });

        this.listenToOnce(this.device, 'sync', this.render);

        this.device.fetch();
    },
    saveDevice: function() {
        var name = this.$('#name').val();
        var price = Number(this.$('#price').val());
        var owner = this.user.get('user').id;

        this.listenToOnce(this.device, 'sync', function() {
            this.router.goHome();
        }.bind(this));

        this.device.save({
            name: name,
            price: price,
            owner: owner
        });
    },
    payDevice: function() {
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/paydevice',
            data: {
                user_id: this.device.get('owner'),
                access_token: this.router.user.get('accessToken')
            }
        }).done(function() {
            console.log(arguments);
        });
    }
});

module.exports = DeviceView;
