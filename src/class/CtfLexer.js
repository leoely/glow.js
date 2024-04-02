import Lexer from '~/class/Lexer';

class CtfLexer extends Lexer {
  constructor(...param) {
    super(...param);
  }

  checkLexerDuplicate(elem) {
    const { length, } = this.ans;
    return this.ans[length - 1].elem === elem;
  }

  scan(char) {
    switch (this.status) {
      case 0: {
        const code = char.charCodeAt(0);
        if ((
          (code >= 97 && code <= 122) ||
          (code >= 65 && code <= 90) ||
          (code >= 59 && code <= 64) ||
          (code >= 33 && code <= 42) ||
          (code >= 45 && code <= 47) ||
          (code >= 123 && code <= 153)
        ) && char !== '(' && char !== ')' && char !== '[' && char !== ']' &&
          char !== '|' && char !== '&'
        ) {
          this.elems = [];
          this.elems.push(char);
          this.status = 1;
          return;
        }
        switch (char) {
          case '&':
            this.ans.push(this.makeLexer('and', '&'));
            return this.quit();
          case '|':
            this.ans.push(this.makeLexer('dividing', '|'));
            return this.quit();
          case '+':
            this.ans.push(this.makeLexer('plus', '+'));
            return this.quit();
          case '(':
            this.ans.push(this.makeLexer('parenthese', '('));
            return this.quit();
          case ')':
            this.ans.push(this.makeLexer('parenthese', ')'));
            this.quit();
            break;
          case '[':
            this.ans.push(this.makeLexer('squareParenthese', '['));
            return this.quit();
          case ']':
            this.ans.push(this.makeLexer('squareParenthese', ']'));
            return this.quit();
            break;
          case ',':
            this.ans.push(this.makeLexer('comma', ','));
            return this.quit();
          case ':':
            this.ans.push(this.makeLexer('colon', ':'));
            return this.quit();
        }
        break;
      }
      case 1: {
        if (char === ';' || char === ':') {
          this.ans.push(this.makeLexer('format', this.elems.join('')));
          return this.quit();
        }
        if (char === '(' || char === '[' || char === '|' || char === ' ' || char === 'EOF') {
          this.ans.push(this.makeLexer('text', this.elems.join('')));
          return this.quit();
        }
        this.elems.push(char);
        break;
      }
    }
  }
}

export default CtfLexer;
