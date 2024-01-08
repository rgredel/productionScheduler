export const generateRandomColor = () => {
    const randomColorComponent = () => Math.floor(Math.random() * 256);
  
    const red = randomColorComponent();
    const green = randomColorComponent();
    const blue = randomColorComponent();
  
    const colorHex = `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;
  
    return colorHex;
}