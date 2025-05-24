class Lexer {
  constructor(highLight, ans, j) {
    this.highLight = highLight;
    this.ans = ans;
    this.j = j;
    this.status = 0;
  }

  setIndex(i) {
    this.i = i;
  }

  makeToken(type, elem) {
    if (typeof type !== 'string') {
      throw new Error('[Error] The parameter type should be string.');
    }
    let ans;
    if (elem !== undefined) {
      ans = { type, elem, };
    } else {
      ans = { type, };
    }
    return ans;
  }

  quit() {
    if (this.i !== undefined) {
      this.highLight.ins[this.i] = undefined;
    }
    return false;
  }

  getReciprocalToken(num) {
    if (!Number.isInteger(num)) {
      throw new Error('[Error] The parameter num should bd a integer type.');
    }
    const { ans, } = this;
    const { length, } = ans;
    return ans[length - num];
  }

  prepareChars(char) {
    if (typeof char !== 'string') {
      throw new Error('[Error] prepare chars and jump parameters char should be string type');
    }
    this.chars = [];
    this.chars.push(char);
  }

  prepareCharsAndJump(char, status) {
    if (typeof char !== 'string') {
      throw new Error('[Error] prepare chars and jump parameters char should be string type');
    }
    if (typeof status !== 'number') {
      throw new Error('[Error] prepare chars and jump parameters status should be numberic type');
    }
    this.chars = [];
    this.chars.push(char);
    this.status = status;
  }

  prepareEmptyCharsAndJump(status) {
    if (typeof status !== 'number') {
      throw new Error('[Error] prepare empty chars and jump parameters status should be numberic type');
    }
    this.chars = [];
    this.status = status;
  }

  createToken(type, elem) {
    if (typeof type !== 'string') {
      throw new Error('[Error] create token parameters type should be string type');
    }
    if (typeof elem !== 'string') {
      throw new Error('[Error] create token parameters elem should be string type');
    }
    this.ans.push(this.makeToken(type, elem));
    return this.quit();
  }

  removeToken() {
    const { ans, } = this;
    const { length, } = ans;
    if (length === 0) {
      throw new Error('[Error] The result set length is empty and cannot be removed.');
    }
    ans.pop();
  }

  removeTokens(int) {
    if (!Number.isInteger(int)) {
      throw new Error('[Error] The parameter num should be of integer type');
    }
    for (let i = 1; i <= int; i += 1) {
      this.removeToken();
    }
  }

  createTokens(array) {
    if (Array.isArray(array)) {
      const { ans, } = this;
      array.forEach(([type, elem]) => {
        ans.push(this.makeToken(type, elem));
      });
      return this.quit();
    } else {
      throw new Error('[Error] create tokens parameters array should be array type');
    }
  }

  createTokenChars(type) {
    if (typeof type !== 'string') {
      throw new Error('[Error] create token chars parameters type should be string type');
    }
    const { chars, } = this;
    const string = chars.join('');
    switch (string) {
      case '':
      case ' ':
      case '\n':
        return this.quit();
      default:
      return this.createToken(type, string);
    }
  }

  appendToken(type, elem) {
    if (typeof type !== 'string') {
      throw new Error('[Error] Append token parameter type should be string type.');
    }
    if (typeof elem !== 'string') {
      throw new Error('[Error] Append token parameter elem should be character type.');
    }
    const { ans, } = this;
    ans.push(this.makeToken(type, elem));
  }

  appendTokenChars(type) {
    if (typeof type !== 'string') {
      throw new Error('[Error] Append token chars parameter type should be string type.');
    }
    const { ans, chars, } = this;
    const string = chars.join('');
    switch (string) {
      case '':
      case ' ':
      case '\n':
        break;
      default:
        ans.push(this.makeToken(type, chars.join('')));
    }
    this.chars = [];
  }

  appendTokenAndJump(type, char, status) {
    if (typeof status !== 'number') {
      throw new Error('[Error] append to token and jump parameters status should be numberic type');
    }
    this.appendToken(type, char);
    this.status = status;
  }

  appendTokenCharsAndJump(type, status) {
    if (typeof status !== 'number') {
      throw new Error('[Error] append to token chars and jump parameters status should be numberic type');
    }
    this.appendTokenChars(type);
    this.status = status;
  }
}

export default Lexer;
