/**
* Notification.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	subscriberName: "string",
  	objectType: "string",
  	object: "string",
  	eventType: "string",
  	description: "string",
  	read: "boolean"
  }
};
