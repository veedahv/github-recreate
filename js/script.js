
//Calling Elements
const repoUl = document.querySelector('.repo-ul'),
  headerTag = document.querySelector('header'),
  mobileUserTag = document.querySelector('.mobile-user-info'),
  userTag = document.querySelector('.user-header'),
  navFixed = document.querySelector('.mini-nav-desktop'),
  navFixedMobile = document.querySelector('.mini-nav-ul'),
  navImgFixed = document.querySelector('.img-contain'),
  hamburger = document.querySelector('.hamburger'),
  navDropdown = document.querySelector('.nav-dropdown'),
  userImgs = document.querySelectorAll('.userImg'),
  userNames = document.querySelectorAll('.user-name'),
  repoCounts = document.querySelectorAll('.repo-count'),
  userLogins = document.querySelectorAll('.user-login'),
  userBios = document.querySelectorAll('.user-bio'),
  userUrlQl = `https://api.github.com/graphql`;

// Insert Token
let token = '';

// Functions
// Function to Get Repository Update Time in Minutes, Hours, Days and Date
const updateTime = (date2, date1) => {
  let timeDiff = (date2.getTime() - date1.getTime()) / 1000,
    dateCal = date1.getDate(),
    updatedOn,
    month;
  switch (date1.getMonth()) {
    case 0:
      month = 'Jan'
      break;
    case 1:
      month = 'Feb'
      break;
    case 2:
      month = 'Mar'
      break;
    case 3:
      month = 'Apr'
      break;
    case 4:
      month = 'May'
      break;
    case 5:
      month = 'Jun'
      break;
    case 6:
      month = 'Jul'
      break;
    case 7:
      month = 'Aug'
      break;
    case 8:
      month = 'Sep'
      break;
    case 9:
      month = 'Oct'
      break;
    case 10:
      month = 'Nov'
      break;
    case 10:
      month = 'Dec'
      break;

    default:
      month = 'not'
      break;
  }
  if (timeDiff < 60) {
    return 'in 1 minute';
  } else if (timeDiff <= 60 * 60) {
    updatedOn = timeDiff / 60;
    return Math.abs(Math.round(updatedOn)) + ' minutes ago';
  } else if (timeDiff <= 60 * 60 * 24) {
    updatedOn = timeDiff / 60 / 60;
    return Math.abs(Math.round(updatedOn)) + ' hours ago';
  } else {
    updatedOn = timeDiff / 60 / 60 / 24;
    if (Math.abs(Math.round(updatedOn)) === 1) {
      return 'yesterday';
    } else if (updatedOn <= 28) {
      return Math.abs(Math.round(updatedOn)) + ' days ago';
    } else {
      return 'on ' + dateCal + ' ' + month
    }
  }

}


