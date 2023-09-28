
const imgFile = document.querySelector('#imgFile');
const main = document.querySelector('#tags')
const uploadBtn = document.querySelector('#uploadBtn');
const result = document.querySelector('#result-area');
const loader = document.querySelector('#loader');
const convertAnotherBtn = document.querySelector('#convertAnother');
const copyBtn = document.querySelector('#copyText');


const apiKey = 'f3/s6hyU50f/aU4VhxY7CQ==oHh637ejE5eHMPJy';
const apiUrl = 'https://api.api-ninjas.com/v1/imagetotext';


let time;

    

function reload(){
    location.reload();
}

      
      
        // Listen for changes in the file input
                 imgFile.addEventListener('change', () => {

                    result.innerHTML = '';

        // Get the selected file
        const file = imgFile.files[0];

                    
    
        if (file) {
        

            const img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            uploadBtn.style.zIndex = '1';
            

            uploadBtn.appendChild(img);

            // Create a FormData object and append the image file
            const formData = new FormData();
            formData.append('image', file);
    
            // Define the fetch options
            const options = {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Api-Key': `${apiKey}`,
                },
            };
    
            // Make the fetch request to the API
          fetch(apiUrl,options)
          .then(res => res.json())
          .then(data => getText(data))
        
          time =  setTimeout(()=>{
            loader.style.display = 'block';
          },400)
        
        }
    });



    
    function timeOut(){
        clearTimeout(time)
        loader.style.display = 'none';
        uploadBtn.style.zIndex = '-1';
        convertAnotherBtn.style.display = 'block';

    }
        




function getText(texts){

   let newText = [];
    let msg;

    

    texts.forEach(text => {
       
        newText.push(text.text);
        msg = newText.join(' ');

    });

    timeOut();  

    result.innerHTML = `
                        <p>
                            ${(msg === undefined) ? `There is no text in this picture,
                            please select or upload another picture.` : msg}
                        </p>

                        `


}




function copyText(){

navigator.clipboard.writeText(result.textContent);

}










