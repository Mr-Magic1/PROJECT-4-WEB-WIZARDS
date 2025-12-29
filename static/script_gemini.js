console.log("JS loaded")
document.addEventListener("DOMContentLoaded",function(){
    let button=document.getElementById('chatbtn');
    let result=document.getElementById('result');

    button.addEventListener('click',async function (e) {
        button.innerText='Generating';
        const ques=document.getElementById('ques').value.trim();
        if (ques==''){
            button.innerText='Ask';
            alert('Please Enter your query!!!')
        }else{
        console.log("10")
        let response=await fetch('/chat/gemini',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body : JSON.stringify({'ques':ques})
        });

        console.log(response)

        const data=await response.json();
        button.innerText='Ask';

        let form=document.querySelector('form');
        let head3=document.createElement('h3');
        let head4=document.createElement('h4');
        let bre=document.createElement('br');
        head3.innerText="Your Query : "+ques;
        head4.innerText="Response : "+data.reply;
        head4.style.color="blue";
        form.insertAdjacentElement('beforebegin',head3);
        form.insertAdjacentElement('beforebegin',head4);
        form.insertAdjacentElement('beforebegin',bre);
        }
    });
})