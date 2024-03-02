import Lexer from '~/class/Lexer';

class JavascriptLexer extends Lexer {
  constructor(...params) {
    super(...params);
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
            this.ans.push(this.makeLexer('.'));
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
              this.ans.push(this.makeLexer('bigParenthese', '{'));
              return this.quit();
            }
          case '}':
            if (!this.checkLexerDuplicate('}')) {
              this.ans.push(this.makeLexer('bigParenthese', '}'));
              return this.quit();
            }
          case ';':
            if (!this.checkLexerDuplicate(';')) {
              this.ans.push(this.makeLexer(';'));
              return this.quit();
            }
          case ':':
            this.ans.push(this.makeLexer(':'));
            return this.quit();
          case ',':
            if (!this.checkLexerDuplicate(',')) {
              this.ans.push(this.makeLexer(','));
              return this.quit();
            }
          case '"': {
            if (!this.checkLexerDuplicate('"')) {
              this.elem = [];
              this.ans.push(this.makeLexer('"'));
              this.status = 3;
              return;
            }
          }
          case "'": {
            if (!this.checkLexerDuplicate("'")) {
              this.elem = [];
              this.ans.push(this.makeLexer("'"));
              this.status = 4;
              break;
            }
          }
        }
        const code = char.charCodeAt(0);
        if (
          (code >= 97 && code <= 122) ||
          (code >= 65 && code <= 90) || (code === 95)
        ) {
          this.elem = [];
          this.elem.push(char);
          this.status = 1;
          return;
        }
        break;
      }
      case 1: {
        const code = char.charCodeAt(0);
        if (
          (code >= 97 && code <= 122) ||
          (code >= 65 && code <= 90) ||
          (code > 58 && code <= 64) || (code === 95)
        ) {
          this.elem.push(char);
        } else if (code >= 48 && code <= 57) {
          this.status = 2;
          this.elem.push(char);
        } else {
          this.ans.push(this.makeLexer('identifer', this.elem.join('')));
          return this.quit();
        }
        break;
      }
      case 2: {
        const code = char.charCodeAt(0);
        if (code >= 48 && code <= 57) {
          this.elem.push(char);
        } else {
          this.ans.push(this.makeLexer('identifer', this.elem.join('')));
          return this.quit();
        }
        break;
      }
      case 3: {
        if (char === '"') {
          this.ans.push(this.makeLexer('string', this.elem.join('')));
          this.ans.push(this.makeLexer('"'));
          doubleQuoteClose = 1;
          return this.quit();
        } else {
          this.elem.push(char);
        }
        break;
      }
      case 4: {
        if (char === "'") {
          this.ans.push(this.makeLexer('string', this.elem.join('')));
          this.ans.push(this.makeLexer("'"));
          singleQuoteClose = 1;
          return this.quit();
        } else {
          this.elem.push(char);
        }
        break;
      }
      default:
        return this.quit();
    }
  }
}

export default JavascriptLexer;
