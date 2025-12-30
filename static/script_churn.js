document.addEventListener('DOMContentLoaded',function(){
    const btn=document.querySelector('button');
    const result=document.getElementById('result');
    btn.addEventListener('click',async function(e){
        e.preventDefault();
        const form = document.getElementById("churnForm");
        const data = new FormData(form);

        // Convert FormData → JS Object
        let flag=false;
        const inputData = {};
        data.forEach((value, key) => {
            inputData[key] = value;
            if (value==""){
                flag=true;
            }
        });
        if (flag){
            alert("please fill all the options before predicting");
            return;
        }
        btn.innerText="Predicting..."
        console.log("Collected Data:", inputData);

        const response=await fetch('/churn/predict',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(inputData)
        });

        const churn=await response.json();
        result.innerText=" The customer is likely to "+churn['prediction']
        btn.innerText='Predict Churn'


    })
})
