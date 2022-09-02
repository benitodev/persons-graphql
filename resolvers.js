import { PubSub } from "graphql-subscriptions";
import { AuthenticationError, UserInputError } from "apollo-server";
import jwt from "jsonwebtoken";
import Person from "./models/Person.js";

const SECRET_KEY = "adwad9239244@@@#~|#€adwadaw";
const pubsub = new PubSub();
const resolvers = {
  Mutation: {
    addPerson: async (root, args, context) => {
      const { currentUser } = context;
      if (!currentUser) throw new AuthenticationError("not authenticated");
      const person = new Person({ ...args, street: args.street });
      try {
        await person.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      pubsub.publish("PERSON_ADDED", { personAdded: person });
      return person;
    },
    editNumber: async (root, args) => {
      const person = await Person.findOne({ name: args.name });
      if (!person) return;
      person.phone = args.phone;
      try {
        await person.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return person;
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username });
      //another way to handle the errors. Not always of course
      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== "secret") {
        throw new UserInputError("wrong credentials", {
          invalidArgs: args,
        });
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return {
        value: jwt.sign(userForToken, SECRET_KEY),
      };
    },
    addAsFriend: async (root, args, context) => {
      const { currentUser } = context;
      if (!currentUser) throw new AuthenticationError("not authenticated");
      const nonFriendlyAlready = (person) => {
        return !currentUser.friends
          .map((p) => p._id.toString())
          .includes(person._id.toString());
      };
      const person = await Person.findOne({ name: args.name });

      if (nonFriendlyAlready(person)) {
        currentUser.friends = currentUser.friends.concat(person);
        await currentUser.save();
      }

      return currentUser;
    },
  },
  Query: {
    personCount: () => Person.collection.countDocuments(),
    allPersons: async (root, args) => {
      if (!args.phone) {
        return Person.find({}).populate("friendOf");
      }

      return Person.find({ phone: { $exists: args.phone === "YES" } }).populate(
        "friendOf"
      );
    },

    findPerson: async (root, args) => {
      const person = await Person.findOne({ name: args.name });
      console.log(person);
      return person;
    },

    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Person: {
    address: (root) => {
      return {
        city: root.city,
        street: root.street,
      };
    },
    friendOf: async (root) => {
      const friends = await User.find({ friends: { $in: [root._id] } });

      return friends;
    },
  },
  Subscription: {
    personAdded: {
      subscribe: () => pubsub.asyncIterator(["PERSON_ADDED"]),
    },
  },
};

export default resolvers;
