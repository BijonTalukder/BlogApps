export const typeDefs = `#graphql

  type Query {
    me:User
    users:[User]
    posts:[Post]
    user(userId:ID!):User
  }


  type AuthPayload{
    token:String
    userError:String
  }
  type Mutation {
    signup(name:String,
      email:String!,
      password:String!
    ):AuthPayload

    signin(
      email:String!
      password:String!
    ):AuthPayload

    addPost(
      title:String!
      content:String!

    ):PostPayload
    updatePost(postId:ID!,post:PostInput):PostPayload
  }


 type PostPayload{
  userError:String
  post:Post
 }
  type Post {
    id: ID!
    title:String!
  content:String!
  authorId:Int!
  author:User
  createdAt:String
  updatedAt:String
  published:Boolean
  }
 
  type User {
    id:ID!
    name:String
    email:String
    #password:String
    createdAt:String
    updatedAt:String
    posts:[Post]
    profile:Profile
  }

  type Profile {
    id:Int
   bio:String
  createdAt:String
  updatedAt:String
  userId:Int
  user:User!

  }
  input PostInput{
    title:String
    content:String
  }
`;
