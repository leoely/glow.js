import Lexer from '~/class/Lexer';

class ShellLexer extends Lexer {
  constructor(...params) {
    super(...params);
    this.replace = 'command';
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
      this.elems.push(char);
      this.status = 3;
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
        this.elems.push(char);
        this.status = 3;
      }
    }
  }

  getReserve(char, letter, set) {
    if (char === letter || char === ';' || char === 'EOF' || char === '(' ||
      char === '{' || char === ':' || char === '&' || char === '|' ||
      char === ' ' || char === '.' || char === '\n'
    ) {
      this.ans.push(this.makeToken(set, this.elems.join('')));
      this.elems = [];
      return this.quit();
    } else {
      this.identifer = true;
      this.status = 3;
      this.elems.push(char);
    }
  }

  scan(char) {
    switch (this.status) {
      case 0:
        switch (char) {
          case '|':
            this.ans.push(this.makeToken('or', '|'));
            return this.quit();
          case '&':
            this.ans.push(this.makeToken('and', '&'));
            return this.quit();
          case '(':
            this.ans.push(this.makeToken('bracket', '('));
            return this.quit();
          case ')':
            this.ans.push(this.makeToken('bracket', ')'));
            return this.quit();
          case '<':
            this.ans.push(this.makeToken('angleBracket', '<'));
            return this.quit();
          case '>':
            this.ans.push(this.makeToken('angleBracket', '>'));
            return this.quit();
          case '{':
            this.ans.push(this.makeToken('bigBracket', '{'));
            return this.quit();
          case '}':
            this.ans.push(this.makeToken('bigBracket', '}'));
            return this.quit();
          case '*':
            this.ans.push(this.makeToken('asterisk', '*'));
            return this.quit();
          case '!':
            this.ans.push(this.makeToken('exclamation', '!'));
            return this.quit();
          case '?':
            this.ans.push(this.makeToken('questionMark', '?'));
            return this.quit();
          case '@':
            this.ans.push(this.makeToken('questionMark', '?'));
            return this.quit();
          case ':':
            this.elems = [];
            this.elems.push(char);
            this.status = 12;
            return;
          case '-':
            this.elems = [];
            this.elems.push(char);
            this.status = 9;
            return;
          case '#':
            this.elems = [];
            this.elems.push(char);
            this.status = 1;
            return;
          case '"':
            if (!this.checkTokenDuplicate('"')) {
              this.ans.push(this.makeToken('singleQuote', '"'));
              this.elems = [];
              this.status = 5;
              return;
            } else {
              return this.quit();
            }
          case "'":
            if (!this.checkTokenDuplicate('"')) {
              this.ans.push(this.makeToken('doubleQuote', '"'));
              this.elems = [];
              this.status = 6;
              return;
            } else {
              return this.quit();
            }
          case "`":
            this.elems = [];
            this.elems.push(char);
            this.status = 7;
            return;
          case '$':
            this.elems = [];
            this.elems.push(char);
            this.status = 8;
            return;
        }
        switch (char) {
          case 'c':
            this.elems = [];
            this.elems.push(char);
            this.status = 12;
            return;
          case 'd':
            this.elems = [];
            this.elems.push(char);
            this.status = 16;
            return;
          case 'e':
            this.elems = [];
            this.elems.push(char);
            this.status = 20;
            return;
          case 'f':
            this.elems = [];
            this.elems.push(char);
            this.status = 29;
            return;
          case 'i':
            this.elems = [];
            this.elems.push(char);
            this.status = 33;
            return;
          case 't':
            this.elems = [];
            this.elems.push(char);
            this.status = 36;
            return;
          case 'u':
            this.elems = [];
            this.elems.push(char);
            this.status = 40;
            return;
          case 'w':
            this.elems = [];
            this.elems.push(char);
            this.status = 45;
            return;
        }
        const code = char.charCodeAt(0);
        if ((code >= 97 && code <= 122) ||
          (code >= 59 && code <= 64) || (code >= 33 && code <= 42) ||
          (code >= 48 && code <= 57) || (code >= 123 && code <= 153)) {
          this.elems = [];
          this.elems.push(char);
          this.status = 3;
          return;
        }
        break;
      case 1: {
        if (char === '!') {
          this.elems.push(char);
          this.status = 2;
        } else {
          return this.quit();
        }
        break;
      }
      case 2: {
        if (char === '\n' || char === 'EOF') {
          this.ans.push(this.makeToken('hashbangComment', this.elems.join('')));
          return this.quit();
        } else {
          this.elems.push(char);
        }
        break;
      }
      case 3: {
        const code = char.charCodeAt(0);
        if ((code >= 97 && code <= 122) ||
          (code >= 59 && code <= 64) || (code >= 33 && code <= 42) ||
          (code >= 48 && code <= 57) || (code >= 123 && code <= 153)) {
          this.elems.push(char);
        } else if (char === '.') {
          this.ans.push(this.makeToken('filename', this.elems.join('')));
          this.ans.push(this.makeToken('dot', '.'));
          this.elems = [];
          this.status = 4;
          return;
        } else {
          this.ans.push(this.makeToken('command', this.elems.join('')));
          return this.quit();
        }
        break;
      }
      case 4: {
        const code = char.charCodeAt(0);
        if ((code >= 97 && code <= 122) ||
          (code >= 59 && code <= 64) || (code >= 33 && code <= 42) ||
          (code >= 48 && code <= 57) || (code >= 123 && code <= 153)) {
          this.elems.push(char);
        } else {
          this.ans.push(this.makeToken('suffix', this.elems.join('')));
          return this.quit();
        }
        break;
      }
      case 5:
        if (char === '"') {
          this.ans.push(this.makeToken('string', this.elems.join('')));
          this.ans.push(this.makeToken('doubleQuote', '"'));
          return this.quit();
        } else {
          this.elems.push(char);
        }
        break;
      case 6:
        if (char === "'") {
          this.ans.push(this.makeToken('string', this.elems.join('')));
          this.ans.push(this.makeToken('singleQuote', "'"));
          return this.quit();
        } else {
          this.elems.push(char);
        }
        break;
      case 7:
        if (char === '`') {
          this.ans.push(this.makeToken('string', this.elems.join('')));
          return this.quit();
        } else {
          this.elems.push(char);
        }
        break;
      case 8: {
        if (char === 'EOF') {
          this.ans.push(this.makeToken('variable', this.elems.join('')));
          return this.quit();
        }
        const code = char.charCodeAt(0);
        if ((code >= 97 && code <= 122) ||
          (code >= 65 && code <= 95) || (code >= 33 && code <= 42) ||
          (code >= 48 && code <= 57) || (code >= 123 && code <= 153)) {
          this.elems.push(char);
        } else {
          this.ans.push(this.makeToken('variable', this.elems.join('')));
          return this.quit();
        }
        break;
      }
      case 9: {
        if (char === 'EOF') {
          this.ans.push(this.makeToken('centerLine', '-'));
          return this.quit();
        }
        const code = char.charCodeAt(0);
        if ((code >= 97 && code <= 122) || (code >= 65 && code <= 95)) {
          this.elems.push(char);
          this.status = 10;
        } else {
          this.ans.push(this.makeToken('centerLine', '-'));
          return this.quit();
        }
        break;
      }
      case 10: {
        if (char === 'EOF') {
          this.ans.push(this.makeToken('option', this.elems.join('')));
          return this.quit();
        }
        const code = char.charCodeAt(0);
        if ((code >= 97 && code <= 122) || (code >= 65 && code <= 95)) {
          this.elems.push(char);
        } else {
          this.ans.push(this.makeToken('option', this.elems.join('')));
          return this.quit();
        }
        break;
      }
      case 11: {
        if (char === 'EOF') {
          this.ans.push(this.makeToken('pathVariable', this.elems.join('')));
          return this.quit();
        }
        const code = char.charCodeAt(0);
        if ((code >= 97 && code <= 122) || (code >= 65 && code <= 95)) {
          this.elems.push(char);
        } else {
          this.ans.push(this.makeToken('pathVariable', this.elems.join('')));
          return this.quit();
        }
        break;
      }
      case 12:
        return this.readReserveLetter(char, 'a', 13);
      case 13:
        return this.readReserveLetter(char, 's', 14);
      case 14:
        return this.readReserveLetter(char, 'e', 15);
      case 15:
        return this.getReserve(char, ' ', 'case');
      case 16:
        return this.readReserveLetter(char, 'o', 17);
      case 17:
        if (char === ' ' || char === '\n' || char === 'EOF') {
          this.ans.push(this.makeToken('do', this.elems.join('')));
          return this.quit();
        } else if (char === 'n') {
          this.elems.push(char);
          this.status = 18;
        } else {
          this.elems.push(char);
          this.status = 3;
        }
        break;
      case 18:
        return this.readReserveLetter(char, 'e', 19);
      case 19:
        return this.getReserve(char, '\n', 'done');
      case 20:
        return this.readReserveLetters(char, [
          ['l', 21],
          ['s', 24],
        ]);
      case 21:
        return this.readReserveLetters(char, [
          ['i', 22],
          ['s',  27],
        ]);
      case 22:
        return this.readReserveLetter(char, 'f', 23);
      case 23:
        return this.getReserve(char, '\n', 'elif');
      case 24:
        return this.readReserveLetter(char, 'a', 25);
      case 25:
        return this.readReserveLetter(char, 'c', 26);
      case 26:
        return this.getReserve(char, '\n', 'esac');
      case 27:
        return this.readReserveLetter(char, 'e', 28);
      case 28:
        return this.getReserve(char, '\n', 'else');
      case 29:
        return this.readReserveLetters(char, [
          ['i', 30],
          ['o',  31],
        ]);
      case 30:
        return this.getReserve(char, '\n', 'fi');
      case 31:
        return this.readReserveLetter(char, 'r', 32);
      case 32:
        return this.getReserve(char, '\n', 'for');
      case 33:
        return this.readReserveLetters(char, [
          ['f', 34],
          ['n',  35],
        ]);
      case 34:
        return this.getReserve(char, '\n', 'if');
      case 35:
        return this.getReserve(char, '\n', 'in');
      case 36:
        return this.readReserveLetter(char, 'h', 37);
      case 37:
        return this.readReserveLetter(char, 'e', 38);
      case 38:
        return this.readReserveLetter(char, 'n', 39);
      case 39:
        return this.getReserve(char, '\n', 'then');
      case 40:
        return this.readReserveLetter(char, 'n', 41);
      case 41:
        return this.readReserveLetter(char, 't', 42);
      case 42:
        return this.readReserveLetter(char, 'i', 43);
      case 43:
        return this.readReserveLetter(char, 'l', 44);
      case 44:
        return this.getReserve(char, '\n', 'until');
      case 45:
        return this.readReserveLetter(char, 'h', 46);
      case 46:
        return this.readReserveLetter(char, 'i', 47);
      case 47:
        return this.readReserveLetter(char, 'l', 48);
      case 48:
        return this.readReserveLetter(char, 'e', 49);
      case 49:
        return this.getReserve(char, '\n', 'while');
      default:
        return this.quit();
    }
  }
}

export default ShellLexer;
