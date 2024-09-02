document.addEventListener("DOMContentLoaded", () => {
    //deklarasi index
    let currentIndex = 0;
    const items = document.querySelectorAll(".carousel-item");
    const controls = document.querySelectorAll(".carousel-control .items");
    function setClasses(newIndex){
        items.forEach((item, index) => {
            item.classList.remove("active", "previous", "next", "move-left", "move-right", "enter-left", "enter-right");
            if(index === newIndex){
                item.classList.add("active");
            }else if(index === (newIndex -1 + items.length) % items.length){
                item.classList.add("previous");
            }else if(index === (newIndex + 1) % items.length){
                item.classList.add("next");
            } 
        });

        controls.forEach((control,  index) => {
            control.classList.toggle("active", index === newIndex)
        });

        currentIndex = newIndex;
    }
    
    function showSlide(newIndex) {
    if (newIndex === currentIndex) return;
    const currentSlide = items[currentIndex];
    const newSlide = items[newIndex];

    // Remove existing transition
    currentSlide.classList.remove("move-left", "move-right", "enter-left", "enter-right");
    newSlide.classList.remove("move-left", "move-right", "enter-left", "enter-right");

    // Determine direction
    const isNext = (newIndex > currentIndex) || (currentIndex === items.length - 1 && newIndex === 0);

    // Apply transition slide
    if (isNext) {
        currentSlide.classList.add("move-left");
        newSlide.classList.add("enter-right");
    } else {
        currentSlide.classList.add("move-right");
        newSlide.classList.add("enter-left");
    }

    // Update index after transition
    setTimeout(() => {
        setClasses(newIndex);
        currentIndex = newIndex;
    }, 500); // Wait for the transition to complete
}


    function goToNewSlide(){
        const newIndex = (currentIndex + 1) % items.length;
        showSlide(newIndex);
    }

    function goToPreviousSlide(){
        const newIndex = (currentIndex - 1 + items.length) % items.length;
        showSlide(newIndex);
    }

    controls.forEach((control) => {
        control.addEventListener("click", () => {
            const index = parseInt(control.getAttribute("data-index"));
            if(!isNaN(index)){
                showSlide(index)
            }
        });
    });


    items.forEach((item) => {
        item.addEventListener("click", () => {
          if(item.classList.contains("previous")){
            goToPreviousSlide();
          }else if(item.classList.contains("next")){
            goToNewSlide();
          }
        })
    })

    console.log("items-carousel", items)
    setClasses(0)
})

//javascript toggle menu
document.querySelector(".navbar-toggle").addEventListener("click", function(){
    const navbarMobile = document.getElementById("mobile-navbar");
    const closeToggle = document.getElementById("close-toggle");
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    closeToggle.setAttribute("aria-expanded", !isExpanded);
    navbarMobile.classList.toggle("active");

    document.body.classList.toggle('overflow-hidden')
})

//javascript toggle close
document.querySelector(".close-toggle").addEventListener("click", function(){
    const navbarMobile = document.getElementById("mobile-navbar");
    const closeToggle = document.getElementById("close-toggle");
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    closeToggle.setAttribute("aria-expanded", !isExpanded);
    navbarMobile.classList.toggle("active");

    document.body.classList.toggle('overflow-hidden')
})

//accordion
let accordion = document.querySelectorAll(".accordion")
for (let i = 0; i < accordion.length; i++) {
    accordion[i].addEventListener("click", function() {
        this.classList.toggle("active");
        const panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        }else{
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    })
}

function updateText() {
    if (window.innerWidth <= 730) {
      const pElements = document.querySelectorAll('.carousel-content p');
      pElements.forEach((p) => {
        p.innerHTML = '<strong>Laga</strong> Perampokan terkacau yang pernah ada.';
      });
    }else{
        const pElements = document.querySelectorAll('.carousel-content p');
      pElements.forEach((p) => {
        p.innerHTML = '<strong>Laga</strong> · Perampokan terkacau yang pernah ada.';
      });
    }
  }
  
  // Panggil fungsi saat halaman dimuat
  window.onload = updateText;
  
  // Panggil fungsi saat ukuran layar berubah
  window.addEventListener('resize', updateText);
  