export function formatFileNameAsTitle(fileName: string) {
  const withoutExtension = fileName.replace(/\.[^/.]+$/, ""); // remove file extension and replace specail characters with spaces
  const withSpaces = withoutExtension
    .replace(/[-_]+/g, " ") // replace dashes and underscore with spaces
    .replace(/([a-z])([A-Z])/g, "$1 $2"); // Add space bw camelCase

  return withSpaces
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("")
    .trim();
}
