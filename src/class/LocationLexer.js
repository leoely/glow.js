import Lexer from '~/class/Lexer';

class LocationLexer extends Lexer {
  constructor(...param) {
    super(...param);
  }

  scan(char) {
    const { status, } = this;
    switch (status) {
      case 0:
        switch (char) {
          case '.':
            this.appendToken(char, 'dot');
            this.status = 1;
            break;
          case '/':
            this.appendToken(char, 'slash');
            this.prepareEmptyCharsAndJump(3);
            break;
          default:
            this.prepareCharsAndJump(char, 4);
        }
        break;
      case 1:
        switch (char) {
          case '/':
            this.appendToken(char, 'slash');
            this.status = 2;
            break;
          case '.':
            this.appendToken(char, 'dot');
            break;
          default:
            return this.quit();
        }
        break;
      case 2:
        switch (char) {
          case '.':
            this.appendToken(char, 'dot');
            this.status = 1;
            break;
          case '/':
            this.appendToken(char, 'slash');
            break;
          default:
            this.prepareCharsAndJump(char, 3);
        }
        break;
      case 3:
        switch (char) {
          case '.':
            if (this.chars.length === 0) {
              this.appendToken(char, 'dot');
              this.status = 1;
            } else {
              this.chars.push(char);
            }
            break;
          case '/':
            this.appendTokenChars('namespace');
            this.appendToken(char, 'slash');
            break;
          case '':
            return this.createTokenChars('namespace');
          default:
            this.chars.push(char);
        }
        break;
      case 4:
        switch(char) {
          case ':':
            this.appendTokenChars('protocol');
            this.appendTokenAndJump(char, 'colon', 5);
            break;
          case ' ':
            return this.quit();
          default:
            this.chars.push(char);
        }
        break
      case 5:
        switch (char) {
          case '/':
            this.appendTokenAndJump(char, 'slash', 6);
            break;
          default:
            return this.quit();
        }
        break;
      case 6:
        switch (char) {
          case '/':
            this.chars = [];
            this.appendTokenAndJump(char, 'slash', 7);
            break;
          default:
            return this.quit();
        }
        break;
      case 7:
        switch (char) {
          case '/':
            this.appendTokenChars('namespace');
            this.appendTokenAndJump(char, 'slash', 8);
            break;
          case ':':
            this.appendTokenChars('host');
            this.appendTokenAndJump(char, 'colon', 8);
            this.chars = [];
            break;
          default:
            this.chars.push(char);
        }
        break;
      case 8:
        switch (char) {
          case '/':
            this.appendTokenChars('port');
            this.appendTokenAndJump(char, 'slash', 9);
            break;
          default:
            this.chars.push(char);
        }
        break;
      case 9:
        switch (char) {
          case '/':
            this.appendTokenAndJump(char, 'slash', 10);
            break;
          default:
            this.prepareChars(char);
            this.prepareCharsAndJump(char, 10);
        }
        break;
      case 10:
        switch (char) {
          case '/':
            this.appendTokenChars('namespace');
            this.appendTokenAndJump(char, 'slash', 9);
            break;
          case '':
          case ' ':
            return this.createTokenChars('namespace');
          default:
            this.chars.push(char);
        }
        break;
    }
  }
}

export default LocationLexer;
