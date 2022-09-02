# Persons GraphQl server (Apollo)

Understanding the Apollo server (Graphql server). To develop graphql app of persons and their login, besides that apollo has his partf of client and it's agnostic to any graphql client.

But in my case i used what is recommended by the house.

> This Project is client/server. Here you can see how i manage [Apollo client for react](https://github.com/benitodev/react-graphql)

## Sample GraphQL Queries

### Fragment

<table width="100%" style="width: 100%">
    <tbody>
        <tr valign="top">
            <td>
                <p>Fragment - PersonDetails</p>
                <pre>
fragment PersonDetails on Person {
    id
    name
    phone
    address {
      street
      city
    }
  }
                </pre>
            </td>
        </tr>
    </tbody>
</table>

### Queries and Mutations

<table width="100%" style="width: 100%">
    <tbody>
        <tr valign="top">
            <td width="50%" style="width: 50%">
                <p>Query - Get all persons</p>
                <pre>
query {
  allPersons {
    ...personDetails
  }
}
                </pre>
            </td>
        </tr>
        <tr></tr>
        <tr valign="top">
            <td>
                <p>Query - Get one person (find)</p>
                <pre>
 query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
      ...PersonDetails
    }
  }
                </pre>
            </td>
        </tr>
        <tr></tr>
        <tr valign="top">
            <td>
                <p>Mutation - Create Person</p>
                <pre>
mutation createPerson(
    $name: String!
    $street: String!
    $city: String!
    $phone: String
  ) {
    addPerson(name: $name, phone: $phone, city: $city, street: $street) {
      ...PersonDetails
    }
  }
                </pre>
            </td>
        </tr>
        <tr></tr>
        <tr valign="top">
            <td>
                <p>Mutation - Edit person</p>
                <pre>
mutation editNumber($name: String!, $phone: String!) {
    editNumber(name: $name, phone: $phone) {
      id
      name
      phone
      address {
        street
        city
      }
    }
  }
                </pre>
            </td>
        </tr>
 <tr valign="top">
            <td>
                <p>Mutation - Login</p>
                <pre>
mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
                </pre>
            </td>
        </tr>
    </tbody>
</table>

## What is GraphQl?

GraphQL is a query language (QL) for your API. It provides a complete understandable description of the data in your API, therefore it's predictable and declarative. GraphQL isn't tied any specificc database or storage engine.

## ¿What is it for?

Designed APIs fast, flexible and developer-friendly. As and alternative to REST, graphql lets developers construct requests that pull data from multiple data sources in a single API call
