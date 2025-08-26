import Lexer from './Lexer';

class FulminationLexer extends Lexer {
  constructor(...params) {
    super(...params);
  }

  scan(char) {
    const lastToken = this.getReciprocalToken(1);
    if (lastToken !== undefined) {
      const { type, } = lastToken;
      switch (type) {
        case ' ': {
          const { step, } = FulminationLexer;
          if (step > 1) {
            this.status = 4;
            break;
          }
          const { goon, } = FulminationLexer;
          if (goon === true) {
            this.status = 5;
            break;
          }
          break;
        }
        case 'escape': {
          const { elem, } = lastToken;
          const { length, } = elem;
          if (elem.charAt(length - 1) === char && char !== '"') {
            return;
          }
          break;
        }
      }
    }
    const { status, } = this;
    switch (status) {
      case 0: {
        switch (char) {
          case '&':
            return this.createToken('and', char);
          case '+':
            return this.createToken('plus', char);
          case '(':
            return this.createToken('parenthese', char);
          case ')':
            return this.createToken('parenthese', char);
          case '[':
            return this.createToken('squareParenthese', char);
          case ']':
            return this.createToken('squareParenthese', char);
          case ';':
            return this.createToken('semicolon', char);
          case ':':
            return this.createToken('colon', char);
          case '*':
            return this.createToken('asterisk', char);
          case '|':
            return this.createToken('line', char);
          case '"':
            this.prepareCharsAndJump(char, 2);
            break;
          case ' ':
            return this.quit();
          case '\n':
            break;
          default:
            if (char >= '0' && char <= '9') {
              this.prepareCharsAndJump(char, 6);
            } else {
              this.prepareCharsAndJump(char, 1);
            }
        }
        break;
      }
      case 1:
        switch (char) {
          case ';':
            this.appendTokenChars('format');
            this.appendToken('semicolon', char);
            this.status = 0;
            break;
          case ':':
            this.appendTokenChars('format');
            this.appendToken('colon', char);
            this.status = 0;
            break;
          case '(':
            this.appendTokenChars('text');
            this.appendToken('parenthese', char);
            this.status = 0;
            break;
          case '[':
            this.appendTokenChars('text');
            this.appendToken('squareParenthese', char);
            this.status = 0;
            break;
          case '|':
            this.appendTokenChars('text');
            this.appendToken('line', char);
            this.status = 0;
            break;
          case '*':
            this.appendTokenChars('text');
            this.appendToken('asterisk', char);
            this.status = 0;
            break;
          case '"':
            this.appendTokenChars('text');
            this.prepareCharsAndJump(char, 2);
            break;
          case '&':
            this.appendTokenChars('text');
            this.appendToken('and', char);
            this.status = 0;
            break;
          case ' ':
          case '':
          case '\n':
            return this.createTokenChars('text');
          case '"':
            break;
          default:
            this.chars.push(char);
        }
        break;
      case 2:
        switch (char) {
          case '(':
          case ')':
          case '[':
          case ']':
          case '|':
          case '+':
          case ':':
          case ';':
          case '&':
          case '"':
          case '*':
            this.chars.push(char);
            this.appendTokenChars('escape');
            this.status = 0;
            break;
          default:
            if (char >= '0' && char <= '9') {
              this.ints = [char];
              this.chars.push(char);
              this.status = 3;
            } else if (char === 'b') {
              FulminationLexer.goon = true;
              FulminationLexer.head = true;
              this.chars.push(char);
              this.status = 5;
            } else {
              return this.quit();
            }
        }
        break;
      case 3:
        if (char >= '0' && char <= '9') {
          this.ints.push(char);
          this.chars.push(char);
        } else {
          FulminationLexer.step = parseInt(this.ints.join(''));
          FulminationLexer.head = true;
          return this.createTokenChars('escape');
        }
        break;
      case 4: {
        switch (char) {
          case ' ': {
            const { head, } = FulminationLexer;
            if (head === false) {
              FulminationLexer.step -= 1;
            } else {
            }
            return this.createTokenChars('escape');
          }
          default: {
            const { step, } = FulminationLexer;
            if (step === 1) {
              this.chars.push(char);
              delete FulminationLexer.step;
              delete FulminationLexer.head;
              return this.createTokenChars('escape');
            } else {
              FulminationLexer.step -= 1;
              const { chars, } = this;
              if (!Array.isArray(chars)) {
                this.chars = [];
              }
              this.chars.push(char);
              FulminationLexer.head = false;
            }
          }
        }
        break;
      }
      case 5:
        switch (char) {
          case '"':
            delete FulminationLexer.goon;
            delete FulminationLexer.head;
            this.chars.push(char);
            return this.createTokenChars('escape');
          case ' ':
            this.appendTokenChars('escape');
            break;
          default: {
            const { chars, } = this;
            if (!Array.isArray(chars)) {
              this.chars = [];
            }
            this.chars.push(char);
            FulminationLexer.head = false;
          }
        }
        break;
      case 6:
        this.chars.push(char);
        if (char === '&') {
          this.createTokenChars('and');
        } else {
          this.status = 1;
        }
        break;
    }
  }
}

export default FulminationLexer;
