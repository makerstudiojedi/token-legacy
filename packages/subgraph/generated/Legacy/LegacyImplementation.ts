// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class Initialized extends ethereum.Event {
  get params(): Initialized__Params {
    return new Initialized__Params(this);
  }
}

export class Initialized__Params {
  _event: Initialized;

  constructor(event: Initialized) {
    this._event = event;
  }

  get version(): i32 {
    return this._event.parameters[0].value.toI32();
  }
}

export class ProofUpdated extends ethereum.Event {
  get params(): ProofUpdated__Params {
    return new ProofUpdated__Params(this);
  }
}

export class ProofUpdated__Params {
  _event: ProofUpdated;

  constructor(event: ProofUpdated) {
    this._event = event;
  }

  get proofDeadline(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class WillAdded extends ethereum.Event {
  get params(): WillAdded__Params {
    return new WillAdded__Params(this);
  }
}

export class WillAdded__Params {
  _event: WillAdded;

  constructor(event: WillAdded) {
    this._event = event;
  }

  get to(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get token(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get percentage(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class WillWithdrawn extends ethereum.Event {
  get params(): WillWithdrawn__Params {
    return new WillWithdrawn__Params(this);
  }
}

export class WillWithdrawn__Params {
  _event: WillWithdrawn;

  constructor(event: WillWithdrawn) {
    this._event = event;
  }

  get to(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get token(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get percentage(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class LegacyImplementation extends ethereum.SmartContract {
  static bind(address: Address): LegacyImplementation {
    return new LegacyImplementation("LegacyImplementation", address);
  }

  deadline(): BigInt {
    let result = super.call("deadline", "deadline():(uint256)", []);

    return result[0].toBigInt();
  }

  try_deadline(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("deadline", "deadline():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getTotalAllocation(token: Address): BigInt {
    let result = super.call(
      "getTotalAllocation",
      "getTotalAllocation(address):(uint256)",
      [ethereum.Value.fromAddress(token)]
    );

    return result[0].toBigInt();
  }

  try_getTotalAllocation(token: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getTotalAllocation",
      "getTotalAllocation(address):(uint256)",
      [ethereum.Value.fromAddress(token)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  totalAllocations(param0: Address): BigInt {
    let result = super.call(
      "totalAllocations",
      "totalAllocations(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );

    return result[0].toBigInt();
  }

  try_totalAllocations(param0: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "totalAllocations",
      "totalAllocations(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  wills(param0: Bytes): BigInt {
    let result = super.call("wills", "wills(bytes32):(uint256)", [
      ethereum.Value.fromFixedBytes(param0)
    ]);

    return result[0].toBigInt();
  }

  try_wills(param0: Bytes): ethereum.CallResult<BigInt> {
    let result = super.tryCall("wills", "wills(bytes32):(uint256)", [
      ethereum.Value.fromFixedBytes(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class InitializeCall extends ethereum.Call {
  get inputs(): InitializeCall__Inputs {
    return new InitializeCall__Inputs(this);
  }

  get outputs(): InitializeCall__Outputs {
    return new InitializeCall__Outputs(this);
  }
}

export class InitializeCall__Inputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }

  get _owner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class InitializeCall__Outputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }
}

export class RegisterProofCall extends ethereum.Call {
  get inputs(): RegisterProofCall__Inputs {
    return new RegisterProofCall__Inputs(this);
  }

  get outputs(): RegisterProofCall__Outputs {
    return new RegisterProofCall__Outputs(this);
  }
}

export class RegisterProofCall__Inputs {
  _call: RegisterProofCall;

  constructor(call: RegisterProofCall) {
    this._call = call;
  }

  get _deadline(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class RegisterProofCall__Outputs {
  _call: RegisterProofCall;

  constructor(call: RegisterProofCall) {
    this._call = call;
  }
}

export class WillTokenCall extends ethereum.Call {
  get inputs(): WillTokenCall__Inputs {
    return new WillTokenCall__Inputs(this);
  }

  get outputs(): WillTokenCall__Outputs {
    return new WillTokenCall__Outputs(this);
  }
}

export class WillTokenCall__Inputs {
  _call: WillTokenCall;

  constructor(call: WillTokenCall) {
    this._call = call;
  }

  get to(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get token(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get percentage(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class WillTokenCall__Outputs {
  _call: WillTokenCall;

  constructor(call: WillTokenCall) {
    this._call = call;
  }
}

export class WithdrawCall extends ethereum.Call {
  get inputs(): WithdrawCall__Inputs {
    return new WithdrawCall__Inputs(this);
  }

  get outputs(): WithdrawCall__Outputs {
    return new WithdrawCall__Outputs(this);
  }
}

export class WithdrawCall__Inputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }

  get token(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class WithdrawCall__Outputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }
}
