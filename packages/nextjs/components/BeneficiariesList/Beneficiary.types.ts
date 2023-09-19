import { Allocation, User } from "~~/gql/types.generated";

export type AllocationType = {
  __typename?: "Allocation";
} & Pick<Allocation, "id" | "percentage" | "createdAt" | "updatedAt"> & {
    to: {
      __typename?: "User";
    } & Pick<User, "id" | "address">;
  };
