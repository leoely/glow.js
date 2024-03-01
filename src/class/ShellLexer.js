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
            this.elem = [];
            this.elem.push(char);
            this.status = 1;
            break;
          case 'c':
            this.elem = [];
            this.elem.push(char);
            this.status = 2;
            break;
          case '-':
            this.ans.push(this.makeLexer('-'));
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
        switch (this.elem.length) {
          case 1:
            if (char === 'o') {
              this.elem.push(char);
            } else {
              return this.quit();
            }
            break;
          case 2:
            if (char === 'd') {
              this.elem.push('d');
            } else {
              return this.quit();
            }
            break;
          case 3:
            if (char === 'e') {
              this.elem.push(char)
              this.ans.push(this.makeLexer('command', this.elem.join('')));
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
        switch (this.elem.length) {
          case 1:
            if (char === 'u') {
              this.elem.push(char);
            } else {
              return this.quit();
            }
            break;
          case 2:
            if (char === 'r') {
              this.elem.push('r');
            } else {
              return this.quit();
            }
            break;
          case 3:
            if (char === 'l') {
              this.elem.push(char);
              this.ans.push(this.makeLexer('command', this.elem.join('')));
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
            this.ans.push(this.makeLexer('|'));
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
