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

  readReserveLetter(char, letter, status) {
    if (char === letter) {
      this.elems.push(char);
      this.status = status;
    } else if (char === 'EOF') {
      this.ans.push(this.makeLexer('identifer', this.elems.join('')));
      this.quit();
    } else {
      this.identifer = true;
      this.status = 1;
    }
  }

  readReserveLetters(char, list) {
    let flag = false;
    for (let i = 0; i < list.length; i += 1) {
      const [letter, status] = list[i];
      if (char === letter) {
        this.elems.push(char);
        this.status = status;
        flag = true;
        break;
      }
    }
    if (flag === false) {
      if (char === 'EOF') {
        this.ans.push(this.makeLexer('identifer', this.elems.join('')));
        this.quit();
      } else {
        this.identifer = true;
        this.elems.push(char);
        this.status = 1;
      }
    }
  }

  getReserve(char, letter, set) {
    if (char === letter) {
      this.elems.push(char);
      this.ans.push(this.makeLexer(set, this.elems.join('')));
      this.quit();
    } else if (char === 'EOF') {
      this.ans.push(this.makeLexer('identifer', this.elems.join('')));
      this.quit();
    } else {
      this.identifer = true;
      this.elems.push(char);
      this.status = 1;
    }
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
              this.status = 28;
              return;
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
        this.readReserveLetter(char, 'w', 6);
        break;
      }
      case 6: {
        this.readReserveLetter(char, 'a', 7);
        break;
      }
      case 7: {
        this.readReserveLetter(char, 'i', 8);
        break;
      }
      case 8: {
        this.getReserve(char, 't', 'async');
        break;
      }
      case 9: {
        this.readReserveLetter(char, 'r', 10);
        break;
      }
      case 10: {
        this.readReserveLetter(char, 'e', 11);
        break;
      }
      case 11: {
        this.readReserveLetter(char, 'a', 12);
        break;
      }
      case 12: {
        this.getReserve(char, 'k', 'for');
        break;
      }
      case 13: {
        this.readReserveLetters(char, [
          ['a', 14],
          ['l', 18],
          ['o', 21],
        ]);
        break;
      }
      case 14: {
        this.readReserveLetters(char, [
          ['s', 15],
          ['t', 16],
        ]);
        break;
      }
      case 15: {
        this.getReserve(char, 'e', 'switch');
        break;
      }
      case 16: {
        this.readReserveLetter(char, 'c', 17);
        break;
      }
      case 17: {
        this.getReserve(char, 'h', 'try');
        break;
      }
      case 18: {
        this.readReserveLetter(char, 'a', 19);
        break;
      }
      case 19: {
        this.readReserveLetter(char, 's', 20);
        break;
      }
      case 20: {
        this.getReserve(char, 's', 'declare');
        break;
      }
      case 21: {
        this.readReserveLetter(char, 'n', 22);
        break;
      }
      case 22: {
        this.readReserveLetters(char, [
          ['s', 27],
          ['t', 23],
        ]);
        break;
      }
      case 23: {
        this.readReserveLetter(char, 'i', 24);
        break;
      }
      case 24: {
        this.readReserveLetter(char, 'n', 25);
        break;
      }
      case 25: {
        this.readReserveLetter(char, 'u', 26);
        break;
      }
      case 26: {
        this.getReserve(char, 'e', 'for');
        break;
      }
      case 27: {
        this.getReserve(char, 't', 'declare');
        break;
      }
      case 28: {
        if (char === 'e') {
          this.elems.push(char);
          this.status = 29;
        } else if (char === 'o') {
          this.elems.push(char);
          this.ans.push(this.makeLexer('while', this.elems.join('')));
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
      case 29: {
        this.readReserveLetters(char, [
          ['b', 30],
          ['f', 35],
          ['l', 1000]
        ]);
        break;
      }
      case 30: {
        this.readReserveLetter(char, 'u', 31);
        break;
      }
      case 31: {
        this.readReserveLetter(char, 'g', 32);
        break;
      }
      case 32: {
        this.readReserveLetter(char, 'g', 33);
        break;
      }
      case 33: {
        this.readReserveLetter(char, 'e', 34);
        break;
      }
      case 34: {
        this.getReserve(char, 'r', 'debugger');
        break;
      }
      case 35: {
        this.readReserveLetter(char, 'a', 36);
        break;
      }
      case 36: {
        this.readReserveLetter(char, 'u', 37);
        break;
      }
      case 37: {
        this.readReserveLetter(char, 'l', 38);
        break;
      }
      case 38: {
        this.getReserve(char, 't', 'switch');
        break;
      }
      default:
        return this.quit();
    }
  }
}

export default JavascriptLexer;
