document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("predictBtn");
    const result = document.getElementById("result");

    button.addEventListener("click", async function () {
        const email = document.getElementById("email").value;
        if (email.trim()==""){
            alert("Please paste email before prediction....");
            return;
        }

        const response = await fetch("/spam/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({'email':email})
        });

        const data = await response.json();
        result.innerText = "Prediction: " + data.prediction;
    });
});
