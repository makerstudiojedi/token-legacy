// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class User extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save User entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type User must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("User", id.toString(), this);
    }
  }

  static load(id: string): User | null {
    return changetype<User | null>(store.get("User", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get address(): Bytes {
    let value = this.get("address");
    return value!.toBytes();
  }

  set address(value: Bytes) {
    this.set("address", Value.fromBytes(value));
  }

  get createdAt(): BigInt {
    let value = this.get("createdAt");
    return value!.toBigInt();
  }

  set createdAt(value: BigInt) {
    this.set("createdAt", Value.fromBigInt(value));
  }

  get legacy(): string | null {
    let value = this.get("legacy");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set legacy(value: string | null) {
    if (!value) {
      this.unset("legacy");
    } else {
      this.set("legacy", Value.fromString(<string>value));
    }
  }

  get allocationsFrom(): Array<string> | null {
    let value = this.get("allocationsFrom");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set allocationsFrom(value: Array<string> | null) {
    if (!value) {
      this.unset("allocationsFrom");
    } else {
      this.set("allocationsFrom", Value.fromStringArray(<Array<string>>value));
    }
  }

  get allocationsTo(): Array<string> | null {
    let value = this.get("allocationsTo");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set allocationsTo(value: Array<string> | null) {
    if (!value) {
      this.unset("allocationsTo");
    } else {
      this.set("allocationsTo", Value.fromStringArray(<Array<string>>value));
    }
  }
}

export class Legacy extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Legacy entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Legacy must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Legacy", id.toString(), this);
    }
  }

  static load(id: string): Legacy | null {
    return changetype<Legacy | null>(store.get("Legacy", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get owner(): string {
    let value = this.get("owner");
    return value!.toString();
  }

  set owner(value: string) {
    this.set("owner", Value.fromString(value));
  }

  get unlocksAt(): BigInt {
    let value = this.get("unlocksAt");
    return value!.toBigInt();
  }

  set unlocksAt(value: BigInt) {
    this.set("unlocksAt", Value.fromBigInt(value));
  }

  get createdAt(): BigInt {
    let value = this.get("createdAt");
    return value!.toBigInt();
  }

  set createdAt(value: BigInt) {
    this.set("createdAt", Value.fromBigInt(value));
  }

  get updatedAt(): BigInt {
    let value = this.get("updatedAt");
    return value!.toBigInt();
  }

  set updatedAt(value: BigInt) {
    this.set("updatedAt", Value.fromBigInt(value));
  }

  get transactionHash(): string {
    let value = this.get("transactionHash");
    return value!.toString();
  }

  set transactionHash(value: string) {
    this.set("transactionHash", Value.fromString(value));
  }

  get tokens(): Array<string> | null {
    let value = this.get("tokens");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set tokens(value: Array<string> | null) {
    if (!value) {
      this.unset("tokens");
    } else {
      this.set("tokens", Value.fromStringArray(<Array<string>>value));
    }
  }

  get allocations(): Array<string> | null {
    let value = this.get("allocations");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set allocations(value: Array<string> | null) {
    if (!value) {
      this.unset("allocations");
    } else {
      this.set("allocations", Value.fromStringArray(<Array<string>>value));
    }
  }
}

export class LegacyToken extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save LegacyToken entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type LegacyToken must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("LegacyToken", id.toString(), this);
    }
  }

  static load(id: string): LegacyToken | null {
    return changetype<LegacyToken | null>(store.get("LegacyToken", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get token(): Bytes {
    let value = this.get("token");
    return value!.toBytes();
  }

  set token(value: Bytes) {
    this.set("token", Value.fromBytes(value));
  }

  get legacy(): string {
    let value = this.get("legacy");
    return value!.toString();
  }

  set legacy(value: string) {
    this.set("legacy", Value.fromString(value));
  }

  get allocations(): Array<string> | null {
    let value = this.get("allocations");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set allocations(value: Array<string> | null) {
    if (!value) {
      this.unset("allocations");
    } else {
      this.set("allocations", Value.fromStringArray(<Array<string>>value));
    }
  }
}

export class Allocation extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Allocation entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Allocation must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Allocation", id.toString(), this);
    }
  }

  static load(id: string): Allocation | null {
    return changetype<Allocation | null>(store.get("Allocation", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get legacy(): string {
    let value = this.get("legacy");
    return value!.toString();
  }

  set legacy(value: string) {
    this.set("legacy", Value.fromString(value));
  }

  get from(): string {
    let value = this.get("from");
    return value!.toString();
  }

  set from(value: string) {
    this.set("from", Value.fromString(value));
  }

  get to(): string {
    let value = this.get("to");
    return value!.toString();
  }

  set to(value: string) {
    this.set("to", Value.fromString(value));
  }

  get withdrawn(): boolean {
    let value = this.get("withdrawn");
    return value!.toBoolean();
  }

  set withdrawn(value: boolean) {
    this.set("withdrawn", Value.fromBoolean(value));
  }

  get token(): string {
    let value = this.get("token");
    return value!.toString();
  }

  set token(value: string) {
    this.set("token", Value.fromString(value));
  }

  get percentage(): BigInt {
    let value = this.get("percentage");
    return value!.toBigInt();
  }

  set percentage(value: BigInt) {
    this.set("percentage", Value.fromBigInt(value));
  }

  get createdAt(): BigInt {
    let value = this.get("createdAt");
    return value!.toBigInt();
  }

  set createdAt(value: BigInt) {
    this.set("createdAt", Value.fromBigInt(value));
  }

  get updatedAt(): BigInt {
    let value = this.get("updatedAt");
    return value!.toBigInt();
  }

  set updatedAt(value: BigInt) {
    this.set("updatedAt", Value.fromBigInt(value));
  }
}
