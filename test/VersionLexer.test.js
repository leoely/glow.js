import { describe, expect, test, } from '@jest/globals';
import HighLight from '~/class/HighLight';
import VersionLexer from '~/class/VersionLexer';
import ShellLexer from '~/class/ShellLexer';

describe('[class] VersionLexer;', () => {
  test('VersionLexer parse result should be correct.', () => {
    const highLight = new HighLight();
    highLight.addLexer(VersionLexer);
    expect(JSON.stringify(highLight.parse('v0.0.1'))).toMatch('[{\"type\":\"head\",\"elem\":\"v\"},{\"type\":\"version\",\"elem\":\"0\"},{\"type\":\"dot\",\"elem\":\".\"},{\"type\":\"version\",\"elem\":\"0\"},{\"type\":\"dot\",\"elem\":\".\"},{\"type\":\"version\",\"elem\":\"1\"}]');
    highLight.addLexer(ShellLexer);
    expect(JSON.stringify(highLight.parse('git tag v0.0.1'))).toMatch('[{\"type\":\"command\",\"elem\":\"git\"},{\"type\":\" \"},{\"type\":\"command\",\"elem\":\"tag\"},{\"type\":\" \"},{\"type\":\"head\",\"elem\":\"v\"},{\"type\":\"version\",\"elem\":\"0\"},{\"type\":\"dot\",\"elem\":\".\"},{\"type\":\"version\",\"elem\":\"0\"},{\"type\":\"dot\",\"elem\":\".\"},{\"type\":\"version\",\"elem\":\"1\"}]');
  });
});
