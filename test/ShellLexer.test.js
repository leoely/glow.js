import { describe, expect, test, } from '@jest/globals';
import HighLight from '~/class/HighLight';
import ShellLexer from '~/class/ShellLexer';

describe('[class] ShellLexer', () => {
  test('ShellLexer parse result should be correct.', () => {
    const highLight = new HighLight();
    highLight.addLexer(ShellLexer);
    expect(JSON.stringify(highLight.parse('fulmination parse text.ctf'))).toMatch('[{\"type\":\"command\",\"elem\":\"fulmination\"},{\"type\":\" \"},{\"type\":\"command\",\"elem\":\"parse\"},{\"type\":\" \"},{\"type\":\"filename\",\"elem\":\"text.ctf\"}]');
    expect(JSON.stringify(highLight.parse('echo "string"'))).toMatch('[{\"type\":\"command\",\"elem\":\"echo\"},{\"type\":\" \"},{\"type\":\"string\",\"elem\":\"\\\"string\"}]');
    expect(JSON.stringify(highLight.parse('echo $ENV'))).toMatch('[{\"type\":\"command\",\"elem\":\"echo\"},{\"type\":\" \"},{\"type\":\"variable\",\"elem\":\"$ENV\"}]');
    expect(JSON.stringify(highLight.parse('ls -a'))).toMatch('[{\"type\":\"command\",\"elem\":\"ls\"},{\"type\":\" \"},{\"type\":\"option\",\"elem\":\"-a\"}]');
  });
});
