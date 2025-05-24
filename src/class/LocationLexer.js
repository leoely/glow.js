import Lexer from '~/class/Lexer';

class LocationLexer extends Lexer {
  constructor(...param) {
    super(...param);
  }

  dealFile() {
    const { chars, } = this;
    const filenameChars = [];
    const { length, } = chars;
    outer: for (let i = 0; i < length; i += 1) {
      const char = chars.shift();
      switch (char) {
        case '.':
          this.filename = true;
          break outer;
        default:
          filenameChars.push(char);
      }
    }
    const { filename, } = this;
    if (filename === true) {
      this.appendToken('filename', filenameChars.join(''));
      this.appendToken('dot', '.');
      return this.createTokenChars('format');
    } else {
      return this.createToken('namespace', filenameChars.join(''));
    }
  }

  scan(char) {
    const { status, } = this;
    switch (status) {
      case 0:
        switch (char) {
          case ' ':
          case '\n':
          case '':
            return this.quit();
          case '.':
            this.appendToken('dot', char);
            this.status = 1;
            break;
          case '/':
            this.appendToken('slash', char);
            this.prepareEmptyCharsAndJump(3);
            break;
          default:
            this.prepareCharsAndJump(char, 4);
        }
        break;
      case 1:
        switch (char) {
          case '/':
            this.appendToken('slash', char);
            this.status = 2;
            break;
          case '.':
            this.appendToken('dot', char);
            break;
          default:
            this.removeToken();
            this.chars = [];
            this.chars.push('.');
            this.chars.push(char);
            this.status = 11;
        }
        break;
      case 2:
        switch (char) {
          case '.':
            this.appendToken('dot', char);
            this.status = 1;
            break;
          case '/':
            this.appendToken('slash', char);
            break;
          default:
            this.prepareCharsAndJump(char, 3);
        }
        break;
      case 3:
        switch (char) {
          case '.':
            if (this.chars.length === 0) {
              this.appendToken('dot', char);
              this.status = 1;
            } else {
              this.chars.push(char);
            }
            break;
            return  this.createTokenChars('namespace');
          case '/':
            this.appendTokenChars('namespace');
            this.appendToken('slash', char);
            break;
          case '':
          case ' ':
          case '\n':
            return this.dealFile();
          default:
            this.chars.push(char);
        }
        break;
      case 4:
        switch(char) {
          case ':':
            this.appendTokenChars('protocol');
            this.appendTokenAndJump('colon', char, 5);
            break;
          case '':
            this.dealFile();
            break;
          case ' ':
            return this.quit();
          default:
            if (/^[a-zA-Z0-9\-\.]$/.test(char)) {
              this.chars.push(char);
            } else {
              return this.quit();
            }
        }
        break
      case 5:
        switch (char) {
          case '/':
            this.appendTokenAndJump('slash', char, 6);
            break;
          default:
            this.removeTokens(2);
            return this.quit();
        }
        break;
      case 6:
        switch (char) {
          case '/':
            this.chars = [];
            this.appendTokenAndJump('slash', char, 7);
            break;
          default:
            this.removeTokens(2);
            return this.quit();
        }
        break;
      case 7:
        switch (char) {
          case '/':
            this.appendTokenChars('namespace');
            this.appendTokenAndJump('slash', char, 8);
            break;
          case ':':
            this.appendTokenChars('host');
            this.appendTokenAndJump('colon', char, 8);
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
            this.appendTokenAndJump('slash', char, 9);
            break;
          default:
            this.chars.push(char);
        }
        break;
      case 9:
        switch (char) {
          case '/':
            this.appendTokenAndJump('slash', char, 10);
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
            this.appendTokenAndJump('slash', char, 9);
            break;
          case '':
          case ' ':
            this.dealFile();
          default:
            this.chars.push(char);
        }
        break;
      case 11:
        switch (char) {
          case '/':
            this.appendTokenChars('hiddenDirectory');
            this.appendTokenAndJump('slash', char, 3);
            break;
          case ' ':
          case '\n':
          case '':
            return this.createTokenChars('hiddenDirectory');
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

export default LocationLexer;
