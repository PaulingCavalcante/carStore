const images = [
    "https://cdn.pixabay.com/photo/2019/08/08/23/33/car-4393990_1280.jpg",
    "https://cdn.pixabay.com/photo/2013/08/11/03/40/car-171422_1280.jpg",
    "https://cdn.pixabay.com/photo/2014/07/13/19/45/edsel-ranger-392745_1280.jpg",
    "https://cdn.pixabay.com/photo/2019/08/08/23/33/car-4393990_1280.jpg",
    "https://cdn.pixabay.com/photo/2013/08/11/03/40/car-171422_1280.jpg", "https://cdn.pixabay.com/photo/2019/08/08/23/33/car-4393990_1280.jpg",
    "https://cdn.pixabay.com/photo/2013/08/11/03/40/car-171422_1280.jpg",
    "https://cdn.pixabay.com/photo/2014/07/13/19/45/edsel-ranger-392745_1280.jpg",
    "https://cdn.pixabay.com/photo/2019/08/08/23/33/car-4393990_1280.jpg",
    "https://cdn.pixabay.com/photo/2013/08/11/03/40/car-171422_1280.jpg",
    "https://cdn.pixabay.com/photo/2014/07/13/19/45/edsel-ranger-392745_1280.jpg",
    "https://cdn.pixabay.com/photo/2019/08/08/23/33/car-4393990_1280.jpg",
    "https://cdn.pixabay.com/photo/2013/08/11/03/40/car-171422_1280.jpg", "https://cdn.pixabay.com/photo/2019/08/08/23/33/car-4393990_1280.jpg",
    "https://cdn.pixabay.com/photo/2013/08/11/03/40/car-171422_1280.jpg",
    "https://cdn.pixabay.com/photo/2014/07/13/19/45/edsel-ranger-392745_1280.jpg"
];

const gallery = document.querySelector(".gallery");
for (let i = 0; i < images.length; i++) {
    const img = document.createElement("img");
    img.src = images[i];
    gallery.appendChild(img);
}

const modal = document.createElement("div");
modal.classList.add("modal");
gallery.appendChild(modal);

const modalImg = document.createElement("img");
modal.appendChild(modalImg);

const image = document.querySelectorAll(".gallery img");
image.forEach(img => {
    img.addEventListener("click", e => {
        modalImg.src = e.target.src;
        modal.classList.add("open");
    });
});

modal.addEventListener("click", () => {
    modal.classList.remove("open");
});