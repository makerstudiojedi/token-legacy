import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigDecimal: { input: number; output: number; }
  BigInt: { input: number; output: number; }
  Bytes: { input: number; output: number; }
};

export interface Allocation {
  __typename?: 'Allocation';
  createdAt: Scalars['BigInt']['output'];
  from: User;
  id: Scalars['ID']['output'];
  legacy: Legacy;
  percentage: Scalars['BigInt']['output'];
  to: User;
  token: LegacyToken;
  updatedAt: Scalars['BigInt']['output'];
  withdrawn: Scalars['Boolean']['output'];
}

export interface AllocationFilter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<AllocationFilter>>>;
  createdAt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  from?: InputMaybe<Scalars['String']['input']>;
  from_?: InputMaybe<UserFilter>;
  from_contains?: InputMaybe<Scalars['String']['input']>;
  from_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_gt?: InputMaybe<Scalars['String']['input']>;
  from_gte?: InputMaybe<Scalars['String']['input']>;
  from_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_lt?: InputMaybe<Scalars['String']['input']>;
  from_lte?: InputMaybe<Scalars['String']['input']>;
  from_not?: InputMaybe<Scalars['String']['input']>;
  from_not_contains?: InputMaybe<Scalars['String']['input']>;
  from_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  from_starts_with?: InputMaybe<Scalars['String']['input']>;
  from_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  legacy?: InputMaybe<Scalars['String']['input']>;
  legacy_?: InputMaybe<LegacyFilter>;
  legacy_contains?: InputMaybe<Scalars['String']['input']>;
  legacy_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  legacy_ends_with?: InputMaybe<Scalars['String']['input']>;
  legacy_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  legacy_gt?: InputMaybe<Scalars['String']['input']>;
  legacy_gte?: InputMaybe<Scalars['String']['input']>;
  legacy_in?: InputMaybe<Array<Scalars['String']['input']>>;
  legacy_lt?: InputMaybe<Scalars['String']['input']>;
  legacy_lte?: InputMaybe<Scalars['String']['input']>;
  legacy_not?: InputMaybe<Scalars['String']['input']>;
  legacy_not_contains?: InputMaybe<Scalars['String']['input']>;
  legacy_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  legacy_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  legacy_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  legacy_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  legacy_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  legacy_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  legacy_starts_with?: InputMaybe<Scalars['String']['input']>;
  legacy_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<AllocationFilter>>>;
  percentage?: InputMaybe<Scalars['BigInt']['input']>;
  percentage_gt?: InputMaybe<Scalars['BigInt']['input']>;
  percentage_gte?: InputMaybe<Scalars['BigInt']['input']>;
  percentage_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  percentage_lt?: InputMaybe<Scalars['BigInt']['input']>;
  percentage_lte?: InputMaybe<Scalars['BigInt']['input']>;
  percentage_not?: InputMaybe<Scalars['BigInt']['input']>;
  percentage_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  to?: InputMaybe<Scalars['String']['input']>;
  to_?: InputMaybe<UserFilter>;
  to_contains?: InputMaybe<Scalars['String']['input']>;
  to_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_gt?: InputMaybe<Scalars['String']['input']>;
  to_gte?: InputMaybe<Scalars['String']['input']>;
  to_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_lt?: InputMaybe<Scalars['String']['input']>;
  to_lte?: InputMaybe<Scalars['String']['input']>;
  to_not?: InputMaybe<Scalars['String']['input']>;
  to_not_contains?: InputMaybe<Scalars['String']['input']>;
  to_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  to_starts_with?: InputMaybe<Scalars['String']['input']>;
  to_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<LegacyTokenFilter>;
  token_contains?: InputMaybe<Scalars['String']['input']>;
  token_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_gt?: InputMaybe<Scalars['String']['input']>;
  token_gte?: InputMaybe<Scalars['String']['input']>;
  token_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_lt?: InputMaybe<Scalars['String']['input']>;
  token_lte?: InputMaybe<Scalars['String']['input']>;
  token_not?: InputMaybe<Scalars['String']['input']>;
  token_not_contains?: InputMaybe<Scalars['String']['input']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  updatedAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_not?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  withdrawn?: InputMaybe<Scalars['Boolean']['input']>;
  withdrawn_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  withdrawn_not?: InputMaybe<Scalars['Boolean']['input']>;
  withdrawn_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
}

