document.addEventListener('DOMContentLoaded',function(){
    const btn=document.getElementById('button');

    btn.addEventListener('click',async function(e){
        e.preventDefault();
        const message=document.getElementById('message').value;
        if (message.trim()==""){
            alert("PLEASE enter your movie expreience before prediction");
            return;
        }
        let response=await fetch('/review/predict',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({message:message})
        });

        const data=await response.json();
        const result=document.getElementById('result')
        result.innerText=" The Predicted Movie Review is "+data['prediction']
    })
})