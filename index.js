const username = document.querySelector("#username")
const search = document.querySelector("#btn-search")
const avatar = document.querySelector("#avatar")
const nickname = document.querySelector("#nickname")
const githubname = document.querySelector("#githubname")
const biography = document.querySelector("#biography")
const repo = document.querySelector("#repo")
const followers = document.querySelector("#followers")
const following = document.querySelector("#following")
const place = document.querySelector("#place")
const repolink = document.querySelector("#repolink")
const twitter = document.querySelector("#twitter")
const githublink = document.querySelector("#githublink")
const date = document.querySelector("#date")
const btnSwitch = document.querySelector("#btnSwitch")

search.onclick = async () => {
  if (!username.value) return;
  const response = await fetch(`https:api.github.com/users/${username.value}`)
  if (response.status === 404) {
    alert('El usuario no existe en GitHub.');
    return;
  }
  const data = await response.json()
  username.value = "";
  username.focus();


  avatar.src = data.avatar_url;
  nickname.textContent = data.name;
  githubname.textContent = `@${data.login}`;
  biography.textContent = data.bio;
  repo.textContent = data.public_repos;
  followers.textContent = data.followers;
  following.textContent = data.following;
  place.textContent = data.location || "Not available"
  repolink.textContent = data.html_url;
  twitter.textContent = data.twitter_username || "Not available"
  githublink.textContent = `@${data.login}`

  const initDate = new Date(data.created_at);
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  const formatter = new Intl.DateTimeFormat('en-US', options);

  const formattedDate = formatter.format(initDate);

  date.textContent = `Joined ${formattedDate}`

}

username.addEventListener("keydown", async function (event) {
  if (event.key === "Enter") {
    if (!username.value) return;
    const response = await fetch(`https://api.github.com/users/${username.value}`);
    if (response.status === 404) {
      alert('El usuario no existe en GitHub.');
      return;
    }
    const data = await response.json();
    username.value = "";
    username.focus();

    avatar.src = data.avatar_url;
    nickname.textContent = data.name;
    githubname.textContent = `@${data.login}`;
    biography.textContent = data.bio;
    repo.textContent = data.public_repos;
    followers.textContent = data.followers;
    following.textContent = data.following;
    place.textContent = data.location || "Not available"
    repolink.textContent = data.html_url;
    twitter.textContent = data.twitter_username || "Not available"
    githublink.textContent = `@${data.login}`

    const initDate = new Date(data.created_at);
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const formatter = new Intl.DateTimeFormat('en-US', options);

    const formattedDate = formatter.format(initDate);

    date.textContent = `Joined ${formattedDate}`

  }
});

btnSwitch.addEventListener("click", () => {
  document.body.classList.toggle("lightmode");
  btnSwitch.classList.toggle("active");

  if(document.body.classList.contains("lightmode")){
    localStorage.setItem("lightmode-mode","true");
  } else {
    localStorage.setItem("lightmode-mode","false");
  }
})

if(localStorage.getItem("lightmode-mode") === "true"){
  document.body.classList.add("lightmode");
  btnSwitch.classList.add("active");
} else {
  document.body.classList.remove("lightmode");
  btnSwitch.classList.remove("active")
}