export enum AllocationOrderBy {
  CREATEDAT = 'createdAt',
  FROM = 'from',
  FROM__ADDRESS = 'from__address',
  FROM__CREATEDAT = 'from__createdAt',
  FROM__ID = 'from__id',
  ID = 'id',
  LEGACY = 'legacy',
  LEGACY__CREATEDAT = 'legacy__createdAt',
  LEGACY__ID = 'legacy__id',
  LEGACY__TRANSACTIONHASH = 'legacy__transactionHash',
  LEGACY__UNLOCKSAT = 'legacy__unlocksAt',
  LEGACY__UPDATEDAT = 'legacy__updatedAt',
  PERCENTAGE = 'percentage',
  TO = 'to',
  TO__ADDRESS = 'to__address',
  TO__CREATEDAT = 'to__createdAt',
  TO__ID = 'to__id',
  TOKEN = 'token',
  TOKEN__ID = 'token__id',
  TOKEN__TOKEN = 'token__token',
  UPDATEDAT = 'updatedAt',
  WITHDRAWN = 'withdrawn'
}

export interface BlockChangedFilter {
  number_gte: Scalars['Int']['input'];
}

export interface BlockHeight {
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
}

export interface Legacy {
  __typename?: 'Legacy';
  allocations?: Maybe<Array<Allocation>>;
  createdAt: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  owner: User;
  tokens?: Maybe<Array<LegacyToken>>;
  transactionHash: Scalars['String']['output'];
  unlocksAt: Scalars['BigInt']['output'];
  updatedAt: Scalars['BigInt']['output'];
}


export type LegacyAllocationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AllocationOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AllocationFilter>;
};


export type LegacyTokensArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<LegacyTokenOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<LegacyTokenFilter>;
};

export interface LegacyToken {
  __typename?: 'LegacyToken';
  allocations?: Maybe<Array<Allocation>>;
  id: Scalars['ID']['output'];
  legacy: Legacy;
  token: Scalars['Bytes']['output'];
}


export type LegacyTokenAllocationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AllocationOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AllocationFilter>;
};

export interface LegacyTokenFilter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  allocations_?: InputMaybe<AllocationFilter>;
  and?: InputMaybe<Array<InputMaybe<LegacyTokenFilter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  legacy?: InputMaybe<Scalars['String']['input']>;
  legacy_?: InputMaybe<LegacyFilter>;
  legacy_contains?: InputMaybe<Scalars['String']['input']>;
  legacy_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  legacy_ends_with?: InputMaybe<Scalars['String']['input']>;
  legacy_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  legacy_gt?: InputMaybe<Scalars['String']['input']>;
  legacy_gte?: InputMaybe<Scalars['String']['input']>;
  legacy_in?: InputMaybe<Array<Scalars['String']['input']>>;
  legacy_lt?: InputMaybe<Scalars['String']['input']>;
  legacy_lte?: InputMaybe<Scalars['String']['input']>;
  legacy_not?: InputMaybe<Scalars['String']['input']>;
  legacy_not_contains?: InputMaybe<Scalars['String']['input']>;
  legacy_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  legacy_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  legacy_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  legacy_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  legacy_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  legacy_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  legacy_starts_with?: InputMaybe<Scalars['String']['input']>;
  legacy_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<LegacyTokenFilter>>>;
  token?: InputMaybe<Scalars['Bytes']['input']>;
  token_contains?: InputMaybe<Scalars['Bytes']['input']>;
  token_gt?: InputMaybe<Scalars['Bytes']['input']>;
  token_gte?: InputMaybe<Scalars['Bytes']['input']>;
  token_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  token_lt?: InputMaybe<Scalars['Bytes']['input']>;
  token_lte?: InputMaybe<Scalars['Bytes']['input']>;
  token_not?: InputMaybe<Scalars['Bytes']['input']>;
  token_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  token_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
}

