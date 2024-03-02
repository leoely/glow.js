import { describe, expect, test, } from '@jest/globals';
import HighLight from '~/class/HighLight';
import VersionLexer from '~/class/VersionLexer';

describe('[class] VersionLexer', () => {
  test('VersionLexer parse result should be correct.', () => {
    const highLight = new HighLight();
    highLight.addLexer(VersionLexer);
    expect(JSON.stringify(highLight.parse('v0.0.1'))).toMatch('[{\"type\":\"symbol\",\"elem\":\"v\"},{\"type\":\"version\",\"elem\":\"0\"},{\"type\":\"symbol\",\"elem\":\".\"},{\"type\":\"version\",\"elem\":\"0\"},{\"type\":\"symbol\",\"elem\":\".\"},{\"type\":\"version\",\"elem\":\"1\"}]');
  });
});
