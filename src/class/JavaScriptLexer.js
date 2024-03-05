import Lexer from '~/class/Lexer';

class JavascriptLexer extends Lexer {
  constructor(...params) {
    super(...params);
    this.identifer = false;
  }

  checkLexerDuplicate(elem) {
    const { length, } = this.ans;
    return this.ans[length - 1].elem === elem;
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
      this.elems.push(char);
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
      return this.quit();
    } else if (char === 'EOF') {
      this.ans.push(this.makeLexer('identifer', this.elems.join('')));
      return this.quit();
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
          case '/':
            this.elems = [];
            this.elems.push(char);
            this.status = 121;
            return;
          case '*':
            if (!this.checkLexerDuplicate('*')) {
              this.ans.push(this.makeLexer('symbol', '*'));
              return this.quit();
            }
            break;
          case '<':
            if (!this.checkLexerDuplicate('<')) {
              this.ans.push(this.makeLexer('angleBrackets', '<'));
              return this.quit();
            }
            break;
          case '>':
            if (!this.checkLexerDuplicate('>')) {
              this.ans.push(this.makeLexer('angleBrackets', '>'));
              return this.quit();
            }
            break;
          case '.':
            if (!this.checkLexerDuplicate('.')) {
              this.ans.push(this.makeLexer('call', '.'));
              return this.quit();
            }
            break;
          case '+':
            if (!this.checkLexerDuplicate('+')) {
              this.ans.push(this.makeLexer('arithmetic', '+'));
              return this.quit();
            }
            break;
          case '-':
            if (!this.checkLexerDuplicate('-')) {
              this.ans.push(this.makeLexer('arithmetic', '-'));
              return this.quit();
            }
            break;
          case '^':
            if (!this.checkLexerDuplicate('^')) {
              this.ans.push(this.makeLexer('arithmetic', '^'));
              return this.quit();
            }
            break;
          case '%':
            if (!this.checkLexerDuplicate('%')) {
              this.ans.push(this.makeLexer('arithmetic', '%'));
              return this.quit();
            }
            break;
          case '|':
            if (!this.checkLexerDuplicate('|')) {
              this.ans.push(this.makeLexer('logic', '|'));
              return this.quit();
            }
          case '&':
            if (!this.checkLexerDuplicate('&')) {
              this.ans.push(this.makeLexer('logic', '&'));
              return this.quit();
            }
            break;
          case '!':
            if (!this.checkLexerDuplicate('!')) {
              this.ans.push(this.makeLexer('logic', '!'));
              return this.quit();
            }
            break;
          case '~':
            if (!this.checkLexerDuplicate('~')) {
              this.ans.push(this.makeLexer('logic', '~'));
              return this.quit();
            }
            break;
          case '?':
            if (!this.checkLexerDuplicate('?')) {
              this.ans.push(this.makeLexer('logic', '?'));
              return this.quit();
            }
            break;
          case '=':
            if (!this.checkLexerDuplicate('=')) {
              this.ans.push(this.makeLexer('arithmetic', '='));
              return this.quit();
            }
            break;
          case '(':
            if (!this.checkLexerDuplicate('(')) {
              this.ans.push(this.makeLexer('parenthese', '('));
              return this.quit();
            }
            break;
          case ')':
            if (!this.checkLexerDuplicate(')')) {
              this.ans.push(this.makeLexer('parenthese', ')'));
              return this.quit();
            }
            break;
          case '{':
            if (!this.checkLexerDuplicate('{')) {
              this.ans.push(this.makeLexer('curlyParenthese', '{'));
              return this.quit();
            }
            break;
          case '}':
            if (!this.checkLexerDuplicate('}')) {
              this.ans.push(this.makeLexer('curlyParenthese', '}'));
              return this.quit();
            }
            break;
          case '[':
            if (!this.checkLexerDuplicate('[')) {
              this.ans.push(this.makeLexer('squareParenthese', '['));
              return this.quit();
            }
            break;
          case ']':
            if (!this.checkLexerDuplicate(']')) {
              this.ans.push(this.makeLexer('squareParenthese', ']'));
              return this.quit();
            }
            break;
          case ';':
            if (!this.checkLexerDuplicate(';')) {
              this.ans.push(this.makeLexer('function', ';'));
              return this.quit();
            }
            break;
          case ':':
            if (!this.checkLexerDuplicate(':')) {
              this.ans.push(this.makeLexer('iteral', ':'));
              return this.quit();
            }
            break;
          case ',':
            if (!this.checkLexerDuplicate(',')) {
              this.ans.push(this.makeLexer('iteral', ','));
              return this.quit();
            }
            break;
          case '"': {
            if (!this.checkLexerDuplicate('"')) {
              this.elems = [];
              this.ans.push(this.makeLexer('quotation', '"'));
              this.status = 3;
            }
            break;
          }
          case "'": {
            if (!this.checkLexerDuplicate("'")) {
              this.elems = [];
              this.ans.push(this.makeLexer('quotation', "'"));
              this.status = 4;
            }
            break;
          }
          case '`': {
            if (!this.checkLexerDuplicate('`')) {
              this.elems = [];
              this.ans.push(this.makeLexer('quotation', '`'));
              this.status = 125;
            }
            break;
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
              this.status = 42;
              return;
            case 'f':
              this.elems = [];
              this.elems.push(char);
              this.status = 53;
              return;
            case 'i':
              this.elems = [];
              this.elems.push(char);
              this.status = 64;
              return;
            case 'l':
              this.elems = [];
              this.elems.push(char);
              this.status = 77;
              return;
            case 'n':
              this.elems = [];
              this.elems.push(char);
              this.status = 79;
              return;
            case 'r':
              this.elems = [];
              this.elems.push(char);
              this.status = 83;
              return;
            case 's':
              this.elems = [];
              this.elems.push(char);
              this.status = 88;
              return;
            case 't':
              this.elems = [];
              this.elems.push(char);
              this.status = 100;
              return;
            case 'v':
              this.elems = [];
              this.elems.push(char);
              this.status = 111;
              return;
            case 'w':
              this.elems = [];
              this.elems.push(char);
              this.status = 115;
              return;
            case 'y':
              this.elems = [];
              this.elems.push(char);
              this.status = 111;
              return;
            default:
              this.identifer = false;
          }
        }
        if (char === '0') {
          this.elems = [];
          this.elems.push(char);
          this.status = 127;
          return;
        }
        const code = char.charCodeAt(0);
        if (char === 'o' || char === 'O') {
          this.elems = [];
          this.elems.push(char);
          this.status = 129;
          return;
        }
        if (code >= 48 && code <= 57) {
          this.elems = [];
          this.elems.push(char);
          this.status = 130;
        }
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
        return this.getReserve(char, 't', 'async');
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
        return  this.getReserve(char, 'k', 'for');
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
        return this.getReserve(char, 'e', 'switch');
      }
      case 16: {
        this.readReserveLetter(char, 'c', 17);
        break;
      }
      case 17: {
        return this.getReserve(char, 'h', 'try');
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
        return this.getReserve(char, 's', 'class');
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
        return this.getReserve(char, 'e', 'for');
      }
      case 27: {
        return this.getReserve(char, 't', 'declare');
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
          ['l', 39]
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
        return this.getReserve(char, 'r', 'debugger');
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
        return this.getReserve(char, 't', 'switch');
      }
      case 39: {
        this.readReserveLetter(char, 'e', 40);
        break;
      }
      case 40: {
        this.readReserveLetter(char, 't', 41);
        break;
      }
      case 41: {
        return this.getReserve(char, 'e', 'delete');
      }
      case 42: {
        this.readReserveLetters(char, [
          ['l', 43],
          ['x', 45],
        ]);
        break;
      }
      case 43: {
        this.readReserveLetter(char, 's', 44);
        break;
      }
      case 44: {
        return this.getReserve(char, 'e', 'if');
      }
      case 45: {
        this.readReserveLetters(char, [
          ['p', 46],
          ['t', 49],
        ]);
        break;
      }
      case 46: {
        this.readReserveLetter(char, 'o', 47);
        break;
      }
      case 47: {
        this.readReserveLetter(char, 'r', 48);
        break;
      }
      case 48: {
        return this.getReserve(char, 't', 'module');
      }
      case 49: {
        this.readReserveLetter(char, 'e', 50);
        break;
      }
      case 50: {
        this.readReserveLetter(char, 'n', 51);
        break;
      }
      case 51: {
        this.readReserveLetter(char, 'd', 52);
        break;
      }
      case 52: {
        return this.getReserve(char, 's', 'class');
      }
      case 53: {
        this.readReserveLetters(char, [
          ['a', 54],
          ['o', 57],
          ['u', 58],
        ]);
        break;
      }
      case 54: {
        this.readReserveLetter(char, 'l', 55);
        break;
      }
      case 55: {
        this.readReserveLetter(char, 's', 56);
        break;
      }
      case 56: {
        return this.getReserve(char, 'e', 'if');
      }
      case 57: {
        return this.getReserve(char, 'r', 'for');
      }
      case 58: {
        this.readReserveLetter(char, 'n', 59);
        break;
      }
      case 59: {
        this.readReserveLetter(char, 'c', 60);
        break;
      }
      case 60: {
        this.readReserveLetter(char, 't', 61);
        break;
      }
      case 61: {
        this.readReserveLetter(char, 'i', 62);
        break;
      }
      case 62: {
        this.readReserveLetter(char, 'o', 63);
        break;
      }
      case 63: {
        return this.getReserve(char, 'n', 'declare');
      }
      case 64: {
        if (char === 'm') {
          this.elems.push(char);
          this.status = 65;
        } else if (char === 'n') {
          this.elems.push(char);
          this.status = 69;
        } else if (char === 'f') {
          this.elems.push(char);
          this.ans.push(this.makeLexer('if', this.elems.join('')));
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
      case 65: {
        this.readReserveLetter(char, 'p', 66);
        break;
      }
      case 66: {
        this.readReserveLetter(char, 'o', 67);
        break;
      }
      case 67: {
        this.readReserveLetter(char, 'r', 68);
        break;
      }
      case 68: {
        return this.getReserve(char, 't', 'module');
      }
      case 69: {
        const code = char.charCodeAt(0);
        if (code >= 99 && code <= 122) {
          this.readReserveLetter(char, 's', 70);
        } else {
          this.ans.push(this.makeLexer('in', 'in'));
          this.quit();
        }
        break;
      }
      case 70: {
        this.readReserveLetter(char, 't', 71);
        break;
      }
      case 71: {
        this.readReserveLetter(char, 'a', 72);
        break;
      }
      case 72: {
        this.readReserveLetter(char, 'n', 73);
        break;
      }
      case 73: {
        this.readReserveLetter(char, 'c', 74);
        break;
      }
      case 74: {
        this.readReserveLetter(char, 'e', 75);
        break;
      }
      case 75: {
        this.readReserveLetter(char, 'o', 76);
        break;
      }
      case 76: {
        return this.getReserve(char, 'f', 'instanceof');
      }
      case 77: {
        this.readReserveLetter(char, 'e', 78);
        break;
      }
      case 78: {
        return this.getReserve(char, 't', 'declare');
      }
      case 79: {
        this.readReserveLetters(char, [
          ['e', 80],
          ['u', 81]
        ]);
        break;
      }
      case 80: {
        return this.getReserve(char, 'w', 'class');
      }
      case 81: {
        this.readReserveLetter(char, 'l', 82);
        break;
      }
      case 82: {
        return this.getReserve(char, 'l', 'type');
      }
      case 83: {
        this.readReserveLetter(char, 'e', 84);
        break;
      }
      case 84: {
        this.readReserveLetter(char, 't', 85);
        break;
      }
      case 85: {
        this.readReserveLetter(char, 'u', 86);
        break;
      }
      case 86: {
        this.readReserveLetter(char, 'r', 87);
        break;
      }
      case 87: {
        return this.getReserve(char, 'n', 'function');
      }
      case 88: {
        this.readReserveLetters(char, [
          ['u', 89],
          ['w', 92],
          ['t', 96],
        ]);
        break;
      }
      case 89: {
        this.readReserveLetter(char, 'p', 90);
        break;
      }
      case 90: {
        this.readReserveLetter(char, 'e', 91);
        break;
      }
      case 91: {
        return this.getReserve(char, 'r', 'class');
      }
      case 92: {
        this.readReserveLetter(char, 'i', 93);
        break;
      }
      case 93: {
        this.readReserveLetter(char, 't', 94);
        break;
      }
      case 94: {
        this.readReserveLetter(char, 'c', 95);
        break;
      }
      case 95: {
        return this.getReserve(char, 'h', 'switch');
      }
      case 96: {
        this.readReserveLetter(char, 'a', 97);
        break;
      }
      case 97: {
        this.readReserveLetter(char, 't', 98);
        break;
      }
      case 98: {
        this.readReserveLetter(char, 'i', 99);
        break;
      }
      case 99: {
        return this.getReserve(char, 'c', 'class');
      }
      case 100: {
        this.readReserveLetters(char, [
          ['h', 101],
          ['r', 103],
          ['y', 107],
        ]);
        break;
      }
      case 101: {
        this.readReserveLetters(char, [
          ['i', 102],
          ['r', 105],
        ]);
        break;
      }
      case 102: {
        return this.getReserve(char, 's', 'class');
      }
      case 103: {
        this.readReserveLetter(char, 'o', 104);
        break;
      }
      case 104: {
        return this.getReserve(char, 'w', 'try');
      }
      case 105: {
        if (char === 'u') {
          this.elems.push(char);
          this.status = 106;
        } else if (char === 'y') {
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
      case 106: {
        return this.getReserve(char, 'e', 'bool');
      }
      case 107: {
        this.readReserveLetter(char, 'p', 108);
        break;
      }
      case 108: {
        this.readReserveLetter(char, 'e', 109);
        break;
      }
      case 109: {
        this.readReserveLetter(char, 'o', 110);
        break;
      }
      case 110: {
        return this.getReserve(char, 'f', 'type');
      }
      case 111: {
        this.readReserveLetters(char, [
          ['a', 112],
          ['o', 113],
        ]);
        break;
      }
      case 112: {
        return this.getReserve(char, 'r', 'declare');
      }
      case 113: {
        this.readReserveLetter(char, 'i', 114);
        break;
      }
      case 114: {
        return this.getReserve(char, 'd', 'function');
      }
      case 115: {
        this.readReserveLetters(char, [
          ['h', 116],
          ['i', 119],
        ]);
        break;
      }
      case 116: {
        this.readReserveLetter(char, 'i', 117);
        break;
      }
      case 117: {
        this.readReserveLetter(char, 'l', 118);
        break;
      }
      case 118: {
        return this.getReserve(char, 'e', 'while');
      }
      case 119: {
        this.readReserveLetter(char, 't', 120);
        break;
      }
      case 120: {
        return this.getReserve(char, 'h', 'function');
      }
      case 121: {
        this.elems.push(char);
        if (char === '/') {
          this.status = 122;
        } else if (char === '*') {
          this.status = 123;
        } else {
          this.ans.push(this.makeLexer('arithmetic', '/'));
          this.quit();
        }
        break;
      }
      case 122: {
        this.elems.push(char);
        if (char === '\n') {
          this.ans.push(this.makeLexer('lineComment', this.elems.join('')));
          return this.quit();
        }
        break;
      }
      case 123: {
        this.elems.push(char);
        if (char === '*') {
          this.status = 124;
        } else {
          return this.quit();
        }
        break;
      }
      case 124: {
        if (char === '/') {
          this.elems.push(char);
          this.ans.push(this.makeLexer('blockComment', this.elems.join('')));
        } else {
          return this.quit();
        }
        break;
      }
      case 125: {
        if (char === '`') {
          this.ans.push(this.makeLexer('string', this.elems.join('')));
          this.ans.push(this.makeLexer('quotation', "'"));
          return this.quit();
        } else {
          this.elems.push(char);
        }
        break;
      }
      case 126: {
        const code = char.charCodeAt(0);
        if (char === 'EOF') {
          this.ans.push(this.makeLexer('decimal', this.elems.join('')));
          return this.quit();
        } else if (
          (code >= 48 && code <= 57) ||
          char === '_' || char === '.' || char === 'e' || char === 'E'
        ) {
          this.elems.push(char);
        } else if (char === 'n') {
          this.elems.push(char);
          this.ans.push(this.makeLexer('decimal', this.elems.join('')));
          return this.quit();
        } else {
          this.ans.push(this.makeLexer('decimal', this.elems.join('')));
          return this.quit();
        }
        break;
      }
      case 127: {
        this.elems.push(char);
        if (char === 'x' || char === 'X') {
          this.status = 128;
        } else {
          this.status = 130;
        }
        break;
      }
      case 128: {
        const code = char.charCodeAt(0);
        if (char === 'EOF') {
          this.ans.push(this.makeLexer('decimal', this.elems.join('')));
          return this.quit();
        } else if (
          (code >= 48 && code <= 57) || (code >= 65 && code <= 70) ||
          (code >= 97 && code <= 102) || char === '_' || char === '.' ||
          char === '-' || char === 'e' || char === 'E'
        ) {
          this.elems.push(char);
        } else if (char === 'n') {
          this.elems.push(char);
          this.ans.push(this.makeLexer('decimal', this.elems.join('')));
          return this.quit();
        } else {
          this.ans.push(this.makeLexer('decimal', this.elems.join('')));
          return this.quit();
        }
        break;
      }
      case 129: {
        const code = char.charCodeAt(0);
        if (char === 'EOF') {
          this.ans.push(this.makeLexer('decimal', this.elems.join('')));
          return this.quit();
        } else if (
          (code >= 48 && code <= 55) ||
          char === '_' || char === '.' || char === 'e' || char === 'E'
        ) {
          this.elems.push(char);
        } else if (char === 'n') {
          this.elems.push(char);
          this.ans.push(this.makeLexer('decimal', this.elems.join('')));
          return this.quit();
        } else {
          this.ans.push(this.makeLexer('decimal', this.elems.join('')));
          return this.quit();
        }
        break;
      }
      case 130: {
        const code = char.charCodeAt(0);
        if (char === 'EOF') {
          this.ans.push(this.makeLexer('decimal', this.elems.join('')));
          return this.quit();
        } else if (
          (code >= 48 && code <= 57) || char === '_' || char === '.' ||
          char === 'e' || char === 'E'
        ) {
          this.elems.push(char);
        } else if (char === 'n') {
          this.elems.push(char);
          this.ans.push(this.makeLexer('decimal', this.elems.join('')));
          return this.quit();
        } else {
          this.ans.push(this.makeLexer('decimal', this.elems.join('')));
          return this.quit();
        }
        break;
      }
      default:
        return this.quit();
    }
  }
}

export default JavascriptLexer;
