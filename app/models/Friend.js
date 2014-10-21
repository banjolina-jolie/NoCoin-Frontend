var Backbone = require('backbone');

var User = Backbone.Model.extend({

    url: function() {
        return 'http://localhost:3000/friends/' + this.get('id');
    }

    // parse: function(res) {
    //     if (!res.data) {
    //         this.trigger('error');
    //     }
    //     return res.data;
    // }

});

module.exports = User;