export enum LegacyTokenOrderBy {
  ALLOCATIONS = 'allocations',
  ID = 'id',
  LEGACY = 'legacy',
  LEGACY__CREATEDAT = 'legacy__createdAt',
  LEGACY__ID = 'legacy__id',
  LEGACY__TRANSACTIONHASH = 'legacy__transactionHash',
  LEGACY__UNLOCKSAT = 'legacy__unlocksAt',
  LEGACY__UPDATEDAT = 'legacy__updatedAt',
  TOKEN = 'token'
}

export interface LegacyFilter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  allocations_?: InputMaybe<AllocationFilter>;
  and?: InputMaybe<Array<InputMaybe<LegacyFilter>>>;
  createdAt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<LegacyFilter>>>;
  owner?: InputMaybe<Scalars['String']['input']>;
  owner_?: InputMaybe<UserFilter>;
  owner_contains?: InputMaybe<Scalars['String']['input']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_ends_with?: InputMaybe<Scalars['String']['input']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_gt?: InputMaybe<Scalars['String']['input']>;
  owner_gte?: InputMaybe<Scalars['String']['input']>;
  owner_in?: InputMaybe<Array<Scalars['String']['input']>>;
  owner_lt?: InputMaybe<Scalars['String']['input']>;
  owner_lte?: InputMaybe<Scalars['String']['input']>;
  owner_not?: InputMaybe<Scalars['String']['input']>;
  owner_not_contains?: InputMaybe<Scalars['String']['input']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  owner_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_starts_with?: InputMaybe<Scalars['String']['input']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tokens_?: InputMaybe<LegacyTokenFilter>;
  transactionHash?: InputMaybe<Scalars['String']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['String']['input']>;
  transactionHash_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionHash_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['String']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['String']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['String']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transactionHash_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionHash_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash_starts_with?: InputMaybe<Scalars['String']['input']>;
  transactionHash_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  unlocksAt?: InputMaybe<Scalars['BigInt']['input']>;
  unlocksAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  unlocksAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  unlocksAt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  unlocksAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  unlocksAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  unlocksAt_not?: InputMaybe<Scalars['BigInt']['input']>;
  unlocksAt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  updatedAt?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  updatedAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_not?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
}

export enum LegacyOrderBy {
  ALLOCATIONS = 'allocations',
  CREATEDAT = 'createdAt',
  ID = 'id',
  OWNER = 'owner',
  OWNER__ADDRESS = 'owner__address',
  OWNER__CREATEDAT = 'owner__createdAt',
  OWNER__ID = 'owner__id',
  TOKENS = 'tokens',
  TRANSACTIONHASH = 'transactionHash',
  UNLOCKSAT = 'unlocksAt',
  UPDATEDAT = 'updatedAt'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  ASC = 'asc',
  DESC = 'desc'
}

export interface Query {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<Meta>;
  allocation?: Maybe<Allocation>;
  allocations: Array<Allocation>;
  legacies: Array<Legacy>;
  legacy?: Maybe<Legacy>;
  legacyToken?: Maybe<LegacyToken>;
  legacyTokens: Array<LegacyToken>;
  user?: Maybe<User>;
  users: Array<User>;
}


export type QueryMetaArgs = {
  block?: InputMaybe<BlockHeight>;
};


export type QueryAllocationArgs = {
  block?: InputMaybe<BlockHeight>;
  id: Scalars['ID']['input'];
  subgraphError?: SubgraphErrorPolicy;
};


export type QueryAllocationsArgs = {
  block?: InputMaybe<BlockHeight>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AllocationOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: SubgraphErrorPolicy;
  where?: InputMaybe<AllocationFilter>;
};


export type QueryLegaciesArgs = {
  block?: InputMaybe<BlockHeight>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<LegacyOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: SubgraphErrorPolicy;
  where?: InputMaybe<LegacyFilter>;
};


