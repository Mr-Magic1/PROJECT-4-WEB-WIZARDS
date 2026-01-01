console.log("JS loaded")
document.addEventListener("DOMContentLoaded",function(){
    let button=document.getElementById('chatbtn');

    button.addEventListener('click',async function (e) {
        button.innerText='Generating';
        button.disabled=true;
        const ques=document.getElementById('ques').value.trim();
        if (ques==''){
            button.innerText='Ask';
            button.disabled=false;
            alert('Please Enter your query!!!')
        }else{
        button.disabled=true;
        button.style.backgroundColor="black";
        let response=await fetch('/chat/gemini',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body : JSON.stringify({'ques':ques})
        });

        console.log(response)

        const data=await response.json();
        button.disabled=false;
        button.style.backgroundColor="red";
        button.innerText='Ask';

        let form=document.querySelector('form');
        let head2=document.createElement('h2');
        let head3=document.createElement('h3');
        let bre=document.createElement('br');
        head2.innerText="Your Query : "+ques;
        head3.innerText="Response : "+data.reply;
        head3.style.color="blue";
        head2.style.fontWeight="bold";
        head3.style.fontWeight="bold";
        head2.style.fontSize="1.5rem";
        head3.style.fontSize="1.5rem";
        form.insertAdjacentElement('beforebegin',head2);
        form.insertAdjacentElement('beforebegin',head3);
        form.insertAdjacentElement('beforebegin',bre);
        }
    });
})