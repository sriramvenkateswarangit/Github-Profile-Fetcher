function git() {
    var originalName = document.getElementById("text").value;
    console.log(originalName);

    fetch("https://api.github.com/users/" + originalName)
    .then((result) => result.json())
    .then((data) => {
        console.log(data);
        document.getElementById("result").innerHTML = `
            <img src="${data.avatar_url}" alt="user_avatar">
            <h2>${data.name}</h2>
            <p>${data.bio}</p>
            <a href="${data.html_url}" target="_blank" class="btn btn-secondary">View Profile</a>
        `;

        fetch(data.repos_url)
        .then((result) => result.json())
        .then((repos) => {
            console.log(repos);
            let reposHtml = '<h3>Repositories</h3>';
            repos.forEach(repo => {
                reposHtml += `
                    <div class="repo">
                        <h4><a href="${repo.html_url}" target="_blank">${repo.name}</a></h4>
                        <p>${repo.description || 'No description'}</p>
                        <p><strong>Stars:</strong> ${repo.stargazers_count}</p>
                    </div>
                `;
            });
            document.getElementById("repos").innerHTML = reposHtml;
        });
    });
}