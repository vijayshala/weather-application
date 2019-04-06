const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msg1 =    document.querySelector('#msg-one');
const msg2 =    document.querySelector('#msg-two');
weatherForm.addEventListener('submit' , (e) => {
    e.preventDefault();
    const location = search.value
    msg1.textContent =  "Loading..."
    msg2.textContent = " "     
    // fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                msg1.textContent(data.error)
            } else {
                msg1.textContent = data.forecast
                msg2.textContent = data.location
            }
        })

    })
})
