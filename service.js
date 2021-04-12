function createServiceMixin (execlib) {
  'use strict';

  var lib = execlib.lib,
    q = lib.q,
    qlib = lib.qlib,
    jobs = require('./jobs')(lib);

  function RWC2ChatHotelServiceMixin () {
    this.rwc2chatjobs = new qlib.JobCollection();
  }
  RWC2ChatHotelServiceMixin.prototype.destroy = function () {
    if (this.rwc2chatjobs) {
      this.rwc2chatjobs.destroy();
    }
    this.rwc2chatjobs = null;
  };

  RWC2ChatHotelServiceMixin.addMethods = function (klass, rwcrealm, chatrealm) {
    klass.prototype['initiateRelationOn'+rwcrealm+'2'+chatrealm] = initiateRelationWithInitialChatProducer(rwcrealm, chatrealm);
    klass.prototype['acceptRelationOn'+rwcrealm+'2'+chatrealm] = acceptRelationWithChatReplyProducer(rwcrealm, chatrealm);
    klass.prototype['rejectRelationOn'+rwcrealm+'2'+chatrealm] = rejectLikeWithRemoveConversationProducer(rwcrealm, chatrealm);
  };

  //statics
  //TODO: jobify everything
  function initiateRelationWithInitialChatProducer (rwcrealm, chatrealm) {
    return function (initiatorname, targetname, reference, initmessage) {
      return this.rwc2chatjobs.run('.', new jobs.InitiateRelationJob(this, rwcrealm, chatrealm, initiatorname, targetname, reference, initmessage));
      /*
      return this['initiateRelationOn'+rwcrealm](initiatorname, targetname, reference).then(
        execlib.lib.qlib.executor(this['sendChatMessageOn'+chatrealm].bind(this, initiatorname, null, targetname, initmessage, {preview: 'true'}))
      );
      */
    }
  }
  function acceptRelationWithChatReplyProducer (rwcrealm, chatrealm) {
    return function (targetname, initiatorname, reference, acceptmessage) {
      return this.rwc2chatjobs.run('.', new jobs.AcceptRelationJob(this, rwcrealm, chatrealm, targetname, initiatorname, reference, acceptmessage));
      /*
      return this['acceptRelationOn'+rwcrealm](targetname, initiatorname).then(
        this['sendChatMessageOn'+chatrealm].bind(this, targetname, null, initiatorname, acceptmessage, {preview: 'true'})
      );
      */
    }
  }
  function rejectLikeWithRemoveConversationProducer (rwcrealm, chatrealm) {
    return function (targetname, initiatorname) {
      return this.rwc2chatjobs.run('.', new jobs.RejectRelationJob(this, rwcrealm, chatrealm, targetname, initiatorname));
      /*
      var rcnames = [targetname, initiatorname], ret;
      ret = this['rejectRelationOn'+rwcrealm](targetname, initiatorname).then(
        this['removeConversationOn'+chatrealm].bind(this, rcnames)
      );
      rcnames = null;
      return ret;
      */
    };
  }

  
  
  //endof statics

  return RWC2ChatHotelServiceMixin;
}
module.exports = createServiceMixin;
