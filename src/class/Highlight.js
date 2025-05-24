class HighLight {
  constructor() {
    this.lexers = [];
    this.use = 0;
  }

  addLexer(lexer) {
    this.lexers.push(lexer);
  }

  garbageRecover() {
    this.use -= 1;
    const { use, } = this;
    if ((use / this.ins.length) < 0.8) {
      const newIns = [];
      for (let i = 0; i < this.ins.length; i += 1) {
        const e = this.ins[i];
        if (e !== undefined) {
          e.i = newIns.length;
          newIns.push(e);
        }
      }
      this.ins = newIns;
    }
  }

  parse(text) {
    const { lexers, } = this;
    const ans = [];
    this.ins = [];
    this.use += 0;
    this.open = true;
    const times = new Array(lexers.length).fill(0);
    outer: for (let i = 0; i <= text.length; i += 1) {
      let char = text.charAt(i);
      this.ins.forEach((l) => {
        if (l !== undefined) {
          if (l.scan(char) === false) {
            this.garbageRecover();
            times[l.j] -= 1;
          }
        }
      });
      switch (char) {
        case ' ':
        case '\n':
          ans.push({ type: char, });
          this.open = true;
          continue outer;
      }
      const { open, } = this;
      for (let j = 0; j < times.length; j += 1) {
        if (open === true && times[j] <= 0) {
          const l = new lexers[j](this, ans, j);
          if (l.scan(char) === undefined) {
            l.setIndex(this.ins.length);
            this.ins.push(l);
            this.use += 1;
            times[j] += 1;
            this.open = false;
          }
        }
      }
    }
    return ans;
  }
}

export default HighLight;
