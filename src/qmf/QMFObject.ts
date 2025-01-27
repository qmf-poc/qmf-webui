class QMFObject {
  readonly owner: string;
  readonly name: string;
  readonly type: string;

  constructor(owner: string, name: string, type: string) {
    this.owner = owner;
    this.name = name;
    this.type = type;
  }
}

export default QMFObject;
