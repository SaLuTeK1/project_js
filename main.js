// В index.html
// 1 отримати масив об'єктів з endpoint`а https://jsonplaceholder.typicode.com/users +
// 2 Вивести id,name всіх user в index.html. Окремий блок для кожного user. +
// 3 Додати кожному блоку кнопку/посилання , при кліку на яку відбувається перехід  на сторінку user-details.html,+
// котра має детальну інфорацію про об'єкт на який клікнули+

async function foo() {
    let userF = await fetch('https://jsonplaceholder.typicode.com/users');
    let users = await userF.json()
    let megaBox = document.createElement('div');
    let mainBox = document.getElementById('main-box');
    megaBox.classList.add('users-wrap');
    for (const user of users) {
        let div = document.createElement('div');
        let btn = document.createElement('button');
        let p = document.createElement('p');
        btn.innerText = 'Show more about user';
        btn.classList.add('button-style');
        div.classList.add('user-box');
        p.classList.add('text')
        p.innerText = user.id+`)`+ user.name;
        div.append(p,btn);
        megaBox.append(div);

        btn.onclick = function (){
            location.href = `./user-details.html?userId=${user.id}`;
        }
    }
    mainBox.append(megaBox);
    document.body.append(mainBox);
}
void foo();




//
// Стилизація проєкта -
//     index.html - всі блоки з user - по 2 в рядок. кнопки/аосилвння розташувати під інформацією про user.
//

//     Всі елементи котрі характеризують users, posts, comments візуалізувати, так, щоб було видно що це блоки (дати фон. марджини і тд)