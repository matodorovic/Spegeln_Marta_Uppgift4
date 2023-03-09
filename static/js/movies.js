const ul = document.querySelector(".movies-list");
const ul1 = document.querySelector(".movies-list1");
const ul2 = document.querySelector(".movies-list2");
const ul3 = document.querySelector(".movies-list3");
const ul4 = document.querySelector(".movies-list4");

async function getScreenings() {
  const res = await fetch(`/api/screenings/startpage`);
  const data = await res.json();

  return data;
}
const data = getScreenings();
data.then((data) => {
  data.forEach((screening) => {
    const time = screening.start_time.split("T")[1].split(":00.")[0];
    const date = screening.start_time.split("T")[0];
    const movie = screening.movie;

    function addDayToCurrentDate(days) {
      let currentDate = new Date();

      return new Date(currentDate.setDate(currentDate.getDate() + days))
        .toISOString()
        .split("T")[0];
    }

    const li = document.createElement("li");
    li.innerHTML = `<p class="date">${date}</p>
    <a href="/movies/${movie.id}">
    <p class="time">${time}</p>
    <img alt="${movie.title} movie poster"src="${movie.image.url}"/>
    ${movie.title.slice(0, 17)}</a>`;

    switch (true) {
      case date.includes(new Date().toISOString().split("T")[0]):
        li.classList.add("movies-list-item");
        ul.appendChild(li);

        break;

      case date.includes(addDayToCurrentDate(1)):
        li.classList.add("movies-list-item");
        ul1.appendChild(li);

        break;

      case date.includes(addDayToCurrentDate(2)):
        li.classList.add("movies-list-item");
        ul2.appendChild(li);

        break;

      case date.includes(addDayToCurrentDate(3)):
        li.classList.add("movies-list-item");
        ul3.appendChild(li);

        break;

      case date.includes(addDayToCurrentDate(4)):
        li.classList.add("movies-list-item");
        ul4.appendChild(li);

        break;
    }
  });
});
