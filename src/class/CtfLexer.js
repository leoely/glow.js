import Lexer from '~/class/Lexer';

class CtfLexer extends Lexer {
  constructor(...param) {
    super(...param);
  }

  checkTokenDuplicate(elem) {
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
          char !== '|' && char !== '&' && char !== '*'
        ) {
          this.elems = [];
          this.elems.push(char);
          this.status = 1;
          return;
        }
        switch (char) {
          case '&':
            this.ans.push(this.makeToken('and', '&'));
            return this.quit();
          case '|':
            this.ans.push(this.makeToken('dividing', '|'));
            return this.quit();
          case '+':
            this.ans.push(this.makeToken('plus', '+'));
            return this.quit();
          case '(':
            this.ans.push(this.makeToken('parenthese', '('));
            return this.quit();
          case ')':
            this.ans.push(this.makeToken('parenthese', ')'));
            this.quit();
            break;
          case '[':
            this.ans.push(this.makeToken('squareParenthese', '['));
            return this.quit();
          case ']':
            this.ans.push(this.makeToken('squareParenthese', ']'));
            return this.quit();
            break;
          case ',':
            this.ans.push(this.makeToken('comma', ','));
            return this.quit();
          case ':':
            this.ans.push(this.makeToken('colon', ':'));
            return this.quit();
          case '*':
            this.ans.push(this.makeToken('asterick', '*'));
            return this.quit();
        }
        break;
      }
      case 1: {
        if (char === ';' || char === ':') {
          this.ans.push(this.makeToken('format', this.elems.join('')));
          return this.quit();
        }
        if (char === '(' || char === '[' || char === '|' || char === ' ' || char === 'EOF') {
          this.ans.push(this.makeToken('text', this.elems.join('')));
          return this.quit();
        }
        this.elems.push(char);
        break;
      }
    }
  }
}

export default CtfLexer;
