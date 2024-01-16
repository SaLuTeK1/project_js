//     На странице post-details.html:
// 7 Вивести всю, без виключення, інформацію про об'єкт post на який клікнули .
// 8 Нижчє інформаці про пост, вивести всі коментарі поточного поста (ендпоінт  - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)
//     post-details.html - блок з інфою про пост зверху. Коментарі - по 4 в ряд.

let id = new URL(location.href).searchParams.get('userId');
let postId = new URL(location.href).searchParams.get('postId');


let infoBox = document.createElement('div');
infoBox.classList.add('info-box');
document.body.append(infoBox);

let wrap = document.getElementById('wrapper');
wrap.append(infoBox);

async function fetcher(url){
    const response = await fetch(url);
    return await response.json();
}
async function info(url){
    let div = document.createElement('div');
    div.classList.add('post-info-box');
    let h1 = document.createElement('h1');
    h1.innerText = 'Info about post'
    div.append(h1);

    infoBox.append(div);
    let postInfo = await fetcher(url)
    async function infoSearcher(inform){
        for (const item in inform) {
            if (typeof inform[item] === 'object') {
                await infoSearcher(inform[item]);
            } else {
                let p = document.createElement('p');
                p.classList.add('text')
                p.innerText = item.charAt(0).toUpperCase() + item.slice(1) + `: ` +inform[item];

                div.append(p);
            }
        }
    }
    await infoSearcher(postInfo);

    void comments(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
}
void info(`https://jsonplaceholder.typicode.com/posts/${postId}`);
async function comments(url){
    let commentsInfo = await fetcher(url)
    let div = document.createElement('div');
    div.classList.add('comments-info-box');
    infoBox.append(div)

    let arr = [];
    for (const item in commentsInfo) {
        if (typeof commentsInfo[item] === 'object') {
            arr.push(commentsInfo[item]);
        }
    }

    for (const comment of arr) {
        let postId = comment.postId;
        let id = comment.id;
        let name = comment.name;
        let email = comment.email;
        let body = comment.body;

        let postBox = document.createElement('div');
        postBox.classList.add('comments-box');
        let p1 = document.createElement('p');
        let p2 = document.createElement('p');
        let p3 = document.createElement('p');
        let p4 = document.createElement('p');
        let p5 = document.createElement('p');
        p1.classList.add('com-text')
        p2.classList.add('com-text')
        p3.classList.add('com-text')
        p4.classList.add('com-text')
        p5.classList.add('com-text')

        p1.innerText = `Post Id: ` + postId;
        p2.innerText = `Id: ` + id;
        p3.innerText = 'Title: ' + name;
        p4.innerText = 'Email: ' + email;
        p5.innerText = 'Body: ' + body;

        postBox.append(p1,p2,p3,p4,p5);
        div.append(postBox);
    }
}
