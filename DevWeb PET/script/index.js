const miniFotos = document.querySelectorAll(".minifoto li");
const infoSlider = document.querySelectorAll(".info-slider");
const imgSlider = document.querySelectorAll(".img-slider");
const descricaos = document.querySelectorAll(".descricao");
const assinar = document.querySelectorAll(".link")

let index = 0;

miniFotos.forEach((minifoto, ind) => {
    minifoto.addEventListener('click', () => { 

        document.querySelector('.minifoto .selecionado').classList.remove('selecionado');
        minifoto.classList.add('selecionado');

        index = ind;

        infoSlider.forEach(slide => { 
            slide.style.transform = `translateY(${index * -100}%)`;
        });

        imgSlider.forEach(slide => { 
            slide.style.transform = `translateX(${index * -100}%)`;
        });

        document.querySelector('.descricao.ativo').classList.remove('ativo');
        descricaos[index].classList.add('ativo');

    }); 
});