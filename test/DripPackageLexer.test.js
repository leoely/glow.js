import { describe, expect, test, } from '@jest/globals';
import HighLight from '~/class/HighLight';
import DripPackageLexer from '~/class/DripPackageLexer';

describe('[class] DripPackageLexer;', () => {
  test('DripPackageLexer parse result should be correct.', () => {
    const highLight = new HighLight();
    highLight.addLexer(DripPackageLexer);
    expect(JSON.stringify(highLight.parse('[node](/User/user/node/.git)'))).toMatch('[{\"type\":\"squareBracket\",\"elem\":\"[\"},{\"type\":\"name\",\"elem\":\"node\"},{\"type\":\"squareBracket\",\"elem\":\"]\"},{\"type\":\"bracket\",\"elem\":\"(\"},{\"type\":\"address\",\"elem\":\"/User/user/node/.git\"},{\"type\":\"bracket\",\"elem\":\")\"}]');
  });
});
