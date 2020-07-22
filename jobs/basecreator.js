function createJobOnRWC2ChatHotelBase (lib, mylib) {
  'use strict';

  var q = lib.q,
    qlib = lib.qlib,
    JobOnDestroyable = qlib.JobOnDestroyable;


  function JobOnRWC2ChatHotel (hotel, rwcrealm, chatrealm, myname, othername, defer) {
    JobOnDestroyable.call(this, hotel, defer);
    this.rwcrealm = rwcrealm;
    this.chatrealm = chatrealm;
    this.myname = myname;
    this.othername = othername;
    this.rwc2chatresult = {
      rwcresult: null,
      chatresult: null
    };
  }
  lib.inherit(JobOnRWC2ChatHotel, JobOnDestroyable);
  JobOnRWC2ChatHotel.prototype.destroy = function () {
    this.rwc2chatresult = null;
    this.othername = null;
    this.myname = null;
    this.chatrealm = null;
    this.rwcrealm = null;
    JobOnDestroyable.prototype.destroy.call(this);
  };
  JobOnRWC2ChatHotel.prototype.go = function () {
    var ok = this.okToGo();
    if (!ok.ok) {
      return ok.val;
    }
    this.performStep('runRWCMethod');
    return ok.val;
  };
  JobOnRWC2ChatHotel.prototype.runRWCMethod = function () {
    if (!this.okToProceed()) {
      return;
    }
    this.destroyable[this.RWCMethodName()].apply(this.destroyable, this.RWCMethodParams()).then(
      this.performStep.bind(this, 'runChatMethod'),
      this.reject.bind(this)
    );
  };
  JobOnRWC2ChatHotel.prototype.runChatMethod = function (rwcresult) {
    if (!this.okToProceed()) {
      return;
    }
    this.rwc2chatresult.rwcresult = rwcresult;
    this.destroyable[this.ChatMethodName()].apply(this.destroyable, this.ChatMethodParams()).then(
      this.performStep.bind(this, 'finalize'),
      this.reject.bind(this)
    );
  };
  JobOnRWC2ChatHotel.prototype.finalize = function (chatresult) {
    if (!this.okToProceed()) {
      return;
    }
    this.rwc2chatresult.chatresult = chatresult;
    this.resolve(this.rwc2chatresult);
  };
  JobOnRWC2ChatHotel.prototype.methodNameOnRWC = function (basename) {
    return this.methodNameOnRealm(basename, this.rwcrealm);
  };
  JobOnRWC2ChatHotel.prototype.methodNameOnChat = function (basename) {
    return this.methodNameOnRealm(basename, this.chatrealm);
  }
  JobOnRWC2ChatHotel.prototype.methodNameOnRealm = function (basename, realmname) {
    return basename+'On'+realmname;
  };

  mylib.JobOnRWC2ChatHotel = JobOnRWC2ChatHotel;
};
module.exports = createJobOnRWC2ChatHotelBase;
