// Ejemplo de slider en JavaScript
document.addEventListener("DOMContentLoaded", function () {
    const rangeSlider = document.getElementById("rangeSlider");
    const selectedValue = document.getElementById("selectedValue");

    rangeSlider.addEventListener("input", function () {
        const value = rangeSlider.value;
        selectedValue.innerText = "Selected Value: " + value;
    });
});
