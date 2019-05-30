const Event = require('../../models/event');
const User = require('../../models/user');
const { user, transformEvent } = require('./merge');

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map(event => {
        return transformEvent(event);
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  createEvent: async (args,  req) => {
    if (!req.isAuth) {
      console.log('unauthenticated');
      throw new Error('Unauthenticated');
    }
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: req.userId
    });
    let createdEvent;
    const result = await event.save();

    createdEvent = transformEvent(result);

    const creator = await User.findById(req.userId);
    if (!creator) {
      console.log('user not found');
      throw new Error('User not found.');
    }
    creator.createdEvents.push(event);
    await creator.save();

    return createdEvent;
  }
};
