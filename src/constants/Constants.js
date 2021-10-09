import { gql } from '@apollo/client';

export const GET_USER = gql`
query user($email: String!) {
  user(email: $email) {
    _id
    isLoggedIn
    sessionKeys
    password
    createdAt
    updatedAt
    email
  }
}
`;

export const LOGIN_USER = gql`
query login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    userMail
    isLoggedIn
    sessionKey
  }
}
`;

export const CREATE_USER = gql`
mutation createUser($email: String!, $password: String!) {
  createUser(input: { email: $email, password: $password }) {
    isLoggedIn
    sessionKeys
    email
    _id
    password
    createdAt
    updatedAt
  }
}
`;

export const GET_MOVIES = gql`
  query titles($originalTitle: String!) {
    titles(originalTitle: $originalTitle) {
      originalTitle
      _id
      tconst
      primaryTitle
      titleType
      isAdult
      startYear
      endYear
      runtimeMinutes
      genres
    }
  }
`;

export const GET_NAMES = gql`
  query names($primaryName: String!) {
    names(primaryName: $primaryName) {
        primaryName
        primaryProfession
        knownForTitles
        birthYear
        deathYear
    }
  }
`;