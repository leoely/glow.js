import { describe, expect, test, } from '@jest/globals';
import HighLight from '~/class/HighLight';
import JavascriptLexer from '~/class/JavascriptLexer';

describe('[class] JavascriptLexer', () => {
  test('JavascriptLexer parse result should be correct.', () => {
    const highLight = new HighLight();
    highLight.addLexer(JavascriptLexer);
    expect(JSON.stringify(highLight.parse('os.cpus()'))).toMatch('[{\"type\":\"identifer\",\"elem\":\"os\"},{\"type\":\"symbol\",\"elem\":\".\"},{\"type\":\"identifer\",\"elem\":\"cpus\"},{\"type\":\"parenthese\",\"elem\":\"(\"},{\"type\":\"parenthese\",\"elem\":\")\"}]');
  });
});
