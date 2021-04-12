function createRejectRelationJob (lib, mylib) {
  'use strict';

  var JobOnRWC2ChatHotel = mylib.JobOnRWC2ChatHotel;

  function RejectRelationJob (hotel, rwcrealm, chatrealm, myname, othername, defer) {
    JobOnRWC2ChatHotel.call(this, hotel, rwcrealm, chatrealm, myname, othername, defer);
  }
  lib.inherit(RejectRelationJob, JobOnRWC2ChatHotel);
  RejectRelationJob.prototype.RWCMethodName = function () {
    return this.methodNameOnRWC('rejectRelation');
  };
  RejectRelationJob.prototype.RWCMethodParams = function () {
    return [this.myname, this.othername];
  };
  RejectRelationJob.prototype.ChatMethodName = function () {
    return this.methodNameOnChat('removeConversation');
  };
  RejectRelationJob.prototype.ChatMethodParams = function () {
    return [[this.myname, this.othername]];
  };

  mylib.RejectRelationJob = RejectRelationJob;
}
module.exports = createRejectRelationJob;
