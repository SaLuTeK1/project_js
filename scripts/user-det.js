let id = new URL(location.href).searchParams.get('userId');
let infoBox = document.createElement('div');
infoBox.classList.add('info-box');
let mainBox = document.getElementById('main-box');
mainBox.append(infoBox);
async function fetcher(url){
    const response = await fetch(url);
    return await response.json();

}
async function info(url){
    let userInfo = await fetcher(url)
    async function infoSearcher(inform){
        for (const item in inform) {
            if (typeof inform[item] === 'object') {
                await infoSearcher(inform[item]);
            } else {
                let p = document.createElement('p');
                p.classList.add('text')
                p.innerText = item.charAt(0).toUpperCase() + item.slice(1) + `: ` +inform[item];
                infoBox.append(p);
            }
        }
    }
    await infoSearcher(userInfo);
}
void info(`https://jsonplaceholder.typicode.com/users/${id}`);
async function buttonLogic(){
    let btnBox = document.createElement('div');
    btnBox.classList.add('button-box');
    let btn = document.createElement('button');
    btn.innerText = 'Post of current user';
    btn.classList.add('post-show-btn')
    document.body.append(btnBox);
    btnBox.append(btn)
    btn.onclick = async function (){
        let titles = await fetcher(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
        btnBox.classList.remove('button-box');
        btnBox.classList.add('hide');
        let posts = document.createElement('div');
        posts.classList.add('titles-box');
        let i = 0;
        for (const title of titles) {
            let titleBox = document.createElement('div');
            let postBtn = document.createElement('button');
            postBtn.id = 'more-post'
            postBtn.innerText=`More about post`;
            titleBox.classList.add('title-box-small')
            i++;
            let p = document.createElement('p');
            p.classList.add('text');
            p.innerText = `Title №${i}: ` + title.title;
            titleBox.append(p,postBtn);
            posts.append(titleBox);

            postBtn.onclick = async function(){
                location.href = `./post-details.html?postId=${title.id}&userId=${id}`;
            }
        }
        document.body.append(posts);

    };

}
void buttonLogic();


//user-details.html - блок з інфою про user зверху сторінки. Кнопка нижчє, на 90% ширини сторінки, по центру.
//блоки з короткою іфною про post - в ряд по 5