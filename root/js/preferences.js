
/** 
 * gets buttons by class query selector from html
 * */ 
buttons = document.querySelectorAll('.btn-pref');

buttons.forEach(element => {
    /**
     * adds onclick event to choosable buttons on preference page
     * through giving it the class "chosen"
     * @this= Class list of buttons with class .btn-pref
     * @author Thomas Schmitz
     */
    element.addEventListener('click', function() {
        if(this.classList.contains("chosen")){
            this.classList.remove("chosen")
        }else {
            this.classList.add('chosen');
        }
    })
});


