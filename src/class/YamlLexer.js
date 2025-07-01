import Lexer from './Lexer';

class YamlLexer extends Lexer {
  constructor(...params) {
    super(...params);
  }

  scan(char) {
    const { status, } = this;
    switch (status) {
      case 0:
        switch (char) {
          case ')':
          case '\n':
          case ' ':
            break;
          case '"':
            this.prepareCharsAndJump(char, 2);
            break;
          case '(':
            this.prepareCharsAndJump(char, 3);
            break;
          case '-':
            this.chars = [];
            this.appendToken('dash', char);
            this.status = 4;
            break;
          case ':':
            return this.createToken('colon', ':');
          default:
            this.prepareCharsAndJump(char, 1);
        }
        break;
      case 1:
        switch (char) {
          case ':':
            this.appendTokenChars('key');
            this.appendToken('colon', char);
            this.status = 0;
            break;
          case '(':
            this.appendTokenChars('value');
            this.prepareChars(char);
            this.status = 3;
            break;
          case '':
          case '\n':
          case ' ':
            return this.quit();
          default:
            if (/^[a-zA-Z0-9\-]$/.test(char)) {
              this.chars.push(char);
            } else {
              return this.quit();
            }
        }
        break;
      case 2:
        switch (char) {
          case ' ':
            this.appendTokenChars('notes');
            break;
          case '\n':
            this.appendTokenCharsAndJump('notes', 0);
            break;
          case '':
            return this.createTokenChars('notes');
          default:
            this.chars.push(char);
        }
        break;
      case 3:
        switch (char) {
          case ')':
            this.chars.push(char);
            return this.createTokenChars('unit');
          default:
            this.chars.push(char);
        }
        break;
      case 4:
        switch (char) {
          case ' ':
          case '':
          case '\n':
            this.appendTokenChars('value');
            this.status = 0;
            break;
          default:
            if (/^[a-zA-Z0-9\-]$/.test(char)) {
              this.chars.push(char);
            } else {
              return this.quit();
            }
        }
        break;
    }
  }
}

export default YamlLexer;
