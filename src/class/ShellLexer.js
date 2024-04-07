import Lexer from '~/class/Lexer';

class ShellLexer extends Lexer {
  constructor(...params) {
    super(...params);
  }

  scan(char) {
    switch (this.status) {
      case 0:
        switch (char) {
          case '|':
            this.ans.push(this.makeLexer('or', '|'));
            return this.quit();
          case '&':
            this.ans.push(this.makeLexer('and', '&'));
            return this.quit();
          case '(':
            this.ans.push(this.makeLexer('bracket', '('));
            return this.quit();
          case ')':
            this.ans.push(this.makeLexer('bracket', ')'));
            return this.quit();
          case '<':
            this.ans.push(this.makeLexer('angleBracket', '<'));
            return this.quit();
          case '>':
            this.ans.push(this.makeLexer('angleBracket', '>'));
            return this.quit();
          case '{':
            this.ans.push(this.makeLexer('bigBracket', '{'));
            return this.quit();
          case '}':
            this.ans.push(this.makeLexer('bigBracket', '}'));
            return this.quit();
          case '|':
            this.ans.push(this.makeLexer('diving', '|'));
            return this.quit();
          case '*':
            this.ans.push(this.makeLexer('asterisk', '*'));
            return this.quit();
          case '!':
            this.ans.push(this.makeLexer('exclamation', '!'));
            return this.quit();
          case '?':
            this.ans.push(this.makeLexer('questionMark', '?'));
            return this.quit();
          case '@':
            this.ans.push(this.makeLexer('questionMark', '?'));
            return this.quit();
          case ':':
            this.elems = [];
            this.elems.push(char);
            this.status = 11;
          case '-':
            this.elems = [];
            this.elems.push(char);
            this.status = 9;
            return;
          case '#':
            this.elems = [];
            this.elems.push(char);
            this.status = 1;
          case '"':
            this.elems = [];
            this.elems.push(char);
            this.status = 5;
            return;
          case "'":
            this.elems = [];
            this.elems.push(char);
            this.status = 6;
            return;
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
          (code >= 47 && code <= 57) || (code >= 123 && code <= 153)) {
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
          this.ans.push(this.makeLexer('hashbangComment', this.elems.join('')));
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
          (code >= 47 && code <= 57) || (code >= 123 && code <= 153)) {
          this.elems.push(char);
        } else if (char === '.') {
          this.elems.push(char);
          this.status = 4;
        } else {
          this.ans.push(this.makeLexer('command', this.elems.join('')));
          return this.quit();
        }
        break;
      }
      case 4: {
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
      case 5:
        if (char === '"') {
          this.ans.push(this.makeLexer('string', this.elems.join('')));
          return this.quit();
        } else {
          this.elems.push(char);
        }
        break;
      case 6:
        if (char === '"') {
          this.ans.push(this.makeLexer('string', this.elems.join('')));
          return this.quit();
        } else {
          this.elems.push(char);
        }
        break;
      case 7:
        if (char === '`') {
          this.ans.push(this.makeLexer('string', this.elems.join('')));
          return this.quit();
        } else {
          this.elems.push(char);
        }
        break;
      case 8: {
        if (char === 'EOF') {
          this.ans.push(this.makeLexer('variable', this.elems.join('')));
          return this.quit();
        }
        const code = char.charCodeAt(0);
        if ((code >= 97 && code <= 122) ||
          (code >= 65 && code <= 95) || (code >= 33 && code <= 42) ||
          (code >= 45 && code <= 57) || (code >= 123 && code <= 153)) {
          this.elems.push(char);
        } else {
          this.ans.push(this.makeLexer('variable', this.elems.join('')));
          return this.quit();
        }
        break;
      }
      case 9: {
        const code = char.charCodeAt(0);
        if ((code >= 97 && code <= 122) || (code >= 65 && code <= 95)) {
          this.elems.push(char);
          this.status = 10;
        } else {
          this.ans.push(this.makeLexer('centerLine', '-'));
        }
        break;
      }
      case 10: {
        if (char === 'EOF') {
          this.ans.push(this.makeLexer('option', this.elems.join('')));
          return this.quit();
        }
        const code = char.charCodeAt(0);
        if ((code >= 97 && code <= 122) || (code >= 65 && code <= 95)) {
          this.elems.push(char);
        } else {
          this.ans.push(this.makeLexer('option', this.elems.join('')));
          return this.quit();
        }
        break;
      }
      case 11: {
        if (char === 'EOF') {
          this.ans.push(this.makeLexer('pathVariable', this.elems.join('')));
          return this.quit();
        }
        const code = char.charCodeAt(0);
        if ((code >= 97 && code <= 122) || (code >= 65 && code <= 95)) {
          this.elems.push(char);
        } else {
          this.ans.push(this.makeLexer('pathVariable', this.elems.join('')));
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
