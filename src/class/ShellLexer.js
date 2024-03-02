import Lexer from '~/class/Lexer';

class ShellLexer extends Lexer {
  constructor(...params) {
    super(...params);
  }

  scan(char) {
    switch (this.status) {
      case 0:
        switch (char) {
          case 'n':
            this.elems = [];
            this.elems.push(char);
            this.status = 1;
            break;
          case 'c':
            this.elems = [];
            this.elems.push(char);
            this.status = 2;
            break;
          case '-':
            this.ans.push(this.makeLexer('symbol', '-'));
            return this.quit();
            break;
          case '|':
            this.status = 4;
            break;
          default:
            return this.quit();
            break;
        }
        break;
      case 1:
        switch (this.elems.length) {
          case 1:
            if (char === 'o') {
              this.elems.push(char);
            } else {
              return this.quit();
            }
            break;
          case 2:
            if (char === 'd') {
              this.elems.push('d');
            } else {
              return this.quit();
            }
            break;
          case 3:
            if (char === 'e') {
              this.elems.push(char)
              this.ans.push(this.makeLexer('command', this.elems.join('')));
              return this.quit();
            } else {
              return this.quit();
            }
            break;
          default:
            return this.quit();
        }
        break;
      case 2:
        switch (this.elems.length) {
          case 1:
            if (char === 'u') {
              this.elems.push(char);
            } else {
              return this.quit();
            }
            break;
          case 2:
            if (char === 'r') {
              this.elems.push('r');
            } else {
              return this.quit();
            }
            break;
          case 3:
            if (char === 'l') {
              this.elems.push(char);
              this.ans.push(this.makeLexer('command', this.elems.join('')));
              return this.quit();
            } else {
              return this.quit();
            }
            break;
          default:
            return this.quit();
        }
        break;
      case 4:
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
      default:
        return this.quit();
    }
  }
}

export default ShellLexer;
