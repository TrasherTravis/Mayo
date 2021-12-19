import { gql } from '@apollo/client';

export const QUERY_BET = gql`
  query getBet($id: ID) {
    bet(id: $id) {
      id
      amount
      bet
      betId
      player {
        id
        rewardClaimed
        score
      }
      result
    }
  }
`;

export const QUERY_PLAYERS = gql`
  query getPlayers($orderBy: String) {
    players(orderBy: $orderBy, orderDirection: desc, where: {
      score_gt: 0
    }) {
      id
      rewardClaimed
      score
    }
  }
`;

export const QUERY_ME = gql`
 query getMe($id: ID) {
  player(id: $id) {
    id
    rewardClaimed
    score
  }
 }
`;

export const QUERY_MY_BETS = gql`
 query getMyBets($player: ID, $first: Int) {
  bets(first: $first, where: {player: $player}) {
    id
    amount
    bet
    player {
      rewardClaimed
      score
    }
    result
  }
 }
`;