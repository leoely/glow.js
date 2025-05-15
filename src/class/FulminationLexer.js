import Lexer from '~/class/Lexer';

class FulminationLexer extends Lexer {
  constructor(...param) {
    super(...param);
  }

  scan(char) {
    switch (this.status) {
      case 0:
        if (char !== '(' && char !== ')' && char !== '[' && char !== ']'
          && char !== ';' && char !== ':' && char !== '&' && char !== '*'
          && char !== '+' && char !== '|'
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
          case '+':
            this.ans.push(this.makeToken('plus', '+'));
            return this.quit();
          case '(':
            this.ans.push(this.makeToken('parenthese', '('));
            return this.quit();
          case ')':
            this.ans.push(this.makeToken('parenthese', ')'));
            return this.quit();
          case '[':
            this.ans.push(this.makeToken('squareParenthese', '['));
            return this.quit();
          case ']':
            this.ans.push(this.makeToken('squareParenthese', ']'));
            return this.quit();
          case ';':
            this.ans.push(this.makeToken('semicolon', ';'));
            return this.quit();
          case ':':
            this.ans.push(this.makeToken('colon', ':'));
            return this.quit();
          case '*':
            this.ans.push(this.makeToken('asterick', '*'));
            return this.quit();
          case '|':
            this.ans.push(this.makeToken('line', '|'));
            return this.quit();
        }
        break;
      case 1:
        if (char === ';' || char === ':') {
          this.ans.push(this.makeToken('format', this.elems.join('')));
          return this.quit();
        }
        if (char === '(' || char === '[' || char === '|' || char === ' ' || char === '' || char === '\n') {
          this.ans.push(this.makeToken('text', this.elems.join('')));
          return this.quit();
        }
        this.elems.push(char);
        break;
    }
  }
}

export default FulminationLexer;
