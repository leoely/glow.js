import Lexer from './Lexer';

class NumberLexer extends Lexer {
  constructor(...params) {
    super(...params);
  }

  scan(char) {
    const { status, } = this;
    switch (status) {
      case 0:
        if (char >= '0' && char <= '9') {
          this.prepareCharsAndJump(char, 1);
        } else {
          return this.quit();
        }
        break;
      case 1:
        switch (char) {
          case '':
          case ' ':
            this.appendTokenChars('number');
            break;
          case '\'':
          case ',':
          case '.':
          case '_': {
            const { length, } = this.chars;
            if (length >= 1 && length <= 3) {
              this.appendTokenChars('number');
              this.appendTokenAndJump('separator', char, 2);
            } else {
              return this.quit();
            }
            break;
          }
          default:
            if (char >= '0' && char <= '9') {
              this.chars.push(char);
            } else {
              return this.quit();
            }
        }
        break;
      case 2:
        switch (char) {
          case '':
          case ' ':
            this.appendTokenChars('number');
            break;
          case '\'':
          case ',':
          case '.':
          case '_':
            if (this.chars.length === 3) {
              this.appendTokenChars('number');
              this.appendTokenAndJump('separator', char, 2);
            } else {
              return this.quit();
            }
            break;
          default:
            if (char >= '0' && char <= '9') {
              this.chars.push(char);
            } else {
              return this.quit();
            }
        }
        break;
    }
  }
}

export default NumberLexer;
