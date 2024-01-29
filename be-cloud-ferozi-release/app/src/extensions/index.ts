declare global {
  interface Array<T> {
    sample(size: number): T[];
    difference(other: T[]): T[];
  }
}

declare global {
  interface Number {
    epochToFormattedDate(): string;
  }
}

Array.prototype.sample = function (percent: number) {
  const size = Math.floor((percent / 100) * this.length);
  const copy = [...this];
  const result: any[] = [];

  while (result.length < size) {
    const randomIndex = Math.floor(Math.random() * copy.length);
    const element = copy.splice(randomIndex, 1)[0];
    result.push(element);
  }

  return result;
};

Array.prototype.difference = function (other: any[]) {
  const set1 = new Set(other);
  return this.filter((x: string) => !set1.has(x));
};

function epochToFormattedDate(
  epoch: number,
  format = 'dd-MM-yyyy HH:mm:ss',
): string {
  const date = new Date(epoch); // Convert epoch seconds to milliseconds
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  // Replace format placeholders with corresponding values
  const formattedDate = format
    .replace('yyyy', year.toString())
    .replace('MM', month)
    .replace('dd', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);

  return formattedDate;
}

Number.prototype.epochToFormattedDate = function () {
  return epochToFormattedDate(this);
};

export default {};
