import { allMessagesMap } from './all.messages.map';

describe('AllMessagesMap', () => {
  const messageMap = allMessagesMap;

  it('should have action buttons text length to be 20', () => {
    const strings = Object.values(messageMap).reduce((val: string[], item) => {
      val.push(
        item.interactive?.action?.button ?? '', // 20
      );
      return val;
    }, []);

    const val = [...new Set(strings.filter((item) => item.length > 20))].map(
      (str) => [str, str.length],
    );

    expect(val).toHaveLength(0);
  });
  it('should have action sections title text length to be 24', () => {
    const strings = Object.values(messageMap).reduce((val: string[], item) => {
      val.push(
        item.interactive?.action?.sections?.[0].title ?? '', // 24
      );
      return val;
    }, []);

    const val = [...new Set(strings.filter((item) => item.length > 24))].map(
      (str) => [str, str.length],
    );

    expect(val).toHaveLength(0);
  });
  it('should have action sections rows description text length to be 72', () => {
    const strings = Object.values(messageMap).reduce((val: string[], item) => {
      val.push(
        ...(item.interactive?.action?.sections?.[0].rows.map(
          (row) => row.description ?? '', // 72
        ) ?? []),
      );
      return val;
    }, []);

    const val = [...new Set(strings.filter((item) => item.length > 72))].map(
      (str) => [str, str.length],
    );

    expect(val).toHaveLength(0);
  });
  it('should have action sections rows title text length to be 24', () => {
    const strings = Object.values(messageMap).reduce((val: string[], item) => {
      val.push(
        ...(item.interactive?.action?.sections?.[0].rows.map(
          (row) => row.title ?? '', // 24
        ) ?? []),
      );
      return val;
    }, []);

    const val = [...new Set(strings.filter((item) => item.length > 24))].map(
      (str) => [str, str.length],
    );

    expect(val).toHaveLength(0);
  });
});
