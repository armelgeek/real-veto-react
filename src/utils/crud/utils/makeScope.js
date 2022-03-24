export default function makeScope(
  config,
  reducerName
) {
  return config.resourceName + "." + reducerName;
}
