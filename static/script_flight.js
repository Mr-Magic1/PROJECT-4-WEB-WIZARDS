document.addEventListener('DOMContentLoaded',function(){
    const btn=document.querySelector('button');


    btn.addEventListener('click',async function(e){
        e.preventDefault();
        const form = document.getElementById("flightform");
        const data = new FormData(form);
        const inputData = {};
        const arr=[]
        data.forEach((value, key) => {
            inputData[key] = value;
            arr.push(value);
        });
        console.log("Collected Data:", inputData);
        console.log("arr ",arr);
        
        for (let x of arr){
            if (x==""){
                alert("Please select required columns before predicting");
                return;
            }
        }

        if (inputData.source_city === inputData.destination_city){
            alert("Source and Destination city cannot be the same");
            return;
        }

        const response=await fetch('/flight/predict',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(inputData)
            
        })

        const res=await response.json();
        const result=document.querySelector('h3');

        result.innerText="The Predicted Flight Price is ₹"+res.reply;


    })


})