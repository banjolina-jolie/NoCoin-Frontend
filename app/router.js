define(function(require, exports, module) {
    "use strict";

    // External dependencies.
    var Backbone = require('backbone');
    var SignInView = require('./views/SignIn');

    // Defining the application router.
    var Router = Backbone.Router.extend({
        routes: {
            '': 'index'
        },

        index: function() {
            var view = new SignInView();

            view.setup();
        },

        login: function() {
            var url = 'https://api.venmo.com/v1/oauth/authorize?client_id=2026&redirect_uri=http://localhost:8000/&scope=access_friends%20make_payments%20access_profile%20access_email%20access_phone%20access_balance&response_type=token';
            window.location.href = url;
        }
    });

  module.exports = Router;

});