export type QueryLegacyArgs = {
  block?: InputMaybe<BlockHeight>;
  id: Scalars['ID']['input'];
  subgraphError?: SubgraphErrorPolicy;
};


export type QueryLegacyTokenArgs = {
  block?: InputMaybe<BlockHeight>;
  id: Scalars['ID']['input'];
  subgraphError?: SubgraphErrorPolicy;
};


export type QueryLegacyTokensArgs = {
  block?: InputMaybe<BlockHeight>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<LegacyTokenOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: SubgraphErrorPolicy;
  where?: InputMaybe<LegacyTokenFilter>;
};


export type QueryUserArgs = {
  block?: InputMaybe<BlockHeight>;
  id: Scalars['ID']['input'];
  subgraphError?: SubgraphErrorPolicy;
};


export type QueryUsersArgs = {
  block?: InputMaybe<BlockHeight>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<UserOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: SubgraphErrorPolicy;
  where?: InputMaybe<UserFilter>;
};

export interface Subscription {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<Meta>;
  allocation?: Maybe<Allocation>;
  allocations: Array<Allocation>;
  legacies: Array<Legacy>;
  legacy?: Maybe<Legacy>;
  legacyToken?: Maybe<LegacyToken>;
  legacyTokens: Array<LegacyToken>;
  user?: Maybe<User>;
  users: Array<User>;
}


export type SubscriptionMetaArgs = {
  block?: InputMaybe<BlockHeight>;
};


export type SubscriptionAllocationArgs = {
  block?: InputMaybe<BlockHeight>;
  id: Scalars['ID']['input'];
  subgraphError?: SubgraphErrorPolicy;
};


export type SubscriptionAllocationsArgs = {
  block?: InputMaybe<BlockHeight>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AllocationOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: SubgraphErrorPolicy;
  where?: InputMaybe<AllocationFilter>;
};


export type SubscriptionLegaciesArgs = {
  block?: InputMaybe<BlockHeight>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<LegacyOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: SubgraphErrorPolicy;
  where?: InputMaybe<LegacyFilter>;
};


export type SubscriptionLegacyArgs = {
  block?: InputMaybe<BlockHeight>;
  id: Scalars['ID']['input'];
  subgraphError?: SubgraphErrorPolicy;
};


export type SubscriptionLegacyTokenArgs = {
  block?: InputMaybe<BlockHeight>;
  id: Scalars['ID']['input'];
  subgraphError?: SubgraphErrorPolicy;
};


export type SubscriptionLegacyTokensArgs = {
  block?: InputMaybe<BlockHeight>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<LegacyTokenOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: SubgraphErrorPolicy;
  where?: InputMaybe<LegacyTokenFilter>;
};


export type SubscriptionUserArgs = {
  block?: InputMaybe<BlockHeight>;
  id: Scalars['ID']['input'];
  subgraphError?: SubgraphErrorPolicy;
};


export type SubscriptionUsersArgs = {
  block?: InputMaybe<BlockHeight>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<UserOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: SubgraphErrorPolicy;
  where?: InputMaybe<UserFilter>;
};

export interface User {
  __typename?: 'User';
  address: Scalars['Bytes']['output'];
  allocationsFrom?: Maybe<Array<Allocation>>;
  allocationsTo?: Maybe<Array<Allocation>>;
  createdAt: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  legacy?: Maybe<Legacy>;
}


export type UserAllocationsFromArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AllocationOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AllocationFilter>;
};


export type UserAllocationsToArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AllocationOrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AllocationFilter>;
};

