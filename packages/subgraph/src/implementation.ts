import { log } from "@graphprotocol/graph-ts";
import { User, Legacy, LegacyToken, Allocation } from '../generated/schema';
import { WillAdded, WillWithdrawn, ProofUpdated } from '../generated/Legacy/LegacyImplementation';
import { LegacyImplementation as LegacyImplementationContract } from '../generated/templates/LegacyImplementation/LegacyImplementation';

function createUID(list: string[]): string {
  return list.join("-");
}

export function handleWillAdded(event: WillAdded): void {
  let beneficiaryAddress = event.params.to;
  let tokenAddress = event.params.token;
  let percentage = event.params.percentage;
  let legacyAddress = event.address;

  let tokenId = createUID([legacyAddress.toHexString(), tokenAddress.toHexString()]);

  let beneficiary = User.load(beneficiaryAddress.toHexString());
  let legacy = Legacy.load(event.address.toHexString());
  let token = LegacyToken.load(tokenId);

  if (legacy === null) {
    log.warning("handleWillAdded: Legacy doesn't exist", []);
    return;
  }

  const owner = User.load(legacy.owner);

  if (owner === null) {
    log.warning("handleWillAdded: Legacy Owner doesn't exist", []);
    return;
  }

  const legacyContract = LegacyImplementationContract.bind(legacyAddress);

  const allocationId = createUID([legacyAddress.toHexString(), tokenAddress.toHexString(), beneficiaryAddress.toHexString()]);
  let allocation = Allocation.load(allocationId);

  if (token === null) {
    token = new LegacyToken(tokenId);
    token.token = tokenAddress.toHexString();
    token.legacy = legacy.id;
  }

  if (beneficiary === null) {
    beneficiary = new User(beneficiaryAddress.toHexString());
    beneficiary.address = beneficiaryAddress.toHexString();
    beneficiary.createdAt = event.block.timestamp;
  }

  if (allocation === null) {
    allocation = new Allocation(allocationId);
    allocation.legacy = legacy.id;
    allocation.from = owner.id;
    allocation.to = beneficiary.id;
    allocation.token = token.id;
    allocation.percentage = percentage;
    allocation.createdAt = event.block.timestamp;
  } else {
    allocation.percentage = percentage;
  }

  allocation.withdrawn = false;
  allocation.updatedAt = event.block.timestamp;
  token.totalAllocation = legacyContract.getTotalAllocation(tokenAddress);

  beneficiary.save();
  legacy.save();
  token.save();
  allocation.save();
}

export function handleWillWithdrawn(event: WillWithdrawn): void {
  let beneficiaryAddress = event.params.to;
  let tokenAddress = event.params.token;
  let legacyAddress = event.address;
  // let percentage = event.params.percentage;

  const allocationId = createUID([legacyAddress.toHexString(), tokenAddress.toHexString(), beneficiaryAddress.toHexString()]);
  let allocation = Allocation.load(allocationId);

  if (allocation === null) {
    log.warning("handleWillAdded: Allocation doesn't exist", []);
    return;
  }

  allocation.withdrawn = true;
  allocation.updatedAt = event.block.timestamp;

  allocation.save();
}

export function handleProofUpdated(event: ProofUpdated): void {
  let unlocksAt = event.params.proofDeadline;

  let legacy = Legacy.load(event.address.toHexString());

  if (legacy === null) {
    log.warning("handleProofUpdated: Legacy doesn't exist", []);
    return;
  }

  legacy.unlocksAt = unlocksAt;
  legacy.updatedAt = event.block.timestamp;

  legacy.save();
}