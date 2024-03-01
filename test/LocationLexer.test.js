import { describe, expect, test, } from '@jest/globals';
import HighLight from '~/class/HighLight';
import LocationLexer from '~/class/LocationLexer';

describe('[class] LocationLexer', () => {
  test('LocationLexer parse result should be correct.', () => {
    const highLight = new HighLight();
    highLight.addLexer(LocationLexer);
    expect(JSON.stringify(highLight.parse('/tmp/example'))).toMatch('[{\"type\":\"/\"},{\"type\":\"namespace\",\"elem\":\"tmp\"},{\"type\":\"/\"},{\"type\":\"namespace\",\"elem\":\"example\"}]');
    expect(JSON.stringify(highLight.parse('curl https://drip.com/file/install.js | node -'))).toMatch('[{\"type\":\"namespace\",\"elem\":\"curl\"},{\"type\":\" \"},{\"type\":\"namespace\",\"elem\":\"https\"},{\"type\":\":\"},{\"type\":\"//\"},{\"type\":\"/\"},{\"type\":\"namespace\",\"elem\":\"drip.com\"},{\"type\":\"/\"},{\"type\":\"namespace\",\"elem\":\"file\"},{\"type\":\"/\"},{\"type\":\"namespace\",\"elem\":\"install.js\"},{\"type\":\" \"},{\"type\":\"namespace\",\"elem\":\"|\"},{\"type\":\" \"},{\"type\":\"namespace\",\"elem\":\"node\"},{\"type\":\" \"},{\"type\":\"namespace\",\"elem\":\"-\"}]');
  });
});
