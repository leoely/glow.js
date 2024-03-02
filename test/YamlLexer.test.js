import { describe, expect, test, } from '@jest/globals';
import HighLight from '~/class/HighLight';
import YamlLexer from '~/class/YamlLexer';

describe('[class] YamlLexer', () => {
  test('YamlLexer parse result should be correct.', () => {
    const highLight = new HighLight();
    highLight.addLexer(YamlLexer);
    expect(JSON.stringify(highLight.parse(`
    " Minimum time interval which ignores a serails of same file update.
    interval: 5000(ms)

    " Stop add new task when current memory less than minimum memory.
    min-mem: 100(mb)

    " Increase or decrease core number which base recommended value.
    adjust-core: 0(core)

    " File or path which will ignores by file watch.
    ignores:
      - .drip/local/
      - .git/
      - .gitkeep

    " Alias and address of package which will be installed in this project.
    packages:
      - [node(]fsdfasd)

    " Level of instance index which affect both index time and index effect.
    index-level: 2(rank)
    `))).toMatch('[{\"type\":\"\\n\"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\"string\",\"elem\":\"\\\"\"},{\"type\":\"comment\",\"elem\":\"Minimum time interval which ignores a serails of same file update.\"},{\"type\":\"\\n\"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\"key\",\"elem\":\"interval\"},{\"type\":\"definition\",\"elem\":\":\"},{\"type\":\" \"},{\"type\":\"number\",\"elem\":\"5000\"},{\"type\":\"(\"},{\"type\":\"unit\",\"elem\":\"ms\"},{\"type\":\")\"},{\"type\":\"\\n\"},{\"type\":\"\\n\"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\"string\",\"elem\":\"\\\"\"},{\"type\":\"comment\",\"elem\":\"Stop add new task when current memory less than minimum memory.\"},{\"type\":\"\\n\"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\"key\",\"elem\":\"min-mem\"},{\"type\":\"definition\",\"elem\":\":\"},{\"type\":\" \"},{\"type\":\"number\",\"elem\":\"100\"},{\"type\":\"(\"},{\"type\":\"unit\",\"elem\":\"mb\"},{\"type\":\")\"},{\"type\":\"\\n\"},{\"type\":\"\\n\"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\"string\",\"elem\":\"\\\"\"},{\"type\":\"comment\",\"elem\":\"Increase or decrease core number which base recommended value.\"},{\"type\":\"\\n\"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\"key\",\"elem\":\"adjust-core\"},{\"type\":\"definition\",\"elem\":\":\"},{\"type\":\" \"},{\"type\":\"number\",\"elem\":\"0\"},{\"type\":\"(\"},{\"type\":\"unit\",\"elem\":\"core\"},{\"type\":\")\"},{\"type\":\"\\n\"},{\"type\":\"\\n\"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\"string\",\"elem\":\"\\\"\"},{\"type\":\"comment\",\"elem\":\"File or path which will ignores by file watch.\"},{\"type\":\"\\n\"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\"key\",\"elem\":\"ignores\"},{\"type\":\"definition\",\"elem\":\":\"},{\"type\":\"\\n\"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\"list\",\"elem\":\"-\"},{\"type\":\" \"},{\"type\":\"value\",\"elem\":\".drip/local/\"},{\"type\":\"\\n\"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\"list\",\"elem\":\"-\"},{\"type\":\" \"},{\"type\":\"value\",\"elem\":\".git/\"},{\"type\":\"\\n\"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\"list\",\"elem\":\"-\"},{\"type\":\" \"},{\"type\":\"value\",\"elem\":\".gitkeep\"},{\"type\":\"\\n\"},{\"type\":\"\\n\"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\"string\",\"elem\":\"\\\"\"},{\"type\":\"comment\",\"elem\":\"Alias and address of package which will be installed in this project.\"},{\"type\":\"\\n\"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\"key\",\"elem\":\"packages\"},{\"type\":\"definition\",\"elem\":\":\"},{\"type\":\"\\n\"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\"list\",\"elem\":\"-\"},{\"type\":\" \"},{\"type\":\"value\",\"elem\":\"node(]fsdfasd)\"},{\"type\":\"\\n\"},{\"type\":\"\\n\"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\"string\",\"elem\":\"\\\"\"},{\"type\":\"comment\",\"elem\":\"Level of instance index which affect both index time and index effect.\"},{\"type\":\"\\n\"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\"key\",\"elem\":\"index-level\"},{\"type\":\"definition\",\"elem\":\":\"},{\"type\":\" \"},{\"type\":\"number\",\"elem\":\"2\"},{\"type\":\"(\"},{\"type\":\"unit\",\"elem\":\"rank\"},{\"type\":\")\"},{\"type\":\"\\n\"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"},{\"type\":\" \"}]');
  });
});
