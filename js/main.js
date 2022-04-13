"use strict"


const mainInput = document.querySelector(".main__input");
let login;
let focusInput = false;
const mainBtn = document.querySelector(".main__btn");

mainBtn.addEventListener("click", () => searchUser(login));
mainInput.addEventListener('input', (e)=>{ login = e.target.value });
mainInput.addEventListener('focus', () => focusInput = true);
mainInput.addEventListener('blur', ()=> focusInput = false);

document.addEventListener('keydown', function(event) {
  if (event.code == 'Enter' && focusInput) {
    searchUser(login);
  }
});


function searchUser(login){
  fetch(`https://api.github.com/users/${login}`)
  .then(res => {
    console.log(res);
    return res.json();
  })
  .then(res => {
    console.log(res);
    createUserCard(res);
  }
  );
}





function createUserCard(res){
  const currentUser = document.querySelector(".user");
  currentUser?currentUser.remove(): null;
  const wrapper = document.querySelector('.wrapper');

  const user = document.createElement('div');
  user.classList.add("user")

  const userInfo = document.createElement('div');
  userInfo.classList.add('user__info');

  const userFollowInfo = document.createElement('div');
  userFollowInfo.classList.add('user__follow-container');

  const userImg = document.createElement('div');
  userImg.classList.add('user__img');
  
  const userSite = document.createElement('a');
  userSite.classList.add('user__site');

  const userLogin = document.createElement('div');
  userLogin.classList.add('user__login');
  userLogin.textContent = res.login;

  const userName = document.createElement('div');
  userName.classList.add('user__name');
  userName.textContent = res.name;

  const userRepos = document.createElement('div');
  userRepos.classList.add('user__repos');
  userRepos.textContent = res.public_repos;  

  const userFollowers = document.createElement('div');
  userFollowers.classList.add('user__followers');
  userFollowers.textContent = res.followers; 

  const userFollowing = document.createElement('div');
  userFollowing.classList.add('user__following');
  userFollowing.textContent = res.following; 
  
  wrapper.append(user);

  user.append(userImg);
  user.append(userInfo);

  userInfo.append(userLogin);
  userInfo.append(userName);
  userInfo.append(userSite);
  userInfo.append(userFollowInfo);
  userInfo.append(userRepos);

  userName.insertAdjacentHTML("afterbegin", "<span class='user__name-span'>Имя:</span>");

  userSite.insertAdjacentHTML("afterbegin", "<span class='user__site-span'>Сайт:</span>");
  userSite.insertAdjacentHTML("beforeend", `<a href=${res.blog} target="_blank">${res.blog}</a>`);

  userImg.insertAdjacentHTML("afterbegin",`<img src=${res.avatar_url} alt="Avatarka"/>`);
  
  userFollowInfo.append(userFollowers);
  userFollowInfo.append(userFollowing);

  userFollowers.insertAdjacentHTML("afterbegin", `<span class="user__followers-span">Подписчики</span>`);
  userFollowing.insertAdjacentHTML("afterbegin", `<span class="user__following-span">Подписки</span>`);

  userRepos.insertAdjacentHTML("afterbegin", `<span class="user__repos-span">Количество репозиториев</span>`);
}