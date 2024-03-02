import Lexer from '~/class/Lexer';

class YamlLexer extends Lexer {
  constructor(...param) {
    super(...param);
  }

  scan(char) {
    switch (this.status) {
      case 0: {
        if (char === ' ') {
          return this.quit();
        }
        const code = char.charCodeAt(0);
        if ((
          (code >= 97 && code <= 122) ||
          (code >= 65 && code <= 90) ||
          (code >= 59 && code <= 64) ||
          (code >= 33 && code <= 47) ||
          (code >= 123 && code <= 153)
        ) && char !== '"' && char !== '-' && char !== '(' && char !== ')'
        ) {
          this.elem = [];
          this.elem.push(char);
          this.status = 1;
          return;
        }
        if (code >= 48 && code <= 57) {
          this.elem = [];
          this.elem.push(char);
          this.status = 5;
          return;
        }
        switch (char) {
          case '"':
            this.ans.push(this.makeLexer('"'));
            this.elem = [];
            this.status = 2;
            break;
          case '-':
            this.ans.push(this.makeLexer('-'));
            return this.quit();
          case '.':
            this.ans.push(this.makeLexer('.'));
            return this.quit();
          case '(':
            this.elem = [];
            this.status = 4;
            break;
          default:
            return this.quit();
        }
        break;
      }
      case 1:
        if (char === ':') {
          this.ans.push(this.makeLexer('key', this.elem.join('')));
          this.ans.push(this.makeLexer(':'));
          return this.quit();
        } else {
          if (char === ' ' || char === '\n' || char === 'EOF') {
            this.ans.push(this.makeLexer('value', this.elem.join('')));
            return this.quit();
          } else {
            this.elem.push(char);
          }
        }
        break;
      case 2:
        if (char === ' ') {
          this.status = 3;
        } else {
          return this.quit();
        }
        break;
      case 3:
        if (char === '\n' || char === 'EOF') {
          this.ans.push(this.makeLexer('comment', this.elem.join('')));
          return this.quit();
        } else {
          this.elem.push(char);
        }
        break;
      case 4: {
        if (char === ')') {
          this.ans.push(this.makeLexer('('));
          this.ans.push(this.makeLexer('unit', this.elem.join('')));
          this.ans.push(this.makeLexer(')'));
          return this.quit();
        } else {
          this.elem.push(char);
        }
        break;
      }
      case 5: {
        const code = char.charCodeAt(0);
        if (code >= 48 && code <= 57) {
          this.elem.push(char);
        } else {
          this.ans.push(this.makeLexer('number', this.elem.join('')));
          return this.quit();
        }
        break;
      }
      default:
        return this.quit();
    }
  }
}

export default YamlLexer;
