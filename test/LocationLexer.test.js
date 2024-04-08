import { describe, expect, test, } from '@jest/globals';
import HighLight from '~/class/HighLight';
import LocationLexer from '~/class/LocationLexer';
import ShellLexer from '~/class/ShellLexer';

describe('[class] LocationLexer', () => {
  test('LocationLexer parse result should be correct.', () => {
    const highLight = new HighLight();
    highLight.addLexer(LocationLexer);
    expect(JSON.stringify(highLight.parse('/tmp/example'))).toMatch('[{\"type\":\"symbol\",\"elem\":\"/\"},{\"type\":\"namespace\",\"elem\":\"tmp\"},{\"type\":\"symbol\",\"elem\":\"/\"},{\"type\":\"namespace\",\"elem\":\"example\"}]');
    expect(JSON.stringify(highLight.parse('curl https://drip.com/file/install.js'))).toMatch('[{\"type\":\"namespace\",\"elem\":\"curl\"},{\"type\":\" \"},{\"type\":\"namespace\",\"elem\":\"https\"},{\"type\":\"symbol\",\"elem\":\":\"},{\"type\":\"symbol\",\"elem\":\"/\"},{\"type\":\"symbol\",\"elem\":\"/\"},{\"type\":\"namespace\",\"elem\":\"drip\"},{\"type\":\"symbol\",\"elem\":\".\"},{\"type\":\"namespace\",\"elem\":\"com\"},{\"type\":\"symbol\",\"elem\":\"/\"},{\"type\":\"namespace\",\"elem\":\"file\"},{\"type\":\"symbol\",\"elem\":\"/\"},{\"type\":\"namespace\",\"elem\":\"install\"},{\"type\":\"symbol\",\"elem\":\".\"},{\"type\":\"namespace\",\"elem\":\"js\"}]');
    highLight.addLexer(ShellLexer);
    expect(JSON.stringify(highLight.parse('curl http://drip.org.cn:3004/file/install.js -d "" | node -'))).toMatch('[{\"type\":\"namespace\",\"elem\":\"curl\"},{\"type\":\" \"},{\"type\":\"namespace\",\"elem\":\"http\"},{\"type\":\"symbol\",\"elem\":\":\"},{\"type\":\"centerLine\",\"elem\":\"-\"},{\"type\":\"symbol\",\"elem\":\"/\"},{\"type\":\"filename\",\"elem\":\"//drip.org\"},{\"type\":\"symbol\",\"elem\":\".\"},{\"type\":\"command\",\"elem\":\"cn\"},{\"type\":\"symbol\",\"elem\":\":\"},{\"type\":\"centerLine\",\"elem\":\"-\"},{\"type\":\"namespace\",\"elem\":\"3004\"},{\"type\":\"symbol\",\"elem\":\"/\"},{\"type\":\"filename\",\"elem\":\"/file/install.js\"},{\"type\":\" \"},{\"type\":\"option\",\"elem\":\"-d\"},{\"type\":\" \"},{\"type\":\"namespace\",\"elem\":\"\\\"\\\"\"},{\"type\":\" \"},{\"type\":\"or\",\"elem\":\"|\"},{\"type\":\" \"},{\"type\":\"namespace\",\"elem\":\"node\"},{\"type\":\" \"}]');
  });
});
