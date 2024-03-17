import { describe, expect, test, } from '@jest/globals';
import HighLight from '~/class/HighLight';
import CtfLexer from '~/class/CtfLexer';

describe('[class] CtfLexer', () => {
  test('CtfLexer parse result should be correct.', () => {
    const highLight = new HighLight();
    highLight.addLexer(CtfLexer);
    expect(JSON.stringify(highLight.parse(`
    (+) bold,red,underline: demo text1 (+) bold, green, underline: demo text2

    [+] bold, gray, underline, dim:
      | This is example text is explain ctf,
      | "+" that is mean add a new text or passage.
      | bold, red and so on is text or passage formate.
      | "-" that is above formate is apply to this text.
      | "|" that is above formate is apply to this passage.
    `))).toMatch('[]');
  });
});