export interface UserFilter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  address?: InputMaybe<Scalars['Bytes']['input']>;
  address_contains?: InputMaybe<Scalars['Bytes']['input']>;
  address_gt?: InputMaybe<Scalars['Bytes']['input']>;
  address_gte?: InputMaybe<Scalars['Bytes']['input']>;
  address_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  address_lt?: InputMaybe<Scalars['Bytes']['input']>;
  address_lte?: InputMaybe<Scalars['Bytes']['input']>;
  address_not?: InputMaybe<Scalars['Bytes']['input']>;
  address_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  allocationsFrom_?: InputMaybe<AllocationFilter>;
  allocationsTo_?: InputMaybe<AllocationFilter>;
  and?: InputMaybe<Array<InputMaybe<UserFilter>>>;
  createdAt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  legacy?: InputMaybe<Scalars['String']['input']>;
  legacy_?: InputMaybe<LegacyFilter>;
  legacy_contains?: InputMaybe<Scalars['String']['input']>;
  legacy_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  legacy_ends_with?: InputMaybe<Scalars['String']['input']>;
  legacy_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  legacy_gt?: InputMaybe<Scalars['String']['input']>;
  legacy_gte?: InputMaybe<Scalars['String']['input']>;
  legacy_in?: InputMaybe<Array<Scalars['String']['input']>>;
  legacy_lt?: InputMaybe<Scalars['String']['input']>;
  legacy_lte?: InputMaybe<Scalars['String']['input']>;
  legacy_not?: InputMaybe<Scalars['String']['input']>;
  legacy_not_contains?: InputMaybe<Scalars['String']['input']>;
  legacy_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  legacy_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  legacy_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  legacy_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  legacy_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  legacy_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  legacy_starts_with?: InputMaybe<Scalars['String']['input']>;
  legacy_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<UserFilter>>>;
}

export enum UserOrderBy {
  ADDRESS = 'address',
  ALLOCATIONSFROM = 'allocationsFrom',
  ALLOCATIONSTO = 'allocationsTo',
  CREATEDAT = 'createdAt',
  ID = 'id',
  LEGACY = 'legacy',
  LEGACY__CREATEDAT = 'legacy__createdAt',
  LEGACY__ID = 'legacy__id',
  LEGACY__TRANSACTIONHASH = 'legacy__transactionHash',
  LEGACY__UNLOCKSAT = 'legacy__unlocksAt',
  LEGACY__UPDATEDAT = 'legacy__updatedAt'
}

export interface Block {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>;
}

/** The type for the top-level _meta field */
export interface Meta {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: Block;
  /** The deployment ID */
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
}

export enum SubgraphErrorPolicy {
  /** Data will be returned even if the subgraph has indexing errors */
  ALLOW = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  DENY = 'deny'
}

export type FetchLegacyQueryVariables = Exact<{
  address: Scalars['ID']['input'];
}>;


export type FetchLegacyQueryResult = (
  { __typename?: 'Query' }
  & { legacies: Array<(
    { __typename?: 'Legacy' }
    & Pick<Legacy, 'id' | 'createdAt' | 'updatedAt'>
    & { owner: (
      { __typename?: 'User' }
      & Pick<User, 'id'>
    ), tokens?: Maybe<Array<(
      { __typename?: 'LegacyToken' }
      & Pick<LegacyToken, 'id' | 'token'>
    )>> }
  )> }
);


export const FetchLegacyDocument = /*#__PURE__*/ gql`
    query fetchLegacy($address: ID!) {
  legacies(where: {id: $address}) {
    id
    createdAt
    updatedAt
    owner {
      id
    }
    tokens {
      id
      token
    }
  }
}
    `;

/**
 * __useFetchLegacyQuery__
 *
 * To run a query within a React component, call `useFetchLegacyQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchLegacyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchLegacyQuery({
 *   variables: {
 *      address: // value for 'address'
 *   },
 * });
 */
export function useFetchLegacyQuery(baseOptions: Apollo.QueryHookOptions<FetchLegacyQueryResult, FetchLegacyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchLegacyQueryResult, FetchLegacyQueryVariables>(FetchLegacyDocument, options);
      }
export function useFetchLegacyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchLegacyQueryResult, FetchLegacyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchLegacyQueryResult, FetchLegacyQueryVariables>(FetchLegacyDocument, options);
        }
export type FetchLegacyQueryHookResult = ReturnType<typeof useFetchLegacyQuery>;
export type FetchLegacyLazyQueryHookResult = ReturnType<typeof useFetchLegacyLazyQuery>;