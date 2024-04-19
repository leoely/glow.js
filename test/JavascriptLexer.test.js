import { describe, expect, test, } from '@jest/globals';
import HighLight from '~/class/HighLight';
import JavascriptLexer from '~/class/JavascriptLexer';

describe('[class] JavascriptLexer', () => {
  test('JavascriptLexer parse result should be correct.', () => {
    const highLight = new HighLight();
    highLight.addLexer(JavascriptLexer);
    expect(JSON.stringify(highLight.parse('os.cpus()'))).toMatch('[{\"type\":\"identifer\",\"elem\":\"os\"},{\"type\":\"call\",\"elem\":\".\"},{\"type\":\"identifer\",\"elem\":\"cpus\"},{\"type\":\"parenthese\",\"elem\":\"(\"},{\"type\":\"parenthese\",\"elem\":\")\"}]');
    expect(JSON.stringify(highLight.parse(`
    function myFunc(theObject) {
      theObject.make = "Toyota";
    }

    const mycar = {
      make: "Honda",
      model: "Accord",
      year: 1998,
    };

    console.log(mycar.make); // "Honda"
    myFunc(mycar);
    console.log(mycar.make); // "Toyota"
    `))).toMatch('[]');
    expect(JSON.stringify(highLight.parse('o423423'))).toMatch('[{\"type\":\"decimal\",\"elem\":\"o423423\"}]');
  });
});
