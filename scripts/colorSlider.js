const colorSlider = () =>
{
    const redSlider = document.querySelector('#red');
    const greenSlider = document.querySelector('#green');
    const blueSlider = document.querySelector('#blue');

    const redValue = document.querySelector('#red-value');
    const greenValue = document.querySelector('#green-value');
    const blueValue = document.querySelector('#blue-value');

    const colorPreview = document.querySelector('#color-preview');

    const colors = {
        red:   redSlider.value,
        green: greenSlider.value,
        blue:  blueSlider.value
    };

    const updateColor = () =>
    {
        colors.red   = redSlider.value;
        colors.green = greenSlider.value;
        colors.blue  = blueSlider.value;

        redValue.textContent   = colors.red;
        greenValue.textContent = colors.green;
        blueValue.textContent  = colors.blue;

        const color = `rgb(${colors.red}, ${colors.green}, ${colors.blue})`;

        // Trigger update for webgl.js
        if(typeof window.updateWebGLColor === 'function')
        {
            window.updateWebGLColor(colors);
        }
    };

    redSlider.addEventListener('input', updateColor);
    greenSlider.addEventListener('input', updateColor);
    blueSlider.addEventListener('input', updateColor);

    // Initial call
    updateColor();

    return colors;
}

export default colorSlider;