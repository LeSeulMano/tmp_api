export function formatNameFile(name) {
    const stringWithoutSpaces = name.replace(/\s+/g, '_');

    const stringWithoutSpecialChars = stringWithoutSpaces
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\w\s-]/g, '')
        .replace(/[-]+/g, '_');

    return stringWithoutSpecialChars;
}