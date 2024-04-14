import Lexer from '~/class/Lexer';

class LocationLexer extends Lexer {
  constructor(...param) {
    super(...param);
  }

  scan(char) {
    switch (this.status) {
      case 0: {
        const code = char.charCodeAt(0);
        if (
          (code >= 48 && code <= 57) ||
          (code >= 97 && code <= 122) ||
          (code >= 65 && code <= 90) ||
          (code >= 59 && code <= 64) ||
          (code >= 33 && code <= 44) ||
          (code >= 125 && code <= 153)
        ) {
          this.elems = [];
          this.elems.push(char);
          this.status = 1;
          return;
        }
        switch (char) {
          case '/':
            this.status = 2;
            return;
          case ':':
            this.ans.push(this.makeLexer('colon', ':'));
            return this.quit();
          case '.':
            this.ans.push(this.makeLexer('dot', '.'));
            return this.quit();
          default:
            return this.quit();
        }
        break;
      }
      case 1: {
        const code = char.charCodeAt(0);
        if (char.length === 1) {
          if (
            (code >= 48 && code <= 57) ||
            (code >= 97 && code <= 122) ||
            (code >= 65 && code <= 90) ||
            (code >= 59 && code <= 64) ||
            (code >= 33 && code <= 44) ||
            (code >= 125 && code <= 153)
          ) {
            if (this.elems === undefined) {
              this.elems = [];
            }
            this.elems.push(char);
          } else {
            this.ans.push(this.makeLexer('namespace', this.elems.join('')));
            return this.quit();
          }
        } else {
          this.ans.push(this.makeLexer('namespace', this.elems.join('')));
          return this.quit();
        }
        break;
      }
      case 2:
        this.ans.push(this.makeLexer('slash', '/'));
        return this.quit();
      default:
        return this.quit();
    }
  }
}

export default LocationLexer;
