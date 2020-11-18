

const repoUl = document.querySelector('.repo-ul');
const userImgs = document.querySelectorAll('.userImg');
const userName = document.querySelector('.user-name');
const repoCount = document.querySelector('.repo-count');
const userLogins = document.querySelectorAll('.user-login');
const userBio = document.querySelector('.user-bio');
const userUrlQl = `https://api.github.com/graphql`;


function userInfoAll(infoTag, repoTag) {
  console.log(infoTag);
  console.log(infoTag.login);
  console.log(infoTag.avatarUrl);
  console.log(repoTag);
  console.log(repoTag.nodes[2].name);
  console.log('working');
  let repoNodes = repoTag.nodes.reverse();
  userName.textContent = infoTag.name;
  userLogins.forEach(userLogin => {    
    userLogin.textContent = infoTag.login;
  });
  userBio.textContent = infoTag.bio;
  console.log(repoNodes);
  userImgs.forEach(userImg => {
    userImg.src = infoTag.avatarUrl;
  })
  let totalRepoCount = repoTag.totalCount;
  console.log(totalRepoCount)
  repoCount.textContent = repoTag.totalCount;
  repoNodes.forEach(repoNode => {
    console.log(repoNode.name);  
    let repoName = repoNode.name;
    let repoDesc = repoNode.description;
    let repoUpdate = repoNode.updatedAt;
    let repoDate = new Date(repoUpdate);
    let repoLang = repoNode.languages.nodes[0].name;
    let repoBg = repoNode.languages.nodes[0].color;
    console.log(repoUpdate);
    console.log(repoDate);
    console.log(repoDate.toDateString());
    console.log(repoDate.getMinutes());
    console.log(repoDate.getMonth());
    console.log(repoDate.getDate());

    const repoLi = `
    <li class="flex">
    <div class="repo-info">
        <h2 class="repo-name"><a href="">${repoName}</a></h2>
        <p class="repo-desc">${repoDesc}</p>
        <div class="flex">
            <span class="lang-contain flex">
                <span class="lang-bg" style="background-color: ${repoBg};"></span>
                <span class="lang-name">${repoLang}</</span>
            </span>
            <span class="update">
                Updated <span class="time"></span>
            </span>
        </div>
    </div>
    <button class="star"><i class="fa fa-star-o"></i> Star</button>
</li>
    `;

    repoUl.innerHTML += repoLi;  
  });
  let repoDescTxts = repoUl.querySelectorAll('.repo-desc');
  repoDescTxts.forEach(repoDescTxt => {
    console.log(repoDescTxt.innerHTML);    
    if (repoDescTxt.innerHTML = 'null' ) {
      repoDescTxt.style.display = 'none'
    } else {
      repoDescTxt.style.display = 'inline-block'
      
    }
  });

}

fetch(userUrlQl, {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "Authorization": "bearer ",
  },
  body: JSON.stringify({
    query: `
        query {
          user(login: "veedahv") {
            login
            avatarUrl
            name
            bio
            repositories(last: 20) {
              totalCount
              nodes {
                name
                description
                forkCount
                stargazerCount
                updatedAt
                languages(first: 1) {
                  nodes {
                    color
                    name
                  }
                }
              }
            }
          }
        }
          `
  })
}).then(
  function (response) {
    console.log(response)
    return response.json();
  }
).then(
  function (data) {
    let infoTag = data.data.user;
    let repoTag = data.data.user.repositories;
    console.log(data.data.user)
    console.log(data.data.user.repositories.nodes)
    console.log(data.data.user.repositories.nodes[2])
    console.log(data.data.user.repositories.nodes[2].name)
    console.log(data.data.user.repositories.nodes[2].languages)
    console.log(data.data.user.repositories.nodes[2].languages.nodes)
    console.log(repoTag.nodes[2].name)
    console.log(data.data.user.login)
    userInfoAll(infoTag, repoTag);
  }
).catch(function (error) {
  // errorMsg(error);
})

const isInViewport = (element, el) => {
  const rect = element.getBoundingClientRect();
  if (
      rect.bottom >= 0 &&
      rect.left >= 0 &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  ) {
    console.log('ahh')
    el.classList.remove('fixed')
  } else {
    console.log('nahh')
    el.classList.add('fixed')
  }
}

const isImgViewport = (element, el) => {
  const rect = element.getBoundingClientRect();
  if (
      rect.bottom >= 0 &&
      rect.left >= 0 &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  ) {
    console.log('ahh')
    el.style.visibility = 'hidden'
  } else {
    el.style.visibility = 'visible'
    console.log('nahh')
  }
}

document.addEventListener('scroll', (event) => {
  let headerTag = document.querySelector('header');
  let userTag = document.querySelector('.user-header');
  let navFixed = document.querySelector('.mini-nav-desktop');
  let navImgFixed = document.querySelector('.img-contain');
  isInViewport(headerTag, navFixed);
  isImgViewport(navImgFixed, userTag);
})