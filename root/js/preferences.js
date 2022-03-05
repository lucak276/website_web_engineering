
// preference buttons on click event to mark them as checked
buttons = document.querySelectorAll('.btn-pref');

buttons.forEach(element => {
    /**
     * adds onclick event to choosable buttons on preference page
     * through giving it the class "chosen"
     */
    element.addEventListener('click', function() {
        if(this.classList.contains("chosen")){
            this.classList.remove("chosen")
        }else {
            this.classList.add('chosen');
        }
    })
});


