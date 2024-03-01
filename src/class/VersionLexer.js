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
            this.ans.push(this.makeLexer('.'));
            return this.quit();
            break;
          case 'v':
            this.ans.push(this.makeLexer('v'));
            return this.quit();
            break;
        }
        const code = char.charCodeAt(0);
        if (code >= 48 && code <= 57) {
          this.elem = [];
          this.elem.push(char);
          this.status = 1;
        }
        break;
      }
      case 1: {
        const code = char.charCodeAt(0);
        if (code >= 48 && code <= 57) {
          this.elem.push(char);
        } else if (char === '.' || char === 'EOF') {
          this.ans.push(this.makeLexer('version', this.elem.join('')))
            return this.quit();
        }
      }
    }
  }
}

export default VersionLexer;