// Function to Create New Repo
const newRepoTag = (infoTag, repoTag) => {
  let repoNodes = repoTag.nodes;
  userNames.forEach(userName => {
    userName.textContent = infoTag.name;
  });

  userLogins.forEach(userLogin => {
    userLogin.textContent = infoTag.login;
  });

  userBios.forEach(userBio => {
    userBio.textContent = infoTag.bio;
  });

  userImgs.forEach(userImg => {
    userImg.src = infoTag.avatarUrl;
  })

  repoCounts.forEach(repoCount => {
    repoCount.textContent = repoTag.totalCount;
  });

  repoNodes.forEach(repoNode => {
    let repoName = repoNode.name,
      repoDesc = repoNode.description,
      forkCount = repoNode.forkCount,
      forkParent,
      forkParentCount,
      starCount = repoNode.stargazerCount,
      repoUpdate = repoNode.updatedAt,
      repoDate = new Date(repoUpdate),
      todayDate = new Date(),
      repoLang,
      repoBg;

    if (repoNode.languages.nodes[0] !== undefined) {
      repoLang = repoNode.languages.nodes[0].name;
      repoBg = repoNode.languages.nodes[0].color;
    } else {
      repoLang = 'null';
      repoBg = '#fff';
    }
    if (repoNode.parent !== null) {
      forkParent = repoNode.parent.nameWithOwner;
      forkParentCount = repoNode.parent.forkCount;
    } else {
      forkParent = 'null';
      forkParentCount = 0;
    }
    let update = updateTime(todayDate, repoDate);
    let totalForkCount = forkParentCount + forkCount;

    const repoLi = `
    <li class="flex repo-li">
    <div class="repo-info">
        <h2 class="repo-name"><a href="">${repoName}</a></h2>
        <small class="parent-forked">Forked from <a class="parent-forked-name">${forkParent}</a></small>        
        <small class="repo-desc">${repoDesc}</small>
        <div class="flex flex-wrap repo-info-container">
            <span class="lang-contain flex">
                <span class="lang-bg" style="background-color: ${repoBg};"></span>
                <span class="lang-name">${repoLang}</span>
            </span>
            <span class="star-contain flex">
                <span class="">
                    <i class="fa fa-star-o"></i>
                </span>
                <span class="star-no">${starCount}</span>
            </span>
            <span class="fork-contain flex">
                <span class="">
                    <svg aria-label="fork" class="octicon octicon-repo-forked" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img">
                        <path fill-rule="evenodd" fill="#586069" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z">
                        </path>
                    </svg>
                </span>
                <span class="fork-no">${totalForkCount}</span>
            </span>
            <span class="update">
                Updated <span class="time">${update}</span>
            </span>
        </div>
    </div>
    <button class="star repo-btn flex"><i class="fa fa-star-o btn-star"></i> <span>Star</span></button>
</li>
    `;
    repoUl.innerHTML += repoLi;
  });
  let repoDescriptions = repoUl.querySelectorAll('.repo-desc'),
    langContains = repoUl.querySelectorAll('.lang-contain'),
    starContains = repoUl.querySelectorAll('.star-contain'),
    forkContains = repoUl.querySelectorAll('.fork-contain'),
    parentForks = repoUl.querySelectorAll('.parent-forked');

  repoDescriptions.forEach(repoDescription => {
    repoDescription.innerText === 'null' ? repoDescription.style.display = 'none' : repoDescription.style.display = 'inline-block';
  });
  langContains.forEach(langContain => {
    let langName = langContain.querySelector('.lang-name');
    langName.innerText === 'null' ? langContain.style.display = 'none' : langContain.style.display = 'flex';
  });

  starContains.forEach(starContain => {
    let starNo = starContain.querySelector('.star-no');
    starNo.innerText === '0' ? starContain.style.display = 'none' : starContain.style.display = 'flex';
  });

  forkContains.forEach(forkContain => {
    let forkNo = forkContain.querySelector('.fork-no');
    forkNo.innerText === '0' ? forkContain.style.display = 'none' : forkContain.style.display = 'flex';
  });

  parentForks.forEach(parentFork => {
    let parentName = parentFork.querySelector('.parent-forked-name');
    parentName.innerText === 'null' ? parentFork.style.display = 'none' : parentFork.style.display = 'inline-block';
  });

}

const isInViewport = (element, el) => {
  const rect = element.getBoundingClientRect();
  (
    rect.bottom >= 0 &&
    rect.left >= 0 &&
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  ) ? el.classList.remove('fixed') : el.classList.add('fixed');
}

const imgInViewport = (element, el) => {
  const rect = element.getBoundingClientRect();
  (
    rect.bottom >= 0 &&
    rect.left >= 0 &&
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  ) ? el.style.visibility = 'hidden' : el.style.visibility = 'visible'

}

const checkElViewport = () => {
  isInViewport(mobileUserTag, navFixedMobile);
  isInViewport(headerTag, navFixed);
  imgInViewport(navImgFixed, userTag);
}

const menuDropdown = () => {
  navDropdown.classList.toggle('display-dropdown');
}

// Event Listeners
document.addEventListener('scroll', checkElViewport)

hamburger.addEventListener('click', menuDropdown)

fetch(userUrlQl, {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "Authorization": "bearer " + token,
  },
  body: JSON.stringify({
    query: `
        query {
          user(login: "veedahv") {
            login
            avatarUrl
            name
            bio
            repositories(first: 20, orderBy: {field: PUSHED_AT, direction: DESC}) {
              totalCount
              nodes {
                name
                description
                forkCount
                stargazerCount
                updatedAt
                languages(first: 1, orderBy: {field: SIZE, direction: DESC}) {
                  nodes {
                    color
                    name
                  }
                }
                parent {
                  nameWithOwner
                  forkCount
                }  
              }
            }
          }
        }
          `
  })
}).then(
  (response) => {
    return response.json();
  }
).then(
  (data) => {
    let infoTag = data.data.user;
    let repoTag = data.data.user.repositories;
    newRepoTag(infoTag, repoTag);
  }
)