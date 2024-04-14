import { describe, expect, test, } from '@jest/globals';
import HighLight from '~/class/HighLight';
import LocationLexer from '~/class/LocationLexer';
import ShellLexer from '~/class/ShellLexer';

describe('[class] LocationLexer', () => {
  test('LocationLexer parse result should be correct.', () => {
    const highLight = new HighLight();
    highLight.addLexer(LocationLexer);
    expect(JSON.stringify(highLight.parse('/tmp/example'))).toMatch('[{\"type\":\"slash\",\"elem\":\"/\"},{\"type\":\"namespace\",\"elem\":\"tmp\"},{\"type\":\"slash\",\"elem\":\"/\"},{\"type\":\"namespace\",\"elem\":\"example\"}]');
    expect(JSON.stringify(highLight.parse('curl https://drip.com/file/install.js'))).toMatch('[{\"type\":\"namespace\",\"elem\":\"curl\"},{\"type\":\" \"},{\"type\":\"namespace\",\"elem\":\"https\"},{\"type\":\"colon\",\"elem\":\":\"},{\"type\":\"slash\",\"elem\":\"/\"},{\"type\":\"slash\",\"elem\":\"/\"},{\"type\":\"namespace\",\"elem\":\"drip\"},{\"type\":\"dot\",\"elem\":\".\"},{\"type\":\"namespace\",\"elem\":\"com\"},{\"type\":\"slash\",\"elem\":\"/\"},{\"type\":\"namespace\",\"elem\":\"file\"},{\"type\":\"slash\",\"elem\":\"/\"},{\"type\":\"namespace\",\"elem\":\"install\"},{\"type\":\"dot\",\"elem\":\".\"},{\"type\":\"namespace\",\"elem\":\"js\"}]');
    highLight.addLexer(ShellLexer);
    expect(JSON.stringify(highLight.parse('curl http://drip.org.cn:3004/file/install.js -d "" | node -'))).toMatch('[{\"type\":\"namespace\",\"elem\":\"curl\"},{\"type\":\" \"},{\"type\":\"namespace\",\"elem\":\"http\"},{\"type\":\"colon\",\"elem\":\":\"},{\"type\":\"slash\",\"elem\":\"/\"},{\"type\":\"slash\",\"elem\":\"/\"},{\"type\":\"namespace\",\"elem\":\"drip\"},{\"type\":\"dot\",\"elem\":\".\"},{\"type\":\"filename\",\"elem\":\"org\"},{\"type\":\"dot\",\"elem\":\".\"},{\"type\":\"suffix\",\"elem\":\"cn\"},{\"type\":\"colon\",\"elem\":\":\"},{\"type\":\"namespace\",\"elem\":\"3004\"},{\"type\":\"slash\",\"elem\":\"/\"},{\"type\":\"namespace\",\"elem\":\"file\"},{\"type\":\"slash\",\"elem\":\"/\"},{\"type\":\"namespace\",\"elem\":\"install\"},{\"type\":\"dot\",\"elem\":\".\"},{\"type\":\"command\",\"elem\":\"js\"},{\"type\":\" \"},{\"type\":\"option\",\"elem\":\"-d\"},{\"type\":\" \"},{\"type\":\"namespace\",\"elem\":\"\\\"\\\"\"},{\"type\":\" \"},{\"type\":\"or\",\"elem\":\"|\"},{\"type\":\" \"},{\"type\":\"namespace\",\"elem\":\"node\"},{\"type\":\" \"},{\"type\":\"centerLine\",\"elem\":\"-\"}]');
  });
});
