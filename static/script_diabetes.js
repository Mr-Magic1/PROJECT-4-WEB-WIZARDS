document.addEventListener('DOMContentLoaded',function(){
    let btn=document.querySelector('#predictbtn');
    let result=document.getElementById('result');
    let prob=document.getElementById('prob');
    let crc=document.querySelector('.circle1');
    btn.addEventListener('click',async function(e){
            const values=document.querySelectorAll('input');
            const pregnancies=values[0].value;
            const glucose=values[1].value;
            const bp=values[2].value;
            const skin=values[3].value;
            const insulin=values[4].value;
            const bmi=values[5].value;
            const dpf=values[6].value;
            const age=values[7].value;
            let arr=[pregnancies,glucose,bp,skin,insulin,bmi,dpf,age];
            for (let x of arr){
                if (x==''){
                    alert("Please Fill all fields before prediction...")
                    return;
                }
            }
            const res=await fetch('/diabetes/predict',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body :JSON.stringify({
                    pregnancies:pregnancies,
                    glucose:glucose,
                    bp:bp,
                    skin:skin,
                    insulin:insulin,
                    bmi:bmi,
                    dpf:dpf,
                    age:age
                })               
            });
            const data=await res.json();
            console.log(data);
            result.innerText="The Prediction : " + data['prediction'];
            prob.innerText="The Percentage of patient having diabtes : " + data['probability'];
            crc.style.setProperty("--p",`${data['probability']}`);
            let para=document.getElementsByTagName('p');
            para[0].innerText="Percentage of being Diabetic : "+data['probability']+"%";
            let non=100.0-parseFloat(data['probability']);
            para[1].innerText="Percetange of being Non-Diabetic : "+non+"%";
            
        })
})