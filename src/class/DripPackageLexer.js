import Lexer from './Lexer';

class DripPackageLexer extends Lexer {
  constructor(...params) {
    super(...params);
  }

  scan(char) {
    const { status, } = this;
    switch (status) {
      case 0:
        switch (char) {
          case '[':
            this.appendTokenAndJump('squareBracket', char, 1);
            this.chars = [];
            break;
          default:
            return this.quit();
        }
        break;
      case 1:
        switch (char) {
          case ']':
            this.appendTokenChars('name');
            this.appendTokenAndJump('squareBracket', char, 2);
            break;
          default:
            this.chars.push(char);
        }
        break;
      case 2:
        switch (char) {
          case '(':
            this.appendTokenAndJump('bracket', char, 3);
            break;
          default:
            return this.quit();
        }
        break;
      case 3:
        switch (char) {
          case ')':
            this.appendTokenChars('address');
            return this.createToken('bracket', char);
          default:
            this.chars.push(char);
          break;
        }
        break;
    }
  }
}

export default DripPackageLexer;
