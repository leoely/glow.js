import { describe, expect, test, } from '@jest/globals';
import HighLight from '~/class/HighLight';
import ShellLexer from '~/class/ShellLexer';

describe('[class] ShellLexer', () => {
  test('ShellLexer parse result should be correct.', () => {
    const highLight = new HighLight();
    highLight.addLexer(ShellLexer);
    expect(JSON.stringify(highLight.parse('curl https://drip.com/file/install.js | node -'))).toMatch('[{\"type\":\"command\",\"elem\":\"curl\"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\"symbol\",\"elem\":\"|\"},{\"type\":\" \"},{\"type\":\"command\",\"elem\":\"node\"},{\"type\":\" \"},{\"type\":\"symbol\",\"elem\":\"-\"}]');
  });
});
