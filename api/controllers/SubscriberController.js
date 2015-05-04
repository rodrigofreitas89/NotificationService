/**
 * SubscriberController
 *
 * @description :: Server-side logic for managing subscribers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	postSubscriber: function (req, res) {

		Subscriber.create (req.params.all())
			.exec(function (err, subscriber) {
				if (err) {
					res.badRequest(err);
					return;	
				}

				res.ok(subscriber);
			})
	}
};

