


// https://api.github.com/graphql

// const repoUrl = curl -H "Authorization: bearer token" -X POST -d " \
//  { \
//    \"query\": \"query { viewer { login }}\" \
//  } \
// " https://api.github.com/graphql
// 7e111cdbc98967510634840bfe18fa0a357f2aab
// const repoUrl = "Authorization: bearer 7e111cdbc98967510634840bfe18fa0a357f2aab" -X POST -d " \
//  { \
//    \"query\": \"query { viewer { login }}\" \
//  } \
// " https://api.github.com/graphql
const repoUl = document.querySelector('.repo-ul');
const userImgs = document.querySelectorAll('.userImg');
const userName = document.querySelector('.user-name');
const userLogin = document.querySelector('.user-login');
const userBio = document.querySelector('.user-bio');
const userUrlApi = `https://api.github.com/users/veedahv`;
const userUrlQl = `https://api.github.com/graphql`;

// fetch(userUrlApi).then( function (response) {
//   console.log(response);  
//   return response.json()
// }).then( function (data) {
//   console.log(data);  
//   console.log(data.bio); 
//   document.querySelector('header').innerHTML = data.bio
// })
function userInfoAll(infoTag, repoTag) {
  console.log(infoTag);
  console.log(infoTag.login);
  console.log(infoTag.avatarUrl);
  console.log(repoTag);
  console.log(repoTag.nodes[2].name);
  console.log('working');
  let repoNodes = repoTag.nodes.reverse();
  userLogin.textContent = infoTag.login;
  userName.textContent = infoTag.name;
  userBio.textContent = infoTag.bio;
  console.log(repoNodes);
  userImgs.forEach(userImg => {
    userImg.src = infoTag.avatarUrl;
  })
  repoNodes.forEach(repoNode => {
    console.log(repoNode.name);  
    let repoName = repoNode.name;
    let repoUpdate = repoNode.updatedAt;
    let repoDate = new Date(repoUpdate);
    let repoLang = repoNode.languages.nodes[0].name;
    let repoBg = repoNode.languages.nodes[0].color;
    console.log(repoUpdate);
    console.log(repoDate);
    console.log(repoDate.toDateString());
    console.log(repoDate.getMinutes());

    const repoLi = `
    <li class="flex">
    <div class="repo-info">
        <h2 class="repo-name"><a href="">${repoName}</a></h2>
        <div class="flx">
            <span class="lang-contain">
                <span class="lang-bg" style="background-color: ${repoBg};"></span>
                <span class="lang-name">${repoLang}</</span>
            </span>
            <span class="update">
                Updated <span class="time"></span> ago
            </span>
        </div>
    </div>
</li>
    `;

    repoUl.innerHTML += repoLi;  
  });

}
// repositoryOwner (login: "veedahv") {
  
  // forksCount
fetch(userUrlQl, {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "Authorization": "bearer 7e111cdbc98967510634840bfe18fa0a357f2aab",
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
              nodes {
                name
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



