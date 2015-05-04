/**
 * PublisherController
 *
 * @description :: Server-side logic for managing publishers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	postNotification: function (req, res){
		Subscriber.find({
						  'objectType': req.param('objectType'),
						  'object': req.param('object'),
						  'eventType': req.param('eventType')
						})
		.exec(function (err, subscribers)
		{
			function GetDevicesOfSubscriber(subscriberName, callback)
			{
				try
				{
					SubscriberDevices.find({
						'subscriberName': subscriberName
					})	
					.exec(function(err, devices){
						
						var registrationIds = [];
						
						devices.forEach(function(device) {
							registrationIds.push(device.deviceToken);
						}, this);
					
						callback(null, registrationIds);
					});
				} catch (ex){
					callback(ex, []);					
				}								
					

			}
			
			function notifyDevices(objNotification)
			{
				var gcm = require('node-gcm');

				var message = new gcm.Message({
									    collapseKey: 'demo',
									    delayWhileIdle: true,
									    timeToLive: 72000,
									    data: {
									        eventType: objNotification.eventType,
									        description: objNotification.description
									    }
									});

				var sender = new gcm.Sender('AIzaSyAmay84UoxH9aTBequwcn4J2Y4PmAG-qGM');
														
				
				//registrationIds.push('APA91bFgFyuBvpAuXncwEijmOW2PggnuXnt6Xv0s8Vk-3cFLajIuo5nTRligM5r7CkHg-T_BzktN-mVK0rdyIDdm2DVyx79YAVxTCsUMDaqLlW_GRDf86cruuDFjw9Gv4ik0Zzz5pzJEsqdYtRgK4b6IFXOxbFIR4w');

				
				GetDevicesOfSubscriber(objNotification.subscriberName, 
					function(erro, devices){				
						sender.send(message, devices, 
								function (err, result) {
		  								if(err) console.error(err);
		  								else    console.log(result);
								});
						
					}
					
				)
				

				return;
			}

			function createNotificationToSubscribers(subscriber, index, subscriberList){
				var obj = {

				    subscriberName: subscriber.subscriberName,
				    objectType: req.param('objectType'),
				    object: req.param('object'),
				    eventType: req.param('eventType'),
				    description: req.param('description'),
				    read: false
				}

				Notification.create(obj)
					.exec(function (err, notification) {
						if (err) {
							res.badRequest(err);
							return;	
						}
						else
							{
								notifyDevices(notification);
							}
						
					});



			}

			subscribers.forEach(createNotificationToSubscribers);
		
			res.ok('');	
		})

	}
};

