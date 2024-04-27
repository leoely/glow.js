import { describe, expect, test, } from '@jest/globals';
import HighLight from '~/class/HighLight';
import ShellLexer from '~/class/ShellLexer';

describe('[class] ShellLexer', () => {
  test('ShellLexer parse result should be correct.', () => {
    const highLight = new HighLight();
    highLight.addLexer(ShellLexer);
    expect(JSON.stringify(highLight.parse(`
    for i in *
    do
        if test -d "$i"
        then break
        fi
    done
    `))).toMatch('[{\"type\":\"\\n\"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\"for\",\"elem\":\"for\"},{\"type\":\" \"},{\"type\":\"identifer\",\"elem\":\"i\"},{\"type\":\" \"},{\"type\":\"in\",\"elem\":\"in\"},{\"type\":\" \"},{\"type\":\"asterisk\",\"elem\":\"*\"},{\"type\":\"\\n\"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\"do\",\"elem\":\"do\"},{\"type\":\"\\n\"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\"if\",\"elem\":\"if\"},{\"type\":\" \"},{\"type\":\"command\",\"elem\":\"test\"},{\"type\":\" \"},{\"type\":\"option\",\"elem\":\"-d\"},{\"type\":\" \"},{\"type\":\"singleQuote\",\"elem\":\"\\\"\"},{\"type\":\"string\",\"elem\":\"$i\"},{\"type\":\"doubleQuote\",\"elem\":\"\\\"\"},{\"type\":\"\\n\"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\"then\",\"elem\":\"then\"},{\"type\":\" \"},{\"type\":\"command\",\"elem\":\"break\"},{\"type\":\"\\n\"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\"fi\",\"elem\":\"fi\"},{\"type\":\"\\n\"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\"done\",\"elem\":\"done\"},{\"type\":\"\\n\"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"}]');
    expect(JSON.stringify(highLight.parse('fulmination parse text.ctf'))).toMatch('[{\"type\":\"command\",\"elem\":\"fulmination\"},{\"type\":\" \"},{\"type\":\"command\",\"elem\":\"parse\"},{\"type\":\" \"},{\"type\":\"filename\",\"elem\":\"text\"},{\"type\":\"dot\",\"elem\":\".\"},{\"type\":\"suffix\",\"elem\":\"ctf\"}]');
    expect(JSON.stringify(highLight.parse('echo "string"'))).toMatch('[{\"type\":\"command\",\"elem\":\"echo\"},{\"type\":\" \"},{\"type\":\"singleQuote\",\"elem\":\"\\\"\"},{\"type\":\"string\",\"elem\":\"string\"},{\"type\":\"doubleQuote\",\"elem\":\"\\\"\"}]');
    expect(JSON.stringify(highLight.parse('echo $ENV'))).toMatch('[{\"type\":\"command\",\"elem\":\"echo\"},{\"type\":\" \"},{\"type\":\"variable\",\"elem\":\"$ENV\"}]');
    expect(JSON.stringify(highLight.parse('ls -a'))).toMatch('[{\"type\":\"command\",\"elem\":\"ls\"},{\"type\":\" \"},{\"type\":\"option\",\"elem\":\"-a\"}]');
  });
});
