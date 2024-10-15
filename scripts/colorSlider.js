const sendColorsToServer = (colors) => {
    fetch('/api/colors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(colors),
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch((error) => console.error('Error:', error));
  };
  
  const colorSlider = () => {
    const redSlider = document.querySelector('#red');
    const greenSlider = document.querySelector('#green');
    const blueSlider = document.querySelector('#blue');
  
    const redValue = document.querySelector('#red-value');
    const greenValue = document.querySelector('#green-value');
    const blueValue = document.querySelector('#blue-value');
    
     // Ensure this element exists in your HTML
//   const colorPreview = document.querySelector('#color-preview'); 

//   if (!colorPreview) {
//     console.error('Error: #color-preview element not found');
//     return;
//   }

    const colors = {
      red: redSlider.value,
      green: greenSlider.value,
      blue: blueSlider.value,
    };
  
    const updatecolor = () => {
      colors.red = redSlider.value;
      colors.green = greenSlider.value;
      colors.blue = blueSlider.value;
  
      redValue.textContent = colors.red;
      greenValue.textContent = colors.green;
      blueValue.textContent = colors.blue;
  
      const color = `rgb(${colors.red}, ${colors.green}, ${colors.blue})`;
    //   colorPreview.style.backgroundColor = color;
  
      // Send colors to server
      sendColorsToServer(colors);
    };
  
    redSlider.addEventListener('input', updatecolor);
    greenSlider.addEventListener('input', updatecolor);
    blueSlider.addEventListener('input', updatecolor);
  
    updatecolor(); // Initial update
  };
  
  export default colorSlider;
  