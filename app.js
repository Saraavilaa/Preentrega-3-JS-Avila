document.addEventListener('DOMContentLoaded', () => {
    const weightInput = document.getElementById('weight')
    const heightInput = document.getElementById('height')
    const calculateBtn = document.getElementById('calculateBtn')
    const resultDiv = document.getElementById('result')

    // Cargar datos del Storage al cargar la página
    const storedData = localStorage.getItem('bmiData')
    if (storedData) {
        const data = JSON.parse(storedData)
        weightInput.value = data.weight
        heightInput.value = data.height
        calculateAndDisplay(data.weight, data.height)
    }

    // Manejar el evento de clic en el botón
    calculateBtn.addEventListener('click', () => {
        const weight = parseFloat(weightInput.value.trim())
        const height = parseFloat(heightInput.value.trim())

        if (!isNaN(weight) && !isNaN(height) && height > 0) {
            // Guardar en localStorage
            const data = { weight, height }
            localStorage.setItem('bmiData', JSON.stringify(data))
            calculateAndDisplay(weight, height)
        } else {
            alert('Por favor, ingrese valores válidos.')
        }
    })

    // Función para calcular y mostrar los datos en el DOM
    function calculateAndDisplay(weight, height) {
        const heightInMeters = height / 100
        const bmi = weight / (heightInMeters * heightInMeters)
        let interpretation = ''

        if (bmi < 18.5) {
            interpretation = 'Bajo peso'
        } else if (bmi >= 18.5 && bmi < 24.9) {
            interpretation = 'Normal'
        } else if (bmi >= 25 && bmi < 29.9) {
            interpretation = 'Sobrepeso'
        } else {
            interpretation = 'Obesidad'
        }

        resultDiv.textContent = `Su IMC es ${bmi.toFixed(2)} (${interpretation})`
    }
})
