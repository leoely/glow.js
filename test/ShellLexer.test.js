import { describe, expect, test, } from '@jest/globals';
import HighLight from '~/class/HighLight';
import ShellLexer from '~/class/ShellLexer';

describe('[class] ShellLexer', () => {
  test('ShellLexer parse result should be correct.', () => {
    const highLight = new HighLight();
    highLight.addLexer(ShellLexer);
    expect(JSON.stringify(highLight.parse('fulmination parse text.ctf'))).toMatch('[{\"type\":\"command\",\"elem\":\"fulmination\"},{\"type\":\" \"},{\"type\":\"command\",\"elem\":\"parse\"},{\"type\":\" \"},{\"type\":\"command\",\"elem\":\"text\"},{\"type\":\"dot\",\"elem\":\".\"},{\"type\":\"command\",\"elem\":\"ctf\"}]');
  });
});
