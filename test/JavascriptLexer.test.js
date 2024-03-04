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
    `))).toMatch('[{\"type\":\"declare\",\"elem\":\"function\"},{\"type\":\"identifer\",\"elem\":\"n myFunc\"},{\"type\":\"parenthese\",\"elem\":\"(\"},{\"type\":\"identifer\",\"elem\":\"theObject\"},{\"type\":\"parenthese\",\"elem\":\")\"},{\"type\":\"curlyParenthese\",\"elem\":\"{\"},{\"type\":\"identifer\",\"elem\":\"theObject\"},{\"type\":\"call\",\"elem\":\".\"},{\"type\":\"identifer\",\"elem\":\"make\"},{\"type\":\"arithmetic\",\"elem\":\"=\"},{\"type\":\"quotation\",\"elem\":\"\\\"\"},{\"type\":\"string\",\"elem\":\"Toyota\"},{\"type\":\"quotation\",\"elem\":\"\\\"\"},{\"type\":\"symbol\",\"elem\":\";\"},{\"type\":\"curlyParenthese\",\"elem\":\"}\"},{\"type\":\"declare\",\"elem\":\"const\"},{\"type\":\"identifer\",\"elem\":\"t mycar\"},{\"type\":\"arithmetic\",\"elem\":\"=\"},{\"type\":\"curlyParenthese\",\"elem\":\"{\"},{\"type\":\"identifer\",\"elem\":\"make\"},{\"type\":\"symbol\",\"elem\":\":\"},{\"type\":\"quotation\",\"elem\":\"\\\"\"},{\"type\":\"string\",\"elem\":\"Honda\"},{\"type\":\"quotation\",\"elem\":\"\\\"\"},{\"type\":\"symbol\",\"elem\":\",\"},{\"type\":\"identifer\",\"elem\":\"model\"},{\"type\":\"symbol\",\"elem\":\":\"},{\"type\":\"quotation\",\"elem\":\"\\\"\"},{\"type\":\"string\",\"elem\":\"Accord\"},{\"type\":\"quotation\",\"elem\":\"\\\"\"},{\"type\":\"symbol\",\"elem\":\",\"},{\"type\":\"identifer\",\"elem\":\"year\"},{\"type\":\"symbol\",\"elem\":\":\"},{\"type\":\"symbol\",\"elem\":\",\"},{\"type\":\"curlyParenthese\",\"elem\":\"}\"},{\"type\":\"symbol\",\"elem\":\";\"},{\"type\":\"identifer\",\"elem\":\"console\"},{\"type\":\"call\",\"elem\":\".\"},{\"type\":\"identifer\",\"elem\":\"log\"},{\"type\":\"parenthese\",\"elem\":\"(\"},{\"type\":\"identifer\",\"elem\":\"mycar\"},{\"type\":\"call\",\"elem\":\".\"},{\"type\":\"identifer\",\"elem\":\"make\"},{\"type\":\"parenthese\",\"elem\":\")\"},{\"type\":\"symbol\",\"elem\":\";\"},{\"type\":\"lineComment\",\"elem\":\"// \\\"Honda\\\"\\n\"},{\"type\":\"identifer\",\"elem\":\"myFunc\"},{\"type\":\"parenthese\",\"elem\":\"(\"},{\"type\":\"identifer\",\"elem\":\"mycar\"},{\"type\":\"parenthese\",\"elem\":\")\"},{\"type\":\"symbol\",\"elem\":\";\"},{\"type\":\"identifer\",\"elem\":\"console\"},{\"type\":\"call\",\"elem\":\".\"},{\"type\":\"identifer\",\"elem\":\"log\"},{\"type\":\"parenthese\",\"elem\":\"(\"},{\"type\":\"identifer\",\"elem\":\"mycar\"},{\"type\":\"call\",\"elem\":\".\"},{\"type\":\"identifer\",\"elem\":\"make\"},{\"type\":\"parenthese\",\"elem\":\")\"},{\"type\":\"symbol\",\"elem\":\";\"},{\"type\":\"lineComment\",\"elem\":\"// \\\"Toyota\\\"\\n\"}]');
  });
});
