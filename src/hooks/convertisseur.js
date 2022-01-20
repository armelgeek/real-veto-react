
const gToMg=(value)=> {
  return Number(value) * 1000;
}
const MlToMg=(value)=> {
  return gToMg(value);
}
const lToMg=(value)=> {
  return gToMg(value) * 1000;
}
const kgToMg=(value)=> {
  return Number(value) * 1000000;
}
const MgToCC=(value)=> {
  return Number(value) / 1000;
}
const CCToMg=(value)=> {
  return Number(value) * 1 * 1000;
}
const MgTog=(value)=> {
  return Number(value) / 1000;
}
const MgToMl=(value)=> {
    return MgTog(value);
}
const MgTol=(value)=> {
      return this.MgToMl(value) / 1000;
}
const MgToKg=(value)=> {
    return Number(value) / 1000000;
}
export{
  gToMg,
  MlToMg,
  lToMg,
  kgToMg,
  MgToCC,
  CCToMg,
  MgTog,
  MgToMl,
  MgTol,
  MgToKg
}