export function substrWithTags(string, len) {
  let openTag = 0,
    closeTag = 0,
    i = 0;
  for (i; i < len; i++) {
    if (string[i] == '<') openTag++;
    if (string[i] == '>') closeTag++;
  }
  if (openTag > closeTag) {
    while (string[i] != '>') i++;
  }

  return string.substring(0, i + 1);
}
