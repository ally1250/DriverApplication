import gql from 'graphql-tag';

export const SIGN_IN_MUTATION = gql`
  mutation SignIn($email: String!, $password: String!) {
    signInDriver(email: $email, password: $password) {
      token
      refreshToken
      id
    }
  }
`;