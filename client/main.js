import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor'
import Identicon from 'identicon.js';
var loginV = false;
Template.home.helpers({
  Account(){
    return EthAccounts.find().fetch();
  },
  ethavatar(address){
    var data = new Identicon(address, 32).toString();
    return "data:image/png;base64," + data;
  },
  setup(){
    var exists = Meteor.users.find({"username":this.address}).count();
    return exists == 0;
  }
});
Template.home.events({
  'click #pick-account': function(event){
    event.preventDefault();
    var exists = Meteor.users.find({"username":this.address}).count();
    if(exists == 0)
      $("#"+this.address).css("display","block");
    else
      $("#"+this.address+"login").css("display","block");

  },
  'click #finish-setup': function(event){
    event.preventDefault();
    password = $("#password").val();
    name = $("name").val();
    Accounts.createUser({"username": this.address, "password": password, profile:{"name": name}},
    function(){
      FlowRouter.go("/");
    }
  );
  },
  'click #login-button': function(event){
    event.preventDefault();
    password = $("#password").val();
    console.log(this.address);
    Meteor.loginWithPassword(this.address, password);
  }

});
Template.userheader.helpers({
  gravatars(){
    var data = new Identicon(Meteor.user().username, 32).toString();
    return "data:image/png;base64," + data;
  },
  username(){
    return Meteor.user().profile.name;
  }
});
