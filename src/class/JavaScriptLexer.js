import Lexer from '~/class/Lexer';

class JavascriptLexer extends Lexer {
  constructor(...params) {
    super(...params);
    this.identifer = false;
  }

  checkLexerDuplicate(type) {
    const { length, } = this.ans;
    return this.ans[length - 1].type === type;
  }

  scan(char) {
    switch (this.status) {
      case 0: {
        switch (char) {
          case '.':
            this.ans.push(this.makeLexer('symbol', '.'));
            return this.quit();
          case '*':
            this.ans.push(this.makeLexer('symbol', '*'));
            return this.quit();
          case '(':
            this.ans.push(this.makeLexer('parenthese', '('));
            return this.quit();
          case ')':
            if (!this.checkLexerDuplicate(')')) {
              this.ans.push(this.makeLexer('parenthese', ')'));
              return this.quit();
            }
          case '{':
            if (!this.checkLexerDuplicate('{')) {
              this.ans.push(this.makeLexer('curlyParenthese', '{'));
              return this.quit();
            }
          case '}':
            if (!this.checkLexerDuplicate('}')) {
              this.ans.push(this.makeLexer('curlyParenthese', '}'));
              return this.quit();
            }
          case '[':
            if (!this.checkLexerDuplicate('[')) {
              this.ans.push(this.makeLexer('squareParenthese', '['));
              return this.quit();
            }
          case ']':
            if (!this.checkLexerDuplicate(']')) {
              this.ans.push(this.makeLexer('squareParenthese', ']'));
              return this.quit();
            }
          case ';':
            if (!this.checkLexerDuplicate(';')) {
              this.ans.push(this.makeLexer('symbol', ';'));
              return this.quit();
            }
          case ':':
            this.ans.push(this.makeLexer('symbol', ':'));
            return this.quit();
          case ',':
            if (!this.checkLexerDuplicate(',')) {
              this.ans.push(this.makeLexer('symbol', ','));
              return this.quit();
            }
          case '"': {
            if (!this.checkLexerDuplicate('"')) {
              this.elems = [];
              this.ans.push(this.makeLexer('quotation', '"'));
              this.status = 3;
              return;
            }
          }
          case "'": {
            if (!this.checkLexerDuplicate("'")) {
              this.elems = [];
              this.ans.push(this.makeLexer('quotation', "'"));
              this.status = 4;
              break;
            }
          }
        }
        if (this.identifer === false) {
          switch (char) {
            case 'a':
              this.elems = [];
              this.elems.push(char);
              this.status = 5;
              return;
            case 'b':
              this.elems = [];
              this.elems.push(char);
              this.status = 9;
              return;
            case 'c':
              this.elems = [];
              this.elems.push(char);
              this.status = 13;
              return;
            case 'd':
              this.elems = [];
              this.elems.push(char);
              this.status = 8;
              break;
            case 'e':
              this.elems = [];
              this.elems.push(char);
              this.status = 9;
              break;
            case 'f':
              this.elems = [];
              this.elems.push(char);
              this.status = 9;
              break;
            case 'i':
              this.elems = [];
              this.elems.push(char);
              this.status = 10;
              break;
            case 'l':
              this.elems = [];
              this.elems.push(char);
              this.status = 11;
              break;
            case 'n':
              this.elems = [];
              this.elems.push(char);
              this.status = 12;
              break;
            case 'r':
              this.elems = [];
              this.elems.push(char);
              this.status = 13;
              break;
            case 's':
              this.elems = [];
              this.elems.push(char);
              this.status = 14;
              break;
            case 't':
              this.elems = [];
              this.elems.push(char);
              this.status = 14;
              break;
            case 'v':
              this.elems = [];
              this.elems.push(char);
              this.status = 15;
              break;
            case 'w':
              this.elems = [];
              this.elems.push(char);
              this.status = 16;
              break;
            default:
              this.identifer = false;
          }
        }
        const code = char.charCodeAt(0);
        if (
          (code >= 97 && code <= 122) ||
          (code >= 65 && code <= 90) || (code === 95)
        ) {
          this.elems = [];
          this.elems.push(char);
          this.status = 1;
          return;
        }
        break;
      }
      case 1: {
        if (char === 'EOF') {
          this.ans.push(this.makeLexer('identifer', this.elems.join('')));
          return this.quit();
        }
        const code = char.charCodeAt(0);
        if (
          (code >= 97 && code <= 122) ||
          (code >= 65 && code <= 90) ||
          (code > 58 && code <= 64) || (code === 95)
        ) {
          this.elems.push(char);
        } else if (code >= 48 && code <= 57) {
          this.status = 2;
          this.elems.push(char);
        } else {
          this.ans.push(this.makeLexer('identifer', this.elems.join('')));
          return this.quit();
        }
        break;
      }
      case 2: {
        const code = char.charCodeAt(0);
        if (code >= 48 && code <= 57) {
          this.elems.push(char);
        } else {
          this.ans.push(this.makeLexer('identifer', this.elems.join('')));
          return this.quit();
        }
        break;
      }
      case 3: {
        if (char === '"') {
          this.ans.push(this.makeLexer('string', this.elems.join('')));
          this.ans.push(this.makeLexer('quotation', '"'));
          return this.quit();
        } else {
          this.elems.push(char);
        }
        break;
      }
      case 4: {
        if (char === "'") {
          this.ans.push(this.makeLexer('string', this.elems.join('')));
          this.ans.push(this.makeLexer('quotation', "'"));
          return this.quit();
        } else {
          this.elems.push(char);
        }
        break;
      }
      case 5: {
        if (char === 'w') {
          this.elems.push(char);
          this.status = 6;
        } else if (char === 'EOF') {
          this.ans.push(this.makeLexer('identifer', this.elems.join('')));
          this.quit();
        } else {
          this.identifer = true;
          this.setIndex(this.i - 1);
          this.status = 1;
        }
        break;
      }
      case 6: {
        if (char === 'a') {
          this.elems.push(char);
          this.status = 7;
        } else if (char === 'EOF') {
          this.ans.push(this.makeLexer('identifer', this.elems.join('')));
          this.quit();
        } else {
          this.identifer = true;
          this.setIndex(this.i - 1);
          this.status = 1;
        }
        break;
      }
      case 7: {
        if (char === 'i') {
          this.elems.push(char);
          this.status = 8;
        } else if (char === 'EOF') {
          this.ans.push(this.makeLexer('identifer', this.elems.join('')));
          this.quit();
        } else {
          this.identifer = true;
          this.elems.push(char);
          this.status = 1;
        }
        break;
      }
      case 8: {
        if (char === 't') {
          this.elems.push(char);
          this.ans.push(this.makeLexer('declare', this.elems.join('')));
          this.quit();
        } else if (char === 'EOF') {
          this.ans.push(this.makeLexer('identifer', this.elems.join('')));
          this.quit();
        } else {
          this.identifer = true;
          this.elems.push(char);
          this.status = 1;
        }
        break;
      }
      case 9: {
        if (char === 'r') {
          this.elems.push(char);
          this.status = 10;
        } else if (char === 'EOF') {
          this.ans.push(this.makeLexer('identifer', this.elems.join('')));
          this.quit();
        } else {
          this.identifer = true;
          this.elems.push(char);
          this.status = 1;
        }
        break;
      }
      case 10: {
        if (char === 'e') {
          this.elems.push(char);
          this.status = 11;
        } else if (char === 'EOF') {
          this.ans.push(this.makeLexer('identifer', this.elems.join('')));
          this.quit();
        } else {
          this.identifer = true;
          this.elems.push(char);
          this.status = 1;
        }
        break;
      }
      case 11: {
        if (char === 'a') {
          this.elems.push(char);
          this.status = 12;
        } else if (char === 'EOF') {
          this.ans.push(this.makeLexer('identifer', this.elems.join('')));
          this.quit();
        } else {
          this.identifer = true;
          this.elems.push(char);
          this.status = 1;
        }
        break;
      }
      case 12: {
        if (char === 'k') {
          this.elems.push(char);
          this.ans.push(this.makeLexer('for', this.elems.join('')));
          this.quit();
        } else if (char === 'EOF') {
          this.ans.push(this.makeLexer('identifer', this.elems.join('')));
          this.quit();
        } else {
          this.identifer = true;
          this.elems.push(char);
          this.status = 1;
        }
        break;
      }
      case 13: {
        if (char === 'a') {
          this.elems.push(char);
          this.status = 14;
        } else if (char === 'l') {
          this.elems.push(char);
          this.status = 18;
        } else if (char === 'o') {
          this.elems.push(char);
          this.status = 21;
        } else if (char === 'EOF') {
          this.ans.push(this.makeLexer('identifer', this.elems.join('')));
          this.quit();
        } else {
          this.identifer = true;
          this.elems.push(char);
          this.status = 1;
        }
        break;
      }
      case 14: {
        if (char === 's') {
          this.elems.push(char);
          this.status = 15;
        } else if (char === 't') {
          this.elems.push(char);
          this.status = 16;
        } else if (char === 'EOF') {
          this.ans.push(this.makeLexer('identifer', this.elems.join('')));
          this.quit();
        } else {
          this.identifer = true;
          this.elems.push(char);
          this.status = 1;
        }
        break;
      }
      case 15: {
        if (char === 'e') {
          this.elems.push(char);
          this.ans.push(this.makeLexer('switch', this.elems.join('')));
          this.quit();
        } else if (char === 'EOF') {
          this.ans.push(this.makeLexer('identifer', this.elems.join('')));
          this.quit();
        } else {
          this.identifer = true;
          this.elems.push(char);
          this.status = 1;
        }
        break;
      }
      case 16: {
        if (char === 'c') {
          this.elems.push(char);
          this.status = 17;
        } else if (char === 'EOF') {
          this.ans.push(this.makeLexer('identifer', this.elems.join('')));
          this.quit();
        } else {
          this.identifer = true;
          this.elems.push(char);
          this.status = 1;
        }
        break;
      }
      case 17: {
        if (char === 'h') {
          this.elems.push(char);
          this.ans.push(this.makeLexer('try', this.elems.join('')));
          this.quit();
        } else if (char === 'EOF') {
          this.ans.push(this.makeLexer('identifer', this.elems.join('')));
          this.quit();
        } else {
          this.identifer = true;
          this.elems.push(char);
          this.status = 1;
        }
        break;
      }
      case 18: {
        if (char === 'a') {
          this.elems.push(char);
          this.status = 19;
        } else if (char === 'EOF') {
          this.ans.push(this.makeLexer('identifer', this.elems.join('')));
          this.quit();
        } else {
          this.identifer = true;
          this.elems.push(char);
          this.status = 1;
        }
        break;
      }
      case 19: {
        if (char === 's') {
          this.elems.push(char);
          this.status = 20;
        } else if (char === 'EOF') {
          this.ans.push(this.makeLexer('identifer', this.elems.join('')));
          this.quit();
        } else {
          this.identifer = true;
          this.elems.push(char);
          this.status = 1;
        }
        break;
      }
      case 20: {
        if (char === 's') {
          this.elems.push(char);
          this.ans.push(this.makeLexer('declare', this.elems.join('')));
          this.quit();
        } else if (char === 'EOF') {
          this.ans.push(this.makeLexer('identifer', this.elems.join('')));
          this.quit();
        } else {
          this.identifer = true;
          this.elems.push(char);
          this.status = 1;
        }
        break;
      }
      case 21: {
        if (char === 'n') {
          this.elems.push(char);
          this.status = 22;
        } else if (char === 'EOF') {
          this.ans.push(this.makeLexer('identifer', this.elems.join('')));
          this.quit();
        } else {
          this.identifer = true;
          this.elems.push(char);
          this.status = 1;
        }
        break;
      }
      case 22: {
        if (char === 's') {
          this.elems.push(char);
          this.status = 1000;
        } else if (char === 't') {
          this.elems.push(char);
          this.status = 23;
        } else if (char === 'EOF') {
          this.ans.push(this.makeLexer('identifer', this.elems.join('')));
          this.quit();
        } else {
          this.identifer = true;
          this.elems.push(char);
          this.status = 1;
        }
        break;
      }
      case 23: {
        if (char === 'i') {
          this.elems.push(char);
          this.status = 24;
        } else if (char === 'EOF') {
          this.ans.push(this.makeLexer('identifer', this.elems.join('')));
          this.quit();
        } else {
          this.identifer = true;
          this.elems.push(char);
          this.status = 1;
        }
        break;
      }
      case 24: {
        if (char === 'n') {
          this.elems.push(char);
          this.status = 25;
        } else if (char === 'EOF') {
          this.ans.push(this.makeLexer('identifer', this.elems.join('')));
          this.quit();
        } else {
          this.identifer = true;
          this.elems.push(char);
          this.status = 1;
        }
        break;
      }
      case 25: {
        if (char === 'u') {
          this.elems.push(char);
          this.status = 26;
        } else if (char === 'EOF') {
          this.ans.push(this.makeLexer('identifer', this.elems.join('')));
          this.quit();
        } else {
          this.identifer = true;
          this.elems.push(char);
          this.status = 1;
        }
        break;
      }
      case 26: {
        if (char === 'e') {
          this.elems.push(char);
          this.ans.push(this.makeLexer('for', this.elems.join('')));
          this.quit();
        } else if (char === 'EOF') {
          this.ans.push(this.makeLexer('identifer', this.elems.join('')));
          this.quit();
        } else {
          this.identifer = true;
          this.elems.push(char);
          this.status = 1;
        }
        break;
      }
      default:
        return this.quit();
    }
  }
}

export default JavascriptLexer;
