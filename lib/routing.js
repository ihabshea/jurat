FlowRouter.route('/', {
    action: function(params) {
        BlazeLayout.render("home", {top: "userheader", main: "home"});
    }
});
