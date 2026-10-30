const rangeValue = document.querySelector(".slider .price-slider");

const rangeValueInput = document.querySelectorAll(".range-input input");

const priceInputValue = document.querySelectorAll(".price-input input");

const priceGap = 500;
const minLimit = 0;
const maxLimit = 10000;

// Update both number inputs, range inputs and slider fill
function updateSlider(min, max) {
  priceInputValue[0].value = min;
  priceInputValue[1].value = max;

  rangeValueInput[0].value = min;
  rangeValueInput[1].value = max;

  const maxValue = Number(rangeValueInput[1].max);

  rangeValue.style.left = `${(min / maxValue) * 100}%`;
  rangeValue.style.right = `${100 - (max / maxValue) * 100}%`;
}

// Number input events
priceInputValue.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minPrice = Number(priceInputValue[0].value);
    let maxPrice = Number(priceInputValue[1].value);

    // Stop if either input is empty
    if (priceInputValue[0].value === "" || priceInputValue[1].value === "") {
      return;
    }

    if (e.target === priceInputValue[0]) {
      minPrice = Math.max(minLimit, minPrice);
      minPrice = Math.min(minPrice, maxLimit - priceGap);

      if (minPrice > maxPrice - priceGap) {
        minPrice = maxPrice - priceGap;
      }
    } else {
      maxPrice = Math.min(maxLimit, maxPrice);
      maxPrice = Math.max(maxPrice, minLimit + priceGap);

      if (maxPrice < minPrice + priceGap) {
        maxPrice = minPrice + priceGap;
      }
    }

    updateSlider(minPrice, maxPrice);
  });
});

// Range slider events
rangeValueInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minVal = Number(rangeValueInput[0].value);
    let maxVal = Number(rangeValueInput[1].value);

    if (maxVal - minVal < priceGap) {
      if (e.target === rangeValueInput[0]) {
        minVal = maxVal - priceGap;
      } else {
        maxVal = minVal + priceGap;
      }
    }

    updateSlider(minVal, maxVal);
  });
});
