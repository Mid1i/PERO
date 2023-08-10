export const imageImport = () => {
    const importAll = image => image.keys().map(image);
    const images = importAll(require.context('@assets/images/brands/', false, /\.svg$/));

    return images;
}