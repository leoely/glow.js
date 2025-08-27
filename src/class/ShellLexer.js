import Lexer from './Lexer';

let location = 0;

class ShellLexer extends Lexer {
  constructor(...params) {
    super(...params);
  }

  checkTokenDuplicate(elem) {
    const { ans, } = this;
    const { length, } = ans;
    return ans[length - 1].elem === elem;
  }

  readReserveLetter(char, letter, status) {
    switch (char) {
      case letter:
        this.chars.push(char);
        this.status = status;
        break;
      case '':
      case ' ':
      case ';':
        return this.createTokenChars('identifer');
      default:
        this.chars.push(char);
        this.status = 3;
    }
  }

  readReserveLetters(char, array) {
    let flag = false;
    for (let i = 0; i < array.length; i += 1) {
      const [letter, status] = array[i];
      if (char === letter) {
        this.chars.push(char);
        this.status = status;
        flag = true;
        break;
      }
    }
    if (flag === false) {
      switch (char) {
        case '':
        case ' ':
          location = 0;
          return this.createTokenChars('identifer');
        default:
          this.chars.push(char);
          this.status = 3;
      }
    }
  }

  getReserve(char, letter, set) {
    switch (char) {
      case '':
      case '|':
      case letter:
      case ';':
      case '(':
      case '{':
      case ':':
      case '&':
      case ' ':
      case '.':
      case '\n':
        location = 0;
        return this.createTokenChars(set);
      default:
        this.identifer = true;
        this.status = 3;
        this.chars.push(char);
    }
  }

  generateCommandToken() {
    if (location === 0) {
      return this.createTokenChars('command');
    } else {
      return this.createTokenChars('subCommand');
    }
  }

  scan(char) {
    const { status, } = this;
    switch (status) {
      case 0:
        switch (char) {
          case '':
            location = 0;
            break;
          case '|':
            location = 0;
            return this.createToken('or', '|');
          case '&':
            location = 0;
            return this.createToken('and', '&');
          case '(':
            return this.createToken('bracket', '(');
          case ')':
            return this.createToken('bracket', ')');
          case '<':
            return this.createToken('angleBracket', '<');
          case '>':
            return this.createToken('angleBracket', '>');
          case '{':
            return this.createToken('bigBracket', '{');
          case '}':
            return this.createToken('bigBracket', '}');
          case '*':
            return this.createToken('asterisk', '*');
          case '!':
            return this.createToken('exclamation', '!');
          case '?':
            return this.createToken('questionMark', '?');
          case '@':
            return this.createToken('at', '@');
          case ':':
            this.prepareCharsAndJump(char, 12);
            break;
          case '-':
            this.prepareCharsAndJump(char, 9);
            break;
          case '#':
            this.prepareCharsAndJump(char, 1);
            break;
          case "`":
            this.prepareCharsAndJump(char, 7);
            break;
          case '$':
            this.prepareCharsAndJump(char, 8);
            break;
          case '"':
            if (!this.checkTokenDuplicate('"')) {
              this.appendToken('doubleQuote', char);
              this.prepareEmptyCharsAndJump(5);
            } else {
              location = 0;
              return this.quit();
            }
            break;
          case "'":
            if (!this.checkTokenDuplicate('"')) {
              this.appendToken('singleQuote', char);
              this.prepareEmptyCharsAndJump(6);
            } else {
              location = 0;
              return this.quit();
            }
            break;
          case 'b':
            this.prepareCharsAndJump(char, 49);
            break;
          case 'c':
            this.prepareCharsAndJump(char, 12);
            break;
          case 'd':
            this.prepareCharsAndJump(char, 16);
            break;
          case 'e':
            this.prepareCharsAndJump(char, 20);
            break;
          case 'f':
            this.prepareCharsAndJump(char, 29);
            break;
          case 'i':
            this.prepareCharsAndJump(char, 33);
            break;
          case 't':
            this.prepareCharsAndJump(char, 36);
            break;
          case 'u':
            this.prepareCharsAndJump(char, 40);
            break;
          case 'w':
            this.prepareCharsAndJump(char, 45);
            break;
          default:
            this.prepareCharsAndJump(char, 3);
        }
        break;
      case 1:
        switch (char) {
          case '!':
            this.chars.push(char);
            this.status = 2;
            break;
          default:
            location = 0;
            return this.quit();
        }
        break;
      case 2: {
        switch (char) {
          case '':
          case '\n':
            location = 0;
            return this.createTokenChars('hashbangComment');
          default:
            this.chars.push(char);
        }
        break;
      }
      case 3:
        switch (char) {
          case ' ': {
            const ans = this.generateCommandToken();
            location += 1;
            return ans;
          }
          case '':
          case '\n': {
            const ans = this.generateCommandToken();
            location = 0;
            return ans;
          }
          default:
            if (/^[a-zA-Z]$/.test(char)) {
              this.chars.push(char);
            } else {
              location = 0;
              return this.quit();
            }
        }
        break;
      case 4:
        if (/^[a-zA-Z]$/.test(char)) {
          this.chars.push(char);
        } else {
          location = 0;
          return this.createTokenChars('option');
        }
        break;
      case 5:
        switch (char) {
          case '"':
            this.appendTokenChars('string');
            this.appendToken('doubleQuote', char);
            location = 0;
            return this.quit();
          default:
            this.chars.push(char);
        }
        break;
      case 6:
        switch (char) {
          case "'":
            this.appendTokenChars('string');
            this.appendToken('singleQuote', char);
            location = 0;
            return this.quit();
          default:
          this.chars.push(char);
        }
        break;
      case 7:
        switch (char) {
          case '`':
            this.createTokenChars('string');
          default:
            this.chars.push(char);
        }
        break;
      case 8:
        if (/^[a-zA-Z]$/.test(char)) {
          this.chars.push(char);
        } else {
          location = 0;
          return this.createTokenChars('variable');
        }
        break;
      case 9:
        if (/^[a-zA-Z\-]$/.test(char)) {
          this.chars.push(char);
          this.status = 4;
        } else {
          location = 0;
          return this.createToken('centerLine', '-');
        }
        break;
      case 11:
        return this.getReserve(char, '\n', 'while');
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
        switch (char) {
          case '':
          case ' ':
          case '\n':
            location = 0;
            return this.createTokenChars('do');
          case 'n':
            this.chars.push(char);
            this.status = 18;
            break;
          default:
            this.chars.push(char);
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
        location = 0;
        return this.getReserve(char, '\n', 'fi');
      case 31:
        return this.readReserveLetter(char, 'r', 32);
      case 32:
        location = 0;
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
        return this.readReserveLetter(char, 'e', 11);
      case 49:
        return this.readReserveLetter(char, 'r', 50);
      case 50:
        return this.readReserveLetter(char, 'e', 51);
      case 51:
        return this.readReserveLetter(char, 'a', 52);
      case 52:
        return this.readReserveLetter(char, 'k', 53);
      case 53:
        return this.getReserve(char, '\n', 'break');
    }
  }
}

export default ShellLexer;
