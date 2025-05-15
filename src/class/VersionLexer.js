import Lexer from '~/class/Lexer'

class VersionLexer extends Lexer {
  constructor(...param) {
    super(...param);
  }

  scan(char) {
    switch (this.status) {
      case 0: {
        switch (char) {
          case '.':
            this.ans.push(this.makeToken('symbol', '.'));
            return this.quit();
            break;
          case 'v':
            this.ans.push(this.makeToken('symbol', 'v'));
            return this.quit();
            break;
        }
        const code = char.charCodeAt(0);
        if (code >= 48 && code <= 57) {
          this.elems = [];
          this.elems.push(char);
          this.status = 1;
        }
        break;
      }
      case 1: {
        const code = char.charCodeAt(0);
        if (code >= 48 && code <= 57) {
          this.elems.push(char);
        } else if (char === '.' || char === '') {
          this.ans.push(this.makeToken('version', this.elems.join('')))
            return this.quit();
        }
      }
    }
  }
}

export default VersionLexer;
