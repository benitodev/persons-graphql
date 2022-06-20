import { ApolloServer, UserInputError, gql } from "apollo-server";
import { v1 as uuid } from "uuid";
import axios from "axios";
const persons = [
  {
    age: "23",
    name: "benitoka",
    phone: "000-111233",
    id: 1,
    city: "Cordoba",
    street: "argandoña",
  },
  {
    age: "3",
    name: "pipon",
    phone: "222-111233",
    id: 2,
    city: "La Rioja",
    street: "w kiowa st",
  },
  {
    age: "2",
    name: "plum",
    id: 3,
    city: "Buenos aires",
    street: "colorado ave",
  },
];
const typeDefs = gql`
  enum YesNo {
    YES
    NO
  }
  type Address {
    street: String!
    city: String!
  }
  type Person {
    age: String!
    name: String!
    phone: String
    adress: Address!
    id: ID!
    check: Boolean
  }

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person]!
    findPerson(name: String!): Person
  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person
    editNumber(name: String!, phone: String!): Person
  }
`;

const resolvers = {
  Mutation: {
    addPerson: (root, args) => {
      if (persons.find((p) => p.name === args.name)) {
        throw new UserInputError("Name must be unique", {
          invalidArgs: args.name,
        });
      }
      const person = { ...args, id: uuid() };
      persons.push(person);
      return person;
    },
    editNumber: (root, args) => {
      const personIndex = persons.findIndex((p) => p.name === args.name);
      if (personIndex === -1) return null;
      const person = persons[personIndex];
      const updatePerson = { ...person, phone: args.phone };
      persons[personIndex] = updatePerson;
      return updatePerson;
    },
  },
  Query: {
    personCount: () => persons.length,
    allPersons: async (root, args) => {
      const { data: personsFromRestApi } = await axios.get(
        "http://localhost:3001/persons"
      );
      if (!args.phone) return personsFromRestApi;

      const byPhone = (person) =>
        args.phone === "YES" ? person.phone : !person.phone;
      return personsFromRestApi.filter(byPhone);
    },

    findPerson: (root, args) => {
      const { name } = args;
      return persons.find((person) => person.name === name);
    },
  },
  Person: {
    adress: (root) => {
      return {
        city: root.city,
        street: root.name,
      };
    },
    check: () => true,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: "bounded",
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
