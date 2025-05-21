import { describe, expect, test, } from '@jest/globals';
import HighLight from '~/class/HighLight';
import LocationLexer from '~/class/LocationLexer';
import ShellLexer from '~/class/ShellLexer';

describe('[class] LocationLexer', () => {
  test('LocationLexer parse result should be correct.', () => {
    const highLight = new HighLight();
    highLight.addLexer(LocationLexer);
    expect(JSON.stringify(highLight.parse('./../log'))).toMatch('[{\"type\":\"dot\",\"elem\":\".\"},{\"type\":\"slash\",\"elem\":\"/\"},{\"type\":\"dot\",\"elem\":\".\"},{\"type\":\"dot\",\"elem\":\".\"},{\"type\":\"slash\",\"elem\":\"/\"},{\"type\":\"namespace\",\"elem\":\"log\"}]');
    expect(JSON.stringify(highLight.parse('/tmp/advising.js/log'))).toMatch('[{\"type\":\"slash\",\"elem\":\"/\"},{\"type\":\"namespace\",\"elem\":\"tmp\"},{\"type\":\"slash\",\"elem\":\"/\"},{\"type\":\"namespace\",\"elem\":\"advising.js\"},{\"type\":\"slash\",\"elem\":\"/\"},{\"type\":\"namespace\",\"elem\":\"log\"}]');
    expect(JSON.stringify(highLight.parse('/tmp/../tmp'))).toMatch('[{\"type\":\"slash\",\"elem\":\"/\"},{\"type\":\"namespace\",\"elem\":\"tmp\"},{\"type\":\"slash\",\"elem\":\"/\"},{\"type\":\"dot\",\"elem\":\".\"},{\"type\":\"dot\",\"elem\":\".\"},{\"type\":\"slash\",\"elem\":\"/\"},{\"type\":\"namespace\",\"elem\":\"tmp\"}]');
    expect(JSON.stringify(highLight.parse('http://www.example.com:8080/index.html'))).toMatch('[{\"type\":\"protocol\",\"elem\":\"http\"},{\"type\":\"colon\",\"elem\":\":\"},{\"type\":\"slash\",\"elem\":\"/\"},{\"type\":\"slash\",\"elem\":\"/\"},{\"type\":\"host\",\"elem\":\"www.example.com\"},{\"type\":\"colon\",\"elem\":\":\"},{\"type\":\"port\",\"elem\":\"8080\"},{\"type\":\"slash\",\"elem\":\"/\"},{\"type\":\"namespace\",\"elem\":\"index.html\"}]');
    expect(JSON.stringify(highLight.parse('http://test.com:8888/male//5/10'))).toMatch('[{\"type\":\"protocol\",\"elem\":\"http\"},{\"type\":\"colon\",\"elem\":\":\"},{\"type\":\"slash\",\"elem\":\"/\"},{\"type\":\"slash\",\"elem\":\"/\"},{\"type\":\"host\",\"elem\":\"test.com\"},{\"type\":\"colon\",\"elem\":\":\"},{\"type\":\"port\",\"elem\":\"8888\"},{\"type\":\"slash\",\"elem\":\"/\"},{\"type\":\"namespace\",\"elem\":\"male\"},{\"type\":\"slash\",\"elem\":\"/\"},{\"type\":\"slash\",\"elem\":\"/\"},{\"type\":\"namespace\",\"elem\":\"5\"},{\"type\":\"slash\",\"elem\":\"/\"},{\"type\":\"namespace\",\"elem\":\"10\"}]');
    highLight.addLexer(ShellLexer);
    expect(JSON.stringify(highLight.parse('curl http://drip.org.cn:3004/file/install.js -d "" | node -'))).toMatch('[{\"type\":\"command\",\"elem\":\"curl\"},{\"type\":\" \"},{\"type\":\"protocol\",\"elem\":\"http\"},{\"type\":\"colon\",\"elem\":\":\"},{\"type\":\"slash\",\"elem\":\"/\"},{\"type\":\"slash\",\"elem\":\"/\"},{\"type\":\"host\",\"elem\":\"drip.org.cn\"},{\"type\":\"colon\",\"elem\":\":\"},{\"type\":\"port\",\"elem\":\"3004\"},{\"type\":\"slash\",\"elem\":\"/\"},{\"type\":\"namespace\",\"elem\":\"file\"},{\"type\":\"slash\",\"elem\":\"/\"},{\"type\":\"namespace\",\"elem\":\"install.js\"},{\"type\":\" \"},{\"type\":\"option\",\"elem\":\"-d\"},{\"type\":\" \"},{\"type\":\"doubleQuote\",\"elem\":\"\\\"\"},{\"type\":\"string\",\"elem\":\"\"},{\"type\":\"doubleQuote\",\"elem\":\"\\\"\"},{\"type\":\" \"},{\"type\":\"or\",\"elem\":\"|\"},{\"type\":\" \"},{\"type\":\"command\",\"elem\":\"node\"},{\"type\":\" \"},{\"type\":\"centerLine\",\"elem\":\"-\"}]');
  });
});
