import { describe, expect, test, } from '@jest/globals';
import HighLight from '~/class/HighLight';
import NumberLexer from '~/class/NumberLexer';

describe('[class] LocationLexer', () => {
  test('LocationLexer parse result should be correct.', () => {
    const highLight = new HighLight();
    highLight.addLexer(NumberLexer);
    expect(JSON.stringify(highLight.parse('5,000'))).toMatch('[{\"type\":\"number\",\"elem\":\"5\"},{\"type\":\"separator\",\"elem\":\",\"},{\"type\":\"number\",\"elem\":\"000\"}]');
    expect(JSON.stringify(highLight.parse('434_568_393'))).toMatch('[{\"type\":\"number\",\"elem\":\"434\"},{\"type\":\"separator\",\"elem\":\"_\"},{\"type\":\"number\",\"elem\":\"568\"},{\"type\":\"separator\",\"elem\":\"_\"},{\"type\":\"number\",\"elem\":\"393\"}]');
    expect(JSON.stringify(highLight.parse("84'232'529"))).toMatch("[{\"type\":\"number\",\"elem\":\"84\"},{\"type\":\"separator\",\"elem\":\"'\"},{\"type\":\"number\",\"elem\":\"232\"},{\"type\":\"separator\",\"elem\":\"'\"},{\"type\":\"number\",\"elem\":\"529\"}]");
    expect(JSON.stringify(highLight.parse('12_424_321.583'))).toMatch('[{\"type\":\"number\",\"elem\":\"12\"},{\"type\":\"separator\",\"elem\":\"_\"},{\"type\":\"number\",\"elem\":\"424\"},{\"type\":\"separator\",\"elem\":\"_\"},{\"type\":\"number\",\"elem\":\"321\"},{\"type\":\"point\",\"elem\":\".\"},{\"type\":\"number\",\"elem\":\"583\"}]');
  });
});
