import Lexer from '~/class/Lexer';

class ShellLexer extends Lexer {
  constructor(...params) {
    super(...params);
  }

  scan(char) {
    switch (this.status) {
      case 0:
        switch (char) {
          case '-':
            this.ans.push(this.makeLexer('centerLine', '-'));
            return this.quit();
          case '|':
            this.status = 1;
            return;
          case '#':
            this.elems = [];
            this.elems.push(char);
            this.status = 2;
            return;
        }
        const code = char.charCodeAt(0);
        if ((code >= 97 && code <= 122) ||
          (code >= 59 && code <= 64) || (code >= 33 && code <= 42) ||
          (code >= 47 && code <= 47) || (code >= 123 && code <= 153)) {
          this.elems = [];
          this.elems.push(char);
          this.status = 4;
          return;
        }
        break;
      case 1:
        switch (char) {
          case ' ':
            this.ans.push(this.makeLexer('symbol', '|'));
            return this.quit();
          case 'EOF':
            return this.quit();
          default:
            return this.quit();
        }
        break;
      case 2: {
        if (char === '!') {
          this.elems.push(char);
          this.status = 3;
        } else {
          return this.quit();
        }
        break;
      }
      case 3: {
        if (char === '\n' || char === 'EOF') {
          this.ans.push(this.makeLexer('hashbangComment', this.elems.join('')));
          return this.quit();
        } else {
          this.elems.push(char);
        }
        break;
      }
      case 4: {
        const code = char.charCodeAt(0);
        if ((code >= 97 && code <= 122) ||
          (code >= 59 && code <= 64) || (code >= 33 && code <= 42) ||
          (code >= 47 && code <= 57) || (code >= 123 && code <= 153)) {
          this.elems.push(char);
        } else if (char === '.') {
          this.elems.push(char);
          this.status = 5;
        } else {
          this.ans.push(this.makeLexer('command', this.elems.join('')));
          return this.quit();
        }
        break;
      }
      case 5: {
        const code = char.charCodeAt(0);
        if ((code >= 97 && code <= 122) ||
          (code >= 59 && code <= 64) || (code >= 33 && code <= 42) ||
          (code >= 47 && code <= 57) || (code >= 123 && code <= 153)) {
          this.elems.push(char);
        } else {
          this.ans.push(this.makeLexer('filename', this.elems.join('')));
          return this.quit();
        }
        break;
      }
      default:
        return this.quit();
    }
  }
}

export default ShellLexer;
