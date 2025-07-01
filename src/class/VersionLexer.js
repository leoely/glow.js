import Lexer from '~/class/Lexer'

class VersionLexer extends Lexer {
  constructor(...params) {
    super(...params);
  }

  scan(char) {
    const { status, } = this;
    switch (status) {
      case 0:
        switch (char) {
          case '.':
            this.appendToken('dot', char);
            break;
          case 'v':
            this.appendToken('head', char);
            break;
          default:
            if (char >= '0' && char <= '9') {
              this.prepareCharsAndJump(char, 1);
            }
        }
        break;
      case 1: {
        if (char >= '0' && char <= '9') {
          this.chars.push(char);
        } else {
          switch (char) {
            case '.':
              this.appendTokenChars('version');
              this.appendToken('dot', char);
              break;
            case '':
              this.appendTokenChars('version');
              break;
            default:
              return this.quit();
          }
        }
        break;
      }
    }
  }
}

export default VersionLexer;
