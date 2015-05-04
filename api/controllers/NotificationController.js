/**
 * NotificationController
 *
 * @description :: Server-side logic for managing notifications
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	getNotificationsOfSubscriber: function(req, res){
		Notification.find({
			'subscriberName': req.param('subscriberName'),
			'read': false
		})
		.exec(
				function(err, notifications){
					if (err){
						res.badRequest(err);
						return;
					}
					res.ok(notifications);
				}
			);

	},

	setAsRead: function(req, res) {

		Notification.update(
					{'id': req.param('id')},
					{'read': true}
				)
			.exec(
				function(erro, notification){
					if(erro) {
	    				res.badRequest(erro);
						return;
					}

					return res.ok(notification);

				}

			)		

		
	}
};

