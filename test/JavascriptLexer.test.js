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
    `))).toMatch('[{\"type\":\"\\n\"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\"declare\",\"elem\":\"function\"},{\"type\":\" \"},{\"type\":\"identifer\",\"elem\":\"myFunc\"},{\"type\":\"parenthese\",\"elem\":\"(\"},{\"type\":\"identifer\",\"elem\":\"theObject\"},{\"type\":\"parenthese\",\"elem\":\")\"},{\"type\":\" \"},{\"type\":\"curlyParenthese\",\"elem\":\"{\"},{\"type\":\"\\n\"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\"identifer\",\"elem\":\"theObject\"},{\"type\":\"call\",\"elem\":\".\"},{\"type\":\"identifer\",\"elem\":\"make\"},{\"type\":\" \"},{\"type\":\"arithmetic\",\"elem\":\"=\"},{\"type\":\" \"},{\"type\":\"quotation\",\"elem\":\"\\\"\"},{\"type\":\"string\",\"elem\":\"Toyota\"},{\"type\":\"quotation\",\"elem\":\"\\\"\"},{\"type\":\"function\",\"elem\":\";\"},{\"type\":\"\\n\"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\"curlyParenthese\",\"elem\":\"}\"},{\"type\":\"\\n\"},{\"type\":\"\\n\"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\"identifer\",\"elem\":\"const\"},{\"type\":\" \"},{\"type\":\"identifer\",\"elem\":\"mycar\"},{\"type\":\" \"},{\"type\":\"arithmetic\",\"elem\":\"=\"},{\"type\":\" \"},{\"type\":\"curlyParenthese\",\"elem\":\"{\"},{\"type\":\"\\n\"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\"identifer\",\"elem\":\"make\"},{\"type\":\"iteral\",\"elem\":\":\"},{\"type\":\" \"},{\"type\":\"quotation\",\"elem\":\"\\\"\"},{\"type\":\"string\",\"elem\":\"Honda\"},{\"type\":\"quotation\",\"elem\":\"\\\"\"},{\"type\":\"iteral\",\"elem\":\",\"},{\"type\":\"\\n\"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\"identifer\",\"elem\":\"model\"},{\"type\":\"iteral\",\"elem\":\":\"},{\"type\":\" \"},{\"type\":\"quotation\",\"elem\":\"\\\"\"},{\"type\":\"string\",\"elem\":\"Accord\"},{\"type\":\"quotation\",\"elem\":\"\\\"\"},{\"type\":\"iteral\",\"elem\":\",\"},{\"type\":\"\\n\"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\"identifer\",\"elem\":\"year\"},{\"type\":\"iteral\",\"elem\":\":\"},{\"type\":\" \"},{\"type\":\"decimal\",\"elem\":\"1998\"},{\"type\":\"iteral\",\"elem\":\",\"},{\"type\":\"\\n\"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\"curlyParenthese\",\"elem\":\"}\"},{\"type\":\"function\",\"elem\":\";\"},{\"type\":\"\\n\"},{\"type\":\"\\n\"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\"identifer\",\"elem\":\"console\"},{\"type\":\"call\",\"elem\":\".\"},{\"type\":\"identifer\",\"elem\":\"log\"},{\"type\":\"parenthese\",\"elem\":\"(\"},{\"type\":\"identifer\",\"elem\":\"mycar\"},{\"type\":\"call\",\"elem\":\".\"},{\"type\":\"identifer\",\"elem\":\"make\"},{\"type\":\"parenthese\",\"elem\":\")\"},{\"type\":\"function\",\"elem\":\";\"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\"lineComment\",\"elem\":\"// \\\"Honda\\\"\\n\"},{\"type\":\"\\n\"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\"identifer\",\"elem\":\"myFunc\"},{\"type\":\"parenthese\",\"elem\":\"(\"},{\"type\":\"identifer\",\"elem\":\"mycar\"},{\"type\":\"parenthese\",\"elem\":\")\"},{\"type\":\"function\",\"elem\":\";\"},{\"type\":\"\\n\"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\"identifer\",\"elem\":\"console\"},{\"type\":\"call\",\"elem\":\".\"},{\"type\":\"identifer\",\"elem\":\"log\"},{\"type\":\"parenthese\",\"elem\":\"(\"},{\"type\":\"identifer\",\"elem\":\"mycar\"},{\"type\":\"call\",\"elem\":\".\"},{\"type\":\"identifer\",\"elem\":\"make\"},{\"type\":\"parenthese\",\"elem\":\")\"},{\"type\":\"function\",\"elem\":\";\"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\"lineComment\",\"elem\":\"// \\\"Toyota\\\"\\n\"},{\"type\":\"\\n\"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"}]');
    expect(JSON.stringify(highLight.parse('o423423'))).toMatch('[{\"type\":\"decimal\",\"elem\":\"o423423\"}]');
  });
});
