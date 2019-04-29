const compose = (a, b) => (...props) => {
  const [child, ...rest] = props;
  return a(b(child, ...rest), ...rest);
}

export default compose;
