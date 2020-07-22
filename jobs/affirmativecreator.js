function createAffirmativeJob (lib, mylib) {
  'use strict';

  var JobOnRWC2ChatHotel = mylib.JobOnRWC2ChatHotel;

  function AffirmativeJob (hotel, rwcrealm, chatrealm, myname, othername, reference, message, defer) {
    JobOnRWC2ChatHotel.call(this, hotel, rwcrealm, chatrealm, myname, othername, defer);
    this.reference = reference;
    this.message = message;
  };
  lib.inherit(AffirmativeJob, JobOnRWC2ChatHotel);
  AffirmativeJob.prototype.destroy = function () {
    this.message = null;
    this.reference = null;
    JobOnRWC2ChatHotel.prototype.destroy.call(this);
  };
  AffirmativeJob.prototype.ChatMethodName = function () {
    return this.methodNameOnChat('sendChatMessage');
  };
  AffirmativeJob.prototype.ChatMethodParams = function () {
    return [this.myname, null, this.othername, this.message, {preview: true}];
  };

  mylib.AffirmativeJob = AffirmativeJob;
}
module.exports = createAffirmativeJob;
