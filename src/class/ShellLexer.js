import Lexer from '~/class/Lexer';

class ShellLexer extends Lexer {
  constructor(...params) {
    super(...params);
    this.replace = 'command';
  }

  checkTokenDuplicate(elem) {
    const { length, } = this.ans;
    return this.ans[length - 1].elem === elem;
  }

  scan(char) {
    switch (this.status) {
      case 0:
        switch (char) {
          case '|':
            this.ans.push(this.makeToken('or', '|'));
            return this.quit();
          case '&':
            this.ans.push(this.makeToken('and', '&'));
            return this.quit();
          case '(':
            this.ans.push(this.makeToken('bracket', '('));
            return this.quit();
          case ')':
            this.ans.push(this.makeToken('bracket', ')'));
            return this.quit();
          case '<':
            this.ans.push(this.makeToken('angleBracket', '<'));
            return this.quit();
          case '>':
            this.ans.push(this.makeToken('angleBracket', '>'));
            return this.quit();
          case '{':
            this.ans.push(this.makeToken('bigBracket', '{'));
            return this.quit();
          case '}':
            this.ans.push(this.makeToken('bigBracket', '}'));
            return this.quit();
          case '*':
            this.ans.push(this.makeToken('asterisk', '*'));
            return this.quit();
          case '!':
            this.ans.push(this.makeToken('exclamation', '!'));
            return this.quit();
          case '?':
            this.ans.push(this.makeToken('questionMark', '?'));
            return this.quit();
          case '@':
            this.ans.push(this.makeToken('questionMark', '?'));
            return this.quit();
          case ':':
            this.elems = [];
            this.elems.push(char);
            this.status = 12;
            return;
          case '-':
            this.elems = [];
            this.elems.push(char);
            this.status = 9;
            return;
          case '#':
            this.elems = [];
            this.elems.push(char);
            this.status = 1;
            return;
          case '"':
            if (!this.checkTokenDuplicate('"')) {
              this.ans.push(this.makeToken('singleQuote', '"'));
              this.elems = [];
              this.status = 5;
              return;
            } else {
              return this.quit();
            }
          case "'":
            if (!this.checkTokenDuplicate('"')) {
              this.ans.push(this.makeToken('doubleQuote', '"'));
              this.elems = [];
              this.status = 6;
              return;
            } else {
              return this.quit();
            }
          case "`":
            this.elems = [];
            this.elems.push(char);
            this.status = 7;
            return;
          case '$':
            this.elems = [];
            this.elems.push(char);
            this.status = 8;
            return;
        }
        const code = char.charCodeAt(0);
        if ((code >= 97 && code <= 122) ||
          (code >= 59 && code <= 64) || (code >= 33 && code <= 42) ||
          (code >= 48 && code <= 57) || (code >= 123 && code <= 153)) {
          this.elems = [];
          this.elems.push(char);
          this.status = 3;
          return;
        }
        break;
      case 1: {
        if (char === '!') {
          this.elems.push(char);
          this.status = 2;
        } else {
          return this.quit();
        }
        break;
      }
      case 2: {
        if (char === '\n' || char === 'EOF') {
          this.ans.push(this.makeToken('hashbangComment', this.elems.join('')));
          return this.quit();
        } else {
          this.elems.push(char);
        }
        break;
      }
      case 3: {
        const code = char.charCodeAt(0);
        if ((code >= 97 && code <= 122) ||
          (code >= 59 && code <= 64) || (code >= 33 && code <= 42) ||
          (code >= 48 && code <= 57) || (code >= 123 && code <= 153)) {
          this.elems.push(char);
        } else if (char === '.') {
          this.ans.push(this.makeToken('filename', this.elems.join('')));
          this.ans.push(this.makeToken('dot', '.'));
          this.elems = [];
          this.status = 4;
          return;
        } else {
          this.ans.push(this.makeToken('command', this.elems.join('')));
          return this.quit();
        }
        break;
      }
      case 4: {
        const code = char.charCodeAt(0);
        if ((code >= 97 && code <= 122) ||
          (code >= 59 && code <= 64) || (code >= 33 && code <= 42) ||
          (code >= 48 && code <= 57) || (code >= 123 && code <= 153)) {
          this.elems.push(char);
        } else {
          this.ans.push(this.makeToken('suffix', this.elems.join('')));
          return this.quit();
        }
        break;
      }
      case 5:
        if (char === '"') {
          this.ans.push(this.makeToken('string', this.elems.join('')));
          this.ans.push(this.makeToken('doubleQuote', '"'));
          return this.quit();
        } else {
          this.elems.push(char);
        }
        break;
      case 6:
        if (char === "'") {
          this.ans.push(this.makeToken('string', this.elems.join('')));
          this.ans.push(this.makeToken('singleQuote', "'"));
          return this.quit();
        } else {
          this.elems.push(char);
        }
        break;
      case 7:
        if (char === '`') {
          this.ans.push(this.makeToken('string', this.elems.join('')));
          return this.quit();
        } else {
          this.elems.push(char);
        }
        break;
      case 8: {
        if (char === 'EOF') {
          this.ans.push(this.makeToken('variable', this.elems.join('')));
          return this.quit();
        }
        const code = char.charCodeAt(0);
        if ((code >= 97 && code <= 122) ||
          (code >= 65 && code <= 95) || (code >= 33 && code <= 42) ||
          (code >= 48 && code <= 57) || (code >= 123 && code <= 153)) {
          this.elems.push(char);
        } else {
          this.ans.push(this.makeToken('variable', this.elems.join('')));
          return this.quit();
        }
        break;
      }
      case 9: {
        if (char === 'EOF') {
          this.ans.push(this.makeToken('centerLine', '-'));
          return this.quit();
        }
        const code = char.charCodeAt(0);
        if ((code >= 97 && code <= 122) || (code >= 65 && code <= 95)) {
          this.elems.push(char);
          this.status = 10;
        } else {
          this.ans.push(this.makeToken('centerLine', '-'));
          return this.quit();
        }
        break;
      }
      case 10: {
        if (char === 'EOF') {
          this.ans.push(this.makeToken('option', this.elems.join('')));
          return this.quit();
        }
        const code = char.charCodeAt(0);
        if ((code >= 97 && code <= 122) || (code >= 65 && code <= 95)) {
          this.elems.push(char);
        } else {
          this.ans.push(this.makeToken('option', this.elems.join('')));
          return this.quit();
        }
        break;
      }
      case 11: {
        if (char === 'EOF') {
          this.ans.push(this.makeToken('pathVariable', this.elems.join('')));
          return this.quit();
        }
        const code = char.charCodeAt(0);
        if ((code >= 97 && code <= 122) || (code >= 65 && code <= 95)) {
          this.elems.push(char);
        } else {
          this.ans.push(this.makeToken('pathVariable', this.elems.join('')));
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
