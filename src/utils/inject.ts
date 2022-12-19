export function inject(property: any) {
  return (target: any, name: any) => {
    target[name] = new property();
  };
}
