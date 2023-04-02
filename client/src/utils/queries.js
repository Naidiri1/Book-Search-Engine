import { gql } from "@apollo/client";


export const GET_ME = gql`
  query me {
    me {
      id
      username
      email
      savedBooks {
        id
        title
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
`;