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
    favoriteActors
    favoriteMovies
    followedGenres
    userSuggestions
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

export const UPDATE_USER = gql`
query update_password($newPassword: String!, $sessionKey: String!) {
  updatePassword(newPassword: $newPassword, sessionKey: $sessionKey) {
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


export const LOGOUT_USER = gql`
query log_out($email: String!, $sessionKey: String!) {
  logOut(email: $email, sessionKey: $sessionKey) {
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

export const ADD_TO_FAV = gql`
mutation addToFavorites($email: String!, $useCase: String!, $result: String!, $sessionKey: String!) {
  addToFavorites(input: { email: $email, useCase: $useCase, result: $result, sessionKey: $sessionKey }) {
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

export const GET_MOVIE = gql`
  query title($tconst: [String!]!) {
    title(tconst: $tconst) {
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

export const FEATURED_MOVIES = gql`
  query featuredMovies {
    featuredMovies {
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