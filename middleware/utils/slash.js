export function splitString(inputString) {

    const parts = inputString.split(/\/(?![^\[]*\])/);

    const trimmedParts = parts.map(part => part.trim());

    return trimmedParts;
}