export class User {
  walletAddresses: string[];

  constructor(walletAddresses: readonly `0x${string}`[]) {
    this.walletAddresses = [...walletAddresses];
  }

  getId() {
    return `${this.walletAddresses.join('')}`;
  }

  get name() {
    return localStorage.getItem(`${this.getId()}-name`);
  }

  get description() {
    return localStorage.getItem(`${this.getId()}-description`);
  }

  get profileUrl() {
    return localStorage.getItem(`${this.getId()}-profileUrl`);
  }

  setName(name: string) {
    localStorage.setItem(`${this.getId()}-name`, name);
  }

  setDescription(description: string) {
    localStorage.setItem(`${this.getId()}-description`, description);
  }

  setProfileUrl(profileUrl: string) {
    localStorage.setItem(`${this.getId()}-profileUrl`, profileUrl);
  }

  toJson() {
    return {
      name: this.name,
      description: this.description,
      walletAddresses: this.walletAddresses,
    };
  }
}
