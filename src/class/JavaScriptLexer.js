import Lexer from '~/class/Lexer';

class JavascriptLexer extends Lexer {
  constructor(...params) {
    super(...params);
    this.identifer = false;
  }

  checkTokenDuplicate(elem) {
    const { length, } = this.ans;
    return this.ans[length - 1].elem === elem;
  }

  readReserveLetter(char, letter, status) {
    if (char === letter) {
      this.elems.push(char);
      this.status = status;
    } else if (char === 'EOF' || char === ' ' || char === ';') {
      this.ans.push(this.makeToken('identifer', this.elems.join('')));
      return this.quit();
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
      if (char === 'EOF' || char === ' ') {
        this.ans.push(this.makeToken('identifer', this.elems.join('')));
        return this.quit();
      } else {
        this.identifer = true;
        this.elems.push(char);
        this.status = 1;
      }
    }
  }

  getReserve(char, letter, set) {
    if (char === letter || char === ';' || char === 'EOF' || char === '(' ||
      char === '{' || char === ':' || char === '&' || char === '|' ||
      char === ' ' || char === '.'
    ) {
      this.ans.push(this.makeToken(set, this.elems.join('')));
      this.elems = [];
      return this.quit();
    } else {
      this.identifer = true;
      this.status = 1;
      this.elems.push(char);
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
            if (!this.checkTokenDuplicate('*')) {
              this.ans.push(this.makeToken('symbol', '*'));
              return this.quit();
            }
            break;
          case '<':
            if (!this.checkTokenDuplicate('<')) {
              this.ans.push(this.makeToken('angleBrackets', '<'));
              return this.quit();
            }
            break;
          case '>':
            if (!this.checkTokenDuplicate('>')) {
              this.ans.push(this.makeToken('angleBrackets', '>'));
              return this.quit();
            }
            break;
          case '.':
            if (!this.checkTokenDuplicate('.')) {
              this.ans.push(this.makeToken('call', '.'));
              return this.quit();
            }
            break;
          case '+':
            if (!this.checkTokenDuplicate('+')) {
              this.ans.push(this.makeToken('arithmetic', '+'));
              return this.quit();
            }
            break;
          case '-':
            if (!this.checkTokenDuplicate('-')) {
              this.ans.push(this.makeToken('arithmetic', '-'));
              return this.quit();
            }
            break;
          case '^':
            if (!this.checkTokenDuplicate('^')) {
              this.ans.push(this.makeToken('arithmetic', '^'));
              return this.quit();
            }
            break;
          case '%':
            if (!this.checkTokenDuplicate('%')) {
              this.ans.push(this.makeToken('arithmetic', '%'));
              return this.quit();
            }
            break;
          case '|':
            if (!this.checkTokenDuplicate('|')) {
              this.ans.push(this.makeToken('logic', '|'));
              return this.quit();
            }
          case '&':
            if (!this.checkTokenDuplicate('&')) {
              this.ans.push(this.makeToken('logic', '&'));
              return this.quit();
            }
            break;
          case '!':
            if (!this.checkTokenDuplicate('!')) {
              this.ans.push(this.makeToken('logic', '!'));
              return this.quit();
            }
            break;
          case '~':
            if (!this.checkTokenDuplicate('~')) {
              this.ans.push(this.makeToken('logic', '~'));
              return this.quit();
            }
            break;
          case '?':
            if (!this.checkTokenDuplicate('?')) {
              this.ans.push(this.makeToken('logic', '?'));
              return this.quit();
            }
            break;
          case '=':
            if (!this.checkTokenDuplicate('=')) {
              this.ans.push(this.makeToken('arithmetic', '='));
              return this.quit();
            }
            break;
          case '(':
            if (!this.checkTokenDuplicate('(')) {
              this.ans.push(this.makeToken('parenthese', '('));
              return this.quit();
            }
            break;
          case ')':
            if (!this.checkTokenDuplicate(')')) {
              this.ans.push(this.makeToken('parenthese', ')'));
              return this.quit();
            }
            break;
          case '{':
            if (!this.checkTokenDuplicate('{')) {
              this.ans.push(this.makeToken('curlyParenthese', '{'));
              return this.quit();
            }
            break;
          case '}':
            if (!this.checkTokenDuplicate('}')) {
              this.ans.push(this.makeToken('curlyParenthese', '}'));
              return this.quit();
            }
            break;
          case '[':
            if (!this.checkTokenDuplicate('[')) {
              this.ans.push(this.makeToken('squareParenthese', '['));
              return this.quit();
            }
            break;
          case ']':
            if (!this.checkTokenDuplicate(']')) {
              this.ans.push(this.makeToken('squareParenthese', ']'));
              return this.quit();
            }
            break;
          case ';':
            this.ans.push(this.makeToken('function', ';'));
            return this.quit();
            break;
          case ':':
            if (!this.checkTokenDuplicate(':')) {
              this.ans.push(this.makeToken('iteral', ':'));
              return this.quit();
            }
            break;
          case ',':
            if (!this.checkTokenDuplicate(',')) {
              this.ans.push(this.makeToken('iteral', ','));
              return this.quit();
            }
            break;
          case '"': {
            if (!this.checkTokenDuplicate('"')) {
              this.elems = [];
              this.ans.push(this.makeToken('quotation', '"'));
              this.status = 3;
            }
            break;
          }
          case "'": {
            if (!this.checkTokenDuplicate("'")) {
              this.elems = [];
              this.ans.push(this.makeToken('quotation', "'"));
              this.status = 4;
            }
            break;
          }
          case '`': {
            if (!this.checkTokenDuplicate('`')) {
              this.elems = [];
              this.ans.push(this.makeToken('quotation', '`'));
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
            case 'z':
              this.elems = [];
              this.elems.push(char);
              this.status = 131;
              return;
            default:
              this.identifer = true;
          }
        }
        if (char === '0') {
          this.elems = [];
          this.elems.push(char);
          this.status = 127;
          return;
        }
        if (char === 'o' || char === 'O') {
          this.elems = [];
          this.elems.push(char);
          this.status = 129;
          return;
        }
        const code = char.charCodeAt(0);
        if (code >= 48 && code <= 57) {
          this.elems = [];
          this.elems.push(char);
          this.status = 130;
          return;
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
          this.ans.push(this.makeToken('identifer', this.elems.join('')));
          return this.quit();
        }
        const code = char.charCodeAt(0);
        if (
          (code >= 97 && code <= 122) ||
          (code >= 65 && code <= 90)
        ) {
          this.elems.push(char);
        } else if (code >= 48 && code <= 57) {
          this.status = 2;
          this.elems.push(char);
        } else {
          this.ans.push(this.makeToken('identifer', this.elems.join('')));
          return this.quit();
        }
        break;
      }
      case 2: {
        const code = char.charCodeAt(0);
        if (code >= 48 && code <= 57) {
          this.elems.push(char);
        } else {
          this.ans.push(this.makeToken('identifer', this.elems.join('')));
          return this.quit();
        }
        break;
      }
      case 3:
        if (char === '"') {
          this.ans.push(this.makeToken('string', this.elems.join('')));
          this.ans.push(this.makeToken('quotation', '"'));
          return this.quit();
        } else {
          this.elems.push(char);
        }
        break;
      case 4:
        if (char === "'") {
          this.ans.push(this.makeToken('string', this.elems.join('')));
          this.ans.push(this.makeToken('quotation', "'"));
          return this.quit();
        } else {
          this.elems.push(char);
        }
        break;
      case 5:
        return this.readReserveLetter(char, 'w', 6);
      case 6:
        return this.readReserveLetter(char, 'a', 7);
      case 7:
        return this.readReserveLetter(char, 'i', 8);
      case 8:
        return this.readReserveLetter(char, 't', 132);
      case 9:
        return this.readReserveLetter(char, 'r', 10);
      case 10:
        return this.readReserveLetter(char, 'e', 11);
      case 11:
        return this.readReserveLetter(char, 'a', 12);
      case 12:
        return this.readReserveLetter(char, 'k', 133);
      case 13:
        return this.readReserveLetters(char, [
          ['a', 14],
          ['l', 18],
          ['o', 21],
        ]);
      case 14:
        return this.readReserveLetters(char, [
          ['s', 15],
          ['t', 16],
        ]);
      case 15:
        return this.readReserveLetter(char, 'e', 134);
      case 16:
        return this.readReserveLetter(char, 'c', 17);
      case 17:
        return this.readReserveLetter(char, 'h', 135);
      case 18:
        return this.readReserveLetter(char, 'a', 19);
      case 19:
        return this.readReserveLetter(char, 's', 20);
      case 20:
        return this.readReserveLetter(char, 's', 136);
      case 21:
        return this.readReserveLetter(char, 'n', 22);
      case 22:
        return this.readReserveLetters(char, [
          ['s', 27],
          ['t', 23],
        ]);
      case 23:
        return this.readReserveLetter(char, 'i', 24);
      case 24:
        return this.readReserveLetter(char, 'n', 25);
      case 25:
        return this.readReserveLetter(char, 'u', 26);
      case 26:
        return this.readReserveLetter(char, 'e', 137);
      case 27:
        return this.readReserveLetter(char, 't', 138);
      case 28:
        if (char === 'e') {
          this.elems.push(char);
          this.status = 29;
        } else if (char === 'o') {
          this.elems.push(char)
        }
        break;
      case 29:
        return this.readReserveLetters(char, [
          ['b', 30],
          ['f', 35],
          ['l', 39]
        ]);
      case 30:
        return this.readReserveLetter(char, 'u', 31);
      case 31:
        return this.readReserveLetter(char, 'g', 32);
      case 32:
        return this.readReserveLetter(char, 'g', 33);
      case 33:
        return this.readReserveLetter(char, 'e', 34);
      case 34:
        return this.readReserveLetter(char, 'r', 140);
      case 35:
        return this.readReserveLetter(char, 'a', 36);
      case 36:
        return this.readReserveLetter(char, 'u', 37);
      case 37:
        return this.readReserveLetter(char, 'l', 38);
      case 38:
        return this.readReserveLetter(char, 't', 143);
      case 39:
        return this.readReserveLetter(char, 'e', 40);
      case 40:
        return this.readReserveLetter(char, 't', 41);
      case 41:
        return this.readReserveLetter(char, 'e', 131);
      case 42:
        return this.readReserveLetters(char, [
          ['l', 43],
          ['x', 45],
        ]);
      case 43:
        return this.readReserveLetter(char, 's', 44);
      case 44:
        return this.readReserveLetter(char, 'e', 141);
      case 45:
        return this.readReserveLetters(char, [
          ['p', 46],
          ['t', 49],
        ]);
      case 46:
        return this.readReserveLetter(char, 'o', 47);
      case 47:
        return this.readReserveLetter(char, 'r', 48);
      case 48:
        return this.readReserveLetter(char, 't', 142);
      case 49:
        return this.readReserveLetter(char, 'e', 50);
      case 50:
        return this.readReserveLetter(char, 'n', 51);
      case 51:
        return this.readReserveLetter(char, 'd', 52);
      case 52:
        return this.readReserveLetter(char, 's', 144);
      case 53:
        return this.readReserveLetters(char, [
          ['a', 54],
          ['o', 57],
          ['u', 58],
        ]);
      case 54:
        return this.readReserveLetter(char, 'l', 55);
      case 55:
        return this.readReserveLetter(char, 's', 56);
      case 56:
        return this.readReserveLetter(char, 'e', 145);
      case 57:
        return this.readReserveLetter(char, 'r', 146);
      case 58:
        return this.readReserveLetter(char, 'n', 59);
      case 59:
        return this.readReserveLetter(char, 'c', 60);
      case 60:
        return this.readReserveLetter(char, 't', 61);
      case 61:
        return this.readReserveLetter(char, 'i', 62);
      case 62:
        return this.readReserveLetter(char, 'o', 63);
      case 63:
        return this.readReserveLetter(char, 'n', 147);
      case 64:
        if (char === 'm') {
          this.elems.push(char);
          this.status = 65;
        } else if (char === 'n') {
          this.elems.push(char);
          this.status = 69;
        } else if (char === 'f') {
          this.elems.push(char);
          this.status = 148;
        } else if (char === 'EOF') {
          this.ans.push(this.makeToken('identifer', this.elems.join('')));
          return this.quit();
        } else {
          this.identifer = true;
          this.elems.push(char);
          this.status = 1;
        }
        break;
      case 65:
        return this.readReserveLetter(char, 'p', 66);
      case 66:
        return this.readReserveLetter(char, 'o', 67);
      case 67:
        return this.readReserveLetter(char, 'r', 68);
      case 68:
        return this.readReserveLetter(char, 't', 149);
      case 69: {
        const code = char.charCodeAt(0);
        if (code >= 99 && code <= 122) {
          this.readReserveLetter(char, 's', 70);
        } else {
          this.ans.push(this.makeToken(this.elems.join(''), 'function'));
          return this.quit();
        }
        break;
      }
      case 70:
        return this.readReserveLetter(char, 't', 71);
      case 71:
        return this.readReserveLetter(char, 'a', 72);
      case 72:
        return this.readReserveLetter(char, 'n', 73);
      case 73:
        return this.readReserveLetter(char, 'c', 74);
      case 74:
        return this.readReserveLetter(char, 'e', 75);
      case 75:
        return this.readReserveLetter(char, 'o', 76);
      case 76:
        return this.readReserveLetter(char, 'f', 150);
      case 77:
        return this.readReserveLetter(char, 'e', 78);
      case 78:
        return this.readReserveLetter(char, 't', 151);
      case 79:
        return this.readReserveLetters(char, [
          ['e', 80],
          ['u', 81]
        ]);
      case 80:
        return this.readReserveLetter(char, 'w', 152);
      case 81:
        return this.readReserveLetter(char, 'l', 82);
      case 82:
        return this.readReserveLetter(char, 'l', 153);
      case 83:
        return this.readReserveLetter(char, 'e', 84);
      case 84:
        return this.readReserveLetter(char, 't', 85);
      case 85:
        return this.readReserveLetter(char, 'u', 86);
      case 86:
        return this.readReserveLetter(char, 'r', 87);
      case 87:
        return this.readReserveLetter(char, 'n', 154);
      case 88:
        return this.readReserveLetters(char, [
          ['u', 89],
          ['w', 92],
          ['t', 96],
        ]);
        break;
      case 89:
        return this.readReserveLetter(char, 'p', 90);
      case 90:
        return this.readReserveLetter(char, 'e', 91);
      case 91:
        return this.readReserveLetter(char, 'r', 155);
      case 92:
        return this.readReserveLetter(char, 'i', 93);
      case 93:
        return this.readReserveLetter(char, 't', 94);
      case 94:
        return this.readReserveLetter(char, 'c', 95);
      case 95:
        return this.readReserveLetter(char, 'h', 156);
      case 96:
        return this.readReserveLetter(char, 'a', 97);
      case 97:
        return this.readReserveLetter(char, 't', 98);
      case 98:
        return this.readReserveLetter(char, 'i', 99);
      case 99:
        return this.readReserveLetter(char, 'c', 157);
      case 100:
        return this.readReserveLetters(char, [
          ['h', 101],
          ['r', 103],
          ['y', 107],
        ]);
      case 101:
        return this.readReserveLetters(char, [
          ['i', 102],
          ['r', 105],
        ]);
      case 102:
        return this.readReserveLetter(char, 's', 158);
      case 103:
        return this.readReserveLetters(char, [
          ['u', 105],
          ['y', 160],
        ]);
      case 104:
        return this.readReserveLetter(char, 'w', 159);
      case 105:
        if (char === 'e') {
          this.elems.push(char);
          this.status = 106;
        } else if (char === 'EOF' || char === ' ') {
          this.ans.push(this.makeToken('identifer', this.elems.join('')));
          return this.quit();
        } else {
          this.identifer = true;
          this.elems.push(char);
          this.status = 1;
        }
        break;
      case 106:
        return this.getReserve(char, ' ', 'bool');
      case 107:
        return this.readReserveLetter(char, 'p', 108);
      case 108:
        return this.readReserveLetter(char, 'e', 109);
      case 109:
        return this.readReserveLetter(char, 'o', 110);
      case 110:
        return this.readReserveLetter(char, 'f', 162);
      case 111:
        return this.readReserveLetters(char, [
          ['a', 112],
          ['o', 113],
        ]);
      case 112:
        return this.readReserveLetter(char, 'r', 163);
      case 113:
        return this.readReserveLetter(char, 'i', 114);
      case 114:
        return this.readReserveLetter(char, 'd', 164);
      case 115:
        return this.readReserveLetters(char, [
          ['h', 116],
          ['i', 119],
        ]);
      case 116:
        return this.readReserveLetter(char, 'i', 117);
      case 117:
        return this.readReserveLetter(char, 'l', 118);
      case 118:
        return this.readReserveLetter(char, 'e', 165);
      case 119:
        return this.readReserveLetter(char, 't', 120);
      case 120:
        return this.readReserveLetter(char, 'h', 166);
      case 121:
        this.elems.push(char);
        if (char === '/') {
          this.status = 122;
        } else if (char === '*') {
          this.status = 123;
        } else {
          this.ans.push(this.makeToken('arithmetic', '/'));
          return this.quit();
        }
        break;
      case 122:
        this.elems.push(char);
        if (char === '\n') {
          this.ans.push(this.makeToken('lineComment', this.elems.join('')));
          return this.quit();
        }
        break;
      case 123:
        this.elems.push(char);
        if (char === '*') {
          this.status = 124;
        } else {
          return this.quit();
        }
        break;
      case 124: {
        if (char === '/') {
          this.elems.push(char);
          this.ans.push(this.makeToken('blockComment', this.elems.join('')));
        } else {
          return this.quit();
        }
        break;
      }
      case 125: {
        if (char === '`') {
          this.ans.push(this.makeToken('string', this.elems.join('')));
          this.ans.push(this.makeToken('quotation', "'"));
          return this.quit();
        } else {
          this.elems.push(char);
        }
        break;
      }
      case 126: {
        const code = char.charCodeAt(0);
        if (char === 'EOF') {
          this.ans.push(this.makeToken('decimal', this.elems.join('')));
          return this.quit();
        } else if (
          (code >= 48 && code <= 57) ||
          char === '_' || char === '.' || char === 'e' || char === 'E'
        ) {
          this.elems.push(char);
        } else if (char === 'n') {
          this.elems.push(char);
          this.ans.push(this.makeToken('decimal', this.elems.join('')));
          return this.quit();
        } else {
          this.ans.push(this.makeToken('decimal', this.elems.join('')));
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
          this.ans.push(this.makeToken('decimal', this.elems.join('')));
          return this.quit();
        } else if (
          (code >= 48 && code <= 57) || (code >= 65 && code <= 70) ||
          (code >= 97 && code <= 102) || char === '_' || char === '.' ||
          char === '-' || char === 'e' || char === 'E'
        ) {
          this.elems.push(char);
        } else if (char === 'n') {
          this.elems.push(char);
          this.ans.push(this.makeToken('decimal', this.elems.join('')));
          return this.quit();
        } else {
          this.ans.push(this.makeToken('decimal', this.elems.join('')));
          return this.quit();
        }
        break;
      }
      case 129: {
        const code = char.charCodeAt(0);
        if (char === 'EOF') {
          this.ans.push(this.makeToken('decimal', this.elems.join('')));
          return this.quit();
        } else if (
          (code >= 48 && code <= 55) ||
          char === '_' || char === '.' || char === 'e' || char === 'E'
        ) {
          this.elems.push(char);
        } else if (char === 'n') {
          this.elems.push(char);
          this.ans.push(this.makeToken('decimal', this.elems.join('')));
          return this.quit();
        } else {
          this.elems.push(char);
          this.status = 1;
        }
        break;
      }
      case 130:
        const code = char.charCodeAt(0);
        if (char === 'EOF') {
          this.ans.push(this.makeToken('decimal', this.elems.join('')));
          return this.quit();
        } else if (
          (code >= 48 && code <= 57) || char === '_' || char === '.' ||
          char === 'e' || char === 'E'
        ) {
          this.elems.push(char);
        } else if (char === 'n') {
          this.elems.push(char);
          this.ans.push(this.makeToken('decimal', this.elems.join('')));
          return this.quit();
        } else {
          this.ans.push(this.makeToken('decimal', this.elems.join('')));
          return this.quit();
        }
        break;
      case 131:
        return this.getReserve(char, ' ', 'function');
      case 132:
        return this.getReserve(char, ' ', 'async');
      case 133:
        return this.getReserve(char, ' ', 'for');
      case 134:
        return this.getReserve(char, ' ', 'switch');
      case 135:
        return this.getReserve(char, ' ', 'try');
      case 136:
        return this.getReserve(char, ' ', 'class');
      case 137:
        return this.getReserve(char, ' ', 'for');
      case 138:
        return this.getReserve(char, ' ', 'declare');
      case 139:
        return this.getReserve(char, ' ', 'while');
      case 140:
        return this.getReserve(char, ';', 'debugger');
      case 141:
        return this.getReserve(char, ' ', 'if');
      case 142:
        return this.getReserve(char, ' ', 'module');
      case 143:
        return this.getReserve(char, ' ', 'switch');
      case 144:
        return this.getReserve(char, ' ', 'class');
      case 145:
        return this.getReserve(char, ';', 'bool');
      case 146:
        return this.getReserve(char, ' ', 'for');
      case 147:
        return this.getReserve(char, ' ', 'declare');
      case 148:
        return this.getReserve(char, ' ', 'if');
      case 149:
        return this.getReserve(char, ' ', 'module');
      case 150:
        return this.getReserve(char, ' ', 'function');
      case 151:
        return this.getReserve(char, ' ', 'declare');
      case 152:
        return this.getReserve(char, ' ', 'class');
      case 153:
        return this.getReserve(char, ';', 'type');
      case 154:
        return this.getReserve(char, ' ', 'function');
      case 155:
        return this.getReserve(char, ' ', 'class');
      case 156:
        return this.getReserve(char, ' ', 'switch');
      case 157:
        return this.getReserve(char, ' ', 'class');
      case 158:
        return this.getReserve(char, '.', 'class');
      case 159:
        return this.getReserve(char, ' ', 'try');
      case 160:
        return this.getReserve(char, ' ', 'try');
      case 161:
        return this.getReserve(char, ';', 'bool');
      case 162:
        return this.getReserve(char, ' ', 'type');
      case 163:
        return this.getReserve(char, ' ', 'declare');
      case 164:
        return this.getReserve(char, ' ', 'function');
      case 165:
        return this.getReserve(char, ' ', 'while');
      case 166:
        return this.getReserve(char, ' ', 'function');
      default:
        return this.quit();
    }
  }
}

export default JavascriptLexer;
