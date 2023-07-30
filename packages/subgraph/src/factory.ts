import { BigInt, log } from "@graphprotocol/graph-ts";
import {
  LegacyCreated
} from "../generated/Legacy/LegacyFactory";
import { User, Legacy } from "../generated/schema";
import { LegacyImplementation } from "../generated/templates";
import { LegacyImplementation as LegacyImplementationContract } from '../generated/templates/LegacyImplementation/LegacyImplementation';

export function handleLegacyCreated(event: LegacyCreated): void {
  let ownerString = event.params.owner.toHexString();
  let legacyString = event.params.legacy.toHexString();

  let user = User.load(ownerString);
  let legacy = Legacy.load(legacyString);

  if (legacy) {
    log.warning("Legacy already exists", [ownerString, legacyString]);
    return;
  }

  const legacyContract = LegacyImplementationContract.bind(event.params.legacy);

  legacy = new Legacy(legacyString);
  legacy.unlocksAt = BigInt.fromI32(0);
  legacy.createdAt = event.block.timestamp;
  legacy.updatedAt = event.block.timestamp;
  legacy.transactionHash = event.transaction.hash.toHexString();

  if (user === null) {
    user = new User(ownerString);
    user.address = event.params.owner;
    user.createdAt = event.block.timestamp;
  } else {
    user.legacy = legacy.id;
  }

  legacy.owner = user.id;

  user.save();
  legacy.save();

  LegacyImplementation.create(event.params.legacy);
}